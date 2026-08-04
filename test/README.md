# Test Directory

Testing and demonstration files for TokenFlow.

## Demo File (demo.js)

The demo.js file is a comprehensive test suite that demonstrates all TokenFlow components working together.

### Running the Demo

```bash
node test/demo.js
```

### What the Demo Tests

The demo validates the following functionality:

**Test 1: Project Creation**
- Creates multiple projects with different types and budgets
- Verifies project retrieval

**Test 2: Project Retrieval**
- Lists all created projects
- Confirms project count

**Test 3: Token Tracking**
- Records token usage for Claude and Groq
- Displays budget report (spent vs remaining)
- Shows available budget ($20 total)

**Test 4: Work Tracking**
- Records completed work for multiple projects
- Associates work with specific AI providers
- Retrieves project-specific statistics

**Test 5: Router Statistics**
- Displays decision statistics
- Shows provider usage breakdown

### Expected Output

```
🚀 TokenFlow Demo Started

✅ TokenFlow initialized successfully

📋 TEST 1: Creating Projects...
✅ Projects created: proj_1 proj_2

📋 TEST 2: Retrieving Projects...
✅ Total projects: 2

💰 TEST 3: Tracking Token Usage...
✅ Token report:
   Spent: $0.0105
   Remaining: $19.9895
   Budget: $20

📊 TEST 4: Tracking Work...
✅ Work tracked:
   Project: TokenFlow Research
   Total works: 1
   Total tokens: 1500

🤖 TEST 5: Router Statistics...
✅ Router stats:
   Total decisions: 0

✨ DEMO SUMMARY ✨
================
Projects: 2
Works: 2
Budget spent: $0.0105
================

🎉 All tests passed successfully!
```

## Creating Additional Tests

To add more tests to the demo:

1. Follow the pattern established in demo.js
2. Use console.log for output
3. Test one component at a time
4. Include clear section headers

## Component Testing

Each component can be tested independently:

```javascript
const IntelligentRouter = require('../src/components/router');
const TokenManager = require('../src/components/tokenManager');
const ProjectManager = require('../src/components/projectManager');
const WorkTracker = require('../src/components/workTracker');
```

## Continuous Integration

Future versions will include automated testing frameworks (Jest, Mocha) and CI/CD integration.

---

For more information on components, see [src/components/README.md](../src/components/README.md)
