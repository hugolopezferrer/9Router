/**
 * Intelligent Router - Core Decision Engine for 9Router
 * Evaluates tasks and routes to optimal AI provider
 */

const axios = require('axios');
require('dotenv').config();

class IntelligentRouter {
  constructor() {
    this.providers = {
      claude: {
        name: 'Claude',
        apiKey: process.env.CLAUDE_API_KEY,
        priority: 1,
        cost: 'HIGH',
        maxComplexity: 5,
        maxTokens: 500000
      },
      groq: {
        name: 'Groq',
        apiKey: process.env.GROQ_API_KEY,
        priority: 2,
        cost: 'FREE',
        maxComplexity: 4,
        rateLimit: 10000
      },
      gemini: {
        name: 'Google Gemini',
        apiKey: process.env.GEMINI_API_KEY,
        priority: 3,
        cost: 'FREE',
        maxComplexity: 3,
        rateLimit: 50
      },
      ollama: {
        name: 'Ollama (Local)',
        apiKey: 'local',
        priority: 4,
        cost: 'FREE',
        maxComplexity: 3,
        baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
      }
    };

    this.decisions = [];
  }

  /**
   * Main evaluation method
   * @param {Object} task - Task object with description and requirements
   * @returns {Object} Decision object with selected provider and reasoning
   */
  async evaluate(task) {
    console.log(`\n📊 Evaluating task: "${task.description.substring(0, 50)}..."`);

    const complexity = this.getComplexity(task.description);
    const precisionRequired = this.getPrecisionRequired(task);
    const selectedProvider = this.selectProvider(complexity, precisionRequired, task.budget);

    const decision = {
      taskId: `task_${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskDescription: task.description.substring(0, 100),
      complexity: complexity,
      precisionRequired: precisionRequired,
      selectedProvider: selectedProvider.name,
      confidence: this.calculateConfidence(complexity, precisionRequired, selectedProvider),
      reasoning: this.generateReasoning(complexity, precisionRequired, selectedProvider),
      estimatedCost: this.estimateCost(selectedProvider, task.estimatedTokens || 1000)
    };

    this.decisions.push(decision);
    this.logDecision(decision);

    return decision;
  }

  /**
   * Analyze task complexity (1-5 scale)
   */
  getComplexity(description) {
    const complexityKeywords = {
      5: ['architecture', 'design system', 'algorithm', 'optimize', 'research', 'complex'],
      4: ['code review', 'implement', 'debug', 'analyze', 'refactor'],
      3: ['explain', 'summarize', 'write', 'create', 'basic'],
      2: ['search', 'list', 'find', 'simple'],
      1: ['hello', 'hi', 'what', 'how']
    };

    const lowerDesc = description.toLowerCase();
    
    for (let level = 5; level >= 1; level--) {
      for (let keyword of complexityKeywords[level]) {
        if (lowerDesc.includes(keyword)) {
          return level;
        }
      }
    }

    return 2; // default medium-low complexity
  }

  /**
   * Evaluate precision requirements
   */
  getPrecisionRequired(task) {
    const precisionKeywords = {
      high: ['critical', 'production', 'financial', 'security', 'accuracy', 'must'],
      medium: ['important', 'project', 'work', 'analysis'],
      low: ['test', 'explore', 'brainstorm', 'draft']
    };

    const lowerDesc = task.description.toLowerCase();

    if (precisionKeywords.high.some(keyword => lowerDesc.includes(keyword))) {
      return 'high';
    }
    if (precisionKeywords.medium.some(keyword => lowerDesc.includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Select optimal provider based on decision matrix
   */
  selectProvider(complexity, precision, budget) {
    // Decision Matrix Logic
    if (complexity === 5 || (complexity === 4 && precision === 'high')) {
      // High complexity or critical tasks always go to Claude
      return this.providers.claude;
    }

    if (complexity <= 2 && precision === 'low') {
      // Low complexity, low precision → use free tier (Groq)
      return this.providers.groq;
    }

    if (complexity === 3 || (complexity === 4 && precision === 'medium')) {
      // Medium complexity → prefer Groq, fall back to Gemini
      return this.providers.groq;
    }

    if (precision === 'high' && budget === 'high') {
      // High precision + good budget → Claude
      return this.providers.claude;
    }

    // Default: Groq for most cases
    return this.providers.groq;
  }

  /**
   * Calculate confidence score (0-1)
   */
  calculateConfidence(complexity, precision, provider) {
    let confidence = 0.7; // base confidence

    if (provider.name === 'Claude' && (complexity >= 4 || precision === 'high')) {
      confidence = 0.95;
    } else if (provider.name === 'Groq' && complexity <= 3) {
      confidence = 0.85;
    } else if (provider.name === 'Google Gemini') {
      confidence = 0.75;
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * Generate human-readable reasoning
   */
  generateReasoning(complexity, precision, provider) {
    if (provider.name === 'Claude') {
      return `High complexity/precision task requires Claude's superior reasoning capabilities`;
    }
    if (provider.name === 'Groq') {
      return `Task complexity and precision profile optimal for Groq - fast and cost-effective`;
    }
    if (provider.name === 'Google Gemini') {
      return `Medium-complexity task suitable for Gemini's capabilities`;
    }
    return `Task routed to ${provider.name} based on evaluation criteria`;
  }

  /**
   * Estimate token cost
   */
  estimateCost(provider, tokens = 1000) {
    const costMap = {
      'Claude': (tokens / 1000) * 0.015, // $0.015 per 1K output tokens (simplified)
      'Groq': 0, // Free
      'Google Gemini': 0, // Free
      'Ollama (Local)': 0 // Free
    };

    return costMap[provider.name] || 0;
  }

  /**
   * Log decision for audit trail
   */
  logDecision(decision) {
    console.log(`\n✅ Decision Made:`);
    console.log(`   Provider: ${decision.selectedProvider}`);
    console.log(`   Complexity: ${decision.complexity}/5`);
    console.log(`   Precision: ${decision.precisionRequired}`);
    console.log(`   Confidence: ${(decision.confidence * 100).toFixed(0)}%`);
    console.log(`   Estimated Cost: $${decision.estimatedCost.toFixed(4)}`);
    console.log(`   Reasoning: ${decision.reasoning}`);
  }

  /**
   * Get all decisions (audit trail)
   */
  getDecisions() {
    return this.decisions;
  }

  /**
   * Get decision statistics
   */
  getStats() {
    const stats = {
      totalDecisions: this.decisions.length,
      providerUsage: {},
      totalCost: 0,
      avgComplexity: 0
    };

    if (this.decisions.length === 0) return stats;

    let totalComplexity = 0;

    this.decisions.forEach(decision => {
      // Count provider usage
      const provider = decision.selectedProvider;
      stats.providerUsage[provider] = (stats.providerUsage[provider] || 0) + 1;

      // Sum costs
      stats.totalCost += decision.estimatedCost;

      // Track complexity
      totalComplexity += decision.complexity;
    });

    stats.avgComplexity = (totalComplexity / this.decisions.length).toFixed(2);

    return stats;
  }
}

// Export for use in other modules
module.exports = IntelligentRouter;
