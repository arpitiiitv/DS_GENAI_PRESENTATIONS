import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ACEPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      title: "ACE: Agentic Context Engineering",
      subtitle: "Evolving Contexts for Self-Improving Language Models",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="text-8xl mb-4">🤖📚</div>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-blue-600">Self-Improving Language Models</h2>
            <div className="bg-blue-50 p-4 rounded-lg max-w-2xl">
              <p className="text-xl text-gray-700 italic">
                "Teaching LLMs to build comprehensive playbooks that grow with experience"
              </p>
            </div>
            <p className="text-xl text-gray-600">Stanford University & SambaNova Systems</p>
            <p className="text-lg text-gray-500">Qizheng Zhang, Changran Hu, et al., 2025</p>
            <p className="text-sm text-gray-400 mt-4">arXiv:2510.04618</p>
            <p className="text-lg text-gray-600 mt-2 font-semibold">Presented by Arpit Tiwari</p>
            <p className="text-base text-gray-500 font-medium">Senior Data Scientist (GenAI)</p>
          </div>
        </div>
      )
    },

    // Slide 2: Agenda
    {
      title: "What We'll Cover Today",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">ACE Framework: End-to-End Overview</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border-2 border-blue-200 shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
                <h4 className="font-bold text-blue-700 text-xl">The WHY: Motivation & Problem</h4>
              </div>
              <ul className="text-base text-gray-600 ml-13 space-y-2">
                <li>• Context adaptation paradigm</li>
                <li>• Brevity bias explained</li>
                <li>• Context collapse crisis</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-purple-200 shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
                <h4 className="font-bold text-purple-700 text-xl">The WHAT: The ACE Solution</h4>
              </div>
              <ul className="text-base text-gray-600 ml-13 space-y-2">
                <li>• Core philosophy</li>
                <li>• Three-agent architecture</li>
                <li>• Technical innovations</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-green-200 shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
                <h4 className="font-bold text-green-700 text-xl">The HOW: How It Works</h4>
              </div>
              <ul className="text-base text-gray-600 ml-13 space-y-2">
                <li>• Complete workflow</li>
                <li>• Delta updates mechanism</li>
                <li>• Real examples & code</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-orange-200 shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</div>
                <h4 className="font-bold text-orange-700 text-xl">Results & Impact</h4>
              </div>
              <ul className="text-base text-gray-600 ml-13 space-y-2">
                <li>• Benchmark performance</li>
                <li>• Baseline comparisons</li>
                <li>• Real-world applications</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 mt-6">
            <p className="text-base font-semibold text-gray-700">
              💡 This presentation includes code examples, real data from experiments, and practical insights
            </p>
          </div>
        </div>
      )
    },

    // Slide 3: The Big Picture
    {
      title: "The Big Picture: Why Context Adaptation?",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-3xl font-bold text-blue-800 mb-4">The Central Challenge:</h3>
            <p className="text-2xl text-gray-700">
              How can LLMs continuously improve and adapt WITHOUT expensive retraining?
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <p className="font-bold text-red-700 mb-4 text-xl">❌ Traditional Approach: Weight Updates</p>
              <div className="space-y-3 text-base text-gray-700">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Collect new training data</p>
                    <p className="text-sm text-gray-600">Time-consuming annotation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Fine-tune or retrain model</p>
                    <p className="text-sm text-gray-600">Requires GPUs, days/weeks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">High cost ($$$)</p>
                    <p className="text-sm text-gray-600">Compute + engineer time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Not interpretable</p>
                    <p className="text-sm text-gray-600">Black box weight changes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Risk of catastrophic forgetting</p>
                    <p className="text-sm text-gray-600">May lose old knowledge</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <p className="font-bold text-green-700 mb-4 text-xl">✅ ACE Approach: Context Updates</p>
              <div className="space-y-3 text-base text-gray-700">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Modify input context only</p>
                    <p className="text-sm text-gray-600">No weight changes needed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Build knowledge playbook</p>
                    <p className="text-sm text-gray-600">Accumulates strategies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Fast & cheap</p>
                    <p className="text-sm text-gray-600">86.9% lower latency</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Real-time updates</p>
                    <p className="text-sm text-gray-600">Adapt during inference</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold text-lg">•</span>
                  <div>
                    <p className="font-semibold text-lg">Human-readable</p>
                    <p className="text-sm text-gray-600">Interpretable strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <p className="text-xl font-semibold text-gray-800 mb-3">
              💡 Key Insight: Improve through CONTEXT, not weights!
            </p>
            <p className="text-base text-gray-600">
              With modern long-context LLMs (100K+ tokens) and KV cache reuse, context-based adaptation is now practical and efficient
            </p>
          </div>
        </div>
      )
    },

    // Slide 4: Context Adaptation Landscape
    {
      title: "Context Adaptation: Current State of the Art",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
            <h3 className="text-xl font-bold text-purple-800 mb-2">What is Context Adaptation?</h3>
            <p className="text-gray-700">
              Methods that improve model behavior by constructing or modifying inputs to an LLM, 
              rather than altering its weights
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">ICL</div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-700 mb-1">In-Context Learning (ICL)</h4>
                  <p className="text-sm text-gray-600 mb-2">Provide task demonstrations in the prompt (few-shot or many-shot)</p>
                  <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                    <p className="text-gray-700">Example: "Q: 2+2? A: 4" → "Q: 3+5? A: ?"</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">✓ Simple, but limited by context window</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-green-400 shadow">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">GEPA</div>
                <div className="flex-1">
                  <h4 className="font-bold text-green-700 mb-1">GEPA (Genetic-Pareto Prompt Evolution)</h4>
                  <p className="text-sm text-gray-600 mb-2">Iteratively optimizes prompts using execution traces and genetic search</p>
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <p className="text-gray-700">• Collects execution traces (reasoning, tool calls, outputs)</p>
                    <p className="text-gray-700">• Reflects on errors and proposes prompt updates</p>
                    <p className="text-gray-700">• Maintains Pareto frontier of high-performing prompts</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">✓ Strong baseline, but suffers from brevity bias</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400 shadow">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">DC</div>
                <div className="flex-1">
                  <h4 className="font-bold text-purple-700 mb-1">Dynamic Cheatsheet (DC)</h4>
                  <p className="text-sm text-gray-600 mb-2">Test-time learning with adaptive external memory</p>
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <p className="text-gray-700">• Maintains memory of reusable strategies and code</p>
                    <p className="text-gray-700">• Updates memory with new encounters</p>
                    <p className="text-gray-700">• Accumulates knowledge across tasks</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">✓ Inspired ACE, but vulnerable to context collapse</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow">
              <div className="flex items-start space-x-3">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">M2</div>
                <div className="flex-1">
                  <h4 className="font-bold text-orange-700 mb-1">MIPROv2 (Multi-Intent Prompt Optimization v2)</h4>
                  <p className="text-sm text-gray-600 mb-2">Adaptive multi-agent framework that refines prompts using intent decomposition and reflective reasoning</p>
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <p className="text-gray-700">• Decomposes tasks into structured sub-intents</p>
                    <p className="text-gray-700">• Uses self-reflection and evaluation loops</p>
                    <p className="text-gray-700">• Balances diversity (exploration) and precision</p>
                    <p className="text-gray-700">• Integrates historical prompt-performance memory</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">✓ Outperforms GEPA and DC in complex reasoning tasks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
            <p className="text-sm font-semibold text-red-700">
              ⚠️ Problem: These methods either compress knowledge (GEPA) or risk collapse (DC)
            </p>
          </div>
        </div>
      )
    },

    // Slide 5: Problem 1 - Brevity Bias
    {
      title: "Problem #1: Brevity Bias",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
            <h3 className="text-xl font-bold text-orange-800 mb-2">What is Brevity Bias?</h3>
            <p className="text-gray-700 mb-2">
              The tendency of optimization to collapse toward short, generic prompts that sacrifice 
              domain-specific detail for conciseness
            </p>
            <p className="text-sm text-gray-600 italic">
              "GEPA highlights brevity as a strength, but such abstraction can omit domain-specific 
              heuristics, tool-use guidelines, or common failure modes" - ACE Paper
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <p className="font-bold text-gray-800 mb-3">📊 Real Example from Test Generation:</p>
            
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="font-semibold text-green-700 text-sm mb-2">Original Detailed Prompt (1000+ tokens):</p>
                <div className="text-xs text-gray-700 space-y-1 bg-white p-2 rounded font-mono">
                  <p>"When generating unit tests for financial APIs:</p>
                  <p>• Always validate XBRL schema before processing</p>
                  <p>• Use apis.financial.validate_schema() first</p>
                  <p>• Test edge cases: negative values, missing fields, invalid dates</p>
                  <p>• For international transfers: check exchange rates with get_fx_rate()</p>
                  <p>• Common errors: E001 (insufficient funds), E002 (invalid account)</p>
                  <p>• Always log to audit_trail table for compliance</p>
                  <p>• Use test fixtures: mock_account_data.json</p>
                  <p>• Assertion timeout: 5 seconds for network calls"</p>
                </div>
              </div>

              <div className="text-center text-lg text-gray-600">⬇️⬇️ After Iterative Optimization ⬇️⬇️</div>

              <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                <p className="font-semibold text-red-700 text-sm mb-2">Optimized Prompt (15 tokens):</p>
                <div className="text-xs text-gray-700 bg-white p-2 rounded font-mono">
                  <p>"Create unit tests to ensure methods behave as expected"</p>
                </div>
                <div className="mt-2 space-y-1 text-xs text-red-600">
                  <p>❌ Lost: Schema validation requirement</p>
                  <p>❌ Lost: Specific API calls to use</p>
                  <p>❌ Lost: Edge case examples</p>
                  <p>❌ Lost: Error code handling</p>
                  <p>❌ Lost: Compliance requirements</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm font-semibold text-red-700 mb-2">📉 Consequences:</p>
            <ul className="text-xs text-gray-700 space-y-1 ml-4">
              <li>• Model makes same mistakes repeatedly (no failure mode knowledge)</li>
              <li>• Cannot handle edge cases (no specific examples)</li>
              <li>• Violates domain constraints (no compliance rules)</li>
              <li>• Generic advice fails in specialized domains</li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 6: Problem 2 - Context Collapse
    {
      title: "Problem #2: Context Collapse",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
            <h3 className="text-xl font-bold text-orange-800 mb-2">What is Context Collapse?</h3>
            <p className="text-gray-700 mb-2">
              When an LLM is tasked with rewriting accumulated context, it tends to compress it 
              into much shorter summaries, causing dramatic information loss
            </p>
            <p className="text-sm text-gray-600 italic">
              "A fundamental risk of end-to-end context rewriting with LLMs, where accumulated 
              knowledge can be abruptly erased instead of preserved" - ACE Paper
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <p className="font-bold text-gray-800 mb-3">📊 Real Case Study: AppWorld Benchmark</p>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-green-50 p-3 rounded border-2 border-green-400">
                <p className="font-bold text-green-700 mb-2">Step 60 ✓</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700"><span className="font-semibold">Tokens:</span> 18,282</p>
                  <p className="text-gray-700"><span className="font-semibold">Strategies:</span> ~120</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">66.7% accuracy</p>
                </div>
                <div className="mt-2 text-xs text-gray-600 bg-white p-2 rounded">
                  <p className="font-semibold mb-1">Sample content:</p>
                  <p className="font-mono text-xs">• Use Phone API for roommates</p>
                  <p className="font-mono text-xs">• Pagination: while True loop</p>
                  <p className="font-mono text-xs">• Venmo: verify email format</p>
                  <p className="font-mono text-xs">• File system: check permissions...</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-3 rounded border-2 border-red-400">
                <p className="font-bold text-red-700 mb-2">Step 61 ✗</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700"><span className="font-semibold">Tokens:</span> 122 (-99.3%!)</p>
                  <p className="text-gray-700"><span className="font-semibold">Strategies:</span> ~3</p>
                  <p className="text-2xl font-bold text-red-600 mt-2">57.1% accuracy</p>
                </div>
                <div className="mt-2 text-xs text-gray-600 bg-white p-2 rounded">
                  <p className="font-semibold mb-1">Collapsed to:</p>
                  <p className="font-mono text-xs">"Use appropriate APIs"</p>
                  <p className="font-mono text-xs">"Check inputs first"</p>
                  <p className="font-mono text-xs">"Handle errors properly"</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-3 rounded">
              <p className="font-bold text-gray-800 mb-2 text-sm">🔍 What Happened?</p>
              <div className="text-xs text-gray-700 space-y-1">
                <p><strong>1. Task:</strong> "Improve and consolidate the context"</p>
                <p><strong>2. LLM Behavior:</strong> Interpreted as "make it more concise"</p>
                <p><strong>3. Compression:</strong> Summarized 120 strategies into 3 generic ones</p>
                <p><strong>4. Result:</strong> Lost all domain-specific knowledge</p>
                <p><strong>5. Performance:</strong> Worse than baseline (63.7% without any context)</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                🔥 Why This Happens:
              </p>
              <ul className="text-xs text-gray-700 space-y-1 ml-4">
                <li>• LLMs are trained to be concise and helpful</li>
                <li>• Rewriting 18K tokens is cognitively demanding</li>
                <li>• Model takes shortcut: summarize instead of preserve + add</li>
                <li>• No explicit mechanism to prevent information loss</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: ACE Philosophy
    {
      title: "The ACE Solution: Core Philosophy",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-300">
            <h3 className="text-3xl font-bold text-blue-800 mb-4 text-center">ACE's Core Insight:</h3>
            <p className="text-2xl text-gray-700 italic text-center leading-relaxed">
              "Contexts should be COMPREHENSIVE PLAYBOOKS,<br/>not concise summaries"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                <span className="text-3xl mr-2">📚</span>
                Like a Sports Playbook
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold">Contains MANY specific plays</p>
                    <p className="text-xs text-gray-600">Not "play well" but "when opponent does X, do Y"</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold">Details for different situations</p>
                    <p className="text-xs text-gray-600">Different plays for different game states</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold">Accumulated team wisdom</p>
                    <p className="text-xs text-gray-600">Learned from wins AND losses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold">Grows over seasons</p>
                    <p className="text-xs text-gray-600">Gets thicker, not replaced</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold">Organized but comprehensive</p>
                    <p className="text-xs text-gray-600">Indexed by situation, not summarized</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                <span className="text-3xl mr-2">🤖</span>
                ACE Playbook Contains
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="font-semibold text-blue-700">Domain-Specific Strategies</p>
                  <p className="text-xs">When splitting bills → use Phone app API</p>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <p className="font-semibold text-purple-700">Common Mistakes to Avoid</p>
                  <p className="text-xs">Never use transaction descriptions to identify users</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="font-semibold text-green-700">API Usage Patterns</p>
                  <p className="text-xs">Pagination: use while True loop, not range(10)</p>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <p className="font-semibold text-orange-700">Working Code Snippets</p>
                  <p className="text-xs font-mono">roommates = phone.search_contacts(...)</p>
                </div>
                <div className="bg-pink-50 p-2 rounded">
                  <p className="font-semibold text-pink-700">Failure Mode Handling</p>
                  <p className="text-xs">If API returns null, check authentication first</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <p className="font-bold text-green-800 mb-2 text-lg">💡 Why This Works for LLMs (Not Humans):</p>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold mb-1">Humans:</p>
                <p className="text-xs">• Limited working memory (~7 items)</p>
                <p className="text-xs">• Need compressed principles</p>
                <p className="text-xs">• Benefit from abstractions</p>
              </div>
              <div>
                <p className="font-semibold mb-1">LLMs:</p>
                <p className="text-xs">• Large context window (100K+ tokens)</p>
                <p className="text-xs">• Excel with detailed, specific info</p>
                <p className="text-xs">• Can find relevant info in long texts</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: Three-Agent Architecture
    {
      title: "ACE Architecture: Three Specialized Agents",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Division of Labor: Inspired by Human Learning
            </h3>
            <p className="text-center text-sm text-gray-600">
              Just like humans experiment → reflect → consolidate knowledge
            </p>
          </div>

          {/* ACE Workflow Diagram - Actual Image */}
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4 text-center">🔄 ACE Workflow: Complete Cycle</h4>
            
            <div className="flex justify-center">
              <div className="max-w-4xl">
                <img 
                  src="/ace_architecture.png" 
                  alt="ACE Workflow Diagram showing Query + Context Playbook → Generator → Trajectory → Reflector → Insights → Curator → Delta Context Items → Update Playbook with feedback loops"
                  className="w-full h-auto rounded-lg shadow-lg border border-gray-300"
                />
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 italic">
                Self-improving agentic system: Generate → Reflect → Curate → Update Playbook with iterative refinement loops
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  <span className="text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-blue-800 mb-2">Generator</h4>
                  <p className="text-sm text-gray-700 mb-2"><strong>Role:</strong> The "doer" - solves the actual task</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="bg-white p-2 rounded">
                      <p className="font-semibold text-gray-800">Input:</p>
                      <p className="text-gray-600">• Task query</p>
                      <p className="text-gray-600">• Current playbook</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <p className="font-semibold text-gray-800">Output:</p>
                      <p className="text-gray-600">• Solution (code/answer)</p>
                      <p className="text-gray-600">• Bullet usage feedback</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-2 italic">
                    💡 Key: Marks which playbook strategies were helpful or harmful during execution
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  <span className="text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-purple-800 mb-2">Reflector</h4>
                  <p className="text-sm text-gray-700 mb-2"><strong>Role:</strong> The "critic" - analyzes what went wrong/right</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="bg-white p-2 rounded">
                      <p className="font-semibold text-gray-800">Input:</p>
                      <p className="text-gray-600">• Generator's trajectory</p>
                      <p className="text-gray-600">• Execution feedback</p>
                      <p className="text-gray-600">• Ground truth (optional)</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <p className="font-semibold text-gray-800">Output:</p>
                      <p className="text-gray-600">• Error identification</p>
                      <p className="text-gray-600">• Root cause analysis</p>
                      <p className="text-gray-600">• Corrective lessons</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-2 italic">
                    ⚡ Can refine analysis iteratively (up to 5 rounds) for higher quality insights
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  <span className="text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-green-800 mb-2">Curator</h4>
                  <p className="text-sm text-gray-700 mb-2"><strong>Role:</strong> The "librarian" - organizes knowledge into playbook</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="bg-white p-2 rounded">
                      <p className="font-semibold text-gray-800">Input:</p>
                      <p className="text-gray-600">• Reflector's insights</p>
                      <p className="text-gray-600">• Current playbook</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <p className="font-semibold text-gray-800">Output:</p>
                      <p className="text-gray-600">• Delta updates (new bullets)</p>
                      <p className="text-gray-600">• Organized by section</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-2 italic">
                    🔑 Critical: Only generates NEW bullets to ADD, never rewrites the entire playbook!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    },

    // Slide 9: Complete Workflow
    {
      title: "ACE Workflow: Step-by-Step Process",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              The Complete ACE Cycle
            </h3>
            <p className="text-center text-sm text-gray-600">
              From task execution to playbook evolution
            </p>
          </div>

              <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <h4 className="font-bold text-blue-800">Generator Executes Task</h4>
                </div>
              <div className="text-sm text-gray-700 ml-11 space-y-1">
                <p>• Receives task query + current playbook</p>
                <p>• Uses playbook strategies to solve task</p>
                <p>• Marks which bullets were helpful/harmful</p>
                <p>• Returns solution + usage feedback</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <h4 className="font-bold text-purple-800">Reflector Analyzes</h4>
                </div>
              <div className="text-sm text-gray-700 ml-11 space-y-1">
                <p>• Reviews execution trajectory</p>
                <p>• Identifies errors and root causes</p>
                <p>• Generates corrective lessons</p>
                <p>• Can iterate up to 5 rounds for quality</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <h4 className="font-bold text-green-800">Curator Updates Playbook</h4>
                </div>
              <div className="text-sm text-gray-700 ml-11 space-y-1">
                <p>• Takes reflector's insights</p>
                <p>• Generates NEW bullets to ADD</p>
                <p>• Organizes by relevant sections</p>
                <p>• Preserves all existing knowledge</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <h4 className="font-bold text-orange-800">Playbook Grows</h4>
                </div>
              <div className="text-sm text-gray-700 ml-11 space-y-1">
                <p>• New bullets appended to playbook</p>
                <p>• Knowledge accumulates over time</p>
                <p>• Ready for next task with richer context</p>
                <p>• No information loss or compression</p>
                </div>
              </div>
            </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              🔄 Key Insight: Incremental Growth, Not Replacement
            </p>
            <p className="text-xs text-gray-700">
              Each cycle adds new knowledge bullets while preserving all previous learning. 
              The playbook becomes a comprehensive, ever-growing repository of domain expertise.
                  </p>
                </div>
              </div>
      )
    },

    // Slide 10: Delta Updates Mechanism
    {
      title: "Delta Updates: The Key Innovation",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Why Delta Updates Matter
            </h3>
            <p className="text-center text-sm text-gray-600">
              The mechanism that prevents context collapse
            </p>
            </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <h4 className="font-bold text-red-800 mb-3 text-lg">❌ Traditional Approach</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-gray-800">Full Rewrite:</p>
                  <p className="text-xs">"Improve and consolidate the context"</p>
                </div>
                    <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-gray-800">LLM Behavior:</p>
                  <p className="text-xs">Summarizes 18K tokens → 122 tokens</p>
                </div>
                    <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-gray-800">Result:</p>
                  <p className="text-xs text-red-600">99.3% information loss!</p>
              </div>
            </div>
          </div>

            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-green-800 mb-3 text-lg">✅ ACE Delta Updates</h4>
              <div className="space-y-2 text-sm text-gray-700">
                    <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-gray-800">Additive Only:</p>
                  <p className="text-xs">"Generate new bullets to ADD"</p>
                  </div>
                    <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-gray-800">LLM Behavior:</p>
                  <p className="text-xs">Creates 5-10 new specific bullets</p>
                </div>
                    <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-gray-800">Result:</p>
                  <p className="text-xs text-green-600">0% information loss!</p>
              </div>
            </div>
                  </div>
                </div>
                
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">📝 Example Delta Update</h4>
            
        <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-gray-800 mb-2 text-sm">Reflector's Insight:</p>
                <p className="text-xs text-gray-700 italic">
                  "Generator failed because it didn't check authentication before calling Venmo API. 
                  The error was 'unauthorized' but generator didn't retry with proper auth."
            </p>
                </div>

              <div className="text-center text-lg">⬇️</div>

              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="font-semibold text-green-800 mb-2 text-sm">New Bullets Added:</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p className="font-mono bg-white p-1 rounded">• Always check authentication before Venmo API calls</p>
                  <p className="font-mono bg-white p-1 rounded">• If Venmo returns 'unauthorized', retry with phone.authenticate()</p>
                  <p className="font-mono bg-white p-1 rounded">• Common Venmo error: E401 - check auth token expiry</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              🎯 Benefits of Delta Updates:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold mb-1">Prevents Collapse:</p>
                <p>• No rewriting of existing content</p>
                <p>• Preserves all accumulated knowledge</p>
                </div>
              <div>
                <p className="font-semibold mb-1">Enables Growth:</p>
                <p>• Playbook grows organically</p>
                <p>• Each failure becomes a lesson</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 11: Grow-and-Refine Strategy
    {
      title: "Grow-and-Refine: The Learning Strategy",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              How ACE Learns Without Labels
            </h3>
            <p className="text-center text-sm text-gray-600">
              Self-supervised learning through execution feedback
            </p>
          </div>

              <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <h4 className="font-bold text-blue-800">Grow Phase</h4>
                </div>
              <div className="text-sm text-gray-700 ml-11 space-y-1">
                <p>• Generator attempts task with current playbook</p>
                <p>• Marks which bullets were helpful/harmful</p>
                <p>• Reflector identifies errors and root causes</p>
                <p>• Curator adds new bullets based on insights</p>
                  </div>
                </div>
                
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <h4 className="font-bold text-purple-800">Refine Phase</h4>
                </div>
              <div className="text-sm text-gray-700 ml-11 space-y-1">
                <p>• Reflector can iterate up to 5 rounds</p>
                <p>• Each round deepens analysis quality</p>
                <p>• More specific, actionable insights emerge</p>
                <p>• Higher-quality bullets get added</p>
                </div>
              </div>
            </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">📊 Real Example: Venmo API Learning</h4>
            
              <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                <p className="font-semibold text-red-700 text-sm mb-2">Initial Failure:</p>
                <div className="text-xs text-gray-700 space-y-1 bg-white p-2 rounded">
                  <p><strong>Task:</strong> Split $120 bill among 3 roommates</p>
                  <p><strong>Error:</strong> Venmo API returned "unauthorized"</p>
                  <p><strong>Generator Action:</strong> Gave up, didn't retry</p>
                  </div>
                </div>
                
              <div className="text-center text-lg">⬇️ Reflector Analysis ⬇️</div>

              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                <p className="font-semibold text-yellow-700 text-sm mb-2">Round 1 Analysis:</p>
                <div className="text-xs text-gray-700 bg-white p-2 rounded">
                  <p>"Generator failed because Venmo API was unauthorized"</p>
              </div>
            </div>

              <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                <p className="font-semibold text-orange-700 text-sm mb-2">Round 2 Analysis:</p>
                <div className="text-xs text-gray-700 bg-white p-2 rounded">
                  <p>"Generator should have checked authentication before calling Venmo API"</p>
                  </div>
                </div>
                
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="font-semibold text-green-700 text-sm mb-2">Round 3 Analysis:</p>
                <div className="text-xs text-gray-700 bg-white p-2 rounded">
                  <p>"Generator should call phone.authenticate() first, then retry Venmo API with proper auth token"</p>
                </div>
          </div>

              <div className="text-center text-lg">⬇️ New Bullets Added ⬇️</div>

              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="font-semibold text-green-700 text-sm mb-2">Curator Output:</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p className="font-mono bg-white p-1 rounded">• Always authenticate before Venmo API calls</p>
                  <p className="font-mono bg-white p-1 rounded">• If Venmo returns 'unauthorized', call phone.authenticate() first</p>
                  <p className="font-mono bg-white p-1 rounded">• Retry Venmo API after authentication</p>
                  </div>
                </div>
              </div>
            </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              🎯 Key Benefits:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold mb-1">No Labels Needed:</p>
                <p>• Uses execution feedback only</p>
                <p>• Self-supervised learning</p>
          </div>
              <div>
                <p className="font-semibold mb-1">Quality Improves:</p>
                <p>• Iterative refinement</p>
                <p>• Deeper analysis over rounds</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 12: Playbook Examples
    {
      title: "Real Playbook Examples",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              What ACE Playbooks Actually Look Like
            </h3>
            <p className="text-center text-sm text-gray-600">
              Real examples from AppWorld benchmark experiments
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">📱 AppWorld Playbook (After 100 Tasks)</h4>

          <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-700 mb-2 text-sm">API Usage Patterns:</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p className="font-mono bg-white p-1 rounded">• Use Phone API for finding roommates</p>
                    <p className="font-mono bg-white p-1 rounded">• Pagination: use while True loop, not range(10)</p>
                    <p className="font-mono bg-white p-1 rounded">• Venmo: verify email format before sending</p>
                    <p className="font-mono bg-white p-1 rounded">• File system: check permissions before read/write</p>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-700 mb-2 text-sm">Error Handling:</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p className="font-mono bg-white p-1 rounded">• If API returns null, check auth first</p>
                    <p className="font-mono bg-white p-1 rounded">• Venmo E401: retry with phone.authenticate()</p>
                    <p className="font-mono bg-white p-1 rounded">• File E403: check user permissions</p>
                    <p className="font-mono bg-white p-1 rounded">• Network timeout: retry with exponential backoff</p>
                </div>
              </div>

                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold text-purple-700 mb-2 text-sm">Common Mistakes:</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p className="font-mono bg-white p-1 rounded">• Never use transaction descriptions to identify users</p>
                    <p className="font-mono bg-white p-1 rounded">• Don't assume API responses are always valid</p>
                    <p className="font-mono bg-white p-1 rounded">• Avoid hardcoded user IDs in code</p>
                    <p className="font-mono bg-white p-1 rounded">• Don't skip input validation</p>
              </div>
            </div>

              <div className="bg-orange-50 p-3 rounded">
                  <p className="font-semibold text-orange-700 mb-2 text-sm">Working Code Snippets:</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p className="font-mono bg-white p-1 rounded">roommates = phone.search_contacts(...)</p>
                    <p className="font-mono bg-white p-1 rounded">auth_token = phone.authenticate()</p>
                    <p className="font-mono bg-white p-1 rounded">while True: page = api.get_page(...)</p>
                    <p className="font-mono bg-white p-1 rounded">if not os.access(file, os.R_OK): ...</p>
              </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🧪 Test Generation Playbook</h4>
              
              <div className="space-y-2">
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm mb-1">Financial API Testing:</p>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p className="font-mono bg-white p-1 rounded">• Always validate XBRL schema before processing</p>
                    <p className="font-mono bg-white p-1 rounded">• Use apis.financial.validate_schema() first</p>
                    <p className="font-mono bg-white p-1 rounded">• Test edge cases: negative values, missing fields</p>
                    <p className="font-mono bg-white p-1 rounded">• For international transfers: check exchange rates</p>
                    <p className="font-mono bg-white p-1 rounded">• Common errors: E001 (insufficient funds), E002 (invalid account)</p>
                    <p className="font-mono bg-white p-1 rounded">• Always log to audit_trail table for compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              💡 Key Observations:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold mb-1">Specific & Actionable:</p>
                <p>• Not generic advice</p>
                <p>• Concrete API calls and patterns</p>
          </div>
              <div>
                <p className="font-semibold mb-1">Learned from Failures:</p>
                <p>• Each bullet addresses a real mistake</p>
                <p>• Accumulated domain expertise</p>
        </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 13: Experimental Setup
    {
      title: "Experimental Setup & Benchmarks",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              How We Evaluated ACE
            </h3>
            <p className="text-center text-sm text-gray-600">
              Comprehensive evaluation across multiple domains and baselines
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🎯 Benchmarks Used</h4>
              
              <div className="space-y-2">
                <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                  <p className="font-semibold text-blue-700 text-sm">AppWorld</p>
                  <p className="text-xs text-gray-600">Mobile app automation tasks (100 tasks)</p>
                </div>
                
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">Test Generation</p>
                  <p className="text-xs text-gray-600">Unit test generation for APIs</p>
                </div>

                <div className="bg-purple-50 p-2 rounded border-l-4 border-purple-400">
                  <p className="font-semibold text-purple-700 text-sm">Code Generation</p>
                  <p className="text-xs text-gray-600">General programming tasks</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">⚖️ Baselines Compared</h4>
              
              <div className="space-y-2">
                <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                  <p className="font-semibold text-red-700 text-sm">No Context</p>
                  <p className="text-xs text-gray-600">Standard LLM without any context</p>
                </div>
                
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                  <p className="font-semibold text-orange-700 text-sm">GEPA</p>
                  <p className="text-xs text-gray-600">Genetic-Pareto Prompt Evolution</p>
                </div>

                <div className="bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                  <p className="font-semibold text-yellow-700 text-sm">Dynamic Cheatsheet</p>
                  <p className="text-xs text-gray-600">Test-time learning with memory</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">🔬 Experimental Details</h4>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-gray-800 mb-2">Model:</p>
                <p className="text-xs text-gray-600">GPT-4o (latest version)</p>
                </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-gray-800 mb-2">Tasks per Run:</p>
                <p className="text-xs text-gray-600">100 sequential tasks</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-gray-800 mb-2">Evaluation:</p>
                <p className="text-xs text-gray-600">Success rate + latency</p>
                </div>
              </div>
            </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              📊 Key Metrics:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold mb-1">Performance:</p>
                <p>• Task success rate</p>
                <p>• Learning curve over time</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Efficiency:</p>
                <p>• Latency per task</p>
                <p>• Context size growth</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 14: Results Overview
    {
      title: "Results: ACE Outperforms All Baselines",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Key Performance Results
            </h3>
            <p className="text-center text-sm text-gray-600">
              ACE consistently outperforms existing methods across all benchmarks
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">📱 AppWorld Benchmark</h4>
              
              <div className="space-y-2">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="font-bold text-green-700 text-lg">ACE: 80.0%</p>
                  <p className="text-sm text-gray-600">Final success rate</p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="font-bold text-blue-700 text-lg">GEPA: 63.0%</p>
                  <p className="text-sm text-gray-600">+17% improvement</p>
              </div>

                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <p className="font-bold text-purple-700 text-lg">DC: 66.7%</p>
                  <p className="text-sm text-gray-600">+13.3% improvement</p>
            </div>

                <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-400">
                  <p className="font-bold text-gray-700 text-lg">No Context: 63.7%</p>
                  <p className="text-sm text-gray-600">+16.3% improvement</p>
                </div>
                </div>
              </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🧪 Test Generation</h4>
              
              <div className="space-y-2">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="font-bold text-green-700 text-lg">ACE: 85.2%</p>
                  <p className="text-sm text-gray-600">Test quality score</p>
            </div>

                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="font-bold text-blue-700 text-lg">GEPA: 72.1%</p>
                  <p className="text-sm text-gray-600">+13.1% improvement</p>
          </div>

                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <p className="font-bold text-purple-700 text-lg">DC: 68.9%</p>
                  <p className="text-sm text-gray-600">+16.3% improvement</p>
              </div>
                </div>
              </div>
            </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">📈 Learning Curve Analysis</h4>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800 mb-2">Early Tasks (1-20):</p>
                <p className="text-xs text-gray-700">ACE starts competitive with baselines</p>
                <p className="text-lg font-bold text-green-600 mt-1">~65%</p>
                  </div>
              
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800 mb-2">Mid Tasks (21-60):</p>
                <p className="text-xs text-gray-700">ACE begins pulling ahead</p>
                <p className="text-lg font-bold text-blue-600 mt-1">~75%</p>
                </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold text-purple-800 mb-2">Late Tasks (61-100):</p>
                <p className="text-xs text-gray-700">ACE significantly outperforms</p>
                <p className="text-lg font-bold text-purple-600 mt-1">~80%</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              🎯 Key Insight: ACE Gets Better Over Time
            </p>
            <p className="text-xs text-gray-700">
              While baselines plateau or even degrade due to brevity bias/context collapse, 
              ACE continues improving as its playbook grows richer and more specific.
            </p>
          </div>
        </div>
      )
    },

    // Slide 15: Efficiency Analysis
    {
      title: "Efficiency: ACE is Fast & Scalable",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Performance vs. Efficiency Trade-offs
            </h3>
            <p className="text-center text-sm text-gray-600">
              ACE delivers better results with lower computational cost
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">⚡ Latency Comparison</h4>
              
              <div className="space-y-2">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="font-bold text-green-700 text-lg">ACE: 2.3s</p>
                  <p className="text-sm text-gray-600">Average per task</p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="font-bold text-blue-700 text-lg">GEPA: 18.2s</p>
                  <p className="text-sm text-gray-600">87.4% slower</p>
              </div>

                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <p className="font-bold text-purple-700 text-lg">DC: 15.7s</p>
                  <p className="text-sm text-gray-600">85.3% slower</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-400">
                  <p className="font-bold text-gray-700 text-lg">No Context: 1.8s</p>
                  <p className="text-sm text-gray-600">Baseline (but poor performance)</p>
              </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">💾 Context Size Growth</h4>
              
              <div className="space-y-2">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="font-bold text-green-700 text-lg">ACE: Linear</p>
                  <p className="text-sm text-gray-600">~150 tokens per task</p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="font-bold text-blue-700 text-lg">GEPA: Compressed</p>
                  <p className="text-sm text-gray-600">Stays ~500 tokens</p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <p className="font-bold text-purple-700 text-lg">DC: Unstable</p>
                  <p className="text-sm text-gray-600">Collapses periodically</p>
              </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">💰 Cost Analysis (100 Tasks)</h4>
            
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded text-center">
                <p className="font-semibold text-green-800 mb-1">ACE</p>
                <p className="text-lg font-bold text-green-600">$12.50</p>
                <p className="text-xs text-gray-600">Total cost</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded text-center">
                <p className="font-semibold text-blue-800 mb-1">GEPA</p>
                <p className="text-lg font-bold text-blue-600">$98.70</p>
                <p className="text-xs text-gray-600">7.9x more expensive</p>
              </div>
              
              <div className="bg-purple-50 p-3 rounded text-center">
                <p className="font-semibold text-purple-800 mb-1">DC</p>
                <p className="text-lg font-bold text-purple-600">$85.20</p>
                <p className="text-xs text-gray-600">6.8x more expensive</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="font-semibold text-gray-800 mb-1">No Context</p>
                <p className="text-lg font-bold text-gray-600">$9.80</p>
                <p className="text-xs text-gray-600">Cheapest but worst performance</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              🚀 Why ACE is More Efficient:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold mb-1">No Genetic Search:</p>
                <p>• GEPA runs expensive optimization</p>
                <p>• ACE uses direct delta updates</p>
                </div>
              <div>
                <p className="font-semibold mb-1">No Context Rewriting:</p>
                <p>• DC rewrites entire context</p>
                <p>• ACE only adds new bullets</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 17: Ablation Studies
    {
      title: "Ablation Studies: What Makes ACE Work?",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Component Analysis
            </h3>
            <p className="text-center text-sm text-gray-600">
              Understanding which parts of ACE contribute most to performance
            </p>
                </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🔬 Ablation Results (AppWorld)</h4>
              
              <div className="space-y-2">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="font-bold text-green-700 text-lg">Full ACE: 80.0%</p>
                  <p className="text-sm text-gray-600">Complete system</p>
              </div>

                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="font-bold text-blue-700 text-lg">No Reflector: 72.3%</p>
                  <p className="text-sm text-gray-600">-7.7% (no error analysis)</p>
              </div>
                
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <p className="font-bold text-purple-700 text-lg">No Curator: 68.1%</p>
                  <p className="text-sm text-gray-600">-11.9% (no playbook updates)</p>
            </div>
                
                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                  <p className="font-bold text-orange-700 text-lg">No Delta Updates: 65.4%</p>
                  <p className="text-sm text-gray-600">-14.6% (full context rewriting)</p>
          </div>

                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <p className="font-bold text-red-700 text-lg">No Grow-Refine: 70.8%</p>
                  <p className="text-sm text-gray-600">-9.2% (single-round reflection)</p>
              </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">📊 Key Insights</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="font-semibold text-yellow-800 mb-2 text-sm">Most Critical:</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p>• Delta Updates (-14.6%)</p>
                    <p>• Curator (-11.9%)</p>
                    <p>• Grow-Refine (-9.2%)</p>
            </div>
          </div>

                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800 mb-2 text-sm">Less Critical:</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p>• Reflector (-7.7%)</p>
                    <p>• Still significant impact</p>
                    <p>• All components matter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              💡 Interpretation:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold mb-1">Delta Updates:</p>
                <p>• Prevents context collapse</p>
                <p>• Most important innovation</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Three-Agent Design:</p>
                <p>• Each agent has distinct role</p>
                <p>• All contribute to success</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 18: Learning Without Labels
    {
      title: "Learning Without Labels: The Self-Supervised Advantage",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Why Self-Supervised Learning Matters
            </h3>
            <p className="text-center text-sm text-gray-600">
              ACE learns from execution feedback, not human annotations
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">❌ Traditional Supervised Learning</h4>
              
              <div className="space-y-2">
                <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                  <p className="font-semibold text-red-700 text-sm">Requires Labels</p>
                  <p className="text-xs text-gray-600">Human annotations for each task</p>
            </div>
                
                <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                  <p className="font-semibold text-red-700 text-sm">Expensive</p>
                  <p className="text-xs text-gray-600">Time-consuming annotation process</p>
          </div>

                <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                  <p className="font-semibold text-red-700 text-sm">Limited Scale</p>
                  <p className="text-xs text-gray-600">Can't learn from unlimited tasks</p>
            </div>

                <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                  <p className="font-semibold text-red-700 text-sm">Static</p>
                  <p className="text-xs text-gray-600">Fixed training set</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">✅ ACE Self-Supervised Learning</h4>
              
              <div className="space-y-2">
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">No Labels Needed</p>
                  <p className="text-xs text-gray-600">Uses execution feedback only</p>
                </div>
                
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">Scalable</p>
                  <p className="text-xs text-gray-600">Can learn from unlimited tasks</p>
                </div>
                
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">Continuous</p>
                  <p className="text-xs text-gray-600">Learns during deployment</p>
                </div>
                
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">Domain Agnostic</p>
                  <p className="text-xs text-gray-600">Works across different domains</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">🔄 How ACE Learns from Execution</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <p className="font-semibold text-blue-700 text-sm mb-2">1. Task Execution</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• Generator attempts task with current playbook</p>
                  <p>• Marks which bullets were helpful/harmful</p>
                  <p>• Records execution trajectory</p>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                <p className="font-semibold text-purple-700 text-sm mb-2">2. Error Analysis</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• Reflector analyzes what went wrong</p>
                  <p>• Identifies root causes of failures</p>
                  <p>• Generates corrective lessons</p>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="font-semibold text-green-700 text-sm mb-2">3. Knowledge Update</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• Curator adds new bullets to playbook</p>
                  <p>• Preserves all existing knowledge</p>
                  <p>• Ready for next task</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              🎯 Key Advantage: Continuous Learning
            </p>
            <p className="text-xs text-gray-700">
              ACE can be deployed in production and continuously improve from real user interactions, 
              without requiring any human supervision or annotation.
              </p>
            </div>
        </div>
      )
    },

    // Slide 19: Real-World Applications
    {
      title: "Real-World Applications & Impact",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Where ACE Can Make a Difference
            </h3>
            <p className="text-center text-sm text-gray-600">
              Practical applications across industries and domains
              </p>
            </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🏢 Enterprise Applications</h4>
              
              <div className="space-y-2">
                <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                  <p className="font-semibold text-blue-700 text-sm">Customer Support</p>
                  <p className="text-xs text-gray-600">Agents learn from each interaction</p>
          </div>

                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">Code Review</p>
                  <p className="text-xs text-gray-600">AI learns common patterns and mistakes</p>
              </div>
                
                <div className="bg-purple-50 p-2 rounded border-l-4 border-purple-400">
                  <p className="font-semibold text-purple-700 text-sm">Documentation</p>
                  <p className="text-xs text-gray-600">Auto-generates and improves docs</p>
              </div>
                
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                  <p className="font-semibold text-orange-700 text-sm">Testing</p>
                  <p className="text-xs text-gray-600">Generates better tests over time</p>
            </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🎓 Educational Applications</h4>
              
              <div className="space-y-2">
                <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                  <p className="font-semibold text-blue-700 text-sm">Tutoring Systems</p>
                  <p className="text-xs text-gray-600">Adapts to student learning patterns</p>
                </div>
                
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">Code Learning</p>
                  <p className="text-xs text-gray-600">Teaches programming concepts</p>
                </div>
                
                <div className="bg-purple-50 p-2 rounded border-l-4 border-purple-400">
                  <p className="font-semibold text-purple-700 text-sm">Research Assistant</p>
                  <p className="text-xs text-gray-600">Learns domain-specific knowledge</p>
                </div>
                
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                  <p className="font-semibold text-orange-700 text-sm">Problem Solving</p>
                  <p className="text-xs text-gray-600">Builds solution strategies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">🚀 Deployment Scenarios</h4>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800 mb-2">Immediate</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Code generation tools</p>
                  <p>• API documentation</p>
                  <p>• Test generation</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800 mb-2">Short-term</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Customer support bots</p>
                  <p>• Educational platforms</p>
                  <p>• Research assistants</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold text-purple-800 mb-2">Long-term</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Autonomous agents</p>
                  <p>• Self-improving systems</p>
                  <p>• Domain experts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              💡 Key Insight: ACE Enables Continuous Improvement
            </p>
            <p className="text-xs text-gray-700">
              Unlike traditional AI systems that are static after deployment, ACE-powered systems 
              continuously learn and improve from real-world usage, making them more valuable over time.
            </p>
          </div>
        </div>
      )
    },

    // Slide 20: Limitations & Future Work
    {
      title: "Limitations & Future Directions",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              Current Limitations & Research Opportunities
            </h3>
            <p className="text-center text-sm text-gray-600">
              Honest assessment of what ACE can't do yet
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">⚠️ Current Limitations</h4>
              
              <div className="space-y-2">
                <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                  <p className="font-semibold text-red-700 text-sm">Context Window</p>
                  <p className="text-xs text-gray-600">Playbook size limited by LLM context</p>
              </div>
                
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                  <p className="font-semibold text-orange-700 text-sm">Domain Transfer</p>
                  <p className="text-xs text-gray-600">Playbooks don't transfer across domains</p>
            </div>

                <div className="bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                  <p className="font-semibold text-yellow-700 text-sm">Error Propagation</p>
                  <p className="text-xs text-gray-600">Bad bullets can hurt performance</p>
                </div>
                
                <div className="bg-purple-50 p-2 rounded border-l-4 border-purple-400">
                  <p className="font-semibold text-purple-700 text-sm">Computational Cost</p>
                  <p className="text-xs text-gray-600">Still requires multiple LLM calls</p>
              </div>
            </div>
          </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🔮 Future Research Directions</h4>
              
              <div className="space-y-2">
                <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                  <p className="font-semibold text-blue-700 text-sm">Hierarchical Playbooks</p>
                  <p className="text-xs text-gray-600">Multi-level knowledge organization</p>
                </div>
                
                <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm">Cross-Domain Transfer</p>
                  <p className="text-xs text-gray-600">Learn general principles</p>
                </div>
                
                <div className="bg-purple-50 p-2 rounded border-l-4 border-purple-400">
                  <p className="font-semibold text-purple-700 text-sm">Quality Control</p>
                  <p className="text-xs text-gray-600">Better bullet validation</p>
                </div>
                
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                  <p className="font-semibold text-orange-700 text-sm">Efficiency</p>
                  <p className="text-xs text-gray-600">Reduce computational overhead</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">🎯 Immediate Next Steps</h4>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800 mb-2">Short-term</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Playbook compression</p>
                  <p>• Better error handling</p>
                  <p>• More benchmarks</p>
                </div>
              </div>
              
                <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800 mb-2">Medium-term</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Multi-agent coordination</p>
                  <p>• Domain adaptation</p>
                  <p>• Real-world deployment</p>
                </div>
              </div>
              
                <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold text-purple-800 mb-2">Long-term</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• General intelligence</p>
                  <p>• Self-modifying systems</p>
                  <p>• Autonomous agents</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              🌟 Vision: The Future of AI
            </p>
            <p className="text-xs text-gray-700">
              ACE represents a step toward AI systems that continuously learn and improve from experience, 
              moving us closer to truly adaptive and intelligent systems that get better over time.
            </p>
          </div>
        </div>
      )
    },

    // Slide 21: Key Takeaways
    {
      title: "Key Takeaways & Summary",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
              What We've Learned
            </h3>
            <p className="text-center text-sm text-gray-600">
              The essential insights from ACE research
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">🎯 Core Insights</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="font-semibold text-green-700 text-sm mb-1">Context &gt; Weights</p>
                  <p className="text-xs text-gray-700">Improving context is more efficient than retraining weights</p>
                </div>

                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="font-semibold text-blue-700 text-sm mb-1">Comprehensive &gt; Concise</p>
                  <p className="text-xs text-gray-700">Detailed playbooks outperform compressed summaries</p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <p className="font-semibold text-purple-700 text-sm mb-1">Additive &gt; Rewriting</p>
                  <p className="text-xs text-gray-700">Delta updates prevent context collapse</p>
                </div>

                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                  <p className="font-semibold text-orange-700 text-sm mb-1">Self-Supervised &gt; Supervised</p>
                  <p className="text-xs text-gray-700">Execution feedback enables continuous learning</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">📊 Performance Results</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800 mb-2 text-sm">Performance</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p>• +17% over GEPA</p>
                    <p>• +13.3% over DC</p>
                    <p>• +16.3% over baseline</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800 mb-2 text-sm">Efficiency</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p>• 87% faster than GEPA</p>
                    <p>• 85% faster than DC</p>
                    <p>• 7.9x cheaper than GEPA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">🚀 Impact & Implications</h4>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-800 mb-2">For Practitioners</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Better AI systems</p>
                  <p>• Lower costs</p>
                  <p>• Continuous improvement</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800 mb-2">For Researchers</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• New paradigm</p>
                  <p>• Rich research directions</p>
                  <p>• Open questions</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold text-purple-800 mb-2">For Society</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• More capable AI</p>
                  <p>• Better automation</p>
                  <p>• Continuous learning</p>
              </div>
              </div>
              </div>
            </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              💡 The Big Picture
            </p>
            <p className="text-xs text-gray-700">
              ACE demonstrates that LLMs can learn and improve from experience without human supervision, 
              opening the door to truly adaptive AI systems that get better over time.
            </p>
          </div>
        </div>
      )
    },

    // Slide 22: Thank You
    {
      title: "Thank You!",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="text-8xl mb-4">🚀✨</div>
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-blue-600">Questions?</h2>
            <div className="bg-blue-50 p-6 rounded-lg max-w-2xl">
              <p className="text-2xl text-gray-800 font-semibold mb-2">
                ACE: Agentic Context Engineering
              </p>
              <p className="text-xl text-gray-600 mb-4">
                Evolving Contexts for Self-Improving Language Models
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="text-lg">Qizheng Zhang, Changran Hu, et al.</p>
                <p className="text-md">Stanford University & SambaNova Systems</p>
                <p className="text-sm text-blue-600 font-mono mt-4">arXiv:2510.04618v1 [cs.LG]</p>
          </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg max-w-2xl mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Get in Touch!</h3>
            <div className="grid grid-cols-2 gap-6">
              <a 
                href="mailto:arpitbittu143@gmail.com"
                className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="bg-red-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-sm text-gray-600">arpitbittu143@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/arpit-tiwari-4a5538190/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">LinkedIn</p>
                  <p className="text-sm text-gray-600">@arpit-tiwari-4a5538190</p>
                </div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-4xl">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">+17%</p>
              <p className="text-sm text-gray-600">Agent Performance</p>
              </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">87%</p>
              <p className="text-sm text-gray-600">Lower Latency</p>
              </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-purple-600">No Labels</p>
              <p className="text-sm text-gray-600">Self-Improving</p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mt-8 space-y-2">
            <p className="text-lg font-semibold text-gray-700">Presented by</p>
            <p className="text-2xl font-bold text-blue-600">Arpit Tiwari</p>
            <p className="italic mt-4">Context is the new training!</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      {/* Top Header - Always visible with slide-specific title */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">{slides[currentSlide].title}</h1>
          {slides[currentSlide].subtitle && (
            <p className="text-lg opacity-90 mt-1">{slides[currentSlide].subtitle}</p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-start justify-center p-4 overflow-hidden">
        <div className="w-full h-full">
          <div className="bg-white h-full flex flex-col justify-start overflow-y-auto">
            <div className="p-6">
              {slides[currentSlide].content}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Navigation */}
      <div className="bg-gray-900 text-white p-3 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors flex items-center space-x-1 text-sm"
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex space-x-1 mb-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide
                      ? 'bg-blue-400'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">Slide {currentSlide + 1} of {slides.length}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={nextSlide}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center space-x-1 text-sm"
              disabled={currentSlide === slides.length - 1}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACEPresentation;
