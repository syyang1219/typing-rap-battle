import { DifficultyConfig } from "@/types/game";

export function getDifficulty(score: number): DifficultyConfig {
  // Base difficulty levels
  const baseLevels = [
    { minScore: 0, maxScore: 1000, baseBpm: 80, minSyllables: 4, maxSyllables: 8 },
    { minScore: 1001, maxScore: 2500, baseBpm: 85, minSyllables: 6, maxSyllables: 12 },
    { minScore: 2501, maxScore: 5000, baseBpm: 95, minSyllables: 10, maxSyllables: 18 },
    { minScore: 5001, maxScore: 10000, baseBpm: 110, minSyllables: 15, maxSyllables: 25 },
    { minScore: 10001, maxScore: Infinity, baseBpm: 130, minSyllables: 20, maxSyllables: 35 },
  ];

  // Find the appropriate base level
  const baseLevel =
    baseLevels.find((level) => score >= level.minScore && score <= level.maxScore) || baseLevels[baseLevels.length - 1];

  // Calculate progressive increases (much slower)
  const bpmIncrease = Math.floor(score / 500) * 1; // Much slower BPM increase
  const syllablesIncrease = Math.floor(score / 1000) * 1; // Much slower syllable increase

  // Calculate final values
  const finalBpm = Math.min(baseLevel.baseBpm + bpmIncrease, 200); // Cap at 200 BPM
  const finalMinSyllables = Math.min(baseLevel.minSyllables + syllablesIncrease, 60); // Cap at 60 syllables
  const finalMaxSyllables = Math.min(baseLevel.maxSyllables + syllablesIncrease, 80); // Cap at 80 syllables

  // Calculate time limit based on average syllables (very generous timing)
  const avgSyllables = (finalMinSyllables + finalMaxSyllables) / 2;
  const timeLimit = Math.round(avgSyllables * 2.0 * 100) / 100; // Round to 2 decimal places, very generous timing (doubled)

  return {
    bpm: finalBpm,
    syllablesMin: finalMinSyllables,
    syllablesMax: finalMaxSyllables,
    timeLimit: timeLimit,
  };
}

export function getDifficultyLevel(score: number): string {
  if (score <= 500) return "Beginner";
  if (score <= 1500) return "Easy";
  if (score <= 3000) return "Medium";
  if (score <= 5000) return "Hard";
  return "Expert";
}

export function adjustDifficulty(
  currentConfig: DifficultyConfig,
  performance: "good" | "average" | "poor"
): DifficultyConfig {
  const adjustmentFactor = performance === "good" ? 1.1 : performance === "poor" ? 0.9 : 1.0;

  return {
    bpm: Math.round(currentConfig.bpm * adjustmentFactor),
    syllablesMin: Math.round(currentConfig.syllablesMin * adjustmentFactor),
    syllablesMax: Math.round(currentConfig.syllablesMax * adjustmentFactor),
    timeLimit: Math.round(currentConfig.timeLimit * (1 / adjustmentFactor) * 100) / 100,
  };
}
