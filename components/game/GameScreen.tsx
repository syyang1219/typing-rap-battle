"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  useGameState,
  useScore,
  useCombo,
  useCurrentLyric,
  useUserInput,
  useDifficulty,
  useHighScore,
  useGameStats,
  useGameActions,
} from "@/store/game-store";
import Combo from "./Combo";
import Score from "./Score";
import TypingInput from "./TypingInput";
import GameOver from "./GameOver";
import BeatVisualizer from "./BeatVisualizer";
import Countdown from "./Countdown";
import TypingInfo from "./TypingInfo";
import FallingNotes from "./FallingNotes";

export default function GameScreen() {
  // Zustand store state
  const gameState = useGameState();
  const score = useScore();
  const combo = useCombo();
  const currentLyric = useCurrentLyric();
  const userInput = useUserInput();
  const difficulty = useDifficulty();
  const highScore = useHighScore();
  const gameStats = useGameStats();
  const { updateInput, submitTyping, gameOver, restartGame, startCountdown } = useGameActions();

  console.log("GameScreen - score:", score, "combo:", combo);

  // Local state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [explodeNotes, setExplodeNotes] = useState<"success" | "perfect" | null>(null);

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown effect
  useEffect(() => {
    if (gameState === "playing" && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0.1) {
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState, timeRemaining]);

  // Handle game over when timer reaches zero
  useEffect(() => {
    if (gameState === "playing" && timeRemaining <= 0.1 && timeRemaining > 0) {
      gameOver();
    }
  }, [gameState, timeRemaining, gameOver]);

  // Start timer when new lyric loads
  useEffect(() => {
    if (gameState === "playing" && currentLyric) {
      setTimeRemaining(difficulty.timeLimit);
    }
  }, [gameState, currentLyric, difficulty.timeLimit]);

  // Handle typing input changes
  const handleInputChange = (text: string) => {
    updateInput(text);
  };

  // Track previous score for comparison
  const [previousScore, setPreviousScore] = useState(score);

  // Handle score changes to determine typing result
  useEffect(() => {
    if (score > previousScore) {
      // Score increased, typing was correct
      const isPerfect = gameStats.accuracy > 95;

      // Trigger falling notes explosion
      setExplodeNotes(isPerfect ? "perfect" : "success");

      // Reset explosion trigger after animation
      setTimeout(() => setExplodeNotes(null), 2000);
    }
    setPreviousScore(score);
  }, [score, previousScore, gameStats.accuracy]);

  // Handle typing submission
  const handleTypingSubmit = () => {
    if (!currentLyric || gameState !== "playing") return;

    // Submit typing
    submitTyping();
  };

  // Handle restart
  const handleRestart = () => {
    startCountdown();
    setExplodeNotes(null);
  };

  // Auto-focus typing input when game starts
  useEffect(() => {
    if (gameState === "playing") {
      // Focus will be handled by TypingInput component
    }
  }, [gameState, currentLyric]);

  // Show countdown screen
  if (gameState === "countdown") {
    return <Countdown />;
  }

  // Show game over screen
  if (gameState === "gameOver") {
    return (
      <GameOver
        score={score}
        highScore={highScore}
        onRestart={handleRestart}
        onBackToMenu={restartGame}
        onShowLeaderboard={() => (window.location.href = "/leaderboard")}
      />
    );
  }

  // Don't render if not playing
  if (gameState !== "playing") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Falling Notes Background Effect */}
      <FallingNotes isPlaying={gameState === "playing"} bpm={difficulty.bpm} explodeNotes={explodeNotes} />

      {/* Combo - Top Left (Red Circle Area) */}
      <Combo combo={combo} />

      <div className="fixed top-16 bottom-20 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <motion.div
          className="text-8xl md:text-9xl drop-shadow-lg flex"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.1, 1.0],
            opacity: [0, 1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {["🎤", "🎤", "🎤", "🎤", "🎤"].map((mic, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{ marginRight: "0.2em" }}
            >
              {mic}
            </motion.span>
          ))}
        </motion.div>
      </div>
      {/* Score - Top Right (Blue Circle Area) */}
      <Score score={score} />

      {/* Main game content - centered layout */}
      <div className="flex flex-col h-screen pt-20 pb-8 px-4">
        {/* Timer, Accuracy, and Typing Input - Center */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Blue Circle Area - Current lyric display - Above Timer */}
          <motion.div
            className="text-center mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
              key={currentLyric?.text} // Re-animate when lyric changes
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentLyric?.text}
            </motion.h2>
          </motion.div>
          {/* Timer display */}
          <div className="text-center mb-6  py-8">
            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{timeRemaining.toFixed(1)}s</div>
            <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-2 mb-16">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: `${(timeRemaining / difficulty.timeLimit) * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Typing Input */}
          <div className="w-full max-w-2xl mx-auto">
            {/* Microphone and typing indicator above input */}
            <div className="mb-8 flex justify-center ">
              <TypingInfo />
            </div>
            <div className="mt-8 flex justify-center">
              <TypingInput
                targetLyric={currentLyric?.text || ""}
                userInput={userInput}
                onInputChange={handleInputChange}
                onSubmit={handleTypingSubmit}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Beat Visualizer at bottom */}
      <BeatVisualizer bpm={difficulty.bpm} isPlaying={gameState === "playing"} />
    </div>
  );
}
