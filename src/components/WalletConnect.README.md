# Payman Wallet Connection Setup

This component implements wallet connection functionality using Payman's OAuth and Connect Button.

## Setup Instructions

1. Register an app on the [Payman Dashboard](https://app.paymanai.com)
2. Create a `.env.local` file in the project root with the following:

```
REACT_APP_PAYMAN_CLIENT_ID=your-client-id
REACT_APP_PAYMAN_CLIENT_SECRET=your-client-secret
```

3. Make sure your app's OAuth redirect URI is set to `https://your-domain.com/callback` (or `http://localhost:3000/callback` for local development)

## Component Features

- Seamless integration with Payman Connect button
- Automatic token persistence in localStorage
- Balance display for connected wallets
- Easy disconnect functionality

## How It Works

1. The component loads the Payman Connect script and renders the button
2. When clicked, users are redirected to Payman for authorization
3. After authorization, Payman redirects back to the `/callback` route
4. The authorization code is exchanged for an access token
5. The wallet is connected and the balance is displayed

## Troubleshooting

- If the connection fails, check that your client ID and secret are correct
- Ensure your redirect URI matches what's configured in your Payman app settings
- For CORS issues, make sure your app's domain is allowed in the Payman app settings 