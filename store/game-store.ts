import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";
import { GameState, DifficultyConfig, Lyric, TypingResult } from "@/types/game";
import { getRandomLyric } from "@/lib/game/lyrics-database";
import { getDifficulty } from "@/lib/game/difficulty-manager";
import { validateTyping } from "@/lib/game/typing-validator";
import { calculateScore } from "@/lib/game/score-calculator";

interface GameStore {
  // State
  gameState: GameState;
  score: number;
  combo: number;
  currentLyric: Lyric | null;
  userInput: string;
  difficulty: DifficultyConfig;
  highScore: number;
  totalTypings: number;
  correctTypings: number;
  perfectTypings: number;
  currentStreak: number;
  bestStreak: number;
  timeElapsed: number;
  isTyping: boolean;
  countdownNumber: number;

  // Actions
  startCountdown: () => void;
  startGame: () => void;
  updateInput: (text: string) => void;
  submitTyping: () => void;
  resetCombo: () => void;
  incrementCombo: () => void;
  gameOver: () => void;
  restartGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  loadNextLyric: () => void;
  updateHighScore: (newScore: number) => void;
  resetStats: () => void;
  setDifficulty: (difficulty: DifficultyConfig) => void;
}

// Default difficulty configuration
const DEFAULT_DIFFICULTY: DifficultyConfig = {
  bpm: 80,
  syllablesMin: 4,
  syllablesMax: 8,
  timeLimit: 15.0, // Increased from 8.0 to 15.0 seconds
};

// Default lyric for initial state
const DEFAULT_LYRIC: Lyric = {
  text: "게임을 시작하세요",
  bpm: 80,
  syllables: 8,
  artist: "System",
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      gameState: "menu",
      score: 0,
      combo: 0,
      currentLyric: DEFAULT_LYRIC,
      userInput: "",
      difficulty: DEFAULT_DIFFICULTY,
      highScore: 0,
      totalTypings: 0,
      correctTypings: 0,
      perfectTypings: 0,
      currentStreak: 0,
      bestStreak: 0,
      timeElapsed: 0,
      isTyping: false,
      countdownNumber: 5,

      // Actions
      startCountdown: () => {
        set({
          gameState: "countdown",
          countdownNumber: 5,
        });
      },

      startGame: () => {
        const newDifficulty = getDifficulty(0);
        const newLyric = getRandomLyric(newDifficulty);

        set({
          gameState: "playing",
          score: 0,
          combo: 0,
          currentLyric: newLyric,
          userInput: "",
          difficulty: newDifficulty,
          totalTypings: 0,
          correctTypings: 0,
          perfectTypings: 0,
          currentStreak: 0,
          bestStreak: 0,
          timeElapsed: 0,
          isTyping: true,
          countdownNumber: 5,
        });
      },

      updateInput: (text: string) => {
        set({ userInput: text });
      },

      submitTyping: () => {
        const state = get();
        if (!state.currentLyric || state.gameState !== "playing") return;

        const validation: TypingResult = validateTyping(state.userInput, state.currentLyric.text);

        // Debug logging for game store
        console.log("Game Store SubmitTyping Debug:", {
          userInput: state.userInput,
          targetLyric: state.currentLyric.text,
          validation,
          gameState: state.gameState,
          isTyping: state.isTyping,
        });

        const newTotalTypings = state.totalTypings + 1;
        const newCorrectTypings = state.correctTypings + (validation.isCorrect ? 1 : 0);
        const newPerfectTypings = state.perfectTypings + (validation.perfect ? 1 : 0);

        let newScore = state.score;
        let newCombo = state.combo;
        let newCurrentStreak = state.currentStreak;
        let newBestStreak = state.bestStreak;

        if (validation.isCorrect) {
          // Calculate score
          const scorePoints = calculateScore({
            isCorrect: validation.isCorrect,
            accuracy: validation.accuracy,
            combo: state.combo,
            perfect: validation.perfect,
          });

          newScore = state.score + scorePoints;
          newCombo = state.combo + 1;
          newCurrentStreak = state.currentStreak + 1;
          newBestStreak = Math.max(state.bestStreak, newCurrentStreak);

          // Update high score if needed
          if (newScore > state.highScore) {
            get().updateHighScore(newScore);
          }

          // Load next lyric with updated difficulty
          const updatedDifficulty = getDifficulty(newScore);
          const nextLyric = getRandomLyric(updatedDifficulty);

          set({
            score: newScore,
            combo: newCombo,
            currentLyric: nextLyric,
            userInput: "",
            difficulty: updatedDifficulty,
            totalTypings: newTotalTypings,
            correctTypings: newCorrectTypings,
            perfectTypings: newPerfectTypings,
            currentStreak: newCurrentStreak,
            bestStreak: newBestStreak,
            timeElapsed: 0,
          });
        } else {
          // Reset combo and streak on incorrect typing
          newCombo = 0;
          newCurrentStreak = 0;

          set({
            combo: newCombo,
            currentStreak: newCurrentStreak,
            totalTypings: newTotalTypings,
            correctTypings: newCorrectTypings,
            perfectTypings: newPerfectTypings,
            userInput: "",
            timeElapsed: 0,
          });
        }
      },

      resetCombo: () => {
        set({ combo: 0, currentStreak: 0 });
      },

      incrementCombo: () => {
        const state = get();
        set({
          combo: state.combo + 1,
          currentStreak: state.currentStreak + 1,
          bestStreak: Math.max(state.bestStreak, state.currentStreak + 1),
        });
      },

      gameOver: () => {
        set({
          gameState: "gameOver",
          isTyping: false,
        });
      },

      restartGame: () => {
        const newDifficulty = getDifficulty(0);
        const newLyric = getRandomLyric(newDifficulty);

        set({
          gameState: "playing",
          score: 0,
          combo: 0,
          currentLyric: newLyric,
          userInput: "",
          difficulty: newDifficulty,
          totalTypings: 0,
          correctTypings: 0,
          perfectTypings: 0,
          currentStreak: 0,
          bestStreak: 0,
          timeElapsed: 0,
          isTyping: true,
          countdownNumber: 5,
        });
      },

      pauseGame: () => {
        set({ isTyping: false });
      },

      resumeGame: () => {
        set({ isTyping: true });
      },

      loadNextLyric: () => {
        const state = get();
        const newDifficulty = getDifficulty(state.score);
        const newLyric = getRandomLyric(newDifficulty);

        set({
          currentLyric: newLyric,
          difficulty: newDifficulty,
          userInput: "",
          timeElapsed: 0,
        });
      },

      updateHighScore: (newScore: number) => {
        set({ highScore: newScore });
      },

      resetStats: () => {
        set({
          highScore: 0,
          totalTypings: 0,
          correctTypings: 0,
          perfectTypings: 0,
          bestStreak: 0,
        });
      },

      setDifficulty: (difficulty: DifficultyConfig) => {
        set({ difficulty });
      },
    }),
    {
      name: "typing-rap-battle-storage",
      partialize: (state) => ({
        highScore: state.highScore,
        totalTypings: state.totalTypings,
        correctTypings: state.correctTypings,
        perfectTypings: state.perfectTypings,
        bestStreak: state.bestStreak,
      }),
    }
  )
);

