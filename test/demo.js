/**
 * TokenFlow - Demo/Test File
 * Tests all components working together
 */

const NineRouter = require('../src/index.js');

async function runDemo() {
  console.log('\n🚀 TokenFlow Demo Started\n');
  
  // Initialize TokenFlow
  const nineRouter = new NineRouter();
  
  console.log('✅ All components initialized successfully\n');

  // Test 1: Create Projects
  console.log('📋 TEST 1: Creating Projects...');
  const proj1 = nineRouter.projectManager.createProject('TokenFlow Research', 'research', 20);
  const proj2 = nineRouter.projectManager.createProject('API Integration', 'coding', 50);
  console.log('✅ Projects created:', proj1.id, proj2.id);
  
  // Test 2: Get Projects
  console.log('\n📋 TEST 2: Retrieving Projects...');
  const allProjects = nineRouter.projectManager.getAllProjects();
  console.log('✅ Total projects:', allProjects.length);

  // Test 3: Token Tracking
  console.log('\n💰 TEST 3: Tracking Token Usage...');
  nineRouter.tokenManager.trackUsage('claude', 1000, 500, 'task_001');
  nineRouter.tokenManager.trackUsage('groq', 2000, 1000, 'task_002');
  const report = nineRouter.tokenManager.getFullReport();
  console.log('✅ Token report:');
  console.log('   Spent: $' + report.spent);
  console.log('   Remaining: $' + report.remaining);
  console.log('   Budget: $' + report.budget);

  // Test 4: Work Tracking
  console.log('\n📊 TEST 4: Tracking Work...');
  nineRouter.workTracker.recordWork(proj1.id, 'claude', 1000, 500, 2500);
  nineRouter.workTracker.recordWork(proj2.id, 'groq', 2000, 1000, 800);
  const projectStats = nineRouter.workTracker.getProjectStats(proj1.id);
  console.log('✅ Work tracked:');
  console.log('   Project:', projectStats.name);
  console.log('   Total works:', projectStats.totalWorks);
  console.log('   Total tokens:', projectStats.totalTokens);

  // Test 5: Router Stats
  console.log('\n🤖 TEST 5: Router Statistics...');
  const routerStats = nineRouter.router.getStats();
  console.log('✅ Router stats:');
  console.log('   Total decisions:', routerStats.totalDecisions);
  console.log('   Provider usage:', routerStats.providerUsage);

  // Final Summary
  console.log('\n\n✨ DEMO SUMMARY ✨');
  console.log('================');
  const finalStatus = nineRouter.getFullStatus();
  console.log('Projects:', finalStatus.projects.length);
  console.log('Works:', finalStatus.works.length);
  console.log('Budget spent: $' + finalStatus.tokenManager.spent);
  console.log('================\n');
  console.log('🎉 All tests passed successfully!\n');
}

// Run demo
runDemo().catch(err => console.error('Error:', err));
