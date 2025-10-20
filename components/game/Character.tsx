"use client";

import { motion } from "framer-motion";

interface CharacterProps {
  state: "idle" | "typing" | "success" | "gameOver";
}

export default function Character({ state }: CharacterProps) {
  // Animation variants for different states
  const variants = {
    idle: {
      y: [0, -10, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
    typing: {
      scale: [1, 1.2, 1],
      y: [0, -5, 0],
      transition: {
        duration: 0.3,
      },
    },
    success: {
      rotate: [0, 360],
      scale: [1, 1.3, 1],
      y: [0, -20, 0],
      transition: {
        duration: 0.5,
      },
    },
    gameOver: {
      y: [0, 100],
      opacity: [1, 0],
      rotate: [0, 15],
      scale: [1, 0.8],
      transition: {
        duration: 0.8,
      },
    },
  };

  // Get the appropriate animation based on state
  const getAnimation = () => {
    switch (state) {
      case "idle":
        return variants.idle;
      case "typing":
        return variants.typing;
      case "success":
        return variants.success;
      case "gameOver":
        return variants.gameOver;
      default:
        return variants.idle;
    }
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <motion.div className="relative" animate={getAnimation()} initial={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}>
        {/* Main character - Microphone emoji */}
        <div className="text-8xl md:text-9xl drop-shadow-lg">🎤</div>

        {/* Success sparkles effect */}
        {state === "success" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Sparkle 1 */}
            <motion.div
              className="absolute -top-4 -right-4 text-2xl"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ✨
            </motion.div>
            {/* Sparkle 2 */}
            <motion.div
              className="absolute -top-2 -left-6 text-xl"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, -180, -360],
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ⭐
            </motion.div>
            {/* Sparkle 3 */}
            <motion.div
              className="absolute -bottom-2 -right-2 text-lg"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 90, 180],
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              💫
            </motion.div>
          </motion.div>
        )}

        {/* Typing effect - Sound waves */}
        {state === "typing" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <motion.div
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-2xl"
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              〰️
            </motion.div>
            <motion.div
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-xl"
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            >
              〰️
            </motion.div>
            <motion.div
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-lg"
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
            >
              〰️
            </motion.div>
          </motion.div>
        )}

        {/* Game over effect - Sad face */}
        {state === "gameOver" && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 0], y: [-10, -20, -30] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            😢
          </motion.div>
        )}

        {/* Idle breathing effect */}
        {state === "idle" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-yellow-200 rounded-full blur-sm"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Character state indicator (for debugging - can be removed) */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-50">
        {state}
      </div>
    </div>
  );
}
