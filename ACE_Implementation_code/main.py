#!/usr/bin/env python3
"""
ACE SQL Query Generator - Main Entry Point
===========================================

This is the main entry point for running the ACE SQL Agent.
Run this file to train and evaluate the SQL query generator.

Usage:
    python main.py
    python main.py --epochs 10 --target-accuracy 80
"""

import sys
import json
import argparse
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

from src import (
    WikiSQLDataset,
    Generator,
    ACETrainer,
    Playbook,
)
from config import (
    TRAINING_CONFIG,
    MODEL_CONFIG,
    OUTPUT_CONFIG,
    AZURE_OPENAI_CONFIG,
    AZURE_OPENAI_EMBEDDING_CONFIG,
    DATASET_CONFIG,
    PLAYBOOK_CONFIG,
    get_config,
)


def parse_args():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description="ACE SQL Query Generator - Train and evaluate"
    )
    parser.add_argument(
        "--epochs",
        type=int,
        default=TRAINING_CONFIG["num_epochs"],
        help="Maximum number of training epochs",
    )
    parser.add_argument(
        "--target-accuracy",
        type=float,
        default=TRAINING_CONFIG["target_accuracy"],
        help="Target accuracy for early stopping",
    )
    parser.add_argument(
        "--sample-size",
        type=int,
        default=TRAINING_CONFIG["sample_size"],
        help="Number of samples to use from dataset",
    )
    parser.add_argument(
        "--test-ratio",
        type=float,
        default=TRAINING_CONFIG["test_ratio"],
        help="Ratio of data to use for testing",
    )
    parser.add_argument(
        "--use-real-llm",
        action="store_true",
        help="Use real LLM instead of mock (requires API key)",
    )
    parser.add_argument(
        "--use-real-data",
        action="store_true",
        default=DATASET_CONFIG["use_real_data"],
        help="Use real WikiSQL dataset from HuggingFace (default: True)",
    )
    parser.add_argument(
        "--use-dummy-data",
        action="store_true",
        help="Force use of dummy data instead of WikiSQL",
    )
    parser.add_argument(
        "--output",
        type=str,
        default=str(OUTPUT_CONFIG["results_file"]),
        help="Output file for results",
    )
    
    return parser.parse_args()


