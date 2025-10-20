"use client";

import { useGameStore } from "@/store/game-store";
import { calculateAccuracy } from "@/lib/game/typing-validator";

interface TypingInfoProps {
  className?: string;
}

export default function TypingInfo({ className = "" }: TypingInfoProps) {
  const { currentLyric, userInput } = useGameStore();

  if (!currentLyric) return null;

  // Calculate accuracy
  const accuracy = calculateAccuracy(userInput, currentLyric.text);
  const isCorrect = accuracy >= 60;

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Accuracy display */}
      <div className="text-white mb-2">
        <span className="text-sm text-gray-300">정확도</span>
        <span className={`ml-2 text-lg font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {accuracy.toFixed(1)}%
        </span>
      </div>

      {/* Microphone icon and typing indicator */}
      <div className="flex items-center gap-2 text-white">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
