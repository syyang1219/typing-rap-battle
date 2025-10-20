"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitScore } from "@/lib/firebase";
import Button from "./ui/Button";

interface NameInputProps {
  score: number;
  onClose: () => void;
}

export default function NameInput({ score, onClose }: NameInputProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle input change with character limit
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("이름을 입력해주세요");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await submitScore(name.trim(), score);
      setSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Error submitting score:", err);
      setError("점수 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key submission
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit(e as React.FormEvent<HTMLInputElement>);
    }
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Success State */}
          {success ? (
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">저장 완료!</h2>
              <p className="text-gray-600">점수가 리더보드에 저장되었습니다.</p>
            </motion.div>
          ) : (
            <>
              {/* Title */}
              <motion.div
                className="text-center mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="text-3xl font-bold text-yellow-500 mb-2">Top 10 진입!</h2>
                <p className="text-gray-600">축하합니다! 리더보드에 이름을 남겨보세요.</p>
              </motion.div>

              {/* Score Display */}
              <motion.div
                className="text-center mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full inline-block">
                  <span className="text-2xl font-bold">{score.toLocaleString()}점</span>
                </div>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="mb-6">
                  <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                    플레이어 이름 (최대 10자)
                  </label>
                  <input
                    ref={inputRef}
                    id="playerName"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="이름을 입력하세요"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-center text-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-colors"
                    maxLength={10}
                    disabled={isLoading}
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">{name.length}/10</div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button onClick={onClose} variant="secondary" className="flex-1" disabled={isLoading}>
                    취소
                  </Button>
                  <Button
                    onClick={() => name.trim() && handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                    disabled={!name.trim() || isLoading}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        저장 중...
                      </div>
                    ) : (
                      "저장하기"
                    )}
                  </Button>
                </div>
              </motion.form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
