"""
WikiSQL Dataset - Load and manage WikiSQL dataset
"""

import random
from typing import List, Dict, Tuple, Optional
import json


class WikiSQLDataset:
    """Load and manage WikiSQL dataset"""
    
    def __init__(self, sample_size: int = 100, use_real_data: bool = True):
        """
        Initialize WikiSQL dataset
        
        Args:
            sample_size: Number of samples to use from the dataset
            use_real_data: If True, load from HuggingFace WikiSQL. If False, use dummy data
        """
        self.sample_size = sample_size
        self.use_real_data = use_real_data
        
        if use_real_data:
            try:
                self.data = self._load_wikisql_data()
                print(f"✓ Loaded {len(self.data)} samples from WikiSQL dataset")
            except Exception as e:
                print(f"⚠ Failed to load WikiSQL: {e}")
                print(f"⚠ Falling back to dummy data")
                self.data = self._create_sample_data()
        else:
            self.data = self._create_sample_data()
    
    def _load_wikisql_data(self) -> List[Dict]:
        """
        Load real WikiSQL dataset from HuggingFace or use expanded synthetic data
        
        Returns:
            List of formatted SQL examples
        """
        # Try to load from HuggingFace first
        try:
            from datasets import load_dataset
            
            print(f"Attempting to load WikiSQL dataset from HuggingFace...")
            # Try multiple dataset sources
            dataset = None
            errors = []
            
            # Try different sources
            sources = [
                ("wikisql", {}),
                ("Salesforce/wikisql", {}),
                ("wikisql", {"download_mode": "force_redownload"}),
            ]
            
            for source_name, kwargs in sources:
                try:
                    print(f"  Trying {source_name}...")
                    dataset = load_dataset(source_name, split="train", **kwargs)
                    print(f"  ✓ Successfully loaded from {source_name}")
                    break
                except Exception as e:
                    errors.append(f"{source_name}: {str(e)[:100]}")
                    continue
            
            if dataset is None:
                raise Exception(f"All sources failed. Errors: {'; '.join(errors[:2])}")
            
            # Take only sample_size samples
            if self.sample_size < len(dataset):
                dataset = dataset.shuffle(seed=42).select(range(self.sample_size))
            
            # Transform WikiSQL format to our format
            formatted_data = []
            for idx, example in enumerate(dataset):
                try:
                    formatted_example = self._format_wikisql_example(example, idx)
                    if formatted_example:
                        formatted_data.append(formatted_example)
                except Exception as e:
                    print(f"⚠ Skipping example {idx} due to error: {e}")
                    continue
            
            return formatted_data
            
        except Exception as e:
            print(f"  ⚠ WikiSQL loading failed: {str(e)[:100]}")
            print(f"  Using expanded synthetic dataset instead...")
            return self._create_expanded_synthetic_data()
    
    def _create_expanded_synthetic_data(self) -> List[Dict]:
        """
        Create an expanded synthetic SQL dataset with diverse queries
        This provides a larger, more varied dataset than the basic sample data
        
        Returns:
            List of formatted SQL examples
        """
        import random
        
        # Large pool of diverse SQL queries
        all_queries = [
            # Basic SELECT queries
            {
                "question": "Show all employees",
                "sql": "SELECT * FROM employees",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "List all products",
                "sql": "SELECT * FROM products",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Get all customers",
                "sql": "SELECT * FROM customers",
                "schema": {"tables": ["customers"], "columns": ["id", "name", "city", "email"]},
            },
            # Aggregation queries
            {
                "question": "What is the total revenue?",
                "sql": "SELECT SUM(revenue) FROM sales",
                "schema": {"tables": ["sales"], "columns": ["id", "revenue", "date", "product"]},
            },
            {
                "question": "Count the number of orders",
                "sql": "SELECT COUNT(*) FROM orders",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "Find the average price of products",
                "sql": "SELECT AVG(price) FROM products",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Get the maximum salary",
                "sql": "SELECT MAX(salary) FROM employees",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Find the minimum price",
                "sql": "SELECT MIN(price) FROM products",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            # WHERE clause queries
            {
                "question": "Show all employees with salary greater than 50000",
                "sql": "SELECT * FROM employees WHERE salary > 50000",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "List all customers from New York",
                "sql": "SELECT * FROM customers WHERE city = 'New York'",
                "schema": {"tables": ["customers"], "columns": ["id", "name", "city", "email"]},
            },
            {
                "question": "Show products with price less than 100",
                "sql": "SELECT name, price FROM products WHERE price < 100",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Find orders placed after 2024-01-01",
                "sql": "SELECT * FROM orders WHERE date > '2024-01-01'",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            # GROUP BY queries
            {
                "question": "Count orders by customer",
                "sql": "SELECT customer, COUNT(*) FROM orders GROUP BY customer",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "Find total sales by product category",
                "sql": "SELECT category, SUM(amount) FROM sales GROUP BY category",
                "schema": {"tables": ["sales"], "columns": ["id", "product", "category", "amount"]},
            },
            {
                "question": "Show average salary by department",
                "sql": "SELECT department, AVG(salary) FROM employees GROUP BY department",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            # ORDER BY and LIMIT queries
            {
                "question": "Get the most recent order",
                "sql": "SELECT * FROM orders ORDER BY date DESC LIMIT 1",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "Show top 5 highest paid employees",
                "sql": "SELECT * FROM employees ORDER BY salary DESC LIMIT 5",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "List 10 cheapest products",
                "sql": "SELECT * FROM products ORDER BY price ASC LIMIT 10",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            # Multiple conditions
            {
                "question": "Find employees in IT department with salary over 60000",
                "sql": "SELECT * FROM employees WHERE department = 'IT' AND salary > 60000",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Show products in Electronics category under $500",
                "sql": "SELECT * FROM products WHERE category = 'Electronics' AND price < 500",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            # Specific column selections
            {
                "question": "Get employee names and salaries",
                "sql": "SELECT name, salary FROM employees",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "List product names and prices",
                "sql": "SELECT name, price FROM products",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Show customer names and cities",
                "sql": "SELECT name, city FROM customers",
                "schema": {"tables": ["customers"], "columns": ["id", "name", "city", "email"]},
            },
            # More complex aggregations
            {
                "question": "Find total revenue by date",
                "sql": "SELECT date, SUM(revenue) FROM sales GROUP BY date",
                "schema": {"tables": ["sales"], "columns": ["id", "revenue", "date", "product"]},
            },
            {
                "question": "Count products in each category",
                "sql": "SELECT category, COUNT(*) FROM products GROUP BY category",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Calculate total amount by customer",
                "sql": "SELECT customer, SUM(amount) FROM orders GROUP BY customer",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            # Additional 30 basic SQL queries
            {
                "question": "Show all orders",
                "sql": "SELECT * FROM orders",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "List all departments",
                "sql": "SELECT * FROM departments",
                "schema": {"tables": ["departments"], "columns": ["id", "name", "manager"]},
            },
            {
                "question": "Get product IDs and names",
                "sql": "SELECT id, name FROM products",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Find products priced at exactly 99.99",
                "sql": "SELECT * FROM products WHERE price = 99.99",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Show orders from customer 'John'",
                "sql": "SELECT * FROM orders WHERE customer = 'John'",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "Count total number of customers",
                "sql": "SELECT COUNT(*) FROM customers",
                "schema": {"tables": ["customers"], "columns": ["id", "name", "city", "email"]},
            },
            {
                "question": "Find employees in Sales department",
                "sql": "SELECT * FROM employees WHERE department = 'Sales'",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Get minimum product price",
                "sql": "SELECT MIN(price) FROM products",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "List customer emails",
                "sql": "SELECT email FROM customers",
                "schema": {"tables": ["customers"], "columns": ["id", "name", "city", "email"]},
            },
            {
                "question": "Show products in Books category",
                "sql": "SELECT * FROM products WHERE category = 'Books'",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Count employees per department",
                "sql": "SELECT department, COUNT(*) FROM employees GROUP BY department",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Find total sales amount",
                "sql": "SELECT SUM(amount) FROM sales",
                "schema": {"tables": ["sales"], "columns": ["id", "product", "amount", "date"]},
            },
            {
                "question": "Show orders over 1000 dollars",
                "sql": "SELECT * FROM orders WHERE amount > 1000",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "List employee names in IT",
                "sql": "SELECT name FROM employees WHERE department = 'IT'",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Get average employee salary",
                "sql": "SELECT AVG(salary) FROM employees",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Show customers from California",
                "sql": "SELECT * FROM customers WHERE city = 'California'",
                "schema": {"tables": ["customers"], "columns": ["id", "name", "city", "email"]},
            },
            {
                "question": "Find products under 50 dollars",
                "sql": "SELECT * FROM products WHERE price < 50",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Count orders by date",
                "sql": "SELECT date, COUNT(*) FROM orders GROUP BY date",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "Show top 3 highest salaries",
                "sql": "SELECT * FROM employees ORDER BY salary DESC LIMIT 3",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "List products alphabetically",
                "sql": "SELECT * FROM products ORDER BY name ASC",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Find orders in January 2024",
                "sql": "SELECT * FROM orders WHERE date >= '2024-01-01' AND date < '2024-02-01'",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "Get customer names and emails",
                "sql": "SELECT name, email FROM customers",
                "schema": {"tables": ["customers"], "columns": ["id", "name", "city", "email"]},
            },
            {
                "question": "Show employees earning 50000 or more",
                "sql": "SELECT * FROM employees WHERE salary >= 50000",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Count products per category",
                "sql": "SELECT category, COUNT(*) FROM products GROUP BY category",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Find average order amount",
                "sql": "SELECT AVG(amount) FROM orders",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "List product names and categories",
                "sql": "SELECT name, category FROM products",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
            {
                "question": "Show recent 5 orders",
                "sql": "SELECT * FROM orders ORDER BY date DESC LIMIT 5",
                "schema": {"tables": ["orders"], "columns": ["id", "customer", "amount", "date"]},
            },
            {
                "question": "Find total revenue by product",
                "sql": "SELECT product, SUM(amount) FROM sales GROUP BY product",
                "schema": {"tables": ["sales"], "columns": ["id", "product", "amount", "date"]},
            },
            {
                "question": "Get employees sorted by name",
                "sql": "SELECT * FROM employees ORDER BY name ASC",
                "schema": {"tables": ["employees"], "columns": ["id", "name", "salary", "department"]},
            },
            {
                "question": "Show products priced between 10 and 100",
                "sql": "SELECT * FROM products WHERE price >= 10 AND price <= 100",
                "schema": {"tables": ["products"], "columns": ["id", "name", "price", "category"]},
            },
        ]
        
        # Shuffle and select sample_size queries
        random.seed(42)  # For reproducibility
        random.shuffle(all_queries)
        
        selected_queries = all_queries[:min(self.sample_size, len(all_queries))]
        
        # Format with IDs and expected_result field
        formatted_data = []
        for idx, query in enumerate(selected_queries):
            formatted_data.append({
                "id": idx + 1,
                "question": query["question"],
                "sql": query["sql"],
                "schema": query["schema"],
                "expected_result": []  # Synthetic data doesn't have expected results
            })
        
        print(f"✓ Created synthetic dataset with {len(formatted_data)} examples")
        return formatted_data
    
    def _format_wikisql_example(self, example: Dict, idx: int) -> Optional[Dict]:
        """
        Convert WikiSQL example to our format
        
        WikiSQL format:
        - question: natural language question
        - sql: dict with 'sel', 'agg', 'conds' fields
        - table: dict with 'header' (column names) and 'name' (table name)
        
        Our format:
        - id: unique identifier
        - question: natural language question
        - sql: SQL query string
        - schema: dict with 'tables' and 'columns'
        - expected_result: empty list (we don't execute queries)
        """
        question = example.get("question", "")
        table = example.get("table", {})
        sql_dict = example.get("sql", {})
        
        if not question or not table or not sql_dict:
            return None
        
        # Extract schema information
        table_name = table.get("name", "table")
        columns = table.get("header", [])
        
        # Convert WikiSQL's structured SQL to SQL string
        sql_query = self._wikisql_to_sql_string(sql_dict, table_name, columns)
        
        if not sql_query:
            return None
        
        return {
            "id": idx + 1,
            "question": question,
            "sql": sql_query,
            "schema": {
                "tables": [table_name],
                "columns": columns
            },
            "expected_result": []  # WikiSQL doesn't provide expected results
        }
    
    def _wikisql_to_sql_string(self, sql_dict: Dict, table_name: str, columns: List[str]) -> str:
        """
        Convert WikiSQL's structured SQL representation to SQL string
        
        WikiSQL SQL format:
        - sel: column index to select
        - agg: aggregation operation (0=none, 1=MAX, 2=MIN, 3=COUNT, 4=SUM, 5=AVG)
        - conds: list of [column_index, operator, value] conditions
        
        Args:
            sql_dict: WikiSQL SQL dictionary
            table_name: Name of the table
            columns: List of column names
            
        Returns:
            SQL query string
        """
        try:
            # Aggregation mapping
            agg_ops = {
                0: "",           # No aggregation
                1: "MAX",
                2: "MIN", 
                3: "COUNT",
                4: "SUM",
                5: "AVG"
            }
            
            # Operator mapping
            cond_ops = {
                0: "=",
                1: ">",
                2: "<",
                3: "OP"  # Not used in basic WikiSQL
            }
            
            # Build SELECT clause
            sel_idx = sql_dict.get("sel", 0)
            agg_idx = sql_dict.get("agg", 0)
            
            if sel_idx >= len(columns):
                return ""
            
            col_name = columns[sel_idx]
            
            if agg_idx == 3:  # COUNT
                select_clause = "SELECT COUNT(*)"
            elif agg_idx > 0:
                agg_func = agg_ops[agg_idx]
                select_clause = f"SELECT {agg_func}({col_name})"
            else:
                select_clause = f"SELECT {col_name}"
            
            # Build FROM clause
            from_clause = f"FROM {table_name}"
            
            # Build WHERE clause
            conditions = sql_dict.get("conds", [])
            where_clause = ""
            
            if conditions:
                where_parts = []
                for cond in conditions:
                    if len(cond) != 3:
                        continue
                    col_idx, op_idx, value = cond
                    
                    if col_idx >= len(columns):
                        continue
                    
                    col = columns[col_idx]
                    op = cond_ops.get(op_idx, "=")
                    
                    # Format value based on type
                    if isinstance(value, str):
                        value = f"'{value}'"
                    
                    where_parts.append(f"{col} {op} {value}")
                
                if where_parts:
                    where_clause = "WHERE " + " AND ".join(where_parts)
            
            # Combine all parts
            sql_parts = [select_clause, from_clause]
            if where_clause:
                sql_parts.append(where_clause)
            
            return " ".join(sql_parts)
            
        except Exception as e:
            print(f"⚠ Error converting WikiSQL to SQL string: {e}")
            return ""
    
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

