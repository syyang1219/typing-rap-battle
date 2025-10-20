"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ComboProps {
  combo: number;
}

export default function Combo({ combo }: ComboProps) {
  const [displayCombo, setDisplayCombo] = useState(combo);

  console.log("Combo component rendered with combo:", combo);

  // Smooth combo animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayCombo(combo);
    }, 50);
    return () => clearTimeout(timer);
  }, [combo]);

  return (
    <motion.div
      className="fixed top-4 left-4 z-[9999] pointer-events-none"
      style={{ position: "fixed", top: "16px", left: "16px", zIndex: 9999 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait">
        {combo > 0 && (
          <motion.div
            key={combo}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="text-red-400 text-3xl">🔥</span>
            <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">{displayCombo}</span>
          </motion.div>
        )}
        {combo === 0 && (
          <div className="flex items-center gap-2 opacity-50">
            <span className="text-gray-400 text-3xl">🔥</span>
            <span className="text-4xl md:text-5xl font-bold text-gray-400 drop-shadow-2xl">00</span>
          </div>
        )}
      </AnimatePresence>

      {/* Combo milestone celebration */}
      <AnimatePresence>
        {combo > 0 && combo % 5 === 0 && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-6xl md:text-8xl font-bold text-orange-400 drop-shadow-2xl">{combo} COMBO!</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
