"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameActions } from "@/store/game-store";

export default function Countdown() {
  const { startGame } = useGameActions();
  const [countdownNumber, setCountdownNumber] = useState(5);

  useEffect(() => {
    if (countdownNumber > 0) {
      const timer = setTimeout(() => {
        if (countdownNumber === 1) {
          // 카운트다운이 0이 되면 게임 시작
          startGame();
        } else {
          // 카운트다운 숫자 감소
          setCountdownNumber((prev) => prev - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdownNumber, startGame]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 z-50">
      {/* grid를 사용한 중앙 정렬 */}
      <div className="h-screen w-screen grid place-items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {countdownNumber > 0 ? (
            <motion.div
              key={countdownNumber}
              className="text-[12rem] md:text-[20rem] lg:text-[24rem] font-black text-white drop-shadow-2xl"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{
                scale: [1.2, 1, 0.8],
                opacity: [0, 1, 0.7],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                times: [0, 0.3, 1],
              }}
            >
              {countdownNumber}
            </motion.div>
          ) : (
            <motion.div
              className="text-8xl md:text-[12rem] lg:text-[16rem] font-black text-green-400 drop-shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1.2, 1],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                times: [0, 0.5, 1],
              }}
            >
              START!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
