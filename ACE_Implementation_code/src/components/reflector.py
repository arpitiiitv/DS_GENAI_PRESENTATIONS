"""
Reflector - Analyzes what went wrong/right and extracts lessons
"""

from typing import Dict


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
        
        # Normalize SQL for comparison (remove whitespace, newlines, case)
        def normalize_sql(sql: str) -> str:
            """Normalize SQL for comparison - preserves structure"""
            import re
            # Remove extra whitespace and newlines, but keep single spaces
            sql = re.sub(r'\s+', ' ', sql.strip())
            # Remove aliases (AS xxx) but keep the rest
            sql = re.sub(r'\s+AS\s+\w+', '', sql, flags=re.IGNORECASE)
            return sql.lower()
        
        def are_semantically_equal(gen_sql: str, correct_sql: str) -> bool:
            """Check if SQLs are semantically equivalent"""
            import re
            
            # Normalize both
            gen_norm = normalize_sql(gen_sql)
            correct_norm = normalize_sql(correct_sql)
            
            # Exact match after normalization
            if gen_norm == correct_norm:
                return True
            
            # Check if only difference is whitespace/newlines
            gen_compact = re.sub(r'\s+', '', gen_norm)
            correct_compact = re.sub(r'\s+', '', correct_norm)
            
            if gen_compact == correct_compact:
                return True
            
            return False
        
        gen_normalized = normalize_sql(generated_sql)
        correct_normalized = normalize_sql(correct_sql)
        
        # Check for EXACT match (strict comparison)
        if execution_success and generated_sql.strip() == correct_sql.strip():
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
            reflection["key_insight"] = f"""COUNT Aggregation Pattern:
LOGIC: When question contains 'how many', 'count', 'number of' → use COUNT(*)
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing COUNT(*) aggregation for counting query
EXAMPLE: "How many orders?" → SELECT COUNT(*) FROM orders
TIP: COUNT(*) counts all rows, use it for total counts"""
        
        elif "count(*)" in correct_lower and "count(*)" not in gen_lower and "count(" in gen_lower:
            reflection["error_identification"] = "Used COUNT(column) instead of COUNT(*)"
            reflection["root_cause"] = "Training data uses COUNT(*) not COUNT(specific_column)"
            reflection["correct_approach"] = f"Use COUNT(*) to match training: {correct_sql}"
            reflection["key_insight"] = f"""COUNT(*) vs COUNT(column):
LOGIC: Always use COUNT(*) to count rows, not COUNT(column_name)
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Used COUNT(column) instead of COUNT(*)
WHY: COUNT(*) is standard SQL convention for counting all rows
REMEMBER: Training data format uses COUNT(*) exclusively"""
        
        elif "sum(" in correct_lower and "sum" not in gen_lower:
            reflection["error_identification"] = "Failed to use SUM aggregation"
            reflection["root_cause"] = "Did not recognize summation pattern"
            reflection["correct_approach"] = "Use SUM(column) for 'total' or 'sum' questions"
            reflection["key_insight"] = f"""SUM Aggregation for Totals:
LOGIC: When question asks 'total', 'sum', 'overall amount' → use SUM(column)
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing SUM() aggregation
EXAMPLE: "What is total revenue?" → SELECT SUM(revenue) FROM sales
NOTE: SUM requires numeric column as parameter"""
        
        elif "where" in correct_lower and "where" not in gen_lower:
            reflection["error_identification"] = "Missing WHERE clause for filtering"
            reflection["root_cause"] = "Did not identify filtering condition"
            reflection["correct_approach"] = f"Add WHERE clause: {correct_sql}"
            reflection["key_insight"] = f"""WHERE Clause for Filtering:
LOGIC: When question has conditions like 'greater than', 'equal to', 'from X' → add WHERE
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing WHERE clause to filter results
PATTERN: SELECT ... FROM table WHERE condition
EXAMPLE: "employees with salary > 50000" → WHERE salary > 50000"""
        
        elif "group by" in correct_lower and "group by" not in gen_lower:
            reflection["error_identification"] = "Missing GROUP BY clause"
            reflection["root_cause"] = "Did not recognize aggregation by category"
            reflection["correct_approach"] = "Use GROUP BY when aggregating by category"
            reflection["key_insight"] = f"""GROUP BY for Aggregation by Category:
LOGIC: When question asks 'by department', 'per category', 'for each' → use GROUP BY
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing GROUP BY clause
PATTERN: SELECT category, AGG_FUNC() FROM table GROUP BY category
EXAMPLE: "Count orders by customer" → GROUP BY customer
RULE: Column in SELECT (non-aggregated) must be in GROUP BY"""
        
        elif "avg(" in correct_lower and "avg" not in gen_lower:
            reflection["error_identification"] = "Failed to use AVG aggregation"
            reflection["root_cause"] = "Did not recognize average calculation"
            reflection["correct_approach"] = "Use AVG(column) for average questions"
            reflection["key_insight"] = f"""AVG Aggregation for Averages:
LOGIC: When question contains 'average', 'mean', 'avg' → use AVG(column)
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing AVG() function
EXAMPLE: "Find average price" → SELECT AVG(price) FROM products
NOTE: AVG calculates mean value of numeric column"""
        
        elif "order by" in correct_lower and "order by" not in gen_lower:
            reflection["error_identification"] = "Missing ORDER BY clause"
            reflection["root_cause"] = "Did not recognize sorting requirement"
            reflection["correct_approach"] = "Use ORDER BY for 'most recent', 'highest', 'lowest' queries"
            reflection["key_insight"] = f"""ORDER BY for Sorting Results:
LOGIC: When question asks 'highest', 'lowest', 'most recent', 'top', 'bottom' → use ORDER BY
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing ORDER BY clause
PATTERN: SELECT ... FROM table ORDER BY column DESC/ASC
EXAMPLE: "Top 5 salaries" → ORDER BY salary DESC
DESC = descending (high to low), ASC = ascending (low to high)"""
        
        elif "limit" in correct_lower and "limit" not in gen_lower:
            reflection["error_identification"] = "Missing LIMIT clause"
            reflection["root_cause"] = "Did not recognize result limiting"
            reflection["correct_approach"] = "Use LIMIT to restrict number of results"
            reflection["key_insight"] = f"""LIMIT for Restricting Result Count:
LOGIC: When question specifies 'top N', 'first N', 'N most' → use LIMIT N
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing LIMIT clause
PATTERN: SELECT ... FROM table ORDER BY col DESC LIMIT N
EXAMPLE: "Top 3 orders" → ORDER BY amount DESC LIMIT 3
NOTE: LIMIT comes at the end, usually after ORDER BY"""
        
        # Check if just formatting differences (has all components but different style)
        elif all(keyword in gen_normalized for keyword in ["select", "from"]):
            # Check for alias differences FIRST (most specific)
            # Check on ORIGINAL strings, not normalized (since normalize removes aliases)
            has_alias_in_gen = ' as ' in gen_lower or ' AS ' in generated_sql
            has_alias_in_correct = ' as ' in correct_lower or ' AS ' in correct_sql
            
            if has_alias_in_gen and not has_alias_in_correct:
                reflection["error_identification"] = "Added unnecessary aliases"
                reflection["root_cause"] = "Training data does not use aliases"
                reflection["correct_approach"] = f"Remove aliases to match: {correct_sql}"
                reflection["key_insight"] = f"""Column Aliases (AS keyword):
LOGIC: Do NOT add aliases unless training data explicitly shows them
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Added unnecessary column aliases with AS keyword
EXAMPLE WRONG: SELECT name AS employee_name FROM employees
EXAMPLE RIGHT: SELECT name FROM employees
RULE: Match training data format exactly - no AS unless shown"""
                return reflection
            elif not has_alias_in_gen and has_alias_in_correct:
                reflection["error_identification"] = "Missing aliases"
                reflection["root_cause"] = "Training data requires aliases"
                reflection["correct_approach"] = f"Add aliases to match: {correct_sql}"
                reflection["key_insight"] = f"""Column Aliases Required:
LOGIC: Add aliases when training data explicitly uses them
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Missing AS keyword for column aliases
PATTERN: SELECT column AS alias_name FROM table
REMEMBER: Include aliases exactly as shown in training examples"""
                return reflection
            
            # Extract key components to give specific feedback
            missing_components = []
            column_mismatch = False
            
            # Check for missing clauses
            if "where" in correct_normalized and "where" not in gen_normalized:
                missing_components.append("WHERE clause")
            if "group by" in correct_normalized and "group" not in gen_normalized:
                missing_components.append("GROUP BY")
            if "order by" in correct_normalized and "order" not in gen_normalized:
                missing_components.append("ORDER BY")
            
            # Check for column selection differences (SELECT * vs SELECT col1, col2)
            import re
            gen_select = re.search(r'select\s+(.+?)\s+from', gen_normalized)
            correct_select = re.search(r'select\s+(.+?)\s+from', correct_normalized)
            
            if gen_select and correct_select:
                gen_cols = gen_select.group(1).strip()
                correct_cols = correct_select.group(1).strip()
                
                # If one uses * and other uses specific columns, that's an issue
                if (gen_cols == '*' and correct_cols != '*') or (gen_cols != '*' and correct_cols == '*'):
                    column_mismatch = True
            
            if column_mismatch:
                reflection["error_identification"] = "Column selection mismatch"
                reflection["root_cause"] = "Using SELECT * instead of specific columns or vice versa"
                reflection["correct_approach"] = f"Match exact format: {correct_sql}"
                reflection["key_insight"] = f"""Column Selection Mismatch (SELECT * vs specific columns):
LOGIC: Match EXACT columns from training data - either SELECT * or SELECT col1, col2
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Using wrong column selection pattern
RULE 1: Use SELECT * when question says 'all', 'everything', 'show table'
RULE 2: Use SELECT col1, col2 when question specifies particular fields
EXAMPLE: "Show all employees" → SELECT * FROM employees
EXAMPLE: "Get names and salaries" → SELECT name, salary FROM employees"""
            elif missing_components:
                reflection["error_identification"] = f"Missing: {', '.join(missing_components)}"
                reflection["root_cause"] = "Query structure incomplete"
                reflection["correct_approach"] = f"Add {', '.join(missing_components)} to the query"
                reflection["key_insight"] = f"""Missing Query Components: {', '.join(missing_components)}
LOGIC: Query structure requires {', '.join(missing_components)}
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Incomplete SQL - missing {', '.join(missing_components)}
STRUCTURE: SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY ... LIMIT ...
NOTE: Include all clauses that appear in training data for similar queries"""
            else:
                # Other formatting differences (whitespace, newlines, etc.)
                reflection["error_identification"] = "Formatting mismatch"
                reflection["root_cause"] = "Query format differs from training data"
                reflection["correct_approach"] = f"Match exact format: {correct_sql}"
                reflection["key_insight"] = f"""SQL Formatting and Style:
LOGIC: Match EXACT formatting style from training data (whitespace, spacing, operators)
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Formatting differences (spaces around operators, line breaks, etc.)
FORMAT RULES:
- Single-line SQL with single spaces between clauses
- Space around operators: salary > 50000 not salary>50000
- Space after commas: col1, col2 not col1,col2
- Consistent quote style: 'value' throughout"""
        
        else:
            reflection["error_identification"] = "Generated SQL structure significantly differs"
            reflection["root_cause"] = "Major query structure mismatch"
            reflection["correct_approach"] = f"Expected pattern: {correct_sql}"
            reflection["key_insight"] = f"""Major SQL Structure Error:
LOGIC: Review SQL fundamentals and query structure
CORRECT: {correct_sql}
WRONG: {generated_sql}
ERROR: Significant structural difference from expected query
BASIC PATTERN: SELECT columns FROM table [WHERE conditions] [GROUP BY cols] [ORDER BY cols]
STEPS: 1) Identify what to SELECT, 2) Which table (FROM), 3) Filters (WHERE), 4) Grouping, 5) Sorting
REVIEW: SQL clause order and syntax"""
        
        return reflection

