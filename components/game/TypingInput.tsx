"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TypingInputProps {
  targetLyric: string;
  userInput: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}

export default function TypingInput({ targetLyric, userInput, onInputChange, onSubmit }: TypingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 mt-16">
      {/* Input field */}
      <div className="w-full max-w-2xl">
        <motion.div
          className={`
            relative transition-all duration-300
            ${focused ? "scale-105" : "scale-100"}
          `}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mt-4 text-center">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="여기에 타이핑하세요..."
              className={`
              mt-16 w-full px-6 py-8 text-2xl md:text-3xl font-mono
              border-2 rounded-xl transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-blue-300
              ${focused ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:border-gray-400"}
            `}
              style={{
                minHeight: "30px",
                fontSize: "clamp(1.2rem, 4vw, 2rem)",
              }}
            />
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{
                width: `${Math.min((userInput.length / targetLyric.length) * 100, 100)}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Instructions */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            정확히 타이핑하고 <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd>를 눌러 제출하세요
          </p>
        </div>
      </div>

      {/* Submit button for mobile */}
      <motion.button
        onClick={onSubmit}
        hidden={true}
        className="
          mt-6 px-8 py-3 bg-blue-500 text-white text-lg font-semibold
          rounded-xl hover:bg-blue-600 active:bg-blue-700
          transition-all duration-200 shadow-lg hover:shadow-xl
          md:hidden
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        제출 (Enter)
      </motion.button>
    </div>
  );
}