// Selector hooks for better performance
export const useGameState = () => useGameStore((state) => state.gameState);
export const useScore = () => useGameStore((state) => state.score);
export const useCombo = () => useGameStore((state) => state.combo);
export const useCurrentLyric = () => useGameStore((state) => state.currentLyric);
export const useUserInput = () => useGameStore((state) => state.userInput);
export const useDifficulty = () => useGameStore((state) => state.difficulty);
export const useHighScore = () => useGameStore((state) => state.highScore);
export const useCountdownNumber = () => useGameStore((state) => state.countdownNumber);
export const useGameStats = () => {
  const totalTypings = useGameStore((state) => state.totalTypings);
  const correctTypings = useGameStore((state) => state.correctTypings);
  const perfectTypings = useGameStore((state) => state.perfectTypings);
  const currentStreak = useGameStore((state) => state.currentStreak);
  const bestStreak = useGameStore((state) => state.bestStreak);

  return useMemo(
    () => ({
      totalTypings,
      correctTypings,
      perfectTypings,
      currentStreak,
      bestStreak,
      accuracy: totalTypings > 0 ? (correctTypings / totalTypings) * 100 : 0,
      perfectRate: totalTypings > 0 ? (perfectTypings / totalTypings) * 100 : 0,
    }),
    [totalTypings, correctTypings, perfectTypings, currentStreak, bestStreak]
  );
};

// Action hooks
export const useGameActions = () => {
  const startCountdown = useGameStore((state) => state.startCountdown);
  const startGame = useGameStore((state) => state.startGame);
  const updateInput = useGameStore((state) => state.updateInput);
  const submitTyping = useGameStore((state) => state.submitTyping);
  const resetCombo = useGameStore((state) => state.resetCombo);
  const incrementCombo = useGameStore((state) => state.incrementCombo);
  const gameOver = useGameStore((state) => state.gameOver);
  const restartGame = useGameStore((state) => state.restartGame);
  const pauseGame = useGameStore((state) => state.pauseGame);
  const resumeGame = useGameStore((state) => state.resumeGame);
  const loadNextLyric = useGameStore((state) => state.loadNextLyric);
  const updateHighScore = useGameStore((state) => state.updateHighScore);
  const resetStats = useGameStore((state) => state.resetStats);
  const setDifficulty = useGameStore((state) => state.setDifficulty);

  return useMemo(
    () => ({
      startCountdown,
      startGame,
      updateInput,
      submitTyping,
      resetCombo,
      incrementCombo,
      gameOver,
      restartGame,
      pauseGame,
      resumeGame,
      loadNextLyric,
      updateHighScore,
      resetStats,
      setDifficulty,
    }),
    [
      startCountdown,
      startGame,
      updateInput,
      submitTyping,
      resetCombo,
      incrementCombo,
      gameOver,
      restartGame,
      pauseGame,
      resumeGame,
      loadNextLyric,
      updateHighScore,
      resetStats,
      setDifficulty,
    ]
  );
};
