class ProjectManager {
  constructor() {
    this.projects = {};
    this.projectCounter = 1;
  }

  createProject(name, type, budget) {
    const projectId = `proj_${this.projectCounter++}`;
    this.projects[projectId] = {
      id: projectId,
      name: name,
      type: type,
      budget: budget,
      createdAt: new Date().toISOString(),
      tasks: [],
      status: 'active'
    };
    console.log(`✅ Project created: ${name} (${projectId})`);
    return this.projects[projectId];
  }

  getProject(projectId) {
    return this.projects[projectId] || null;
  }

  getAllProjects() {
    return Object.values(this.projects);
  }

  getActiveProjects() {
    return Object.values(this.projects).filter(p => p.status === 'active');
  }

  updateProject(projectId, updates) {
    if (!this.projects[projectId]) return null;
    this.projects[projectId] = {
      ...this.projects[projectId],
      ...updates,
      id: projectId
    };
    return this.projects[projectId];
  }

  addTaskToProject(projectId, taskId) {
    if (this.projects[projectId]) {
      this.projects[projectId].tasks.push(taskId);
      return true;
    }
    return false;
  }

  deleteProject(projectId) {
    if (this.projects[projectId]) {
      delete this.projects[projectId];
      return true;
    }
    return false;
  }

  closeProject(projectId) {
    if (this.projects[projectId]) {
      this.projects[projectId].status = 'closed';
      this.projects[projectId].closedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  getProjectStats(projectId) {
    const project = this.projects[projectId];
    if (!project) return null;
    return {
      id: projectId,
      name: project.name,
      taskCount: project.tasks.length,
      budget: project.budget,
      status: project.status
    };
  }
}

module.exports = ProjectManager;
