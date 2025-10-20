"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const [showAnimation, setShowAnimation] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  console.log("Score component rendered with score:", score);

  // Smooth score animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 50);
    return () => clearTimeout(timer);
  }, [score]);

  // Handle score increase animation
  useEffect(() => {
    if (score > lastScore) {
      const increase = score - lastScore;
      setScoreIncrease(increase);
      setShowAnimation(true);

      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      // Hide animation after 1 second
      animationTimeoutRef.current = setTimeout(() => {
        setShowAnimation(false);
      }, 1000);

      setLastScore(score);
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [score, lastScore]);

  return (
    <motion.div
      className="fixed top-4 right-4 z-[9999] pointer-events-none"
      style={{ position: "fixed", top: "16px", right: "16px", zIndex: 9999 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <motion.div
        key={displayScore}
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center gap-2"
      >
        <span className="text-yellow-400 text-3xl">🎯</span>
        <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
          {displayScore.toLocaleString()}
        </span>
      </motion.div>

      {/* Score increase animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="absolute top-20 right-0 z-40 pointer-events-none"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: -80,
              scale: 1.2,
              transition: {
                duration: 1.0,
                ease: "easeOut",
                y: { duration: 1.0, ease: "easeOut" },
                opacity: { duration: 0.8, ease: "easeOut" },
              },
            }}
            exit={{
              opacity: 0,
              y: -120,
              scale: 0.8,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
          >
            <div className="text-2xl font-bold text-green-400 drop-shadow-lg">+{scoreIncrease}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
