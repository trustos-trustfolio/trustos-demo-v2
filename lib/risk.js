function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Very simple MVP scoring model
 * Final score is normalized to 0.00 - 1.00
 */
function calculateRiskScore({ amount, historyScore, destinationRisk }) {
  const normalizedAmountRisk = clamp(amount / 1000000, 0, 1); // 1,000,000 as rough baseline
  const normalizedHistoryRisk = 1 - clamp(historyScore, 0, 1);
  const normalizedDestinationRisk = clamp(destinationRisk, 0, 1);

  const score =
    normalizedAmountRisk * 0.4 +
    normalizedHistoryRisk * 0.3 +
    normalizedDestinationRisk * 0.3;

  return Number(clamp(score, 0, 1).toFixed(2));
}

function classifyRiskLevel(score) {
  if (score < 0.3) return "LOW";
  if (score < 0.7) return "MEDIUM";
  return "HIGH";
}

function recommendAction(score) {
  if (score < 0.3) return "ALLOW";
  if (score < 0.7) return "REVIEW";
  return "BLOCK";
}

module.exports = {
  calculateRiskScore,
  classifyRiskLevel,
  recommendAction
};