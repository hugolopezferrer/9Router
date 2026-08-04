# TokenFlow

Intelligent AI Research & Work Management Tool - Routes tasks to optimal AI provider based on complexity, precision requirements, and budget constraints.

## Quick Start

```bash
npm install
npm start
```

## Overview

TokenFlow is a professional-grade intelligent routing system that optimizes research and work management by seamlessly integrating multiple AI providers. The system automatically selects the most cost-effective and appropriate AI provider for each task.

## Core Features

- **Intelligent Router** - Automatic provider selection based on task complexity and precision needs
- **Token Manager** - Real-time tracking of token usage and costs
- **Project Manager** - Full CRUD operations for project management
- **Work Tracker** - Complete audit trail of all executed work
- **Fallback System** - Automatic cascade to alternative providers if primary fails

## AI Providers

- **Claude** ($20/month) - Premium tasks requiring high precision
- **Groq** (Free, 10k req/day) - Primary fallback for most tasks
- **Google Gemini** (Free, 50 req/day) - Secondary fallback
- **Ollama** (Optional, local) - Offline capability

## Documentation

- [PROJECT_SPEC.md](PROJECT_SPEC.md) - Complete technical specification
- [PROJECT_PROMPT.md](PROJECT_PROMPT.md) - Use cases and workflow examples
- [src/README.md](src/README.md) - Source code structure
- [src/components/README.md](src/components/README.md) - Component details
- [test/README.md](test/README.md) - Testing guide

## Stack

- Node.js v20.20.2
- Express.js
- dotenv
- axios

## License

MIT

---

**Version:** 1.0  
**Status:** Active Development