def main():
    """Main execution function"""
    
    # Parse arguments
    args = parse_args()
    
    print("\n" + "="*60)
    print("ACE SQL QUERY GENERATOR - END-TO-END PROJECT")
    print("="*60 + "\n")
    
    # Determine whether to use real data
    use_real_data = args.use_real_data and not args.use_dummy_data
    
    # Display configuration
    print("Configuration:")
    print(f"  Max Epochs: {args.epochs}")
    print(f"  Target Accuracy: {args.target_accuracy}%")
    print(f"  Sample Size: {args.sample_size}")
    print(f"  Test Ratio: {args.test_ratio}")
    print(f"  Dataset: {'Real WikiSQL' if use_real_data else 'Dummy Data'}")
    print(f"  LLM: {'Real' if args.use_real_llm else 'Mock'}")
    print()
    
    # Step 1: Load Data
    print("Step 1: Loading dataset...")
    dataset = WikiSQLDataset(sample_size=args.sample_size, use_real_data=use_real_data)
    train_data, test_data = dataset.get_train_test_split(test_ratio=args.test_ratio)
    print(f"  ✓ Training examples: {len(train_data)}")
    print(f"  ✓ Test examples: {len(test_data)}\n")
    
    # Step 2: Initialize ACE
    print("Step 2: Initializing ACE components...")
    
    # Initialize generator
    # Use real LLM if either flag is set or config says so
    use_real_llm = args.use_real_llm or not MODEL_CONFIG["use_mock_llm"]
    
    if use_real_llm:
        # Use Azure OpenAI
        try:
            from src.models.azure_openai_llm import AzureOpenAILLM
            
            # Validate configuration
            if not AZURE_OPENAI_CONFIG["api_key"]:
                print("  ⚠️  Azure OpenAI API key not found in .env file")
                print("  ⚠️  Falling back to mock LLM")
                generator = Generator(
                    use_mock_llm=True,
                    top_k_bullets=PLAYBOOK_CONFIG["top_k_bullets"],
                    similarity_threshold=PLAYBOOK_CONFIG["similarity_threshold"]
                )
            else:
                llm = AzureOpenAILLM(
                    api_key=AZURE_OPENAI_CONFIG["api_key"],
                    endpoint=AZURE_OPENAI_CONFIG["endpoint"],
                    deployment_name=AZURE_OPENAI_CONFIG["deployment_name"],
                    model_name=AZURE_OPENAI_CONFIG["model_name"],
                    api_version=AZURE_OPENAI_CONFIG["api_version"],
                )
                generator = Generator(
                    llm=llm,
                    use_mock_llm=False,
                    top_k_bullets=PLAYBOOK_CONFIG["top_k_bullets"],
                    similarity_threshold=PLAYBOOK_CONFIG["similarity_threshold"]
                )
        except ImportError as e:
            print(f"  ⚠️  Failed to import Azure OpenAI: {e}")
            print("  ⚠️  Install required packages: pip install langchain langchain-openai")
            print("  ⚠️  Falling back to mock LLM")
            generator = Generator(
                use_mock_llm=True,
                top_k_bullets=PLAYBOOK_CONFIG["top_k_bullets"],
                similarity_threshold=PLAYBOOK_CONFIG["similarity_threshold"]
            )
        except Exception as e:
            print(f"  ⚠️  Error initializing Azure OpenAI: {e}")
            print("  ⚠️  Falling back to mock LLM")
            generator = Generator(
                use_mock_llm=True,
                top_k_bullets=PLAYBOOK_CONFIG["top_k_bullets"],
                similarity_threshold=PLAYBOOK_CONFIG["similarity_threshold"]
            )
    else:
        print("  ℹ️  Using mock LLM (rule-based)")
        generator = Generator(
            use_mock_llm=True,
            top_k_bullets=PLAYBOOK_CONFIG["top_k_bullets"],
            similarity_threshold=PLAYBOOK_CONFIG["similarity_threshold"]
        )
    
    # Initialize embedding service for semantic search
    embedding_service = None
    if PLAYBOOK_CONFIG["use_semantic_search"]:
        try:
            from src.models.embedding_service import EmbeddingService, MockEmbeddingService
            
            if use_real_llm and AZURE_OPENAI_EMBEDDING_CONFIG["api_key"]:
                print("  ℹ️  Initializing Azure OpenAI embeddings for semantic search...")
                embedding_service = EmbeddingService(
                    api_key=AZURE_OPENAI_EMBEDDING_CONFIG["api_key"],
                    endpoint=AZURE_OPENAI_EMBEDDING_CONFIG["endpoint"],
                    deployment_name=AZURE_OPENAI_EMBEDDING_CONFIG["deployment_name"],
                    model_name=AZURE_OPENAI_EMBEDDING_CONFIG["model_name"],
                    api_version=AZURE_OPENAI_EMBEDDING_CONFIG["api_version"],
                )
                print("  ✓ Real embeddings initialized")
            else:
                print("  ℹ️  Using mock embeddings (no API calls)")
                embedding_service = MockEmbeddingService()
        except Exception as e:
            print(f"  ⚠️  Failed to initialize embeddings: {e}")
            print("  ℹ️  Continuing without semantic search")
    
    # Initialize playbook with embedding service
    playbook = Playbook(
        embedding_service=embedding_service,
        use_semantic_search=PLAYBOOK_CONFIG["use_semantic_search"]
    )
    
    # Initialize trainer with playbook and generator
    trainer = ACETrainer(
        dataset, 
        generator=generator,
        playbook=playbook,
        embedding_service=embedding_service
    )
    
    print("  ✓ Generator initialized")
    print("  ✓ Reflector initialized")
    print("  ✓ Curator initialized")
    print(f"  ✓ Playbook initialized (semantic search: {playbook.use_semantic_search})\n")
    
    # Step 3: Train
    print("Step 3: Training ACE offline (multi-epoch)...")
    trained_playbook = trainer.train_offline(
        train_data,
        num_epochs=args.epochs,
        target_accuracy=args.target_accuracy
    )
    
    # Step 4: Evaluate
    print("\nStep 4: Evaluating on test set...")
    test_results = trainer.evaluate(test_data)
    
    # Step 5: Display Final Playbook
    print("\nStep 5: Final Playbook Summary")
    print("="*60)
    stats = trained_playbook.get_stats()
    print(f"Total Bullets: {stats['total_bullets']}")
    print(f"\nBullets by Section:")
    for section, count in stats['by_section'].items():
        if count > 0:
            print(f"  {section}: {count}")
    
    print(f"\nAverage Helpfulness: {stats['avg_helpfulness']:.2f}")
    
    # Display some playbook content
    if stats['total_bullets'] > 0:
        print(f"\n{'='*60}")
        print("SAMPLE PLAYBOOK CONTENT")
        print(f"{'='*60}\n")
        display_bullets = trained_playbook.bullets[:min(5, len(trained_playbook.bullets))]
        print(trained_playbook.format_for_prompt(display_bullets))
    
    # Step 6: Save Results
    print("\nStep 6: Saving results...")
    results = {
        "configuration": {
            "epochs_run": len(trainer.metrics["accuracy_history"]),
            "target_accuracy": args.target_accuracy,
            "sample_size": args.sample_size,
            "test_ratio": args.test_ratio,
        },
        "test_accuracy": test_results["accuracy"],
        "playbook_stats": stats,
        "training_history": {
            "accuracy": trainer.metrics["accuracy_history"],
            "playbook_size": trainer.metrics["playbook_size_history"]
        },
        "test_results": {
            "correct": test_results["correct"],
            "total": test_results["total"],
        }
    }
    
    output_file = Path(args.output)
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_file, "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"  ✓ Results saved to {output_file}")
    
    # Save playbook
    playbook_file = output_file.parent / "playbook.json"
    playbook_data = {
        "bullets": [bullet.to_dict() for bullet in trained_playbook.bullets],
        "stats": stats,
    }
    with open(playbook_file, "w") as f:
        json.dump(playbook_data, f, indent=2)
    print(f"  ✓ Playbook saved to {playbook_file}")
    
    print(f"\n{'='*60}")
    print("PROJECT COMPLETE!")
    print(f"{'='*60}\n")
    
    return trainer, test_results


if __name__ == "__main__":
    try:
        trainer, results = main()
    except KeyboardInterrupt:
        print("\n\nTraining interrupted by user.")
        sys.exit(0)
    except Exception as e:
        print(f"\n\nError: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

