"use client";

import adManager from "@/lib/admob";
import { isTop10Score } from "@/lib/firebase";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import RankingRegistration from "./RankingRegistration";
import FallingNotes from "./FallingNotes";

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  onBackToMenu: () => void;
  onShowLeaderboard?: () => void;
}

// Confetti component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default function GameOver({ score, highScore, onRestart, onBackToMenu, onShowLeaderboard }: GameOverProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showRankingRegistration, setShowRankingRegistration] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isTop10, setIsTop10] = useState(false);

  useEffect(() => {
    const showAd = async () => {
      try {
        await adManager.showInterstitial();
      } catch (error) {
        console.log("Ad error:", error);
      }
    };

    showAd();
  }, []);

  // Check if it's a new record
  useEffect(() => {
    if (score > highScore) {
      setIsNewRecord(true);
    }
  }, [score, highScore]);

  // Check if score qualifies for top 10 using Firebase
  useEffect(() => {
    const checkTop10Qualification = async () => {
      try {
        console.log(`Checking top 10 qualification for score: ${score}`);
        const qualifies = await isTop10Score(score);
        console.log(`Score ${score} qualifies for top 10:`, qualifies);
        setIsTop10(qualifies);
      } catch (error) {
        console.error("Error checking top 10 qualification:", error);
        // In case of error, assume it qualifies to be safe
        console.log("Error occurred, assuming score qualifies for top 10");
        setIsTop10(true);
      }
    };

    if (score > 0) {
      // For now, always show name input for any score > 0 (temporary fallback)
      console.log(`Score ${score} > 0, showing name input (fallback mode)`);
      setIsTop10(true);

      // Also try Firebase check in background
      checkTop10Qualification();
    }
  }, [score]);

  // Show ranking registration screen if it's a top 10 score
  useEffect(() => {
    console.log(`isTop10: ${isTop10}, will show ranking registration: ${isTop10}`);
    if (isTop10) {
      const timer = setTimeout(() => {
        console.log("Showing ranking registration screen");
        setShowRankingRegistration(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isTop10]);

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger interstitial ad (placeholder)
  useEffect(() => {
    // This would typically trigger an interstitial ad
    console.log("Triggering interstitial ad...");
  }, []);

  const handleRankingComplete = () => {
    setShowRankingRegistration(false);
    // Always redirect to leaderboard after ranking registration
    if (onShowLeaderboard) {
      onShowLeaderboard();
    } else {
      // Fallback to direct navigation
      window.location.href = "/leaderboard";
    }
  };

  const handleRestartWithAd = async () => {
    try {
      await adManager.showInterstitial();
    } catch (error) {
      console.log("Ad error:", error);
    } finally {
      onRestart();
    }
  };

  const handleBackToMenuWithAd = async () => {
    try {
      await adManager.showInterstitial();
    } catch (error) {
      console.log("Ad error:", error);
    } finally {
      onBackToMenu();
    }
  };

  // Show ranking registration screen
  if (showRankingRegistration) {
    return (
      <RankingRegistration score={score} onComplete={handleRankingComplete} onBackToMenu={handleBackToMenuWithAd} />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">
      <div className="h-screen w-screen grid place-items-center mt-[-100px]">
        {/* Falling Notes Background Effect */}
        <FallingNotes isPlaying={true} bpm={80} explodeNotes={null} />

        {/* Confetti Animation */}
        {showConfetti && <Confetti />}

        {/* Main Game Over Content */}
        <motion.div
          className="text-center text-white max-w-2xl mx-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Game Over Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-red-500 mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            GAME OVER
          </motion.h1>

          {/* Final Score */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-2xl md:text-3xl mb-4">Final Score</p>
            <motion.div
              className="text-6xl md:text-8xl font-bold text-yellow-400"
              animate={{
                scale: [1, 1.1, 1],
                textShadow: ["0 0 0px #FFD700", "0 0 20px #FFD700", "0 0 0px #FFD700"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {score.toLocaleString()}
            </motion.div>
          </motion.div>

          {/* High Score */}
          <motion.div
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-gray-300">
              High Score: <span className="text-yellow-400 font-bold">{highScore.toLocaleString()}</span>
            </p>
          </motion.div>

          {/* New Record Badge */}
          {isNewRecord && (
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            >
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full text-2xl md:text-3xl font-bold shadow-lg">
                🏆 NEW RECORD! 🏆
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button
              onClick={handleRestartWithAd}
              className="w-full text-2xl md:text-3xl px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🎮 Play Again
            </Button>
            <Button
              onClick={handleBackToMenuWithAd}
              className="w-full text-2xl md:text-3xl px-12 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🏠 Back to Menu
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
