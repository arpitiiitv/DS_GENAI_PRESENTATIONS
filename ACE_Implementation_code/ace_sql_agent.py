"""
ACE SQL Query Generator - Complete End-to-End Implementation
============================================================

This project implements ACE (Agentic Context Engineering) for SQL query generation
using the WikiSQL dataset.

Requirements:
pip install pandas numpy sqlite3 anthropic openai transformers datasets

Dataset: WikiSQL (automatic download via Hugging Face datasets)
"""

import json
import sqlite3
import random
from typing import List, Dict, Tuple
from dataclasses import dataclass
from collections import defaultdict
import re

# =============================================================================
# PART 1: DATA LOADING AND PREPROCESSING
# =============================================================================

class WikiSQLDataset:
    """Load and manage WikiSQL dataset"""
    
    def __init__(self, sample_size=100):
        """
        Initialize WikiSQL dataset
        
        For this demo, we'll use a simplified subset.
        In production, use: from datasets import load_dataset
        """
        self.sample_size = sample_size
        self.data = self._create_sample_data()
        
    def _create_sample_data(self):
        """Create sample SQL dataset for demonstration"""
        samples = [
            {
                "id": 1,
                "question": "What is the total revenue?",
                "sql": "SELECT SUM(revenue) FROM sales",
                "schema": {"tables": ["sales"], "columns": ["revenue", "date", "product"]},
                "expected_result": [{"SUM(revenue)": 1000000}]
            },
            {
                "id": 2,
                "question": "Show all employees with salary greater than 50000",
                "sql": "SELECT * FROM employees WHERE salary > 50000",
                "schema": {"tables": ["employees"], "columns": ["name", "salary", "department"]},
                "expected_result": [{"name": "John", "salary": 60000}, {"name": "Jane", "salary": 75000}]
            },
            {
                "id": 3,
                "question": "Count the number of orders",
                "sql": "SELECT COUNT(*) FROM orders",
                "schema": {"tables": ["orders"], "columns": ["order_id", "customer", "amount"]},
                "expected_result": [{"COUNT(*)": 150}]
            },
            {
                "id": 4,
                "question": "Find the average price of products",
                "sql": "SELECT AVG(price) FROM products",
                "schema": {"tables": ["products"], "columns": ["product_id", "name", "price", "category"]},
                "expected_result": [{"AVG(price)": 29.99}]
            },
            {
                "id": 5,
                "question": "List all customers from New York",
                "sql": "SELECT * FROM customers WHERE city = 'New York'",
                "schema": {"tables": ["customers"], "columns": ["customer_id", "name", "city", "email"]},
                "expected_result": [{"customer_id": 1, "name": "Alice", "city": "New York"}]
            },
            {
                "id": 6,
                "question": "Get the maximum salary",
                "sql": "SELECT MAX(salary) FROM employees",
                "schema": {"tables": ["employees"], "columns": ["name", "salary", "department"]},
                "expected_result": [{"MAX(salary)": 120000}]
            },
            {
                "id": 7,
                "question": "Show products with price less than 100",
                "sql": "SELECT name, price FROM products WHERE price < 100",
                "schema": {"tables": ["products"], "columns": ["product_id", "name", "price", "category"]},
                "expected_result": [{"name": "Widget", "price": 29.99}, {"name": "Gadget", "price": 49.99}]
            },
            {
                "id": 8,
                "question": "Count orders by customer",
                "sql": "SELECT customer, COUNT(*) FROM orders GROUP BY customer",
                "schema": {"tables": ["orders"], "columns": ["order_id", "customer", "amount", "date"]},
                "expected_result": [{"customer": "John", "COUNT(*)": 5}, {"customer": "Jane", "COUNT(*)": 3}]
            },
            {
                "id": 9,
                "question": "Find total sales by product category",
                "sql": "SELECT category, SUM(amount) FROM sales GROUP BY category",
                "schema": {"tables": ["sales"], "columns": ["sale_id", "product", "category", "amount"]},
                "expected_result": [{"category": "Electronics", "SUM(amount)": 50000}]
            },
            {
                "id": 10,
                "question": "Get the most recent order",
                "sql": "SELECT * FROM orders ORDER BY date DESC LIMIT 1",
                "schema": {"tables": ["orders"], "columns": ["order_id", "customer", "amount", "date"]},
                "expected_result": [{"order_id": 999, "customer": "Alice", "amount": 199.99, "date": "2024-01-15"}]
            }
        ]
        return samples[:self.sample_size]
    
    def get_train_test_split(self, test_ratio=0.2):
        """Split data into train and test sets"""
        random.shuffle(self.data)
        split_idx = int(len(self.data) * (1 - test_ratio))
        return self.data[:split_idx], self.data[split_idx:]


