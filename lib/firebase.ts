import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { LeaderboardEntry } from "@/types/game";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firestore
export const db: Firestore = getFirestore(app);

// Collection references
const LEADERBOARD_COLLECTION = "leaderboard";

/**
 * Get the top 10 scores from the leaderboard
 * @returns Promise<LeaderboardEntry[]> - Array of leaderboard entries with ranks
 */
export async function getTop10(): Promise<LeaderboardEntry[]> {
  try {
    const leaderboardRef = collection(db, LEADERBOARD_COLLECTION);
    const q = query(leaderboardRef, orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);

    const leaderboard: LeaderboardEntry[] = [];
    let rank = 1;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        rank,
        name: data.name,
        score: data.score,
        timestamp: data.createdAt?.toMillis() || Date.now(),
      });
      rank++;
    });

    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw new Error("Failed to fetch leaderboard");
  }
}

/**
 * Submit a score to the leaderboard
 * @param name - Player's name
 * @param score - Player's score
 * @returns Promise<void>
 */
export async function submitScore(name: string, score: number): Promise<void> {
  try {
    const leaderboardRef = collection(db, LEADERBOARD_COLLECTION);

    await addDoc(leaderboardRef, {
      name: name.trim(),
      score,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error submitting score:", error);
    throw new Error("Failed to submit score");
  }
}

/**
 * Check if a score qualifies for the top 10
 * @param score - Score to check
 * @returns Promise<boolean> - True if score qualifies for top 10
 */
export async function isTop10Score(score: number): Promise<boolean> {
  try {
    const top10 = await getTop10();

    // If there are less than 10 entries, any score qualifies
    if (top10.length < 10) {
      return true;
    }

    // If the score is higher than the 10th place score, it qualifies
    const lowestTop10Score = top10[top10.length - 1]?.score || 0;
    return score > lowestTop10Score;
  } catch (error) {
    console.error("Error checking top 10 qualification:", error);
    // In case of error, assume it qualifies to be safe
    return true;
  }
}

/**
 * Initialize Firebase (for compatibility with existing code)
 * @deprecated Use the exported db instance directly
 */
export function initializeFirebase(): Firestore {
  return db;
}

/**
 * Save score (for compatibility with existing code)
 * @deprecated Use submitScore() instead
 */
export async function saveScore(name: string, score: number): Promise<void> {
  return submitScore(name, score);
}
