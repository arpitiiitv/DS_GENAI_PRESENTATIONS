"""
Base LLM - Abstract base class for LLM providers
"""

from abc import ABC, abstractmethod
from typing import Dict, List
from src.components.playbook import Playbook, Bullet


class BaseLLM(ABC):
    """Abstract base class for LLM providers"""
    
    @abstractmethod
    def generate_sql(self, question: str, schema: Dict, playbook: Playbook, 
                     relevant_bullets: List[Bullet]) -> str:
        """
        Generate SQL query from natural language question
        
        Args:
            question: Natural language question
            schema: Database schema information
            playbook: Current playbook knowledge
            relevant_bullets: Relevant bullets from playbook
            
        Returns:
            Generated SQL query string
        """
        pass
    
    def _build_prompt(self, question: str, schema: Dict, playbook: Playbook, 
                      bullets: List[Bullet]) -> str:
        """Build prompt for LLM with strict formatting rules"""
        
        # Format playbook rules
        playbook_text = playbook.format_for_prompt(bullets) if bullets else "No playbook rules yet."
        
        prompt = f"""You are a SQL query generator. You MUST follow these rules EXACTLY:

CRITICAL RULES - FOLLOW THESE STRICTLY:
1. Generate SQL queries in SINGLE-LINE format with NO extra newlines or whitespace
2. Do NOT add column aliases (AS keyword) unless explicitly shown in examples
3. Match the EXACT format shown in the playbook rules below
4. Use the EXACT column names and table names from the schema
5. ONLY output the SQL query - NO explanations, NO markdown, NO extra text

Question: {question}

Database Schema:
Tables: {schema.get('tables', [])}
Columns: {schema.get('columns', [])}

PLAYBOOK RULES (FOLLOW THESE EXACTLY):
{playbook_text}

IMPORTANT FORMATTING RULES:
- Write SQL in a SINGLE line with single spaces between keywords
- Do NOT use "AS" for column aliases
- Do NOT add extra newlines or formatting
- Do NOT add comments
- Use COUNT(*) instead of COUNT(column_name)
- Use SELECT * when training data shows it, use specific columns when shown
- Match training data format EXACTLY

Generate ONLY the SQL query following ALL rules above:"""
        return prompt

