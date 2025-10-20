"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitScore } from "@/lib/firebase";
import Button from "../ui/Button";
import FallingNotes from "./FallingNotes";
import adManager from "@/lib/admob";

interface RankingRegistrationProps {
  score: number;
  onComplete: () => void;
  onBackToMenu: () => void;
}

export default function RankingRegistration({ score, onComplete, onBackToMenu }: RankingRegistrationProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !isSubmitting) {
      setIsSubmitting(true);
      setError("");

      try {
        await submitScore(name.trim(), score);
        console.log(`Score saved for ${name}: ${score}`);
        setIsSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      } catch (error) {
        console.error("Error saving score:", error);
        setError("랭킹 등록에 실패했습니다. 다시 시도해주세요.");
        setIsSubmitting(false);
      }
    }
  };

  const handleSkip = async () => {
    try {
      await adManager.showInterstitial();
    } catch (error) {
      console.log("Ad error:", error);
    } finally {
      onBackToMenu();
    }
  };

  return (
    <div className="inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 p-4">
      <div className="h-screen w-screen grid place-items-center mt-[-100px]">
        {/* Falling Notes Background Effect */}
        <FallingNotes isPlaying={true} bpm={80} explodeNotes={null} />

        <motion.div
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 New High Score!</h2>
            <p className="text-lg text-gray-600 mb-2">
              You scored <span className="font-bold text-yellow-500 text-2xl">🎯 {score.toLocaleString()} Points</span>
            </p>
            <p className="text-sm text-gray-500">Enter your name for the leaderboard</p>
          </div>

          {/* Form */}
          {!isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Field */}
              <div className="space-y-5 pt-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-[98%] px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg text-center focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50"
                  maxLength={20}
                  autoFocus
                  disabled={isSubmitting}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && name.trim() && !isSubmitting) {
                      handleSubmit(e as React.FormEvent<HTMLInputElement>);
                    }
                  }}
                />
                {error && <p className="text-red-500 text-sm mt-3 text-center font-medium">{error}</p>}
                {isSubmitting && (
                  <p className="text-blue-500 text-sm mt-3 text-center font-medium animate-pulse">랭킹에 등록 중...</p>
                )}
              </div>

              {/* Buttons */}
              <div className="space-y-5 pt-10">
                <Button
                  type="submit"
                  disabled={!name.trim() || isSubmitting}
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  🏆 랭킹 등록하기
                </Button>

                <Button
                  type="button"
                  onClick={handleSkip}
                  disabled={isSubmitting}
                  variant="secondary"
                  className="w-full py-3 text-base font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  🏠 메뉴로 돌아가기
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
