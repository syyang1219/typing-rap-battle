"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GameScreen from "@/components/game/GameScreen";
import GameOver from "@/components/game/GameOver";
import Countdown from "@/components/game/Countdown";
import { useGameStore } from "@/store/game-store";

export default function GamePage() {
  const router = useRouter();
  const { gameState, score, highScore, startCountdown, restartGame } = useGameStore();

  useEffect(() => {
    // 카운트다운 시작
    startCountdown();
  }, [startCountdown]);

  const handleRestart = () => {
    restartGame();
  };

  const handleBackToMenu = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen pb-[50px] bg-gradient-to-b from-purple-900 via-black to-black">
      {gameState === "countdown" && <Countdown />}

      {gameState === "playing" && <GameScreen />}

      {gameState === "gameOver" && (
        <GameOver score={score} highScore={highScore} onRestart={handleRestart} onBackToMenu={handleBackToMenu} />
      )}
    </main>
  );
}
