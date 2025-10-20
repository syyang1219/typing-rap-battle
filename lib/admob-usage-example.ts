// Example usage of AdMob manager in your game components

import adManager from "./admob";

// Example: Initialize AdMob when the app starts
export async function initializeAds() {
  try {
    await adManager.initialize();
    console.log("Ads initialized successfully");
  } catch (error) {
    console.error("Failed to initialize ads:", error);
  }
}

// Example: Show banner ad on game screen
export async function showGameBanner() {
  try {
    await adManager.showBanner();
  } catch (error) {
    console.error("Failed to show banner ad:", error);
  }
}

// Example: Hide banner ad when leaving game
export async function hideGameBanner() {
  try {
    await adManager.hideBanner();
  } catch (error) {
    console.error("Failed to hide banner ad:", error);
  }
}

// Example: Preload interstitial ad when game starts
export async function preloadInterstitial() {
  try {
    await adManager.loadInterstitial();
  } catch (error) {
    console.error("Failed to preload interstitial ad:", error);
  }
}

// Example: Show interstitial ad after game over
export async function showGameOverAd() {
  try {
    await adManager.showInterstitial();
  } catch (error) {
    console.error("Failed to show interstitial ad:", error);
  }
}

// Example: Integration in a React component
/*
import { useEffect } from 'react';
import { initializeAds, showGameBanner, hideGameBanner, preloadInterstitial, showGameOverAd } from '@/lib/admob-usage-example';

export function GameComponent() {
  useEffect(() => {
    // Initialize ads when component mounts
    initializeAds();
    
    // Preload interstitial ad
    preloadInterstitial();
    
    // Show banner ad
    showGameBanner();
    
    // Cleanup: hide banner when component unmounts
    return () => {
      hideGameBanner();
    };
  }, []);

  const handleGameOver = async () => {
    // Show interstitial ad after game over
    await showGameOverAd();
  };

  return (
    <div>
      // Your game content
    </div>
  );
}
*/