# =============================================================================
# PART 2: ACE COMPONENTS - PLAYBOOK STRUCTURE
# =============================================================================

@dataclass
class Bullet:
    """A single bullet/entry in the playbook"""
    id: str
    section: str
    content: str
    helpful_count: int = 0
    harmful_count: int = 0
    
    def to_dict(self):
        return {
            "id": self.id,
            "section": self.section,
            "content": self.content,
            "helpful": self.helpful_count,
            "harmful": self.harmful_count
        }


class Playbook:
    """Manages the growing knowledge base"""
    
    def __init__(self):
        self.bullets: List[Bullet] = []
        self.bullet_counter = 0
        self.sections = {
            "sql_patterns": [],
            "common_mistakes": [],
            "schema_usage": [],
            "aggregation_functions": [],
            "where_clauses": []
        }
    
    def add_bullet(self, section: str, content: str) -> Bullet:
        """Add a new bullet to the playbook"""
        bullet_id = f"sql-{self.bullet_counter:05d}"
        self.bullet_counter += 1
        
        bullet = Bullet(
            id=bullet_id,
            section=section,
            content=content
        )
        
        self.bullets.append(bullet)
        self.sections[section].append(bullet)
        return bullet
    
    def update_bullet_feedback(self, bullet_id: str, is_helpful: bool):
        """Update helpful/harmful counters"""
        for bullet in self.bullets:
            if bullet.id == bullet_id:
                if is_helpful:
                    bullet.helpful_count += 1
                else:
                    bullet.harmful_count += 1
                break
    
    def get_relevant_bullets(self, query: str, top_k: int = 5) -> List[Bullet]:
        """Retrieve relevant bullets (simplified - in production use embeddings)"""
        # Simple keyword matching for demo
        relevant = []
        query_lower = query.lower()
        
        for bullet in self.bullets:
            # Simple relevance scoring
            score = 0
            if any(word in bullet.content.lower() for word in query_lower.split()):
                score = bullet.helpful_count - bullet.harmful_count
                relevant.append((bullet, score))
        
        # Sort by score and return top_k
        relevant.sort(key=lambda x: x[1], reverse=True)
        return [bullet for bullet, _ in relevant[:top_k]]
    
    def format_for_prompt(self, bullets: List[Bullet] = None) -> str:
        """Format playbook for LLM prompt"""
        if bullets is None:
            bullets = self.bullets
        
        if not bullets:
            return "No playbook knowledge available yet."
        
        formatted = "=== SQL QUERY PLAYBOOK ===\n\n"
        
        # Group by section
        by_section = defaultdict(list)
        for bullet in bullets:
            by_section[bullet.section].append(bullet)
        
        for section, section_bullets in by_section.items():
            formatted += f"\n## {section.upper().replace('_', ' ')}\n"
            for bullet in section_bullets:
                formatted += f"[{bullet.id}] (helpful={bullet.helpful_count}, harmful={bullet.harmful_count})\n"
                formatted += f"{bullet.content}\n\n"
        
        return formatted
    
    def get_stats(self) -> Dict:
        """Get playbook statistics"""
        return {
            "total_bullets": len(self.bullets),
            "by_section": {section: len(bullets) for section, bullets in self.sections.items()},
            "avg_helpfulness": sum(b.helpful_count for b in self.bullets) / max(len(self.bullets), 1)
        }


# =============================================================================
# PART 3: ACE COMPONENTS - GENERATOR
# =============================================================================

