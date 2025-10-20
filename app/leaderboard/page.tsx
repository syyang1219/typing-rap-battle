"use client";

import Leaderboard from "@/components/Leaderboard";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen pb-[50px] bg-gradient-to-b from-blue-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <Leaderboard onBackToMenu={() => router.push("/")} />

        <button
          onClick={() => router.push("/")}
          className="w-full mt-8 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          ← 메인 메뉴
        </button>
      </div>
    </main>
  );
}
