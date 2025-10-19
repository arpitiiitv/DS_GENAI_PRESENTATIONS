# Semantic Search Integration Guide

## Overview

The ACE SQL Agent now includes **semantic search** capabilities powered by Azure OpenAI embeddings. This feature enables intelligent retrieval of relevant playbook bullets based on semantic similarity rather than simple keyword matching, resulting in more accurate and context-aware SQL generation.

## Key Features

### 1. **Intelligent Bullet Retrieval**
- Uses Azure OpenAI's `text-embedding-ada-002` model to generate embeddings
- Performs cosine similarity-based search to find most relevant bullets
- Weights results by both semantic similarity and historical feedback (helpful/harmful counts)

### 2. **Automatic Embedding Generation**
- Embeddings are automatically created when bullets are added to the playbook
- Stored in memory with each bullet for fast retrieval
- No manual embedding management required

### 3. **Graceful Fallback**
- Falls back to keyword-based search if embeddings fail
- Works with mock embeddings for testing without API calls
- Configurable threshold for semantic matching

## Configuration

### Environment Variables (.env)

```bash
# Azure OpenAI Embeddings Configuration
AZURE_OPENAI_EMBEDDING_API_DEPLOYMENT_NAME=text-embedding-ada-002
AZURE_OPENAI_EMBEDDING_API_MODEL_NAME=text-embedding-ada-002
```

### Config Settings (config.py)

```python
PLAYBOOK_CONFIG = {
    "use_semantic_search": True,      # Enable/disable semantic search
    "top_k_bullets": 5,                # Number of bullets to retrieve
    "similarity_threshold": 0.7,       # Minimum similarity score (0-1)
}
```

## How It Works

### 1. **Bullet Addition**
When a new bullet is added to the playbook:
```python
bullet = playbook.add_bullet(section="sql_patterns", content="Use COUNT(*) for counting rows")
# Embedding is automatically generated and stored in bullet.embedding
```

### 2. **Query-Time Retrieval**
When generating SQL, the system:
1. Generates an embedding for the user's question
2. Calculates cosine similarity with all bullet embeddings
3. Filters by similarity threshold (default: 0.7)
4. Weights by feedback: `score = similarity × (1 + 0.1 × (helpful - harmful))`
5. Returns top-k most relevant bullets

### 3. **Example Flow**
```python
# User asks a question
question = "Find the total number of orders"

# System generates embedding for question
query_embedding = embedding_service.embed_text(question)

# Finds relevant bullets (e.g., bullets about COUNT, aggregation)
relevant_bullets = playbook.get_relevant_bullets(
    query=question,
    top_k=5,
    similarity_threshold=0.7
)

# Uses these bullets as context for SQL generation
sql = generator.generate_sql(question, schema, playbook)
```

## Architecture

### Components

1. **EmbeddingService** (`src/models/embedding_service.py`)
   - Real implementation using Azure OpenAI API
   - Methods: `embed_text()`, `embed_texts()`, `cosine_similarity()`

2. **MockEmbeddingService** 
   - Testing implementation (no API calls)
   - Generates deterministic mock embeddings based on text hash

3. **Playbook** (`src/components/playbook.py`)
   - Stores embeddings with bullets
   - `_get_relevant_bullets_semantic()`: Semantic search implementation
   - `_get_relevant_bullets_keyword()`: Fallback keyword matching

4. **Generator** (`src/components/generator.py`)
   - Uses playbook's semantic search for context retrieval
   - Configurable top_k and similarity_threshold

## Usage Examples

### Running with Semantic Search (Default)

```bash
# Uses real embeddings with Azure OpenAI
python3 main.py --epochs 10 --sample-size 50
```

### Running with Mock Embeddings

```bash
# For testing without API calls
python3 main.py --epochs 5 --sample-size 20 --use-dummy-data
```

### Disabling Semantic Search

In `config.py`, set:
```python
PLAYBOOK_CONFIG = {
    "use_semantic_search": False,  # Will use keyword matching
    ...
}
```

## Performance Considerations

### Embedding Generation
- **Time**: ~50-200ms per embedding (Azure OpenAI API)
- **Cost**: $0.0001 per 1K tokens (text-embedding-ada-002)
- **Dimensions**: 1536-dimensional vectors

### Similarity Calculation
- **Time**: O(n) where n = number of bullets
- **Memory**: ~6KB per bullet embedding (1536 floats × 4 bytes)
- **Optimization**: In-memory cosine similarity using scikit-learn

