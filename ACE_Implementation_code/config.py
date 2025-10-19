"""
Configuration file for ACE SQL Agent
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Project paths
PROJECT_ROOT = Path(__file__).parent
DATA_DIR = PROJECT_ROOT / "data"
RESULTS_DIR = PROJECT_ROOT / "results"
SRC_DIR = PROJECT_ROOT / "src"

# Ensure directories exist
DATA_DIR.mkdir(exist_ok=True)
RESULTS_DIR.mkdir(exist_ok=True)

# Training configuration
TRAINING_CONFIG = {
    "num_epochs": 10,
    "target_accuracy": 80.0,
    "test_ratio": 0.3,
    "sample_size": 10,
    "early_stopping": True,
}

# Model configuration
MODEL_CONFIG = {
    "use_mock_llm": False,  # Set to True to use mock LLM
    "llm_provider": "azure_openai",  # Options: "mock", "azure_openai", "anthropic", "openai"
    "temperature": 0.0,
    "max_tokens": 500,
}

# Azure OpenAI Configuration
AZURE_OPENAI_CONFIG = {
    "endpoint": os.getenv("AZURE_OPENAI_API_ENDPOINT", ""),
    "api_key": os.getenv("AZURE_OPENAI_API_KEY", ""),
    "deployment_name": os.getenv("AZURE_OPENAI_API_DEPLOYMENT_NAME", ""),
    "model_name": os.getenv("AZURE_OPENAI_API_MODEL_NAME", "gpt-4o"),
    "api_version": os.getenv("AZURE_OPENAI_API_MODEL_VERSION", "2025-01-01-preview"),
}

# Azure OpenAI Embeddings Configuration
AZURE_OPENAI_EMBEDDING_CONFIG = {
    "endpoint": os.getenv("AZURE_OPENAI_API_ENDPOINT", ""),
    "api_key": os.getenv("AZURE_OPENAI_API_KEY", ""),
    "deployment_name": os.getenv("AZURE_OPENAI_EMBEDDING_API_DEPLOYMENT_NAME", "text-embedding-ada-002"),
    "model_name": os.getenv("AZURE_OPENAI_EMBEDDING_API_MODEL_NAME", "text-embedding-ada-002"),
    "api_version": os.getenv("AZURE_OPENAI_API_MODEL_VERSION", "2025-01-01-preview"),
}

# API Keys (load from environment variables)
API_KEYS = {
    "anthropic": os.getenv("ANTHROPIC_API_KEY", ""),
    "openai": os.getenv("OPENAI_API_KEY", ""),
}

# Playbook configuration
PLAYBOOK_CONFIG = {
    "sections": [
        "sql_patterns",
        "common_mistakes",
        "schema_usage",
        "aggregation_functions",
        "where_clauses",
    ],
    "duplicate_threshold": 0.8,
    "max_bullets_per_section": 50,
    "use_semantic_search": True,  # Use semantic search for retrieving relevant bullets
    "top_k_bullets": 5,  # Number of most relevant bullets to retrieve
    "similarity_threshold": 0.7,  # Minimum similarity score for bullet retrieval
}

# Dataset configuration
DATASET_CONFIG = {
    "name": "WikiSQL",
    "use_real_data": True,  # If True, loads from HuggingFace WikiSQL; if False, uses dummy data
    "file_path": None,  # For future: custom dataset file path
}

# Output configuration
OUTPUT_CONFIG = {
    "results_file": RESULTS_DIR / "ace_sql_results.json",
    "playbook_file": RESULTS_DIR / "playbook.json",
    "metrics_file": RESULTS_DIR / "metrics.json",
    "verbose": True,
}

# Logging configuration
LOGGING_CONFIG = {
    "level": "INFO",
    "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    "file": RESULTS_DIR / "training.log",
}


def get_config() -> dict:
    """Get complete configuration"""
    return {
        "training": TRAINING_CONFIG,
        "model": MODEL_CONFIG,
        "playbook": PLAYBOOK_CONFIG,
        "dataset": DATASET_CONFIG,
        "output": OUTPUT_CONFIG,
        "logging": LOGGING_CONFIG,
    }


def update_config(section: str, key: str, value):
    """
    Update configuration value
    
    Args:
        section: Configuration section (e.g., "training", "model")
        key: Configuration key
        value: New value
    """
    config_map = {
        "training": TRAINING_CONFIG,
        "model": MODEL_CONFIG,
        "playbook": PLAYBOOK_CONFIG,
        "dataset": DATASET_CONFIG,
        "output": OUTPUT_CONFIG,
        "logging": LOGGING_CONFIG,
    }
    
    if section in config_map and key in config_map[section]:
        config_map[section][key] = value
    else:
        raise KeyError(f"Invalid configuration: {section}.{key}")

