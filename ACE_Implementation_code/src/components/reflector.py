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
            reflection["key_insight"] = "When question asks 'how many' or 'count', use COUNT(*) aggregation"
        
        elif "count(*)" in correct_lower and "count(*)" not in gen_lower and "count(" in gen_lower:
            reflection["error_identification"] = "Used COUNT(column) instead of COUNT(*)"
            reflection["root_cause"] = "Training data uses COUNT(*) not COUNT(specific_column)"
            reflection["correct_approach"] = f"Use COUNT(*) to match training: {correct_sql}"
            reflection["key_insight"] = "Always use COUNT(*) instead of COUNT(column_name) - match training data format"
        
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
        
        elif "order by" in correct_lower and "order by" not in gen_lower:
            reflection["error_identification"] = "Missing ORDER BY clause"
            reflection["root_cause"] = "Did not recognize sorting requirement"
            reflection["correct_approach"] = "Use ORDER BY for 'most recent', 'highest', 'lowest' queries"
            reflection["key_insight"] = "When question asks for 'most recent', 'highest', or 'lowest', use ORDER BY with DESC/ASC"
        
        elif "limit" in correct_lower and "limit" not in gen_lower:
            reflection["error_identification"] = "Missing LIMIT clause"
            reflection["root_cause"] = "Did not recognize result limiting"
            reflection["correct_approach"] = "Use LIMIT to restrict number of results"
            reflection["key_insight"] = "When question asks for 'top N' or 'most recent', use LIMIT N"
        
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
                reflection["key_insight"] = "Do not add column aliases (AS keyword) - match training data format exactly"
                return reflection
            elif not has_alias_in_gen and has_alias_in_correct:
                reflection["error_identification"] = "Missing aliases"
                reflection["root_cause"] = "Training data requires aliases"
                reflection["correct_approach"] = f"Add aliases to match: {correct_sql}"
                reflection["key_insight"] = "Include column aliases (AS keyword) as shown in training data"
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
                reflection["key_insight"] = "Match training data exactly - use same column selection as expected"
            elif missing_components:
                reflection["error_identification"] = f"Missing: {', '.join(missing_components)}"
                reflection["root_cause"] = "Query structure incomplete"
                reflection["correct_approach"] = f"Add {', '.join(missing_components)} to the query"
                reflection["key_insight"] = f"Remember to include {', '.join(missing_components)} when building complex queries"
            else:
                # Other formatting differences (whitespace, newlines, etc.)
                reflection["error_identification"] = "Formatting mismatch"
                reflection["root_cause"] = "Query format differs from training data"
                reflection["correct_approach"] = f"Match exact format: {correct_sql}"
                reflection["key_insight"] = "Use single-line SQL format without extra whitespace or newlines - match training data exactly"
        
        else:
            reflection["error_identification"] = "Generated SQL structure significantly differs"
            reflection["root_cause"] = "Major query structure mismatch"
            reflection["correct_approach"] = f"Expected pattern: {correct_sql}"
            reflection["key_insight"] = "Review SQL fundamentals: SELECT columns FROM table WHERE conditions"
        
        return reflection

