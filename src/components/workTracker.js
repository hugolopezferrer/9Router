class WorkTracker {
  constructor() {
    this.works = {};
    this.workCounter = 1;
  }

  recordWork(projectId, provider, inputTokens, outputTokens, executionTime) {
    const workId = `work_${this.workCounter++}`;
    this.works[workId] = {
      id: workId,
      projectId: projectId,
      provider: provider,
      inputTokens: inputTokens,
      outputTokens: outputTokens,
      totalTokens: inputTokens + outputTokens,
      executionTime: executionTime,
      timestamp: new Date().toISOString(),
      cost: this.calculateCost(provider, inputTokens, outputTokens),
      qualityRating: 5,
      status: 'completed'
    };
    return this.works[workId];
  }

  calculateCost(provider, inputTokens, outputTokens) {
    if (provider === 'claude') {
      return (inputTokens / 1000000) * 3.00 + (outputTokens / 1000000) * 15.00;
    }
    return 0;
  }

  getWork(workId) {
    return this.works[workId] || null;
  }

  getProjectWorks(projectId) {
    return Object.values(this.works).filter(w => w.projectId === projectId);
  }

  getAllWorks() {
    return Object.values(this.works);
  }
}

module.exports = WorkTracker;
