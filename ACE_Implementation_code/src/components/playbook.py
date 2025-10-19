"""
Playbook - Manages the growing knowledge base
"""

from typing import List, Dict, Optional
from dataclasses import dataclass, field
from collections import defaultdict


@dataclass
class Bullet:
    """A single bullet/entry in the playbook"""
    id: str
    section: str
    content: str
    helpful_count: int = 0
    harmful_count: int = 0
    embedding: Optional[List[float]] = field(default=None, repr=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "section": self.section,
            "content": self.content,
            "helpful": self.helpful_count,
            "harmful": self.harmful_count,
            # Don't serialize embedding to save space
        }


class Playbook:
    """Manages the growing knowledge base with semantic search support"""
    
    def __init__(self, embedding_service=None, use_semantic_search: bool = False):
        """
        Initialize playbook
        
        Args:
            embedding_service: Service for generating embeddings (optional)
            use_semantic_search: Whether to use semantic search for retrieval
        """
        self.bullets: List[Bullet] = []
        self.bullet_counter = 0
        self.sections = {
            "sql_patterns": [],
            "common_mistakes": [],
            "schema_usage": [],
            "aggregation_functions": [],
            "where_clauses": []
        }
        self.embedding_service = embedding_service
        self.use_semantic_search = use_semantic_search and embedding_service is not None
    
    def add_bullet(self, section: str, content: str) -> Bullet:
        """Add a new bullet to the playbook with embedding generation"""
        bullet_id = f"sql-{self.bullet_counter:05d}"
        self.bullet_counter += 1
        
        # Generate embedding if semantic search is enabled
        embedding = None
        if self.use_semantic_search and self.embedding_service:
            try:
                embedding = self.embedding_service.embed_text(content)
            except Exception as e:
                print(f"⚠ Failed to generate embedding for bullet: {e}")
        
        bullet = Bullet(
            id=bullet_id,
            section=section,
            content=content,
            embedding=embedding
        )
        
        self.bullets.append(bullet)
        self.sections[section].append(bullet)
        return bullet
    
    def update_bullet_feedback(self, bullet_id: str, is_helpful: bool):
        """Update helpful/harmful counters"""
        for bullet in self.bullets:
            if bullet.id == bullet_id:
                if is_helpful:
                    bullet.helpful_count += 1
                else:
                    bullet.harmful_count += 1
                break
    
    def get_relevant_bullets(self, query: str, top_k: int = 5, 
                            similarity_threshold: float = 0.7) -> List[Bullet]:
        """
        Retrieve relevant bullets using semantic search or keyword matching
        
        Args:
            query: Query text to find relevant bullets for
            top_k: Number of top bullets to return
            similarity_threshold: Minimum similarity score for semantic search
            
        Returns:
            List of relevant bullets
        """
        if not self.bullets:
            return []
        
        if self.use_semantic_search and self.embedding_service:
            return self._get_relevant_bullets_semantic(query, top_k, similarity_threshold)
        else:
            return self._get_relevant_bullets_keyword(query, top_k)
    
    def _get_relevant_bullets_semantic(self, query: str, top_k: int, 
                                      similarity_threshold: float) -> List[Bullet]:
        """Retrieve bullets using semantic similarity"""
        try:
            # Generate query embedding
            query_embedding = self.embedding_service.embed_text(query)
            if query_embedding is None:
                print("⚠ Failed to generate query embedding, falling back to keyword search")
                return self._get_relevant_bullets_keyword(query, top_k)
            
            # Calculate similarities with all bullets that have embeddings
            similarities = []
            for bullet in self.bullets:
                if bullet.embedding is not None:
                    similarity = self.embedding_service.cosine_similarity(
                        query_embedding, bullet.embedding
                    )
                    # Weight by feedback
                    feedback_weight = 1 + (bullet.helpful_count - bullet.harmful_count) * 0.1
                    weighted_score = similarity * feedback_weight
                    
                    if similarity >= similarity_threshold:
                        similarities.append((bullet, weighted_score, similarity))
            
            # Sort by weighted score and return top_k
            similarities.sort(key=lambda x: x[1], reverse=True)
            return [bullet for bullet, _, _ in similarities[:top_k]]
            
        except Exception as e:
            print(f"⚠ Error in semantic search: {e}, falling back to keyword search")
            return self._get_relevant_bullets_keyword(query, top_k)
    
    def _get_relevant_bullets_keyword(self, query: str, top_k: int) -> List[Bullet]:
        """Retrieve bullets using simple keyword matching"""
        relevant = []
        query_lower = query.lower()
        
        for bullet in self.bullets:
            # Simple relevance scoring
            score = 0
            if any(word in bullet.content.lower() for word in query_lower.split()):
                score = bullet.helpful_count - bullet.harmful_count
                relevant.append((bullet, score))
        
        # Sort by score and return top_k
        relevant.sort(key=lambda x: x[1], reverse=True)
        return [bullet for bullet, _ in relevant[:top_k]]
    
    def format_for_prompt(self, bullets: List[Bullet] = None) -> str:
        """Format playbook for LLM prompt"""
        if bullets is None:
            bullets = self.bullets
        
        if not bullets:
            return "No playbook knowledge available yet."
        
        formatted = "=== SQL QUERY PLAYBOOK ===\n\n"
        
        # Group by section
        by_section = defaultdict(list)
        for bullet in bullets:
            by_section[bullet.section].append(bullet)
        
        for section, section_bullets in by_section.items():
            formatted += f"\n## {section.upper().replace('_', ' ')}\n"
            for bullet in section_bullets:
                formatted += f"[{bullet.id}] (helpful={bullet.helpful_count}, harmful={bullet.harmful_count})\n"
                formatted += f"{bullet.content}\n\n"
        
        return formatted
    
    def get_stats(self) -> Dict:
        """Get playbook statistics"""
        return {
            "total_bullets": len(self.bullets),
            "by_section": {section: len(bullets) for section, bullets in self.sections.items()},
            "avg_helpfulness": sum(b.helpful_count for b in self.bullets) / max(len(self.bullets), 1)
        }

