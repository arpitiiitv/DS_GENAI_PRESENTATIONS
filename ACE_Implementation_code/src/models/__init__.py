"""
LLM Models - Interfaces for different LLM providers
"""

from src.models.base_llm import BaseLLM
from src.models.mock_llm import MockLLM
from src.models.embedding_service import EmbeddingService, MockEmbeddingService

try:
    from src.models.azure_openai_llm import AzureOpenAILLM
    __all__ = ["BaseLLM", "MockLLM", "AzureOpenAILLM", "EmbeddingService", "MockEmbeddingService"]
except ImportError:
    __all__ = ["BaseLLM", "MockLLM", "EmbeddingService", "MockEmbeddingService"]

