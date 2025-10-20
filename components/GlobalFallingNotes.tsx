"use client";

import FallingNotes from "./game/FallingNotes";

export default function GlobalFallingNotes() {
  return <FallingNotes isPlaying={true} bpm={100} explodeNotes={null} />;
}
