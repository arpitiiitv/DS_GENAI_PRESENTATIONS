"""
Generator - Generates SQL queries using current playbook
"""

import re
from typing import List, Dict, Tuple
from src.components.playbook import Playbook, Bullet
from src.models.base_llm import BaseLLM
from src.models.mock_llm import MockLLM


class Generator:
    """Generates SQL queries using current playbook"""
    
    def __init__(self, llm: BaseLLM = None, use_mock_llm: bool = True, 
                 top_k_bullets: int = 5, similarity_threshold: float = 0.7):
        """
        Initialize generator
        
        Args:
            llm: LLM instance to use for generation (Claude, GPT, etc.)
            use_mock_llm: If True, use rule-based mock. If False, use provided LLM.
            top_k_bullets: Number of most relevant bullets to retrieve
            similarity_threshold: Minimum similarity for semantic search
        """
        self.use_mock_llm = use_mock_llm
        self.llm = llm if llm else MockLLM()
        self.used_bullets = []
        self.top_k_bullets = top_k_bullets
        self.similarity_threshold = similarity_threshold
    
    def generate_sql(self, question: str, schema: Dict, playbook: Playbook) -> Tuple[str, List[str]]:
        """
        Generate SQL query from natural language question
        
        Returns:
            (sql_query, list_of_bullet_ids_used)
        """
        self.used_bullets = []
        
        # Get relevant playbook knowledge using semantic search
        relevant_bullets = playbook.get_relevant_bullets(
            question, 
            top_k=self.top_k_bullets,
            similarity_threshold=self.similarity_threshold
        )
        self.used_bullets = [b.id for b in relevant_bullets]
        
        if self.use_mock_llm:
            # Mock LLM with rule-based generation
            sql = self._mock_generate(question, schema, relevant_bullets)
        else:
            # Real LLM generation
            sql = self.llm.generate_sql(question, schema, playbook, relevant_bullets)
        
        return sql, self.used_bullets
    
    def _mock_generate(self, question: str, schema: Dict, bullets: List[Bullet]) -> str:
        """Mock SQL generation using simple rules"""
        question_lower = question.lower()
        tables = schema.get("tables", ["table"])
        columns = schema.get("columns", ["*"])
        
        # Simple pattern matching
        if "count" in question_lower or "how many" in question_lower:
            return f"SELECT COUNT(*) FROM {tables[0]}"
        
        elif "sum" in question_lower or "total" in question_lower:
            # Find numeric column
            col = columns[0] if columns else "amount"
            return f"SELECT SUM({col}) FROM {tables[0]}"
        
        elif "average" in question_lower or "avg" in question_lower:
            col = columns[0] if columns else "price"
            return f"SELECT AVG({col}) FROM {tables[0]}"
        
        elif "maximum" in question_lower or "max" in question_lower:
            col = columns[0] if columns else "value"
            return f"SELECT MAX({col}) FROM {tables[0]}"
        
        elif "greater than" in question_lower or "more than" in question_lower:
            # Extract number
            numbers = re.findall(r'\d+', question)
            value = numbers[0] if numbers else "100"
            col = columns[0] if columns else "value"
            return f"SELECT * FROM {tables[0]} WHERE {col} > {value}"
        
        elif "less than" in question_lower:
            numbers = re.findall(r'\d+', question)
            value = numbers[0] if numbers else "100"
            col = columns[0] if columns else "price"
            return f"SELECT * FROM {tables[0]} WHERE {col} < {value}"
        
        elif "group by" in question_lower or "by" in question_lower:
            col1 = columns[0] if len(columns) > 0 else "category"
            col2 = columns[1] if len(columns) > 1 else "amount"
            return f"SELECT {col1}, SUM({col2}) FROM {tables[0]} GROUP BY {col1}"
        
        else:
            return f"SELECT * FROM {tables[0]}"

