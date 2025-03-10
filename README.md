# Spotify Refresh Token Generator

This simple tool helps you generate a Spotify refresh token for your application.

## Setup Instructions

### 1. Configure Your Spotify Developer Dashboard

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in with your Spotify account
3. Select your app (or create a new one)
4. Click on "Edit Settings" 
5. Under "Redirect URIs", add exactly: `http://127.0.0.1:3000/callback`
6. Save your changes

### 2. Install Dependencies

```bash
npm install express axios cors
```

### 3. Run the Token Generator

```bash
node get-spotify-token.js
```

### 4. Get Your Token

1. Open your browser and navigate to: http://127.0.0.1:3000
2. Click "Click here to authorize"
3. Log in with your Spotify account and authorize the application
4. You'll be redirected back to the application where you can see your refresh token

### 5. Use Your Token

Add the refresh token to your environment variables:

```
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REFRESH_TOKEN=your-refresh-token
```

## Troubleshooting

### "INVALID_CLIENT: Invalid redirect URI" Error

This error occurs when the redirect URI in your script doesn't exactly match what you've configured in your Spotify Developer Dashboard.

Make sure:
1. You've added exactly `http://127.0.0.1:3000/callback` to your Redirect URIs in the Spotify Developer Dashboard
2. The URI is saved in the dashboard (click the Save button at the bottom)
3. The REDIRECT_URI constant in your script matches exactly what you've configured

### Other Issues

If you encounter other issues, check:
1. Your Client ID and Client Secret are correct
2. You have the necessary scopes selected for your application
3. Your Spotify account has the necessary permissions
