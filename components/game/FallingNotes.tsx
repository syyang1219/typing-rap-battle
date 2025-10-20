"use client";

import { useEffect, useState } from "react";

interface Note {
  id: string;
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
  emoji: string;
  speed: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  isExploding: boolean;
}

const PARTICLE_EMOJIS = ["🎵", "🎤", "⭐", "🔥", "💫"];

export default function FallingNotes({
  isPlaying,
  bpm,
  explodeNotes,
}: {
  isPlaying: boolean;
  bpm: number;
  explodeNotes: "success" | "perfect" | null;
}) {
  const [notes, setNotes] = useState<Note[]>([]);

  console.log(
    "FallingNotes rendered - isPlaying:",
    isPlaying,
    "bpm:",
    bpm,
    "notes count:",
    notes.length,
    "explodeNotes:",
    explodeNotes
  );

  // Generate notes based on BPM
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    // Note colors - gold, orange, green variations
    const noteColors = [
      { bg: "#FFD700", border: "#FFA500" }, // Gold
      { bg: "#FF6B35", border: "#FF4500" }, // Orange
      { bg: "#32CD32", border: "#228B22" }, // Green
      { bg: "#FFA500", border: "#FF8C00" }, // Dark Gold
      { bg: "#FF4500", border: "#DC143C" }, // Red Orange
      { bg: "#00FF7F", border: "#00CED1" }, // Spring Green
    ];

    const generateNote = (): Note => {
      const id = Math.random().toString(36).substr(2, 9);
      const x = Math.random() * 100; // Random horizontal position (0-100%)
      const y = -Math.random() * 20 - 10; // Start above screen with random offset
      const colorIndex = Math.floor(Math.random() * noteColors.length);
      const color = noteColors[colorIndex].bg;
      const width = Math.random() * 10 + 10; // Random width between 10-20px
      const height = Math.random() * 30 + 20; // Random height between 20-50px
      const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)];
      const speed = Math.random() * 1.5 + 0.8; // Random speed between 0.8-2.3

      return {
        id,
        x,
        y,
        color,
        width,
        height,
        emoji,
        speed,
        vx: 0,
        vy: 0,
        life: 1,
        maxLife: 1,
        isExploding: false,
      };
    };

    // Generate notes based on BPM (faster BPM = more frequent notes)
    const interval = setInterval(() => {
      setNotes((prev) => {
        // Generate 2-4 notes at once for more density
        const noteCount = Math.floor(Math.random() * 3) + 2; // 2-4 notes
        const newNotes = Array.from({ length: noteCount }, () => generateNote());
        console.log(`Generated ${noteCount} new notes:`, newNotes);
        return [...prev, ...newNotes];
      });
    }, Math.max(100, 800 - bpm * 5)); // Much faster generation for more density

    return () => clearInterval(interval);
  }, [isPlaying, bpm]);

  // Handle explosion effect
  useEffect(() => {
    if (explodeNotes) {
      setNotes((prev) =>
        prev.map((note) => {
          if (!note.isExploding) {
            // Calculate explosion velocity
            const angle = Math.random() * Math.PI * 2;
            const explosionSpeed = explodeNotes === "perfect" ? Math.random() * 15 + 10 : Math.random() * 10 + 5;

            return {
              ...note,
              isExploding: true,
              vx: Math.cos(angle) * explosionSpeed,
              vy: Math.sin(angle) * explosionSpeed,
              life: 1,
              maxLife: 1,
            };
          }
          return note;
        })
      );
    }
  }, [explodeNotes]);

  // Update note positions and remove off-screen notes
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setNotes((prev) =>
        prev
          .map((note) => {
            if (note.isExploding) {
              // Exploding particles
              const newX = note.x + note.vx;
              const newY = note.y + note.vy;
              const newVx = note.vx * 0.98; // Slow down over time
              const newVy = note.vy * 0.98 + 0.1; // Add gravity
              const newLife = note.life - 0.02; // Fade out over time

              return {
                ...note,
                x: newX,
                y: newY,
                vx: newVx,
                vy: newVy,
                life: newLife,
              };
            } else {
              // Normal falling
              return {
                ...note,
                y: note.y + note.speed,
              };
            }
          })
          .filter((note) => {
            if (note.isExploding) {
              return note.life > 0; // Remove when life reaches 0
            }
            return note.y < 110; // Remove notes below screen
          })
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 40,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Falling notes */}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            position: "absolute",
            left: `${note.x}%`,
            top: `${note.y}%`,
            width: `${note.width}px`,
            height: `${note.height}px`,
            backgroundColor: note.color,
            borderRadius: "8px",
            boxShadow: note.isExploding ? `0 0 25px ${note.color}FF` : `0 0 15px ${note.color}80`,
            border: `2px solid ${note.color}CC`,
            zIndex: 40,
            opacity: note.isExploding ? note.life : 0.9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: note.isExploding ? `scale(${1 + (1 - note.life) * 0.5})` : "scale(1)",
            transition: note.isExploding ? "none" : "all 0.1s ease",
          }}
        >
          <span
            style={{
              fontSize: `${Math.min(note.width, note.height) * 0.6}px`,
              lineHeight: 1,
              filter: note.isExploding
                ? `drop-shadow(0 0 8px ${note.color}FF)`
                : "drop-shadow(0 0 3px rgba(0,0,0,0.5))",
            }}
          >
            {note.emoji}
          </span>
        </div>
      ))}
    </div>
  );
}
