# AdMob Setup Guide

This guide explains how to set up and use the AdMob manager for mobile ads in your typing rap battle game.

## Prerequisites

1. **AdMob Account**: Create an account at [AdMob Console](https://admob.google.com/)
2. **App Registration**: Register your app in AdMob console
3. **Ad Unit IDs**: Create banner and interstitial ad units

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# AdMob Configuration
NEXT_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx
NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx
NEXT_PUBLIC_ADMOB_TEST_MODE=true
```

### Getting Ad Unit IDs

1. Go to [AdMob Console](https://admob.google.com/)
2. Select your app
3. Go to "Ad units" section
4. Create new ad units:
   - **Banner Ad**: For bottom banner ads
   - **Interstitial Ad**: For full-screen ads after game over

## Test Mode

- Set `NEXT_PUBLIC_ADMOB_TEST_MODE=true` for testing
- Set `NEXT_PUBLIC_ADMOB_TEST_MODE=false` for production
- Test mode uses Google's test ad units

## Usage

### Basic Setup

```typescript
import adManager from "@/lib/admob";

// Initialize AdMob
await adManager.initialize();

// Show banner ad
await adManager.showBanner();

// Hide banner ad
await adManager.hideBanner();

// Load interstitial ad
await adManager.loadInterstitial();

// Show interstitial ad
await adManager.showInterstitial();
```

### Integration in Game Components

```typescript
import { useEffect } from "react";
import adManager from "@/lib/admob";

export function GameScreen() {
  useEffect(() => {
    // Initialize and show banner when game starts
    adManager.initialize().then(() => {
      adManager.showBanner();
    });

    // Preload interstitial ad
    adManager.loadInterstitial();

    // Cleanup: hide banner when leaving
    return () => {
      adManager.hideBanner();
    };
  }, []);

  const handleGameOver = async () => {
    // Show interstitial ad after game over
    await adManager.showInterstitial();
  };

  return <div>{/* Your game content */}</div>;
}
```

## API Reference

### AdManager Class

#### Methods

- `initialize()`: Initialize AdMob SDK
- `showBanner()`: Display banner ad at bottom
- `hideBanner()`: Hide banner ad
- `loadInterstitial()`: Preload interstitial ad
- `showInterstitial()`: Show interstitial ad
- `isReady()`: Check if AdMob is ready
- `getConfig()`: Get current configuration
- `resetInterstitial()`: Reset interstitial state

#### Properties

- `isInitialized`: Whether AdMob is initialized
- `testMode`: Whether in test mode
- `interstitialLoaded`: Whether interstitial is loaded

## Error Handling

The AdManager includes comprehensive error handling:

- **Graceful Degradation**: App continues to work if ads fail
- **Console Logging**: Detailed error messages for debugging
- **Test Mode Detection**: Automatically uses test ads when enabled
- **Environment Checks**: Handles missing environment variables

## Platform Configuration

### iOS Setup

Add to `ios/App/App/Info.plist`:

```xml
<key>GADApplicationIdentifier</key>
<string>YOUR_IOS_ADMOB_APP_ID</string>
```

### Android Setup

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="YOUR_ANDROID_ADMOB_APP_ID"/>
```

## Testing

1. Set `NEXT_PUBLIC_ADMOB_TEST_MODE=true`
2. Use test device IDs if needed
3. Test on both iOS and Android
4. Verify ads display correctly
5. Test error scenarios (no internet, invalid IDs)

## Production Checklist

- [ ] Set `NEXT_PUBLIC_ADMOB_TEST_MODE=false`
- [ ] Use real Ad Unit IDs
- [ ] Test on real devices
- [ ] Verify ad revenue tracking
- [ ] Check ad placement doesn't interfere with gameplay
- [ ] Test interstitial timing (after game over)

## Troubleshooting

### Common Issues

1. **Ads not showing**: Check environment variables and network connection
2. **Test ads not working**: Verify `NEXT_PUBLIC_ADMOB_TEST_MODE=true`
3. **Build errors**: Ensure `@capacitor-community/admob` is installed
4. **Platform issues**: Check iOS/Android configuration

### Debug Mode

Enable detailed logging by checking browser console for AdMob messages.

## Support

For issues with the AdMob manager, check:

1. Console logs for error messages
2. AdMob console for ad unit status
3. Network connectivity
4. Environment variable configuration
