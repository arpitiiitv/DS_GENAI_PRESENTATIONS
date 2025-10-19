"""
Mock LLM - Rule-based SQL generation for testing
"""

import re
from typing import Dict, List
from src.models.base_llm import BaseLLM
from src.components.playbook import Playbook, Bullet


class MockLLM(BaseLLM):
    """Mock LLM using rule-based generation"""
    
    def generate_sql(self, question: str, schema: Dict, playbook: Playbook, 
                     relevant_bullets: List[Bullet]) -> str:
        """Generate SQL using simple pattern matching rules"""
        question_lower = question.lower()
        tables = schema.get("tables", ["table"])
        columns = schema.get("columns", ["*"])
        
        # Simple pattern matching
        if "count" in question_lower or "how many" in question_lower:
            return f"SELECT COUNT(*) FROM {tables[0]}"
        
        elif "sum" in question_lower or "total" in question_lower:
            col = columns[0] if columns else "amount"
            return f"SELECT SUM({col}) FROM {tables[0]}"
        
        elif "average" in question_lower or "avg" in question_lower:
            col = columns[0] if columns else "price"
            return f"SELECT AVG({col}) FROM {tables[0]}"
        
        elif "maximum" in question_lower or "max" in question_lower:
            col = columns[0] if columns else "value"
            return f"SELECT MAX({col}) FROM {tables[0]}"
        
        elif "greater than" in question_lower or "more than" in question_lower:
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

