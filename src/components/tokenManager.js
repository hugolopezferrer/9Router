class TokenManager {
  constructor(monthlyBudgetUSD = 20) {
    this.monthlyBudgetUSD = monthlyBudgetUSD;
    this.usageHistory = [];
  }

  trackUsage(provider, inputTokens, outputTokens, taskId) {
    const cost = this.calculateCost(provider, inputTokens, outputTokens);
    const usage = {
      taskId: taskId,
      provider: provider,
      inputTokens: inputTokens,
      outputTokens: outputTokens,
      cost: cost
    };
    this.usageHistory.push(usage);
    return usage;
  }

  calculateCost(provider, inputTokens, outputTokens) {
    if (provider === 'claude') {
      const inputCost = (inputTokens / 1000000) * 3.00;
      const outputCost = (outputTokens / 1000000) * 15.00;
      return inputCost + outputCost;
    }
    return 0;
  }

  getCurrentMonthCost() {
    return this.usageHistory.reduce((sum, u) => sum + u.cost, 0);
  }

  getRemainingBudget() {
    return Math.max(0, this.monthlyBudgetUSD - this.getCurrentMonthCost());
  }

  getFullReport() {
    return {
      spent: this.getCurrentMonthCost(),
      remaining: this.getRemainingBudget(),
      budget: this.monthlyBudgetUSD
    };
  }
}

module.exports = TokenManager;
