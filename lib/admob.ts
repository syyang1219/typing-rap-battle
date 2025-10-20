import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdOptions } from "@capacitor-community/admob";

interface AdMobConfig {
  bannerAdId: string;
  interstitialAdId: string;
  testMode: boolean;
}

class AdManager {
  private isInitialized = false;
  private bannerAdId: string;
  private interstitialAdId: string;
  private testMode: boolean;
  private interstitialLoaded = false;

  constructor() {
    this.bannerAdId = process.env.NEXT_PUBLIC_ADMOB_BANNER_ID || "";
    this.interstitialAdId = process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID || "";
    this.testMode = process.env.NEXT_PUBLIC_ADMOB_TEST_MODE === "true";
  }

  /**
   * Initialize AdMob with configuration
   */
  async initialize(): Promise<void> {
    try {
      if (this.isInitialized) {
        console.log("AdMob already initialized");
        return;
      }

      // Check if we're in a browser environment
      if (typeof window === "undefined") {
        console.log("AdMob: Not in browser environment, skipping initialization");
        return;
      }

      // Check if AdMob is available
      if (!AdMob) {
        console.warn("AdMob: @capacitor-community/admob not available");
        return;
      }

      // Initialize AdMob
      await AdMob.initialize();

      this.isInitialized = true;
      console.log("AdMob initialized successfully", { testMode: this.testMode });
    } catch (error) {
      console.error("AdMob initialization failed:", error);
      // Don't throw error to prevent app from crashing
    }
  }

  /**
   * Show banner ad at the bottom of the screen
   */
  async showBanner(): Promise<void> {
    try {
      if (!this.isInitialized) {
        console.warn("AdMob: Not initialized, skipping banner ad");
        return;
      }

      if (!this.bannerAdId) {
        console.warn("AdMob: Banner ad ID not configured");
        return;
      }

      const adId = this.testMode ? "ca-app-pub-3940256099942544/6300978111" : this.bannerAdId;

      const options: BannerAdOptions = {
        adId,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        isTesting: this.testMode,
      };

      await AdMob.showBanner(options);

      console.log("Banner ad displayed");
    } catch (error) {
      console.error("Failed to show banner ad:", error);
    }
  }

  /**
   * Hide banner ad
   */
  async hideBanner(): Promise<void> {
    try {
      if (!this.isInitialized) {
        return;
      }

      await AdMob.hideBanner();
      console.log("Banner ad hidden");
    } catch (error) {
      console.error("Failed to hide banner ad:", error);
    }
  }

  /**
   * Load interstitial ad for later display
   */
  async loadInterstitial(): Promise<void> {
    try {
      if (!this.isInitialized) {
        console.warn("AdMob: Not initialized, skipping interstitial load");
        return;
      }

      if (!this.interstitialAdId) {
        console.warn("AdMob: Interstitial ad ID not configured");
        return;
      }

      const adId = this.testMode ? "ca-app-pub-3940256099942544/1033173712" : this.interstitialAdId;

      const options: AdOptions = {
        adId,
        isTesting: this.testMode,
      };

      await AdMob.prepareInterstitial(options);

      this.interstitialLoaded = true;
      console.log("Interstitial ad loaded");
    } catch (error) {
      console.error("Failed to load interstitial ad:", error);
      this.interstitialLoaded = false;
    }
  }

  /**
   * Show interstitial ad (call after game over)
   */
  async showInterstitial(): Promise<void> {
    try {
      if (!this.isInitialized) {
        console.warn("AdMob: Not initialized, skipping interstitial ad");
        return;
      }

      // Check if interstitial is loaded
      if (!this.interstitialLoaded) {
        console.warn("AdMob: Interstitial ad not loaded, attempting to load first");
        await this.loadInterstitial();

        if (!this.interstitialLoaded) {
          console.warn("AdMob: Failed to load interstitial ad, skipping display");
          return;
        }
      }

      await AdMob.showInterstitial();
      this.interstitialLoaded = false; // Reset after showing
      console.log("Interstitial ad displayed");
    } catch (error) {
      console.error("Failed to show interstitial ad:", error);
      this.interstitialLoaded = false;
    }
  }

  /**
   * Check if AdMob is ready to use
   */
  isReady(): boolean {
    return this.isInitialized && typeof window !== "undefined";
  }

  /**
   * Get current configuration
   */
  getConfig(): AdMobConfig {
    return {
      bannerAdId: this.bannerAdId,
      interstitialAdId: this.interstitialAdId,
      testMode: this.testMode,
    };
  }

  /**
   * Reset interstitial loaded state
   */
  resetInterstitial(): void {
    this.interstitialLoaded = false;
  }
}

// Create and export singleton instance
const adManager = new AdManager();

export default adManager;

// Export the class for testing purposes
export { AdManager };

// Legacy exports for backward compatibility
export function initializeAdMob() {
  return adManager.initialize();
}

export function showInterstitialAd() {
  return adManager.showInterstitial();
}
