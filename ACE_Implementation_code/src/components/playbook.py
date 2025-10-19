"""
Playbook - Manages the growing knowledge base
"""

from typing import List, Dict
from dataclasses import dataclass
from collections import defaultdict


@dataclass
class Bullet:
    """A single bullet/entry in the playbook"""
    id: str
    section: str
    content: str
    helpful_count: int = 0
    harmful_count: int = 0
    
    def to_dict(self):
        return {
            "id": self.id,
            "section": self.section,
            "content": self.content,
            "helpful": self.helpful_count,
            "harmful": self.harmful_count
        }


class Playbook:
    """Manages the growing knowledge base"""
    
    def __init__(self):
        self.bullets: List[Bullet] = []
        self.bullet_counter = 0
        self.sections = {
            "sql_patterns": [],
            "common_mistakes": [],
            "schema_usage": [],
            "aggregation_functions": [],
            "where_clauses": []
        }
    
    def add_bullet(self, section: str, content: str) -> Bullet:
        """Add a new bullet to the playbook"""
        bullet_id = f"sql-{self.bullet_counter:05d}"
        self.bullet_counter += 1
        
        bullet = Bullet(
            id=bullet_id,
            section=section,
            content=content
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
    
    def get_relevant_bullets(self, query: str, top_k: int = 5) -> List[Bullet]:
        """Retrieve relevant bullets (simplified - in production use embeddings)"""
        # Simple keyword matching for demo
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