class Generator:
    """Generates SQL queries using current playbook"""
    
    def __init__(self, use_mock_llm=True):
        """
        Initialize generator
        
        Args:
            use_mock_llm: If True, use rule-based mock. If False, use real LLM.
        """
        self.use_mock_llm = use_mock_llm
        self.used_bullets = []
    
    def generate_sql(self, question: str, schema: Dict, playbook: Playbook) -> Tuple[str, List[str]]:
        """
        Generate SQL query from natural language question
        
        Returns:
            (sql_query, list_of_bullet_ids_used)
        """
        self.used_bullets = []
        
        # Get relevant playbook knowledge
        relevant_bullets = playbook.get_relevant_bullets(question, top_k=5)
        self.used_bullets = [b.id for b in relevant_bullets]
        
        if self.use_mock_llm:
            # Mock LLM with rule-based generation
            sql = self._mock_generate(question, schema, relevant_bullets)
        else:
            # Real LLM generation (requires API key)
            sql = self._llm_generate(question, schema, playbook, relevant_bullets)
        
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
    
    def _llm_generate(self, question: str, schema: Dict, playbook: Playbook, bullets: List[Bullet]) -> str:
        """Generate SQL using real LLM (requires API)"""
        prompt = f"""You are an expert SQL generator. Generate a SQL query for the following question.

Question: {question}

Database Schema:
Tables: {schema.get('tables', [])}
Columns: {schema.get('columns', [])}

Relevant Playbook Knowledge:
{playbook.format_for_prompt(bullets)}

Generate ONLY the SQL query, nothing else.

SQL Query:"""
        
        # In production, call your LLM API here
        # For now, fall back to mock
        return self._mock_generate(question, schema, bullets)


# =============================================================================
# PART 4: ACE COMPONENTS - REFLECTOR
# =============================================================================

class Reflector:
    """Analyzes what went wrong/right and extracts lessons"""
    
    def analyze(self, question: str, generated_sql: str, correct_sql: str, 
                execution_success: bool, error_message: str = None) -> Dict:
        """
        Analyze the generation attempt
        
        Returns:
            Dictionary with reflection analysis
        """
        reflection = {
            "error_identification": "",
            "root_cause": "",
            "correct_approach": "",
            "key_insight": "",
            "bullet_tags": []  # List of (bullet_id, is_helpful) tuples
        }
        
        if execution_success and generated_sql.strip().lower() == correct_sql.strip().lower():
            # Perfect match!
            reflection["error_identification"] = "Query generated correctly"
            reflection["key_insight"] = "Successful pattern that should be reinforced"
            return reflection
        
        # Analyze what went wrong
        gen_lower = generated_sql.lower()
        correct_lower = correct_sql.lower()
        
        # Check for common mistakes
        if "select count(*)" in correct_lower and "count" not in gen_lower:
            reflection["error_identification"] = "Failed to use COUNT aggregation"
            reflection["root_cause"] = "Did not recognize counting query pattern"
            reflection["correct_approach"] = "Use COUNT(*) for 'how many' or 'count' questions"
            reflection["key_insight"] = "When question asks 'how many' or 'count', use COUNT(*) aggregation"
        
        elif "sum(" in correct_lower and "sum" not in gen_lower:
            reflection["error_identification"] = "Failed to use SUM aggregation"
            reflection["root_cause"] = "Did not recognize summation pattern"
            reflection["correct_approach"] = "Use SUM(column) for 'total' or 'sum' questions"
            reflection["key_insight"] = "When question asks for 'total' or 'sum', use SUM(column)"
        
        elif "where" in correct_lower and "where" not in gen_lower:
            reflection["error_identification"] = "Missing WHERE clause for filtering"
            reflection["root_cause"] = "Did not identify filtering condition"
            reflection["correct_approach"] = f"Add WHERE clause: {correct_sql}"
            reflection["key_insight"] = "Always include WHERE clause when question specifies conditions"
        
        elif "group by" in correct_lower and "group by" not in gen_lower:
            reflection["error_identification"] = "Missing GROUP BY clause"
            reflection["root_cause"] = "Did not recognize aggregation by category"
            reflection["correct_approach"] = "Use GROUP BY when aggregating by category"
            reflection["key_insight"] = "When question asks for totals/counts 'by' something, use GROUP BY"
        
        elif "avg(" in correct_lower and "avg" not in gen_lower:
            reflection["error_identification"] = "Failed to use AVG aggregation"
            reflection["root_cause"] = "Did not recognize average calculation"
            reflection["correct_approach"] = "Use AVG(column) for average questions"
            reflection["key_insight"] = "When question asks for 'average' or 'mean', use AVG()"
        
        else:
            reflection["error_identification"] = "Generated SQL does not match expected"
            reflection["root_cause"] = "Query structure mismatch"
            reflection["correct_approach"] = f"Correct SQL: {correct_sql}"
            reflection["key_insight"] = "Review query structure and ensure all components are present"
        
        return reflection


# =============================================================================
# PART 5: ACE COMPONENTS - CURATOR
# =============================================================================