### Typical Performance
```
Dataset: 50 examples
Bullets: ~10-20 bullets generated during training
Embedding time: ~1-2 seconds total
Retrieval time: <10ms per query
```

## Benefits Over Keyword Matching

| Feature | Keyword Matching | Semantic Search |
|---------|------------------|-----------------|
| **Understanding** | Exact word matches only | Understands meaning and context |
| **Synonyms** | Misses synonyms | Handles synonyms naturally |
| **Context** | No context awareness | Context-aware matching |
| **Relevance** | Basic scoring | Similarity-based ranking |
| **Example** | "total" matches "total" | "total" matches "sum", "aggregate", "count" |

## Example: Semantic vs Keyword

**Query**: "How many users signed up last month?"

**Keyword Matching** would find:
- Bullets containing: "how many", "users", "signed", "month"

**Semantic Search** would find:
- Bullets about `COUNT(*)` (understands "how many" = counting)
- Bullets about date filtering (understands "last month" = date condition)
- Bullets about WHERE clauses (understands time-based filtering)
- Bullets about user tables (understands "users" domain)

## Troubleshooting

### Issue: "Failed to initialize embeddings"
**Solution**: Check your `.env` file has correct Azure OpenAI credentials:
```bash
AZURE_OPENAI_API_KEY=your-actual-key
AZURE_OPENAI_API_ENDPOINT=https://your-resource.openai.azure.com/
```

### Issue: Embeddings taking too long
**Solution**: 
1. Use mock embeddings for development
2. Reduce `sample_size` for faster training
3. Check network latency to Azure

### Issue: No relevant bullets retrieved
**Solution**: Lower `similarity_threshold` in config:
```python
"similarity_threshold": 0.5,  # Instead of 0.7
```

## Advanced: Custom Similarity Function

You can customize the similarity calculation by modifying `_get_relevant_bullets_semantic()` in `playbook.py`:

```python
# Current: Weighted by feedback
feedback_weight = 1 + (bullet.helpful_count - bullet.harmful_count) * 0.1
weighted_score = similarity * feedback_weight

# Alternative: Boost recent bullets
recency_weight = 1 + (0.1 * (total_bullets - bullet.id))
weighted_score = similarity * recency_weight

# Alternative: Section-specific boost
section_boost = 2.0 if bullet.section == "sql_patterns" else 1.0
weighted_score = similarity * section_boost
```

## Monitoring & Debugging

### Check if semantic search is enabled:
```python
print(f"Semantic search active: {playbook.use_semantic_search}")
print(f"Embedding service: {type(playbook.embedding_service).__name__}")
```

### View bullet embeddings:
```python
for bullet in playbook.bullets:
    has_embedding = bullet.embedding is not None
    print(f"{bullet.id}: embedding={has_embedding}")
```

### Test similarity calculation:
```python
text1 = "Count the number of rows"
text2 = "How many records are there"

emb1 = embedding_service.embed_text(text1)
emb2 = embedding_service.embed_text(text2)
similarity = embedding_service.cosine_similarity(emb1, emb2)
print(f"Similarity: {similarity:.3f}")  # Should be high (~0.8-0.9)
```

## Future Enhancements

1. **Caching**: Store embeddings in a vector database (e.g., Pinecone, Weaviate)
2. **Batch Processing**: Generate embeddings in batches for better performance
3. **Fine-tuning**: Fine-tune embeddings on SQL domain data
4. **Hybrid Search**: Combine semantic + keyword for best results
5. **Re-ranking**: Use cross-encoder for more accurate relevance scoring

## Dependencies

- `openai>=1.0.0` - Azure OpenAI client
- `scikit-learn>=1.3.0` - Cosine similarity calculation
- `numpy>=1.24.0` - Vector operations

Install all dependencies:
```bash
pip install -r requirements.txt
```

## Summary

Semantic search transforms the ACE system from simple pattern matching to intelligent context understanding. By leveraging Azure OpenAI embeddings, the system can:

✅ Find relevant bullets even when exact keywords don't match  
✅ Understand semantic relationships between queries and patterns  
✅ Provide more accurate context to the LLM for SQL generation  
✅ Learn more effectively by connecting related concepts  

This results in **higher accuracy** and **more robust** SQL generation across diverse queries.

