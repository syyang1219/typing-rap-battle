import type { Metadata } from "next";
import "./globals.css";
import BannerAd from "@/components/BannerAd";

export const metadata: Metadata = {
  title: "타이핑 랩 배틀 - 무한 타이핑 게임",
  description: "리듬에 맞춰 타이핑하고 랭킹에 도전하세요!",
  manifest: "/manifest.json",
  themeColor: "#8B5CF6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "랩배틀",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="랩배틀" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#8B5CF6" />
      </head>
      <body className="overflow-hidden">
        {children}
        <BannerAd />

        {/* Service Worker 등록 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('✅ SW registered'))
                    .catch(err => console.log('❌ SW failed:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
