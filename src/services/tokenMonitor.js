/**
 * Token Monitor - Real-time token tracking
 */

class TokenMonitor {
  constructor(tokenManager) {
    this.tokenManager = tokenManager;
    this.threshold = 80;
    this.isMonitoring = false;
  }

  startMonitoring() {
    console.log('🔍 Token Monitor started');
    this.isMonitoring = true;
  }

  stopMonitoring() {
    this.isMonitoring = false;
    console.log('⏹️ Token Monitor stopped');
  }

  checkTokens() {
    const report = this.tokenManager.getFullReport();
    const usage = (report.spent / report.budget) * 100;
    
    console.log(`📊 Token: ${usage.toFixed(1)}% | Remaining: $${report.remaining.toFixed(4)}`);
    
    if (usage >= this.threshold) {
      console.log(`⚠️ ALERT: ${usage.toFixed(1)}% used - Consider switching to Groq`);
    }
    
    return { usage, report, shouldSwitch: usage >= this.threshold };
  }
}

module.exports = TokenMonitor;
