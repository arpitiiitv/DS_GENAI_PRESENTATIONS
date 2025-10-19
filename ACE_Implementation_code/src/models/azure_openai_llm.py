"""
Azure OpenAI LLM - Implementation for Azure OpenAI API
"""

from typing import Dict, List
from langchain_openai import AzureChatOpenAI
from src.models.base_llm import BaseLLM
from src.components.playbook import Playbook, Bullet


class AzureOpenAILLM(BaseLLM):
    """Azure OpenAI LLM implementation using LangChain"""
    
    def __init__(self, api_key: str, endpoint: str, deployment_name: str,
                 model_name: str, api_version: str):
        """
        Initialize Azure OpenAI LLM
        
        Args:
            api_key: Azure OpenAI API key
            endpoint: Azure OpenAI endpoint URL
            deployment_name: Azure deployment name
            model_name: Model name (e.g., gpt-4o)
            api_version: API version
        """
        self.llm = AzureChatOpenAI(
            model=model_name,
            azure_deployment=deployment_name,
            api_key=api_key,
            azure_endpoint=endpoint,
            api_version=api_version,
            temperature=0.0,  # Deterministic for SQL generation
            model_kwargs={
                "top_p": 0.1,  # Very low top_p for more deterministic output
            }
        )
        self.model_name = model_name
        print(f"  ✓ Azure OpenAI initialized: {model_name} (deployment: {deployment_name})")
    
    def generate_sql(self, question: str, schema: Dict, playbook: Playbook, 
                     relevant_bullets: List[Bullet]) -> str:
        """
        Generate SQL query using Azure OpenAI
        
        Args:
            question: Natural language question
            schema: Database schema information
            playbook: Current playbook knowledge
            relevant_bullets: Relevant bullets from playbook
            
        Returns:
            Generated SQL query string
        """
        # Build prompt using base class method
        prompt = self._build_prompt(question, schema, playbook, relevant_bullets)
        
        try:
            # Build strong system message
            system_message = """You are a precise SQL query generator. You MUST follow formatting rules EXACTLY.
CRITICAL: 
- Output ONLY the SQL query with NO extra text
- Use single-line format with NO newlines
- Do NOT add column aliases (AS keyword)
- Follow playbook rules strictly"""
            
            # Call Azure OpenAI via LangChain with system message
            from langchain_core.messages import HumanMessage, SystemMessage
            messages = [
                SystemMessage(content=system_message),
                HumanMessage(content=prompt)
            ]
            response = self.llm.invoke(messages)
            
            # Extract SQL from response
            sql_query = response.content.strip()
            
            # Clean up response (remove markdown code blocks if present)
            if "```sql" in sql_query:
                sql_query = sql_query.split("```sql")[1].split("```")[0].strip()
            elif "```" in sql_query:
                sql_query = sql_query.split("```")[1].split("```")[0].strip()
            
            # Remove trailing semicolon if present
            if sql_query.endswith(';'):
                sql_query = sql_query[:-1].strip()
            
            # Force single-line format (remove extra newlines and spaces)
            import re
            sql_query = re.sub(r'\s+', ' ', sql_query)
            
            return sql_query
            
        except Exception as e:
            print(f"  ⚠️  Error calling Azure OpenAI API: {e}")
            # Fallback to simple query
            tables = schema.get('tables', ['table'])
            return f"SELECT * FROM {tables[0]}"

