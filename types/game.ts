// 게임 상태
export type GameState = "menu" | "countdown" | "playing" | "gameOver";

// 난이도 설정
export interface DifficultyConfig {
  bpm: number; // 비트 속도
  syllablesMin: number; // 최소 글자 수
  syllablesMax: number; // 최대 글자 수
  timeLimit: number; // 제한 시간 (초)
}

// 가사 데이터
export interface Lyric {
  text: string;
  bpm: number;
  syllables: number;
  artist?: string;
}

// 타이핑 검증 결과
export interface TypingResult {
  isCorrect: boolean;
  accuracy: number;
  errorPosition?: number;
  perfect: boolean;
}

// 랭킹 엔트리
export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  timestamp: number;
}
