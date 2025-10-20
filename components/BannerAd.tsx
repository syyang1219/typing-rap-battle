"use client";

import { useEffect } from "react";
import adManager from "@/lib/admob";

export default function BannerAd() {
  useEffect(() => {
    const showBannerAd = async () => {
      try {
        await adManager.showBanner();
      } catch (error) {
        console.log("Banner ad error:", error);
      }
    };

    showBannerAd();
  }, []);

  return null; // AdMob이 자체적으로 배너를 화면 하단에 표시하므로 컴포넌트는 렌더링할 것이 없음
}
