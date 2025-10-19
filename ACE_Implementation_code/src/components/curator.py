"""
Curator - Creates structured playbook updates from reflections
"""

from typing import List, Dict
from src.components.playbook import Playbook


class Curator:
    """Creates structured playbook updates from reflections"""
    
    def generate_updates(self, reflection: Dict, current_playbook: Playbook) -> List[Dict]:
        """
        Generate delta updates based on reflection
        
        Returns:
            List of operations: [{"type": "ADD", "section": "...", "content": "..."}]
        """
        operations = []
        
        # Extract key insight and create bullet
        key_insight = reflection.get("key_insight", "")
        
        # Skip only if no insight or if it's a success
        skip_phrases = [
            "Successful pattern that should be reinforced",
        ]
        
        if not key_insight or any(phrase in key_insight for phrase in skip_phrases):
            return operations
        
        # Determine which section this belongs to
        section = self._determine_section(key_insight, reflection)
        
        # Check if similar bullet already exists
        if not self._is_duplicate(key_insight, current_playbook):
            operations.append({
                "type": "ADD",
                "section": section,
                "content": key_insight
            })
        
        return operations
    
    def _determine_section(self, insight: str, reflection: Dict) -> str:
        """Determine which playbook section this insight belongs to"""
        insight_lower = insight.lower()
        
        # Check for formatting/alias issues
        if "alias" in insight_lower or "as keyword" in insight_lower:
            return "sql_patterns"
        elif "format" in insight_lower or "whitespace" in insight_lower:
            return "sql_patterns"
        elif "column selection" in insight_lower or "select *" in insight_lower:
            return "sql_patterns"
        # Check for aggregation functions
        elif "count" in insight_lower or "sum" in insight_lower or "avg" in insight_lower or "max" in insight_lower:
            return "aggregation_functions"
        elif "where" in insight_lower:
            return "where_clauses"
        elif "group by" in insight_lower:
            return "sql_patterns"
        elif "order by" in insight_lower or "limit" in insight_lower:
            return "sql_patterns"
        elif "mistake" in insight_lower or "error" in insight_lower:
            return "common_mistakes"
        else:
            return "sql_patterns"
    
    def _is_duplicate(self, new_insight: str, playbook: Playbook, threshold: float = 0.85) -> bool:
        """Check if similar insight already exists (simple word overlap)"""
        new_words = set(new_insight.lower().split())
        
        # Check for exact match first
        for bullet in playbook.bullets:
            if bullet.content.lower() == new_insight.lower():
                return True
        
        # Then check for high similarity
        for bullet in playbook.bullets:
            existing_words = set(bullet.content.lower().split())
            
            # Calculate Jaccard similarity
            intersection = len(new_words & existing_words)
            union = len(new_words | existing_words)
            
            if union == 0:
                continue
                
            similarity = intersection / union
            
            if similarity > threshold:
                print(f"    [Duplicate detected: {similarity:.2f} similarity]")
                return True
        
        return False

