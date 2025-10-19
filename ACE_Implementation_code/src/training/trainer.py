"""
ACE Trainer - Main training loop for ACE
"""

import random
from typing import List, Dict
from src.components.playbook import Playbook
from src.components.generator import Generator
from src.components.reflector import Reflector
from src.components.curator import Curator
from src.data.dataset import WikiSQLDataset


class ACETrainer:
    """Main training loop for ACE"""
    
    def __init__(self, dataset: WikiSQLDataset, generator: Generator = None):
        """
        Initialize ACE trainer
        
        Args:
            dataset: Dataset to train on
            generator: Custom generator (optional)
        """
        self.dataset = dataset
        self.playbook = Playbook()
        self.generator = generator if generator else Generator(use_mock_llm=True)
        self.reflector = Reflector()
        self.curator = Curator()
        
        self.metrics = {
            "accuracy_history": [],
            "playbook_size_history": [],
            "epoch_results": []
        }
    
    def train_offline(self, train_data: List[Dict], num_epochs: int = 10, 
                      target_accuracy: float = 80.0) -> Playbook:
        """
        Offline training: Multiple epochs over training data
        
        Args:
            train_data: List of training examples
            num_epochs: Maximum number of training epochs
            target_accuracy: Stop training if accuracy exceeds this threshold
        
        Returns:
            Trained playbook
        """
        print(f"=" * 60)
        print(f"ACE OFFLINE TRAINING - Max {num_epochs} epochs on {len(train_data)} examples")
        print(f"Target Accuracy: {target_accuracy}%")
        print(f"=" * 60)
        
        for epoch in range(num_epochs):
            print(f"\n{'='*60}")
            print(f"EPOCH {epoch + 1}/{num_epochs}")
            print(f"{'='*60}")
            
            correct = 0
            total = len(train_data)
            
            # Shuffle data each epoch
            random.shuffle(train_data)
            
            for idx, example in enumerate(train_data):
                # Generate SQL
                generated_sql, used_bullets = self.generator.generate_sql(
                    example["question"],
                    example["schema"],
                    self.playbook
                )
                
                # Check if correct
                correct_sql = example["sql"]
                is_correct = generated_sql.strip().lower() == correct_sql.strip().lower()
                
                if is_correct:
                    correct += 1
                
                # Reflect on the attempt
                reflection = self.reflector.analyze(
                    example["question"],
                    generated_sql,
                    correct_sql,
                    is_correct
                )
                
                # Generate playbook updates
                updates = self.curator.generate_updates(reflection, self.playbook)
                
                # Debug: Show what's happening
                if not is_correct:
                    error_id = reflection.get("error_identification", "Unknown")
                    key_insight = reflection.get("key_insight", "")
                    print(f"    [Q: {example['question'][:40]}...]")
                    print(f"    [Gen: {generated_sql[:60].replace(chr(10), ' ')}...]")
                    print(f"    [Exp: {correct_sql[:60]}...]")
                    print(f"    [Reflection: {error_id[:50]}...]")
                    if key_insight and "semantically correct" not in key_insight:
                        print(f"    [Insight: {key_insight[:80]}...]")
                    if not updates:
                        print(f"    [No updates - insight skipped or duplicate]")
                
                # Apply updates
                for update in updates:
                    if update["type"] == "ADD":
                        self.playbook.add_bullet(update["section"], update["content"])
                        print(f"  [+] Added to {update['section']}: {update['content'][:80]}...")
                
                # Progress
                if (idx + 1) % 5 == 0 or idx == 0:
                    accuracy = correct / (idx + 1) * 100
                    print(f"  Progress: {idx + 1}/{total} | Accuracy: {accuracy:.1f}% | Playbook size: {len(self.playbook.bullets)}")
            
            # Epoch summary
            epoch_accuracy = correct / total * 100
            self.metrics["accuracy_history"].append(epoch_accuracy)
            self.metrics["playbook_size_history"].append(len(self.playbook.bullets))
            
            print(f"\n  EPOCH {epoch + 1} SUMMARY:")
            print(f"    Accuracy: {epoch_accuracy:.1f}% ({correct}/{total})")
            print(f"    Playbook size: {len(self.playbook.bullets)} bullets")
            print(f"    By section: {self.playbook.get_stats()['by_section']}")
            
            # Early stopping if target accuracy reached
            if epoch_accuracy > target_accuracy:
                print(f"\n{'='*60}")
                print(f"🎯 TARGET ACCURACY REACHED: {epoch_accuracy:.1f}% > {target_accuracy}%")
                print(f"Stopping training early at epoch {epoch + 1}")
                print(f"{'='*60}")
                break
        
        return self.playbook
    
    def evaluate(self, test_data: List[Dict]) -> Dict:
        """
        Evaluate on test data
        
        Returns:
            Dictionary with evaluation metrics
        """
        print(f"\n{'='*60}")
        print(f"EVALUATION ON {len(test_data)} TEST EXAMPLES")
        print(f"{'='*60}\n")
        
        correct = 0
        total = len(test_data)
        results = []
        
        for idx, example in enumerate(test_data):
            generated_sql, _ = self.generator.generate_sql(
                example["question"],
                example["schema"],
                self.playbook
            )
            
            correct_sql = example["sql"]
            is_correct = generated_sql.strip().lower() == correct_sql.strip().lower()
            
            if is_correct:
                correct += 1
            
            results.append({
                "question": example["question"],
                "generated": generated_sql,
                "correct": correct_sql,
                "is_correct": is_correct
            })
            
            # Print some examples
            if idx < 3:
                print(f"Example {idx + 1}:")
                print(f"  Question: {example['question']}")
                print(f"  Generated: {generated_sql}")
                print(f"  Correct: {correct_sql}")
                print(f"  Result: {'✓ CORRECT' if is_correct else '✗ WRONG'}\n")
        
        accuracy = correct / total * 100
        
        print(f"{'='*60}")
        print(f"FINAL TEST ACCURACY: {accuracy:.1f}% ({correct}/{total})")
        print(f"{'='*60}\n")
        
        return {
            "accuracy": accuracy,
            "correct": correct,
            "total": total,
            "results": results
        }

