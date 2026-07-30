require('dotenv').config();

const IntelligentRouter = require('./components/router');
const TokenManager = require('./components/tokenManager');
const ProjectManager = require('./components/projectManager');
const WorkTracker = require('./components/workTracker');

class NineRouter {
  constructor() {
    this.router = new IntelligentRouter();
    this.tokenManager = new TokenManager(20);
    this.projectManager = new ProjectManager();
    this.workTracker = new WorkTracker();
    console.log('✅ TokenFlow initialized successfully');
  }

  async processTask(taskDescription, projectId) {
    console.log('\n🚀 Processing task:', taskDescription);
    const decision = await this.router.evaluate({
      description: taskDescription,
      budget: 'high'
    });
    if (projectId) {
      this.projectManager.addTaskToProject(projectId, decision.taskId);
    }
    return decision;
  }

  getFullStatus() {
    return {
      router: this.router.getStats(),
      tokenManager: this.tokenManager.getFullReport(),
      projects: this.projectManager.getAllProjects(),
      works: this.workTracker.getAllWorks()
    };
  }
}

module.exports = NineRouter;
