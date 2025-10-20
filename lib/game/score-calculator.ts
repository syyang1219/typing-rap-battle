interface ScoreParams {
  isCorrect: boolean;
  accuracy: number; // 0-100
  combo: number;
  perfect: boolean;
}

/**
 * Calculate combo multiplier based on combo count
 * 1x for combo 0-2, 1.5x for combo 3-4, 2x for combo 5-9, 3x for combo 10+
 */
function calculateMultiplier(combo: number): number {
  if (combo <= 2) return 1.0;
  if (combo <= 4) return 1.5;
  if (combo <= 9) return 2.0;
  return 3.0; // 10+ combo
}

/**
 * Main score calculation function
 * Calculates total score based on correctness, accuracy, combo, and perfect bonus
 */
export function calculateScore(params: ScoreParams): number {
  const { isCorrect, accuracy, combo, perfect } = params;

  // If not correct, return 0 points
  if (!isCorrect) {
    return 0;
  }

  // Base score: 10 points for correct typing
  let baseScore = 10;

  // Perfect bonus: +20 points for perfect typing (100% accuracy)
  if (perfect) {
    baseScore += 20;
  }

  // Accuracy bonus: accuracy * 0.5
  const accuracyBonus = accuracy * 0.5;

  // Calculate combo multiplier
  const comboMultiplier = calculateMultiplier(combo);

  // Calculate total score
  const totalScore = (baseScore + accuracyBonus) * comboMultiplier;

  // Round to nearest integer
  return Math.round(totalScore);
}

/**
 * Calculate score with detailed breakdown
 * Returns both total score and breakdown of components
 */
export function calculateScoreDetailed(params: ScoreParams): {
  totalScore: number;
  breakdown: {
    baseScore: number;
    perfectBonus: number;
    accuracyBonus: number;
    comboMultiplier: number;
    beforeMultiplier: number;
  };
} {
  const { isCorrect, accuracy, combo, perfect } = params;

  if (!isCorrect) {
    return {
      totalScore: 0,
      breakdown: {
        baseScore: 0,
        perfectBonus: 0,
        accuracyBonus: 0,
        comboMultiplier: 1,
        beforeMultiplier: 0,
      },
    };
  }

  const baseScore = 10;
  const perfectBonus = perfect ? 20 : 0;
  const accuracyBonus = accuracy * 0.5;
  const comboMultiplier = calculateMultiplier(combo);
  const beforeMultiplier = baseScore + perfectBonus + accuracyBonus;
  const totalScore = Math.round(beforeMultiplier * comboMultiplier);

  return {
    totalScore,
    breakdown: {
      baseScore,
      perfectBonus,
      accuracyBonus,
      comboMultiplier,
      beforeMultiplier,
    },
  };
}

/**
 * Calculate maximum possible score for a given combo
 * Useful for displaying potential scores
 */
export function calculateMaxScore(combo: number): number {
  return calculateScore({
    isCorrect: true,
    accuracy: 100,
    combo,
    perfect: true,
  });
}

/**
 * Calculate score for a streak of correct answers
 * Applies combo multiplier to the entire streak
 */
export function calculateStreakScore(correctCount: number, averageAccuracy: number, combo: number): number {
  const baseScore = correctCount * 10;
  const accuracyBonus = averageAccuracy * 0.5 * correctCount;
  const perfectBonus = averageAccuracy === 100 ? correctCount * 20 : 0;
  const comboMultiplier = calculateMultiplier(combo);

  const totalScore = (baseScore + accuracyBonus + perfectBonus) * comboMultiplier;
  return Math.round(totalScore);
}

/**
 * Get combo multiplier value (utility function)
 */
export function getComboMultiplier(combo: number): number {
  return calculateMultiplier(combo);
}

/**
 * Calculate score with time bonus
 * Adds time-based bonus for fast completion
 */
export function calculateScoreWithTime(
  params: ScoreParams,
  timeElapsed: number, // in seconds
  timeLimit: number // in seconds
): number {
  const baseScore = calculateScore(params);

  if (baseScore === 0) return 0;

  // Time bonus: faster completion = higher bonus
  const timeRatio = Math.max(0, (timeLimit - timeElapsed) / timeLimit);
  const timeBonus = Math.round(timeRatio * 10); // Max 10 points for instant completion

  return baseScore + timeBonus;
}

/**
 * Calculate score for Korean rap battle specific rules
 * Includes additional bonuses for Korean typing
 */
export function calculateRapBattleScore(params: ScoreParams, syllableCount: number, bpm: number): number {
  const baseScore = calculateScore(params);

  if (baseScore === 0) return 0;

  // Syllable bonus: more syllables = higher base value
  const syllableBonus = Math.round(syllableCount * 0.2);

  // BPM bonus: higher BPM = higher difficulty bonus
  const bpmBonus = Math.round((bpm - 80) * 0.1); // Bonus for BPM above 80

  return baseScore + syllableBonus + Math.max(0, bpmBonus);
}
