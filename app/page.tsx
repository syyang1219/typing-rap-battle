"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LeaderboardInfo from "@/components/LeaderboardInfo";
import FallingNotes from "@/components/game/FallingNotes";
import adManager from "@/lib/admob";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // AdMob 초기화
    adManager.initialize();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen pb-[50px] bg-gradient-to-b from-purple-900 to-black">
      {/* Falling Notes Background Effect */}
      <FallingNotes isPlaying={true} bpm={80} explodeNotes={null} />

      <div className="text-center space-y-8 px-4">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold text-yellow-400 animate-pulse">🎤 타이핑 랩 배틀</h1>

        <p className="text-xl text-white">무한으로 이어지는 랩 타이핑 게임!</p>

        {/* 버튼들 */}
        <div className="space-y-4 mt-12">
          <button
            onClick={() => router.push("/game")}
            className="w-64 py-4 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl hover:scale-105 transition-transform"
          >
            🎮 게임 시작 🎮
          </button>
        </div>

        {/* 설명 */}
        <div className="text-gray-300 space-y-2">
          <LeaderboardInfo />
        </div>
      </div>
    </main>
  );
}
