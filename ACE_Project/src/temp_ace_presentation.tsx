import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Book, Zap, TrendingUp, AlertTriangle, CheckCircle, Code, Brain, Target, ArrowRight, Database, Layers, GitBranch } from 'lucide-react';

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
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">45-60 Minute Deep Dive</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <h4 className="font-bold text-blue-700">Motivation & Problems</h4>
              </div>
              <ul className="text-sm text-gray-600 ml-10 space-y-1">
                <li>• Context adaptation paradigm</li>
                <li>• Brevity bias explained</li>
                <li>• Context collapse crisis</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-purple-200 shadow">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <h4 className="font-bold text-purple-700">The ACE Solution</h4>
              </div>
              <ul className="text-sm text-gray-600 ml-10 space-y-1">
                <li>• Core philosophy</li>
                <li>• Three-agent architecture</li>
                <li>• Technical innovations</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-green-200 shadow">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <h4 className="font-bold text-green-700">How It Works</h4>
              </div>
              <ul className="text-sm text-gray-600 ml-10 space-y-1">
                <li>• Complete workflow</li>
                <li>• Delta updates mechanism</li>
                <li>• Real examples & code</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-orange-200 shadow">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <h4 className="font-bold text-orange-700">Results & Impact</h4>
              </div>
              <ul className="text-sm text-gray-600 ml-10 space-y-1">
                <li>• Benchmark performance</li>
                <li>• Baseline comparisons</li>
                <li>• Real-world applications</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-4">
            <p className="text-sm font-semibold text-gray-700">
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
            <h3 className="text-2xl font-bold text-blue-800 mb-3">The Central Challenge:</h3>
            <p className="text-xl text-gray-700">
              How can LLMs continuously improve and adapt WITHOUT expensive retraining?
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <p className="font-bold text-red-700 mb-3 text-lg">❌ Traditional Approach: Weight Updates</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Collect new training data</p>
                    <p className="text-xs text-gray-600">Time-consuming annotation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Fine-tune or retrain model</p>
                    <p className="text-xs text-gray-600">Requires GPUs, days/weeks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">High cost ($$$)</p>
                    <p className="text-xs text-gray-600">Compute + engineer time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Not interpretable</p>
                    <p className="text-xs text-gray-600">Black box weight changes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Risk of catastrophic forgetting</p>
                    <p className="text-xs text-gray-600">May lose old knowledge</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <p className="font-bold text-green-700 mb-3 text-lg">✅ ACE Approach: Context Updates</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Modify input context only</p>
                    <p className="text-xs text-gray-600">No weight changes needed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Build knowledge playbook</p>
                    <p className="text-xs text-gray-600">Accumulates strategies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Fast & cheap</p>
                    <p className="text-xs text-gray-600">86.9% lower latency</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Real-time updates</p>
                    <p className="text-xs text-gray-600">Adapt during inference</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Human-readable</p>
                    <p className="text-xs text-gray-600">Interpretable strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              💡 Key Insight: Improve through CONTEXT, not weights!
            </p>
            <p className="text-sm text-gray-600">
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

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow">
              <div className="flex items-start space-x-3">
                <Code className="text-blue-600 mt-1" size={24} />
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
                <TrendingUp className="text-green-600 mt-1" size={24} />
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
                <Database className="text-purple-600 mt-1" size={24} />
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
          </div>

          <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
            <p className="text-sm font-semibold text-red-700">
              ⚠️ Problem: These methods either compress knowledge (GEPA) or risk collapse (DC)
            </p>
          </div>
        </div>
      )
    },

    // Slide 5: Problem 1 - Brevity Bias (Detailed)
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
            <p className="font-bold text-gray-800 mb-3">📊 Real Example from Test Generation (Gao et al.):</p>
            
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

              <div className="text-center text-2xl">⬇️ After Iterative Optimization ⬇️</div>

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

    // Slide 6: Problem 2 - Context Collapse (Detailed)
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
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <p className="font-semibold">Contains MANY specific plays</p>
                    <p className="text-xs text-gray-600">Not "play well" but "when opponent does X, do Y"</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <p className="font-semibold">Details for different situations</p>
                    <p className="text-xs text-gray-600">Different plays for different game states</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <p className="font-semibold">Accumulated team wisdom</p>
                    <p className="text-xs text-gray-600">Learned from wins AND losses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <p className="font-semibold">Grows over seasons</p>
                    <p className="text-xs text-gray-600">Gets thicker, not replaced</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
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

          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                  <Code size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-blue-800 mb-2">1. Generator</h4>
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
                  
                  <div className="bg-white p-2 rounded text-xs font-mono">
                    <p className="text-gray-500"># Example Generator behavior:</p>
                    <p className="text-blue-600">def generate(task, playbook):</p>
                    <p className="text-blue-600 ml-4">relevant_bullets = retrieve(task, playbook)</p>
                    <p className="text-blue-600 ml-4">solution = llm.solve(task, context=relevant_bullets)</p>
                    <p className="text-blue-600 ml-4">mark_helpful_bullets(solution.bullets_used)</p>
                    <p className="text-blue-600 ml-4">return solution</p>
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
                  <Brain size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-purple-800 mb-2">2. Reflector</h4>
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
                  
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-gray-800 mb-1">Example Reflection Output:</p>
                    <p className="text-gray-700">"<strong>Error:</strong> Used transaction descriptions to identify roommates"</p>
                    <p className="text-gray-700">"<strong>Root Cause:</strong> Misunderstood data architecture - Phone app is authoritative"</p>
                    <p className="text-gray-700">"<strong>Correct Approach:</strong> Use apis.phone.search_contacts(relationship='roommate')"</p>
                    <p className="text-gray-700">"<strong>Key Insight:</strong> Always resolve identities from source app, not heuristics"</p>
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
                  <Book size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-green-800 mb-2">3. Curator</h4>
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
                  
                  <div className="bg-white p-2 rounded text-xs font-mono">
                    <p className="text-gray-500"># Example Curator output (JSON):</p>
                    <p className="text-green-600">{"{"}</p>
                    <p className="text-green-600 ml-2">"operations": [{"{"}</p>
                    <p className="text-green-600 ml-4">"type": "ADD",</p>
                    <p className="text-green-600 ml-4">"section": "strategies",</p>
                    <p className="text-green-600 ml-4">"content": "Always use Phone app..."</p>
                    <p className="text-green-600 ml-2">{"}"}]</p>
                    <p className="text-green-600">{"}"}</p>
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

    // Slide 9: Complete ACE Workflow
    {
      title: "The Complete ACE Workflow",
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-center text-gray-800">
              How ACE Learns: Step-by-Step Example
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
              <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                <p className="font-bold text-blue-800 text-sm mb-1">New Task Arrives</p>
                <div className="bg-white p-2 rounded text-xs">
                  <p className="font-mono text-gray-700">"Send $50 bill split request to all roommates for cable bill"</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
              <div className="flex-1 bg-purple-50 p-3 rounded-lg">
                <p className="font-bold text-purple-800 text-sm mb-1">Generator Attempts Solution</p>
                <div className="bg-white p-2 rounded text-xs space-y-1">
                  <p className="text-gray-700">• Retrieves relevant playbook bullets</p>
                  <p className="text-gray-700">• Writes code using current knowledge</p>
                  <p className="font-mono text-blue-600 mt-1">roommates = venmo.search("roommate") # Wrong!</p>
                  <p className="font-mono text-blue-600">venmo.send_request(roommates, 50)</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
              <div className="flex-1 bg-orange-50 p-3 rounded-lg">
                <p className="font-bold text-orange-800 text-sm mb-1">Execution & Feedback</p>
                <div className="bg-white p-2 rounded text-xs space-y-1">
                  <p className="text-red-600 font-semibold">❌ Test Failed</p>
                  <p className="text-gray-700">Expected: 3 roommates found</p>
                  <p className="text-gray-700">Actual: 0 roommates found</p>
                  <p className="text-gray-500 mt-1 italic">Unit test shows incorrect roommate identification</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">4</div>
              <div className="flex-1 bg-pink-50 p-3 rounded-lg">
                <p className="font-bold text-pink-800 text-sm mb-1">Reflector Analyzes</p>
                <div className="bg-white p-2 rounded text-xs space-y-1">
                  <p className="text-gray-800"><strong>Error:</strong> Used Venmo API to search for "roommate"</p>
                  <p className="text-gray-800"><strong>Root Cause:</strong> Assumed transaction descriptions contain relationship info</p>
                  <p className="text-gray-800"><strong>Correct:</strong> Phone app is authoritative source for contacts</p>
                  <p className="text-green-700 mt-1 font-semibold">Should use: apis.phone.search_contacts(relationship="roommate")</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">5</div>
              <div className="flex-1 bg-green-50 p-3 rounded-lg">
                <p className="font-bold text-green-800 text-sm mb-1">Curator Updates Playbook</p>
                <div className="bg-white p-2 rounded text-xs">
                  <p className="text-gray-700 mb-1">Adds new bullet to "strategies_and_hard_rules" section:</p>
                  <p className="font-mono text-green-700 bg-green-50 p-1 rounded">
                    "[bullet-00123] Always use Phone app to identify relationships (roommates, contacts). 
                    Never use heuristics from transaction descriptions or name patterns."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">6</div>
              <div className="flex-1 bg-indigo-50 p-3 rounded-lg">
                <p className="font-bold text-indigo-800 text-sm mb-1">Next Task Benefits</p>
                <div className="bg-white p-2 rounded text-xs space-y-1">
                  <p className="text-gray-700">New similar task: "Split dinner bill with roommates"</p>
                  <p className="text-green-600 font-semibold">✓ Generator now has the correct strategy in playbook</p>
                  <p className="font-mono text-blue-600">roommates = phone.search_contacts(relationship="roommate")</p>
                  <p className="text-green-600 font-semibold">✓ Executes correctly on first try!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800">
              🔄 This cycle repeats, continuously improving the playbook with each task!
            </p>
          </div>
        </div>
      )
    },

    // Slide 10: Delta Updates - Technical Deep Dive
    {
      title: "Key Innovation #1: Incremental Delta Updates",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <h3 className="text-xl font-bold text-blue-800 mb-2">What Are Delta Updates?</h3>
            <p className="text-gray-700">
              Instead of regenerating the entire playbook, ACE only adds small, incremental pieces 
              of new knowledge (deltas) while preserving all existing content
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
              <p className="font-bold text-red-700 mb-3 text-lg flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                Old Way: Monolithic Rewrite
              </p>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded border-2 border-gray-300">
                  <p className="font-semibold text-sm text-gray-800 mb-1">Step N: Current Playbook</p>
                  <p className="text-xs text-gray-600">Tokens: 10,000</p>
                  <p className="text-xs text-gray-600">Bullets: 50 strategies</p>
                  <div className="mt-2 bg-gray-50 p-2 rounded text-xs font-mono">
                    <p>[bullet-001] Strategy A...</p>
                    <p>[bullet-002] Strategy B...</p>
                    <p>...</p>
                    <p>[bullet-050] Strategy Z...</p>
                  </div>
                </div>
                
                <div className="text-center text-xl">⬇️</div>
                <div className="bg-gray-100 p-2 rounded text-center text-xs">
                  <p className="font-mono text-gray-700">llm.rewrite(entire_playbook)</p>
                  <p className="text-red-600 text-xs mt-1">Regenerates ALL 10K tokens</p>
                </div>
                <div className="text-center text-xl">⬇️</div>
                
                <div className="bg-white p-3 rounded border-2 border-red-400">
                  <p className="font-semibold text-sm text-red-800 mb-1">Step N+1: Collapsed!</p>
                  <p className="text-xs text-red-600">Tokens: 200 (-98%)</p>
                  <p className="text-xs text-red-600">Bullets: 5 generic tips</p>
                  <div className="mt-2 bg-gray-50 p-2 rounded text-xs font-mono">
                    <p>"Use appropriate APIs"</p>
                    <p>"Check inputs"</p>
                    <p>"Handle errors"</p>
                  </div>
                  <p className="text-xs text-red-600 mt-2 font-semibold">❌ Lost all detailed knowledge!</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <p className="font-bold text-green-700 mb-3 text-lg flex items-center">
                <CheckCircle className="mr-2" size={20} />
                ACE Way: Delta Updates
              </p>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded border-2 border-gray-300">
                  <p className="font-semibold text-sm text-gray-800 mb-1">Step N: Current Playbook</p>
                  <p className="text-xs text-gray-600">Tokens: 10,000</p>
                  <p className="text-xs text-gray-600">Bullets: 50 strategies</p>
                  <div className="mt-2 bg-gray-50 p-2 rounded text-xs font-mono">
                    <p>[bullet-001] Strategy A...</p>
                    <p>[bullet-002] Strategy B...</p>
                    <p>...</p>
                    <p>[bullet-050] Strategy Z...</p>
                  </div>
                </div>
                
                <div className="text-center text-xl">⬇️</div>
                <div className="bg-gray-100 p-2 rounded text-center text-xs">
                  <p className="font-mono text-gray-700">curator.generate_delta(insight)</p>
                  <p className="text-green-600 text-xs mt-1">Only creates NEW bullet</p>
                </div>
                <div className="text-center text-xl">⬇️</div>
                
                <div className="bg-white p-3 rounded border-2 border-green-400">
                  <p className="font-semibold text-sm text-green-800 mb-1">Step N+1: Grown!</p>
                  <p className="text-xs text-green-600">Tokens: 10,200 (+2%)</p>
                  <p className="text-xs text-green-600">Bullets: 51 strategies</p>
                  <div className="mt-2 bg-gray-50 p-2 rounded text-xs font-mono">
                    <p>[bullet-001] Strategy A... ✓</p>
                    <p>[bullet-002] Strategy B... ✓</p>
                    <p>...</p>
                    <p>[bullet-050] Strategy Z... ✓</p>
                    <p className="text-green-600 font-semibold">[bullet-051] NEW Strategy!</p>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-semibold">✓ All knowledge preserved!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
            <p className="font-bold text-gray-800 mb-2">🔧 Technical Implementation:</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-700 mb-2">Bullet Structure:</p>
                <div className="font-mono bg-white p-2 rounded">
                  <p>{"{"}</p>
                  <p className="ml-2">"id": "bullet-00123",</p>
                  <p className="ml-2">"section": "api_usage",</p>
                  <p className="ml-2">"content": "Use while True...",</p>
                  <p className="ml-2">"helpful_count": 5,</p>
                  <p className="ml-2">"harmful_count": 0</p>
                  <p>{"}"}</p>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-700 mb-2">Merging Process:</p>
                <div className="font-mono bg-white p-2 rounded">
                  <p className="text-gray-600"># Non-LLM merge</p>
                  <p>playbook.bullets.append(</p>
                  <p className="ml-2">new_bullet</p>
                  <p>)</p>
                  <p className="mt-1 text-green-600"># Fast & cheap!</p>
                  <p className="text-green-600"># No LLM call needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 11: Grow-and-Refine Mechanism
    {
      title: "Key Innovation #2: Grow-and-Refine",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
            <h3 className="text-xl font-bold text-purple-800 mb-2">The Grow-and-Refine Strategy</h3>
            <p className="text-gray-700">
              Playbook steadily GROWS with new knowledge but stays clean through periodic refinement.
              Balance between accumulation and organization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-700 mb-3 flex items-center text-lg">
                <TrendingUp className="mr-2" size={20} />
                🌱 Growth Phase
              </h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-800 mb-1">What Happens:</p>
                  <ul className="text-xs text-gray-700 space-y-1 ml-4">
                    <li>• New insights added as new bullets</li>
                    <li>• Helpful/harmful counters updated</li>
                    <li>• Playbook expands incrementally</li>
                    <li>• Knowledge accumulates over time</li>
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-800 mb-1">Code Example:</p>
                  <div className="font-mono text-xs bg-gray-50 p-2 rounded">
                    <p className="text-gray-600"># After each task</p>
                    <p className="text-blue-600">delta = curator.generate(insight)</p>
                    <p className="text-blue-600">playbook.add_bullets(delta)</p>
                    <p className="text-blue-600">playbook.update_counters(</p>
                    <p className="text-blue-600 ml-2">feedback.bullet_tags</p>
                    <p className="text-blue-600">)</p>
                  </div>
                </div>

                <div className="bg-green-100 p-2 rounded text-xs">
                  <p className="font-semibold text-green-800">Result after 100 tasks:</p>
                  <p className="text-gray-700">Playbook grows from 50 → 150 bullets</p>
                  <p className="text-gray-700">Comprehensive domain coverage</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-3 flex items-center text-lg">
                <Layers className="mr-2" size={20} />
                ✨ Refinement Phase
              </h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-800 mb-1">What Happens:</p>
                  <ul className="text-xs text-gray-700 space-y-1 ml-4">
                    <li>• De-duplicate semantically similar bullets</li>
                    <li>• Remove low-quality strategies</li>
                    <li>• Merge related knowledge</li>
                    <li>• Keep playbook organized</li>
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm text-gray-800 mb-1">Code Example:</p>
                  <div className="font-mono text-xs bg-gray-50 p-2 rounded">
                    <p className="text-gray-600"># Semantic deduplication</p>
                    <p className="text-blue-600">embeddings = embed(bullets)</p>
                    <p className="text-blue-600">similarities = cosine_sim()</p>
                    <p className="text-blue-600">if similarity {">"} 0.9:</p>
                    <p className="text-blue-600 ml-2">merge_bullets(b1, b2)</p>
                    <p className="mt-1 text-gray-600"># Quality filtering</p>
                    <p className="text-blue-600">if harmful {">"} helpful*2:</p>
                    <p className="text-blue-600 ml-2">remove_bullet(b)</p>
                  </div>
                </div>

                <div className="bg-blue-100 p-2 rounded text-xs">
                  <p className="font-semibold text-blue-800">Result after refinement:</p>
                  <p className="text-gray-700">150 bullets → 120 high-quality</p>
                  <p className="text-gray-700">No redundancy, organized</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
            <p className="font-bold text-gray-800 mb-3">⚡ Two Refinement Modes:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                <p className="font-semibold text-yellow-800 mb-2">Proactive Mode</p>
                <p className="text-xs text-gray-700 mb-2">Clean up after every N updates (e.g., every 50 bullets)</p>
                <div className="bg-white p-2 rounded font-mono text-xs">
                  <p className="text-gray-600"># After N updates</p>
                  <p className="text-blue-600">if updates % 50 == 0:</p>
                  <p className="text-blue-600 ml-2">playbook.deduplicate()</p>
                </div>
                <p className="text-xs text-green-600 mt-2">✓ Keeps playbook always clean</p>
              </div>
              <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                <p className="font-semibold text-orange-800 mb-2">Lazy Mode</p>
                <p className="text-xs text-gray-700 mb-2">Only when context window limit is reached</p>
                <div className="bg-white p-2 rounded font-mono text-xs">
                  <p className="text-gray-600"># Only when necessary</p>
                  <p className="text-blue-600">if playbook.tokens {">"} limit:</p>
                  <p className="text-blue-600 ml-2">playbook.refine()</p>
                </div>
                <p className="text-xs text-green-600 mt-2">✓ Lower overhead during learning</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 12: Playbook Example from Paper
    {
      title: "Real Playbook Example from AppWorld",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center text-gray-800">
              What Does an ACE-Generated Playbook Actually Look Like?
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-300">
              <p className="font-bold text-blue-700 mb-2 text-sm">📋 Section: Domain-Specific Strategies</p>
              <div className="bg-white p-3 rounded text-xs space-y-2 font-mono">
                <div className="border-l-4 border-blue-400 pl-2">
                  <p className="text-gray-500">[bullet-001] helpful=12 harmful=0</p>
                  <p className="text-gray-800 mt-1">
                    <strong>Bill Splitting Strategy:</strong> When splitting bills among roommates:
                  </p>
                  <p className="text-gray-700 ml-2">• First identify roommates using phone app's search_contacts 
                  with "roommate" relationship query</p>
                  <p className="text-gray-700 ml-2">• Access bill receipts in /home/[username]/bills/</p>
                  <p className="text-gray-700 ml-2">• Calculate equal shares: total / (num_roommates + 1)</p>
                  <p className="text-gray-700 ml-2">• Use Venmo's create_payment_request API</p>
                  <p className="text-gray-700 ml-2">• Verify roommates have same home address</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border-2 border-purple-300">
              <p className="font-bold text-purple-700 mb-2 text-sm">🔧 Section: API Usage Patterns</p>
              <div className="bg-white p-3 rounded text-xs space-y-2 font-mono">
                <div className="border-l-4 border-purple-400 pl-2">
                  <p className="text-gray-500">[bullet-042] helpful=8 harmful=0</p>
                  <p className="text-gray-800 mt-1">
                    <strong>Pagination Best Practice:</strong>
                  </p>
                  <p className="text-gray-700">Many APIs return items in "pages". Use while True loop, 
                  not for i in range(10), over page_index. Continue until API returns empty results.</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-2 mt-2">
                  <p className="text-gray-500">[bullet-043] helpful=6 harmful=0</p>
                  <p className="text-gray-800 mt-1">
                    <strong>Authentication Pattern:</strong>
                  </p>
                  <p className="text-gray-700">Always check API docs for auth requirements using 
                  apis.api_docs.show_api_doc() before calling APIs</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg border-2 border-red-300">
              <p className="font-bold text-red-700 mb-2 text-sm">⚠️ Section: Common Mistakes to Avoid</p>
              <div className="bg-white p-3 rounded text-xs space-y-2 font-mono">
                <div className="border-l-4 border-red-400 pl-2">
                  <p className="text-gray-500">[bullet-087] helpful=15 harmful=0</p>
                  <p className="text-gray-800 mt-1">
                    <strong>Identity Resolution Error:</strong>
                  </p>
                  <p className="text-red-700">NEVER identify relationships (roommates, contacts) by 
                  parsing transaction descriptions or using heuristics.</p>
                  <p className="text-green-700 mt-1">ALWAYS use Phone app as authoritative source: 
                  apis.phone.search_contacts(relationship="roommate")</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border-2 border-green-300">
              <p className="font-bold text-green-700 mb-2 text-sm">💻 Section: Reusable Code Snippets</p>
              <div className="bg-white p-3 rounded text-xs font-mono">
                <div className="border-l-4 border-green-400 pl-2">
                  <p className="text-gray-500">[bullet-105] helpful=9 harmful=0</p>
                  <p className="text-gray-800 mt-1 mb-1">
                    <strong>Bill Splitting Template:</strong>
                  </p>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-blue-600"># Get roommates</p>
                    <p className="text-gray-800">roommates = apis.phone.search_contacts(</p>
                    <p className="text-gray-800 ml-2">relationship="roommate"</p>
                    <p className="text-gray-800">)</p>
                    <p className="text-blue-600 mt-1"># Calculate share</p>
                    <p className="text-gray-800">bill = float(read_file(bill_path))</p>
                    <p className="text-gray-800">per_person = bill / (len(roommates) + 1)</p>
                    <p className="text-blue-600 mt-1"># Send requests</p>
                    <p className="text-gray-800">for rm in roommates:</p>
                    <p className="text-gray-800 ml-2">apis.venmo.create_payment_request(</p>
                    <p className="text-gray-800 ml-4">email=rm.email,</p>
                    <p className="text-gray-800 ml-4">amount=per_person</p>
                    <p className="text-gray-800 ml-2">)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              🎯 Key Characteristics of ACE Playbooks:
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-700">
              <div>✓ Highly detailed and specific</div>
              <div>✓ Includes working code examples</div>
              <div>✓ Documents failure modes</div>
              <div>✓ Organized by topic/section</div>
              <div>✓ Tracks usage statistics</div>
              <div>✓ Ready to use immediately</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 13: Experimental Setup
    {
      title: "Experimental Evaluation: Benchmarks & Setup",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center text-gray-800">
              ACE Evaluated on Two Categories of Applications
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
              <h4 className="font-bold text-blue-700 mb-3 text-lg flex items-center">
                <Code className="mr-2" size={20} />
                1. Agent Benchmarks
              </h4>
              
              <div className="bg-white p-3 rounded mb-3">
                <p className="font-semibold text-gray-800 text-sm mb-2">AppWorld</p>
                <p className="text-xs text-gray-700 mb-2">
                  Autonomous agent tasks with API interactions, code generation, and environment interaction
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p className="text-gray-700"><strong>Apps:</strong> Email, file system, Spotify, Venmo, Phone, etc.</p>
                  <p className="text-gray-700"><strong>Difficulty:</strong> Normal & Challenge splits</p>
                  <p className="text-gray-700"><strong>Metrics:</strong> Task Goal Completion (TGC), Scenario Goal Completion (SGC)</p>
                </div>
              </div>

              <div className="bg-blue-100 p-2 rounded text-xs">
                <p className="font-semibold text-blue-800 mb-1">Why This is Hard:</p>
                <p className="text-gray-700">• Multi-turn reasoning required</p>
                <p className="text-gray-700">• Tool use across multiple APIs</p>
                <p className="text-gray-700">• Current best: 60.3% (very challenging!)</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h4 className="font-bold text-green-700 mb-3 text-lg flex items-center">
                <TrendingUp className="mr-2" size={20} />
                2. Domain-Specific Benchmarks
              </h4>
              
              <div className="bg-white p-3 rounded mb-2">
                <p className="font-semibold text-gray-800 text-sm mb-1">FiNER (Financial NER)</p>
                <p className="text-xs text-gray-700 mb-2">
                  Label tokens in XBRL financial documents with 139 fine-grained entity types
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p className="text-gray-700"><strong>Task:</strong> Entity recognition in financial filings</p>
                  <p className="text-gray-700"><strong>Metric:</strong> Exact match accuracy</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded mb-2">
                <p className="font-semibold text-gray-800 text-sm mb-1">Formula (Numerical Reasoning)</p>
                <p className="text-xs text-gray-700 mb-2">
                  Extract values from XBRL filings and perform financial computations
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p className="text-gray-700"><strong>Task:</strong> Numerical reasoning on structured data</p>
                  <p className="text-gray-700"><strong>Metric:</strong> Exact match accuracy</p>
                </div>
              </div>

              <div className="bg-green-100 p-2 rounded text-xs">
                <p className="font-semibold text-green-800 mb-1">Why This is Hard:</p>
                <p className="text-gray-700">• Requires domain expertise (finance, XBRL)</p>
                <p className="text-gray-700">• Precise entity type classification (139 types!)</p>
                <p className="text-gray-700">• Complex numerical computations</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
            <p className="font-bold text-gray-800 mb-3">🔬 Evaluation Settings:</p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold text-purple-700 mb-2">Offline Adaptation</p>
                <p className="text-gray-700">• Train on training split</p>
                <p className="text-gray-700">• Multi-epoch optimization (5 epochs)</p>
                <p className="text-gray-700">• Evaluate on test split (pass@1)</p>
                <p className="text-gray-700">• Use case: System prompt optimization</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="font-semibold text-orange-700 mb-2">Online Adaptation</p>
                <p className="text-gray-700">• Sequential evaluation on test split</p>
                <p className="text-gray-700">• Predict → Update → Repeat</p>
                <p className="text-gray-700">• No lookahead, strictly causal</p>
                <p className="text-gray-700">• Use case: Test-time learning</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800">
              🎯 Base Model: DeepSeek-V3.1 (non-thinking mode) used for ALL components
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Same LLM for Generator, Reflector, and Curator to isolate benefit of ACE framework
            </p>
          </div>
        </div>
      )
    },

    // Slide 14: Results - AppWorld
    {
      title: "Results: AppWorld Agent Benchmark",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800">
              ACE Achieves +17.1% Improvement on Agent Tasks
            </h3>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
            <p className="font-bold text-gray-800 mb-3">📊 Complete Results Table:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left border">Method</th>
                    <th className="p-2 text-center border">GT Labels</th>
                    <th className="p-2 text-center border">Test-Normal TGC</th>
                    <th className="p-2 text-center border">Test-Challenge TGC</th>
                    <th className="p-2 text-center border bg-yellow-100">Average</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="p-2 border font-semibold">ReAct (baseline)</td>
                    <td className="p-2 text-center border">-</td>
                    <td className="p-2 text-center border">63.7</td>
                    <td className="p-2 text-center border">41.5</td>
                    <td className="p-2 text-center border bg-gray-200 font-semibold">42.4</td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="p-2 bg-blue-50 font-semibold text-blue-700">Offline Adaptation</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">ReAct + ICL</td>
                    <td className="p-2 text-center border">✓</td>
                    <td className="p-2 text-center border">64.3 <span className="text-green-600">(+0.6)</span></td>
                    <td className="p-2 text-center border">46.0 <span className="text-green-600">(+4.5)</span></td>
                    <td className="p-2 text-center border">46.0 <span className="text-green-600">(+3.6)</span></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-2 border">ReAct + GEPA</td>
                    <td className="p-2 text-center border">✓</td>
                    <td className="p-2 text-center border">64.9 <span className="text-green-600">(+1.2)</span></td>
                    <td className="p-2 text-center border">46.0 <span className="text-green-600">(+4.5)</span></td>
                    <td className="p-2 text-center border">46.4 <span className="text-green-600">(+4.0)</span></td>
                  </tr>
                  <tr className="bg-green-100 font-bold">
                    <td className="p-2 border">ReAct + ACE</td>
                    <td className="p-2 text-center border">✓</td>
                    <td className="p-2 text-center border">76.2 <span className="text-green-600">(+12.5)</span></td>
                    <td className="p-2 text-center border">57.3 <span className="text-green-600">(+15.8)</span></td>
                    <td className="p-2 text-center border bg-green-200">59.4 <span className="text-green-600">(+17.0)</span></td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="p-2 border">ReAct + ACE (no labels)</td>
                    <td className="p-2 text-center border">✗</td>
                    <td className="p-2 text-center border">75.0 <span className="text-green-600">(+11.3)</span></td>
                    <td className="p-2 text-center border">54.4 <span className="text-green-600">(+12.9)</span></td>
                    <td className="p-2 text-center border">57.2 <span className="text-green-600">(+14.8)</span></td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="p-2 bg-purple-50 font-semibold text-purple-700">Online Adaptation</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">ReAct + DC (CU)</td>
                    <td className="p-2 text-center border">✗</td>
                    <td className="p-2 text-center border">65.5 <span className="text-green-600">(+1.8)</span></td>
                    <td className="p-2 text-center border">52.3 <span className="text-green-600">(+10.8)</span></td>
                    <td className="p-2 text-center border">51.9 <span className="text-green-600">(+9.5)</span></td>
                  </tr>
                  <tr className="bg-green-100 font-bold">
                    <td className="p-2 border">ReAct + ACE</td>
                    <td className="p-2 text-center border">✗</td>
                    <td className="p-2 text-center border">69.6 <span className="text-green-600">(+5.9)</span></td>
                    <td className="p-2 text-center border">66.0 <span className="text-green-600">(+24.5)</span></td>
                    <td className="p-2 text-center border bg-green-200">59.5 <span className="text-green-600">(+17.1)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-300">
              <p className="font-bold text-blue-700 mb-2 text-sm">🎯 Key Finding #1</p>
              <p className="text-xs text-gray-700 mb-1">
                <strong>ACE beats GEPA by +13.0%</strong> (59.4% vs 46.4%)
              </p>
              <p className="text-xs text-gray-600">
                Comprehensive playbooks outperform optimized short prompts
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border-2 border-purple-300">
              <p className="font-bold text-purple-700 mb-2 text-sm">🎯 Key Finding #2</p>
              <p className="text-xs text-gray-700 mb-1">
                <strong>ACE beats DC by +7.6%</strong> (59.5% vs 51.9%)
              </p>
              <p className="text-xs text-gray-600">
                Delta updates prevent context collapse
              </p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border-2 border-green-300">
              <p className="font-bold text-green-700 mb-2 text-sm">🎯 Key Finding #3</p>
              <p className="text-xs text-gray-700 mb-1">
                <strong>Works without labels!</strong> (57.2% vs 59.4%)
              </p>
              <p className="text-xs text-gray-600">
                Only 2.2% gap using execution feedback alone
              </p>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <p className="font-bold text-red-700 mb-2">🏆 AppWorld Leaderboard Standing:</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2 rounded">
                <p className="text-gray-700"><strong>IBM CUGA (GPT-4.1):</strong> 60.3% average</p>
                <p className="text-gray-600 text-xs">#1 on leaderboard, production system</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-gray-700"><strong>ACE + DeepSeek-V3.1:</strong> 59.4% average</p>
                <p className="text-green-600 text-xs">Matches #1 with smaller open-source model!</p>
              </div>
            </div>
            <p className="text-xs text-gray-700 mt-2">
              On test-challenge split: <strong>ACE surpasses IBM CUGA</strong> (66.0% vs ~57%)
            </p>
          </div>
        </div>
      )
    },

    // Slide 15: Results - Financial Benchmarks
    {
      title: "Results: Financial Analysis Benchmarks",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800">
              ACE Achieves +8.6% Average Improvement on Domain Tasks
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
              <p className="font-bold text-gray-800 mb-3">📊 FiNER Results:</p>
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left border">Method</th>
                    <th className="p-2 text-center border">Accuracy</th>
                    <th className="p-2 text-center border">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="p-2 border">Base LLM</td>
                    <td className="p-2 text-center border">70.7%</td>
                    <td className="p-2 text-center border">-</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">ICL</td>
                    <td className="p-2 text-center border">72.3%</td>
                    <td className="p-2 text-center border text-green-600">+1.6%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-2 border">GEPA</td>
                    <td className="p-2 text-center border">73.5%</td>
                    <td className="p-2 text-center border text-green-600">+2.8%</td>
                  </tr>
                  <tr className="bg-green-100 font-bold">
                    <td className="p-2 border">ACE</td>
                    <td className="p-2 text-center border">78.3%</td>
                    <td className="p-2 text-center border text-green-600">+7.6%</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 bg-green-50 p-2 rounded text-xs">
                <p className="text-green-700 font-semibold">✓ ACE beats GEPA by +4.8%</p>
                <p className="text-gray-600">Comprehensive XBRL knowledge helps</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
              <p className="font-bold text-gray-800 mb-3">📊 Formula Results:</p>
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left border">Method</th>
                    <th className="p-2 text-center border">Accuracy</th>
                    <th className="p-2 text-center border">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="p-2 border">Base LLM</td>
                    <td className="p-2 text-center border">67.5%</td>
                    <td className="p-2 text-center border">-</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">ICL</td>
                    <td className="p-2 text-center border">67.0%</td>
                    <td className="p-2 text-center border text-red-600">-0.5%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-2 border">GEPA</td>
                    <td className="p-2 text-center border">71.5%</td>
                    <td className="p-2 text-center border text-green-600">+4.0%</td>
                  </tr>
                  <tr className="bg-green-100 font-bold">
                    <td className="p-2 border">ACE</td>
                    <td className="p-2 text-center border">85.5%</td>
                    <td className="p-2 text-center border text-green-600">+18.0%</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 bg-green-50 p-2 rounded text-xs">
                <p className="text-green-700 font-semibold">✓ ACE beats GEPA by +14.0%</p>
                <p className="text-gray-600">Massive gain on numerical reasoning</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
            <p className="font-bold text-gray-800 mb-3">📈 Why ACE Excels on Domain-Specific Tasks:</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-2">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-700 mb-1">Domain Concepts Accumulated</p>
                  <p className="text-gray-700">• XBRL schema rules</p>
                  <p className="text-gray-700">• Financial entity types (139 types)</p>
                  <p className="text-gray-700">• Common calculation patterns</p>
                  <p className="text-gray-700">• Industry-specific conventions</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold text-purple-700 mb-1">Failure Modes Learned</p>
                  <p className="text-gray-700">• Edge cases in financial calculations</p>
                  <p className="text-gray-700">• Common XBRL parsing errors</p>
                  <p className="text-gray-700">• Misinterpretation of financial terms</p>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="font-semibold text-orange-700 mb-1">Working Code Examples</p>
                <p className="text-gray-700">• XBRL parsing templates</p>
                <p className="text-gray-700">• Financial calculation functions</p>
                <p className="text-gray-700">• Entity extraction patterns</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-semibold text-gray-800">
              🎯 Key Takeaway: ACE's comprehensive playbooks excel at domain-specific tasks by accumulating detailed, actionable knowledge
            </p>
          </div>
        </div>
      )
    },

    // Slide 15: Conclusion
    {
      title: "Conclusion: The Future of Self-Improving LLMs",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
              ACE: A Paradigm Shift in LLM Adaptation
            </h3>
            <p className="text-xl text-gray-700 text-center italic">
              "From weight updates to context evolution"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h4 className="font-bold text-green-700 mb-3 text-lg">🏆 Key Achievements</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>+17.1% improvement</strong> on AppWorld agent tasks</li>
                <li>• <strong>+8.6% average gain</strong> on domain-specific benchmarks</li>
                <li>• <strong>86.9% lower latency</strong> than traditional fine-tuning</li>
                <li>• <strong>Real-time adaptation</strong> during inference</li>
                <li>• <strong>Human-interpretable</strong> knowledge accumulation</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
              <h4 className="font-bold text-blue-700 mb-3 text-lg">🔬 Technical Innovations</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Delta updates:</strong> Incremental knowledge addition</li>
                <li>• <strong>Grow-and-refine:</strong> Balanced accumulation</li>
                <li>• <strong>Three-agent architecture:</strong> Specialized roles</li>
                <li>• <strong>Comprehensive playbooks:</strong> Detailed strategies</li>
                <li>• <strong>Context preservation:</strong> No information loss</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">🚀 Future Directions</h4>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold text-purple-700 mb-2">Multi-Modal ACE</p>
                <p className="text-xs text-gray-700">Extend to vision, audio, and other modalities</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="font-semibold text-orange-700 mb-2">Federated Learning</p>
                <p className="text-xs text-gray-700">Distributed playbook sharing across systems</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-700 mb-2">Production Systems</p>
                <p className="text-xs text-gray-700">Real-world deployment and optimization</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              💡 The Bottom Line: ACE proves that LLMs can continuously improve through context, not weights
            </p>
            <p className="text-sm text-gray-600">
              This opens new possibilities for efficient, interpretable, and scalable AI systems that learn and adapt in real-time.
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">ACE: Agentic Context Engineering</h1>
          <p className="text-lg opacity-90">Teaching LLMs to Build Their Own Playbooks</p>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-xl min-h-[500px] p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">🤖📚</div>
              <h2 className="text-4xl font-bold text-blue-600 mb-4">
                {slides[currentSlide].title}
              </h2>
            </div>
            <div className="prose max-w-none">
              {slides[currentSlide].content}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-gray-800 text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2"
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex space-x-2 mb-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? 'bg-blue-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400 mb-1">Use ← → arrow keys or click to navigate</p>
            <p className="text-sm text-gray-500">Slide {currentSlide + 1} of {slides.length}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={nextSlide}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
              disabled={currentSlide === slides.length - 1}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-4 text-right">
          <p className="text-sm text-gray-400">ACE: Agentic Context Engineering</p>
        </div>
      </div>
    </div>
  );
};

export default ACEPresentation;