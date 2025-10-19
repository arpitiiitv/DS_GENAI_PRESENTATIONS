"""
Embedding Service - Generate embeddings using Azure OpenAI
"""

from typing import List, Optional
import numpy as np


class EmbeddingService:
    """Service for generating text embeddings"""
    
    def __init__(self, api_key: str, endpoint: str, deployment_name: str, 
                 model_name: str = "text-embedding-ada-002",
                 api_version: str = "2025-01-01-preview"):
        """
        Initialize the embedding service
        
        Args:
            api_key: Azure OpenAI API key
            endpoint: Azure OpenAI endpoint
            deployment_name: Embedding model deployment name
            model_name: Embedding model name
            api_version: API version
        """
        self.api_key = api_key
        self.endpoint = endpoint
        self.deployment_name = deployment_name
        self.model_name = model_name
        self.api_version = api_version
        self.client = None
        
        # Initialize client
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize the Azure OpenAI client"""
        try:
            from openai import AzureOpenAI
            
            self.client = AzureOpenAI(
                api_key=self.api_key,
                azure_endpoint=self.endpoint,
                api_version=self.api_version
            )
            
        except ImportError:
            raise ImportError(
                "openai package is required for embeddings. "
                "Install it with: pip install openai"
            )
        except Exception as e:
            raise Exception(f"Failed to initialize embedding client: {e}")
    
    def embed_text(self, text: str) -> Optional[List[float]]:
        """
        Generate embedding for a single text
        
        Args:
            text: Text to embed
            
        Returns:
            Embedding vector as list of floats, or None if failed
        """
        if not text or not text.strip():
            return None
        
        try:
            # Clean the text
            text = text.strip().replace("\n", " ")
            
            # Generate embedding
            response = self.client.embeddings.create(
                input=text,
                model=self.deployment_name
            )
            
            # Extract embedding vector
            embedding = response.data[0].embedding
            return embedding
            
        except Exception as e:
            print(f"⚠ Error generating embedding: {e}")
            return None
    
    def embed_texts(self, texts: List[str]) -> List[Optional[List[float]]]:
        """
        Generate embeddings for multiple texts
        
        Args:
            texts: List of texts to embed
            
        Returns:
            List of embedding vectors
        """
        embeddings = []
        for text in texts:
            embedding = self.embed_text(text)
            embeddings.append(embedding)
        return embeddings
    
    @staticmethod
    def cosine_similarity(embedding1: List[float], embedding2: List[float]) -> float:
        """
        Calculate cosine similarity between two embeddings
        
        Args:
            embedding1: First embedding vector
            embedding2: Second embedding vector
            
        Returns:
            Cosine similarity score (0 to 1)
        """
        try:
            from sklearn.metrics.pairwise import cosine_similarity
            
            # Convert to numpy arrays
            emb1 = np.array(embedding1).reshape(1, -1)
            emb2 = np.array(embedding2).reshape(1, -1)
            
            # Calculate cosine similarity
            similarity = cosine_similarity(emb1, emb2)[0][0]
            return float(similarity)
            
        except Exception as e:
            print(f"⚠ Error calculating similarity: {e}")
            return 0.0


class MockEmbeddingService:
    """Mock embedding service for testing without API calls"""
    
    def __init__(self, *args, **kwargs):
        """Initialize mock service"""
        print("  ℹ️ Using mock embedding service (no API calls)")
    
    def embed_text(self, text: str) -> Optional[List[float]]:
        """Generate mock embedding based on text hash"""
        if not text or not text.strip():
            return None
        
        # Generate deterministic but unique embedding based on text
        import hashlib
        hash_obj = hashlib.md5(text.encode())
        hash_int = int(hash_obj.hexdigest(), 16)
        
        # Create a 1536-dimensional vector (matching ada-002 dimensions)
        np.random.seed(hash_int % (2**32))
        embedding = np.random.randn(1536).tolist()
        
        # Normalize
        norm = np.linalg.norm(embedding)
        embedding = (np.array(embedding) / norm).tolist()
        
        return embedding
    
    def embed_texts(self, texts: List[str]) -> List[Optional[List[float]]]:
        """Generate mock embeddings for multiple texts"""
        return [self.embed_text(text) for text in texts]
    
    @staticmethod
    def cosine_similarity(embedding1: List[float], embedding2: List[float]) -> float:
        """Calculate cosine similarity"""
        try:
            from sklearn.metrics.pairwise import cosine_similarity
            emb1 = np.array(embedding1).reshape(1, -1)
            emb2 = np.array(embedding2).reshape(1, -1)
            similarity = cosine_similarity(emb1, emb2)[0][0]
            return float(similarity)
        except Exception as e:
            print(f"⚠ Error calculating similarity: {e}")
            return 0.0

