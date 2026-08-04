# Source Code Directory

This directory contains the core source code for TokenFlow.

## Structure

```
src/
├── components/      # Core application components
├── config/         # Configuration and constants
├── utils/          # Utility functions and helpers
└── index.js        # Main entry point
```

## Components

The `components/` directory contains the main business logic:

- **router.js** - Intelligent Router: Central decision engine that evaluates tasks and selects optimal AI provider
- **tokenManager.js** - Token Manager: Tracks token usage and calculates costs for budget management
- **projectManager.js** - Project Manager: Handles project lifecycle with full CRUD operations
- **workTracker.js** - Work Tracker: Records executed work and provides analytics
- **keysManager.js** - API Keys Manager: Securely manages credentials (future implementation)
- **fallbackSystem.js** - Fallback System: Implements automatic cascade when primary provider fails (future implementation)

## Configuration

The `config/` directory stores application configuration:

- **constants.js** - Application constants and settings
- **database.js** - Database configuration (future)
- **environment.js** - Environment-specific settings (future)

## Utilities

The `utils/` directory contains reusable helper functions:

- **logger.js** - Logging utilities (future)
- **validators.js** - Input validation functions (future)
- **helpers.js** - General helper functions (future)
- **errorHandler.js** - Error handling utilities (future)

## Main Entry Point

`index.js` integrates all components and provides the main TokenFlow class that orchestrates the entire system.

---

For more details, see the root-level documentation files.
