# ACE SQL Query Generator 🤖

A production-ready implementation of **ACE (Agentic Context Engineering)** for SQL query generation using natural language.

## 🎯 What is ACE?

ACE is a framework where an AI system learns from its mistakes by building a "playbook" of knowledge that improves over time. Think of it as a self-improving system that gets smarter with each iteration.

### Core Components

1. **Generator** - Creates SQL queries from natural language
2. **Reflector** - Analyzes what went wrong/right
3. **Curator** - Extracts lessons and creates updates
4. **Playbook** - Stores growing knowledge base

## 📁 Project Structure

```
ACE_Implementation_code/
├── main.py                      # Entry point - run this!
├── config.py                    # Configuration settings
├── requirements.txt             # Dependencies
├── README.md                    # This file
│
├── src/                         # Source code
│   ├── components/              # ACE components
│   │   ├── generator.py         # SQL generation
│   │   ├── reflector.py         # Error analysis
│   │   ├── curator.py           # Knowledge curation
│   │   └── playbook.py          # Knowledge storage
│   │
│   ├── models/                  # LLM interfaces
│   │   ├── base_llm.py          # Abstract base class
│   │   └── mock_llm.py          # Rule-based mock
│   │
│   ├── data/                    # Data handling
│   │   └── dataset.py           # WikiSQL dataset
│   │
│   └── training/                # Training logic
│       └── trainer.py           # ACE training loop
│
├── data/                        # Data storage
│   └── .gitkeep
│
└── results/                     # Output files
    └── .gitkeep
```

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or download the project
cd ACE_Implementation_code

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Run Training

```bash
# Basic run with default settings
python main.py

# Custom configuration
python main.py --epochs 10 --target-accuracy 80 --sample-size 10

# With verbose output
python main.py --epochs 5 --test-ratio 0.3
```

### 3. Check Results

Results are saved in the `results/` directory:
- `ace_sql_results.json` - Training metrics and accuracy
- `playbook.json` - Learned knowledge base

## ⚙️ Configuration

Edit `config.py` to customize:

```python
TRAINING_CONFIG = {
    "num_epochs": 10,           # Maximum training epochs
    "target_accuracy": 80.0,    # Early stopping threshold
    "test_ratio": 0.3,          # Test split ratio
    "sample_size": 10,          # Dataset size
}

MODEL_CONFIG = {
    "use_mock_llm": True,       # Use mock or real LLM
    "llm_provider": "mock",     # "mock", "anthropic", "openai"
}
```

## 📊 Example Output

```
============================================================
ACE SQL QUERY GENERATOR - END-TO-END PROJECT
============================================================

Step 1: Loading WikiSQL dataset...
  ✓ Training examples: 7
  ✓ Test examples: 3

Step 2: Initializing ACE components...
  ✓ Generator initialized
  ✓ Reflector initialized
  ✓ Curator initialized
  ✓ Playbook initialized

Step 3: Training ACE offline (multi-epoch)...
============================================================
ACE OFFLINE TRAINING - Max 10 epochs on 7 examples
Target Accuracy: 80.0%
============================================================

EPOCH 1/10
============================================================
  [+] Added to aggregation_functions: When question asks for...
  Progress: 1/7 | Accuracy: 14.3% | Playbook size: 1
  
...

FINAL TEST ACCURACY: 33.3% (1/3)
============================================================
```

## 🔌 Adding Real LLM Support

### For Claude (Anthropic)

1. Create `src/models/anthropic_llm.py`:

```python
from anthropic import Anthropic
from src.models.base_llm import BaseLLM

class AnthropicLLM(BaseLLM):
    def __init__(self, api_key: str):
        self.client = Anthropic(api_key=api_key)
    
    def generate_sql(self, question, schema, playbook, relevant_bullets):
        prompt = self._build_prompt(question, schema, playbook, relevant_bullets)
        
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return response.content[0].text.strip()
```

2. Set your API key:

```bash
export ANTHROPIC_API_KEY="your-key-here"
```

3. Update `main.py` to use it:

```python
from src.models.anthropic_llm import AnthropicLLM

if args.use_real_llm:
    llm = AnthropicLLM(api_key=API_KEYS["anthropic"])
    generator = Generator(llm=llm, use_mock_llm=False)
```

4. Run with real LLM:

```bash
python main.py --use-real-llm
```

## 🧪 Understanding the Code

### How Training Works

```
For each training example:
  1. Generator tries to create SQL
  2. Compare with correct SQL
  3. Reflector analyzes mistakes
  4. Curator extracts lessons
  5. Update playbook with new knowledge
  
Playbook grows → Future queries get better!
```

### Key Classes

**Playbook** (`src/components/playbook.py`)
- Stores learned insights as "bullets"
- Organized by section (patterns, mistakes, etc.)
- Retrieves relevant knowledge for new queries

**Generator** (`src/components/generator.py`)
- Takes question + schema → SQL query
- Uses playbook knowledge to improve
- Supports mock LLM or real LLM

**Reflector** (`src/components/reflector.py`)
- Compares generated vs correct SQL
- Identifies specific errors
- Extracts key insights

**Curator** (`src/components/curator.py`)
- Decides what to add to playbook
- Avoids duplicates
- Categorizes insights

## 📈 Extending the Project

### Add More Data

```python
# In src/data/dataset.py
def load_from_file(self, filepath: str):
    # Load your custom SQL dataset
    pass
```

### Add New LLM Provider

```python
# Create src/models/your_llm.py
from src.models.base_llm import BaseLLM

class YourLLM(BaseLLM):
    def generate_sql(self, question, schema, playbook, relevant_bullets):
        # Your implementation
        pass
```

### Improve Reflection Logic

Edit `src/components/reflector.py` to add more sophisticated error analysis.

### Add Embeddings for Better Retrieval

Replace keyword matching in `playbook.py` with vector similarity:

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
# Use embeddings for better bullet retrieval
```

## 🐛 Troubleshooting

**Import errors?**
```bash
# Make sure you're in the project directory
cd ACE_Implementation_code
python main.py
```

**No module named 'src'?**
```bash
# Run from project root, not from src/
cd ..
python main.py
```

**API key not working?**
```bash
# Check environment variable
echo $ANTHROPIC_API_KEY

# Or add to .env file
echo "ANTHROPIC_API_KEY=your-key" > .env
```

## 📝 Command Line Options

```bash
python main.py --help

Options:
  --epochs N              Maximum training epochs (default: 10)
  --target-accuracy N     Early stopping accuracy (default: 80.0)
  --sample-size N         Dataset sample size (default: 10)
  --test-ratio N          Test split ratio (default: 0.3)
  --use-real-llm          Use real LLM instead of mock
  --output PATH           Output file path
```

## 🎓 Learn More

- **ACE Paper**: [Agentic Context Engineering](https://arxiv.org/abs/your-paper)
- **WikiSQL Dataset**: [GitHub](https://github.com/salesforce/WikiSQL)

## 📄 License

See LICENSE file in the parent directory.

## 🤝 Contributing

This is a presentation/demo project. Feel free to fork and extend!

---

**Built with ❤️ for demonstrating ACE framework**