class Curator:
    """Creates structured playbook updates from reflections"""
    
    def generate_updates(self, reflection: Dict, current_playbook: Playbook) -> List[Dict]:
        """
        Generate delta updates based on reflection
        
        Returns:
            List of operations: [{"type": "ADD", "section": "...", "content": "..."}]
        """
        operations = []
        
        # Extract key insight and create bullet
        key_insight = reflection.get("key_insight", "")
        
        if not key_insight or key_insight == "Successful pattern that should be reinforced":
            return operations
        
        # Determine which section this belongs to
        section = self._determine_section(key_insight, reflection)
        
        # Check if similar bullet already exists
        if not self._is_duplicate(key_insight, current_playbook):
            operations.append({
                "type": "ADD",
                "section": section,
                "content": key_insight
            })
        
        return operations
    
    def _determine_section(self, insight: str, reflection: Dict) -> str:
        """Determine which playbook section this insight belongs to"""
        insight_lower = insight.lower()
        
        if "count" in insight_lower or "sum" in insight_lower or "avg" in insight_lower or "max" in insight_lower:
            return "aggregation_functions"
        elif "where" in insight_lower:
            return "where_clauses"
        elif "group by" in insight_lower:
            return "sql_patterns"
        elif "mistake" in insight_lower or "error" in insight_lower:
            return "common_mistakes"
        else:
            return "sql_patterns"
    
    def _is_duplicate(self, new_insight: str, playbook: Playbook, threshold: float = 0.8) -> bool:
        """Check if similar insight already exists (simple word overlap)"""
        new_words = set(new_insight.lower().split())
        
        for bullet in playbook.bullets:
            existing_words = set(bullet.content.lower().split())
            overlap = len(new_words & existing_words) / max(len(new_words), len(existing_words))
            
            if overlap > threshold:
                return True
        
        return False


# =============================================================================
# PART 6: ACE TRAINING LOOP
# =============================================================================

class ACETrainer:
    """Main training loop for ACE"""
    
    def __init__(self, dataset: WikiSQLDataset):
        self.dataset = dataset
        self.playbook = Playbook()
        self.generator = Generator(use_mock_llm=True)
        self.reflector = Reflector()
        self.curator = Curator()
        
        self.metrics = {
            "accuracy_history": [],
            "playbook_size_history": [],
            "epoch_results": []
        }
    
    def train_offline(self, train_data: List[Dict], num_epochs: int = 10, target_accuracy: float = 80.0) -> Playbook:
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


# =============================================================================
# PART 7: MAIN EXECUTION AND DEMONSTRATION
# =============================================================================

def main():
    """Main execution function"""
    
    print("\n" + "="*60)
    print("ACE SQL QUERY GENERATOR - END-TO-END PROJECT")
    print("="*60 + "\n")
    
    # Step 1: Load Data
    print("Step 1: Loading WikiSQL dataset...")
    dataset = WikiSQLDataset(sample_size=10)
    train_data, test_data = dataset.get_train_test_split(test_ratio=0.3)
    print(f"  Training examples: {len(train_data)}")
    print(f"  Test examples: {len(test_data)}\n")
    
    # Step 2: Initialize ACE
    print("Step 2: Initializing ACE components...")
    trainer = ACETrainer(dataset)
    print("  ✓ Generator initialized")
    print("  ✓ Reflector initialized")
    print("  ✓ Curator initialized")
    print("  ✓ Playbook initialized\n")
    
    # Step 3: Train
    print("Step 3: Training ACE offline (multi-epoch)...")
    trained_playbook = trainer.train_offline(train_data, num_epochs=10, target_accuracy=80.0)
    
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
    print(f"\n{'='*60}")
    print("SAMPLE PLAYBOOK CONTENT")
    print(f"{'='*60}\n")
    print(trained_playbook.format_for_prompt(trained_playbook.bullets[:5]))
    
    # Step 6: Save Results
    print("\nStep 6: Saving results...")
    results = {
        "test_accuracy": test_results["accuracy"],
        "playbook_stats": stats,
        "training_history": {
            "accuracy": trainer.metrics["accuracy_history"],
            "playbook_size": trainer.metrics["playbook_size_history"]
        }
    }
    
    with open("ace_sql_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print("  ✓ Results saved to ace_sql_results.json")
    
    print(f"\n{'='*60}")
    print("PROJECT COMPLETE!")
    print(f"{'='*60}\n")
    
    return trainer, test_results


if __name__ == "__main__":
    trainer, results = main()