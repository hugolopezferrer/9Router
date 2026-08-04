# Components Directory

Core components that make up the TokenFlow intelligent routing system.

## Router (router.js)

The Intelligent Router is the decision engine of TokenFlow. It analyzes incoming tasks and determines the optimal AI provider based on:

- Task complexity (low/medium/high/very high)
- Precision requirements
- Available budget and token usage
- Project context and consistency

Key methods:
- `evaluate(task)` - Main evaluation function
- `getComplexity(description)` - Rate task complexity
- `getPrecisionRequired(task)` - Evaluate precision needs
- `selectProvider(complexity, precision, budget)` - Select optimal provider
- `getStats()` - Retrieve router statistics

## Token Manager (tokenManager.js)

Tracks token consumption across all AI providers and manages budget constraints.

Key methods:
- `trackUsage(provider, inputTokens, outputTokens, taskId)` - Record token usage
- `calculateCost(provider, inputTokens, outputTokens)` - Calculate task cost
- `getCurrentMonthCost()` - Get current month spending
- `getRemainingBudget()` - Check available budget
- `getFullReport()` - Complete financial report

Pricing model:
- Claude: $0.003 per 1K input tokens, $0.015 per 1K output tokens
- Groq: Free (rate limited)
- Gemini: Free (rate limited)
- Ollama: Free (self-hosted)

## Project Manager (projectManager.js)

Manages project lifecycle and metadata.

Key methods:
- `createProject(name, type, budget)` - Create new project
- `getProject(projectId)` - Retrieve project
- `updateProject(projectId, updates)` - Modify project
- `deleteProject(projectId)` - Remove project
- `getProjectStats(projectId)` - Get project statistics

## Work Tracker (workTracker.js)

Records and analyzes all executed work.

Key methods:
- `recordWork(projectId, provider, inputTokens, outputTokens, executionTime)` - Log completed work
- `getProjectWorks(projectId)` - Get all work for a project
- `getProjectStats(projectId)` - Analytics for project
- `getProviderStats()` - Performance metrics by provider

## Future Components

**API Keys Manager** - Secure storage and rotation of API credentials
**Fallback System** - Automatic cascade to alternative providers with retry logic

---

Each component is designed to be modular and can be used independently or as part of the integrated TokenFlow system.
