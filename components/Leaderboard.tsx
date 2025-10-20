"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTop10 } from "@/lib/firebase";
import { LeaderboardEntry } from "@/types/game";
import Button from "./ui/Button";

interface LeaderboardProps {
  onBackToMenu: () => void;
}

export default function Leaderboard({ onBackToMenu }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      setError("");
      const data = await getTop10();
      setLeaderboard(data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("리더보드를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    refreshIntervalRef.current = setInterval(() => {
      fetchLeaderboard();
    }, 30000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Get background color and medal for rank
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-r from-yellow-400 to-yellow-600",
          text: "text-black",
          medal: "🥇",
        };
      case 2:
        return {
          bg: "bg-gradient-to-r from-gray-300 to-gray-400",
          text: "text-black",
          medal: "🥈",
        };
      case 3:
        return {
          bg: "bg-gradient-to-r from-amber-600 to-amber-700",
          text: "text-white",
          medal: "🥉",
        };
      default:
        return {
          bg: "bg-gray-700",
          text: "text-white",
          medal: "",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      {/* Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🏆 Top 10 Rankings</h1>
        <p className="text-xl text-gray-300">최고의 타이핑 실력을 자랑하는 플레이어들</p>
      </motion.div>

      {/* Leaderboard Container */}
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">리더보드를 불러오는 중...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">😞</div>
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Button onClick={fetchLeaderboard} className="bg-yellow-400 text-black">
              다시 시도
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && leaderboard.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-600 text-lg mb-4">아직 랭킹이 없습니다</p>
            <p className="text-gray-500">첫 번째 기록을 만들어보세요!</p>
          </div>
        )}

        {/* Leaderboard List */}
        {!isLoading && !error && leaderboard.length > 0 && (
          <div className="p-6">
            <AnimatePresence>
              {leaderboard.map((entry, index) => {
                const rankStyle = getRankStyle(entry.rank);
                return (
                  <motion.div
                    key={`${entry.name}-${entry.score}-${entry.timestamp}`}
                    className={`mb-3 p-4 rounded-lg ${rankStyle.bg} ${rankStyle.text} flex items-center justify-between`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Rank and Medal */}
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl font-bold min-w-[3rem]">
                        {rankStyle.medal} {entry.rank}
                      </div>
                      <div className="text-lg font-semibold truncate max-w-[200px]">{entry.name}</div>
                    </div>

                    {/* Score */}
                    <div className="text-xl font-bold">{entry.score.toLocaleString()}점</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Footer with refresh info */}
        {!isLoading && !error && leaderboard.length > 0 && (
          <div className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
            <p>30초마다 자동으로 업데이트됩니다</p>
          </div>
        )}
      </motion.div>

      {/* Back to Menu Button */}
      <motion.div
        className="mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          onClick={onBackToMenu}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-bold"
        >
          🏠 메뉴로 돌아가기
        </Button>
      </motion.div>
    </div>
  );
}
