"""
WikiSQL Dataset - Load and manage WikiSQL dataset
"""

import random
from typing import List, Dict, Tuple


class WikiSQLDataset:
    """Load and manage WikiSQL dataset"""
    
    def __init__(self, sample_size: int = 100):
        """
        Initialize WikiSQL dataset
        
        For this demo, we'll use a simplified subset.
        In production, use: from datasets import load_dataset
        
        Args:
            sample_size: Number of samples to use
        """
        self.sample_size = sample_size
        self.data = self._create_sample_data()
    
    def _create_sample_data(self) -> List[Dict]:
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
    
    def get_train_test_split(self, test_ratio: float = 0.2) -> Tuple[List[Dict], List[Dict]]:
        """Split data into train and test sets"""
        random.shuffle(self.data)
        split_idx = int(len(self.data) * (1 - test_ratio))
        return self.data[:split_idx], self.data[split_idx:]
    
    def load_from_file(self, filepath: str):
        """
        Load dataset from file (for future use)
        
        Args:
            filepath: Path to dataset file
        """
        # TODO: Implement loading from actual WikiSQL dataset
        raise NotImplementedError("Loading from file not yet implemented")

