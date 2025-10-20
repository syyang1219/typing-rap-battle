import { TypingResult } from "@/types/game";

/**
 * Calculate Levenshtein distance between two strings
 * Used to determine similarity for accuracy calculation
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Normalize Korean text for comparison
 * Removes spaces and normalizes characters
 */
function normalizeKoreanText(text: string): string {
  return text
    .replace(/\s+/g, "") // Remove all spaces
    .normalize("NFC") // Normalize Korean characters
    .toLowerCase(); // Convert to lowercase for comparison
}

/**
 * Calculate accuracy percentage based on Levenshtein distance
 */
export function calculateAccuracy(userInput: string, targetLyric: string): number {
  const normalizedUser = normalizeKoreanText(userInput);
  const normalizedTarget = normalizeKoreanText(targetLyric);

  if (normalizedTarget.length === 0) {
    return normalizedUser.length === 0 ? 100 : 0;
  }

  const distance = levenshteinDistance(normalizedUser, normalizedTarget);
  const maxLength = Math.max(normalizedUser.length, normalizedTarget.length);
  const accuracy = Math.max(0, ((maxLength - distance) / maxLength) * 100);

  return Math.round(accuracy * 100) / 100; // Round to 2 decimal places
}

/**
 * Find the position of the first error in the input
 */
function findErrorPosition(userInput: string, targetLyric: string): number {
  const normalizedUser = normalizeKoreanText(userInput);
  const normalizedTarget = normalizeKoreanText(targetLyric);

  const minLength = Math.min(normalizedUser.length, normalizedTarget.length);

  for (let i = 0; i < minLength; i++) {
    if (normalizedUser[i] !== normalizedTarget[i]) {
      return i;
    }
  }

  // If user input is longer than target, error is at the end
  if (normalizedUser.length > normalizedTarget.length) {
    return normalizedTarget.length;
  }

  // If user input is shorter than target, no error position yet
  return -1;
}

/**
 * Main typing validation function
 * Validates user input against target lyric and returns detailed results
 */
export function validateTyping(userInput: string, targetLyric: string): TypingResult {
  const normalizedUser = normalizeKoreanText(userInput);
  const normalizedTarget = normalizeKoreanText(targetLyric);

  // Check for exact match
  const isExactMatch = normalizedUser === normalizedTarget;

  // Calculate accuracy
  const accuracy = calculateAccuracy(userInput, targetLyric);

  // Determine if typing is correct (60%+ accuracy) - more lenient
  const isCorrect = accuracy >= 60;

  // Debug logging
  console.log("Typing Validation Debug:", {
    userInput,
    targetLyric,
    normalizedUser,
    normalizedTarget,
    accuracy,
    isCorrect,
    isExactMatch,
  });

  // Check if it's perfect (exact match)
  const perfect = isExactMatch;

  // Find error position if not perfect
  const errorPosition = perfect ? undefined : findErrorPosition(userInput, targetLyric);

  return {
    isCorrect,
    accuracy,
    errorPosition,
    perfect,
  };
}

/**
 * Check accuracy only (simplified version)
 * Returns accuracy percentage between 0-100
 */
export function checkAccuracy(userInput: string, targetLyric: string): number {
  return calculateAccuracy(userInput, targetLyric);
}

/**
 * Check if typing is correct (60%+ accuracy)
 * Returns boolean indicating if typing meets minimum accuracy threshold
 */
export function isTypingCorrect(userInput: string, targetLyric: string): boolean {
  const accuracy = calculateAccuracy(userInput, targetLyric);
  return accuracy >= 60;
}

/**
 * Get detailed typing analysis
 * Returns comprehensive information about the typing attempt
 */
export function analyzeTyping(userInput: string, targetLyric: string) {
  const result = validateTyping(userInput, targetLyric);
  const normalizedUser = normalizeKoreanText(userInput);
  const normalizedTarget = normalizeKoreanText(targetLyric);

  return {
    ...result,
    userLength: normalizedUser.length,
    targetLength: normalizedTarget.length,
    lengthDifference: normalizedUser.length - normalizedTarget.length,
    isComplete: normalizedUser.length >= normalizedTarget.length,
    isOverTyped: normalizedUser.length > normalizedTarget.length,
    isUnderTyped: normalizedUser.length < normalizedTarget.length,
  };
}

/**
 * Validate typing with real-time feedback
 * Useful for live typing validation during gameplay
 */
export function validateTypingRealtime(
  userInput: string,
  targetLyric: string
): {
  isCorrect: boolean;
  accuracy: number;
  nextChar: string;
  isComplete: boolean;
} {
  const normalizedUser = normalizeKoreanText(userInput);
  const normalizedTarget = normalizeKoreanText(targetLyric);

  const accuracy = calculateAccuracy(userInput, targetLyric);
  const isCorrect = accuracy >= 60;
  const isComplete = normalizedUser.length >= normalizedTarget.length;
  const nextChar = isComplete ? "" : normalizedTarget[normalizedUser.length] || "";

  return {
    isCorrect,
    accuracy,
    nextChar,
    isComplete,
  };
}
