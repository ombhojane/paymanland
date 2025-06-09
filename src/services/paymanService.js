import { PaymanClient } from "@paymanai/payman-ts";

export const exchangeCodeForToken = async (code) => {
  try {
    const client = PaymanClient.withAuthCode(
      {
        clientId: process.env.REACT_APP_PAYMAN_CLIENT_ID,
        clientSecret: process.env.REACT_APP_PAYMAN_CLIENT_SECRET
      },
      code
    );

    const tokenResponse = await client.getAccessToken();
    return {
      accessToken: tokenResponse.accessToken,
      expiresIn: tokenResponse.expiresIn
    };
  } catch (error) {
    console.error('Token exchange failed:', error);
    throw new Error('Failed to exchange code for token');
  }
};

export const getWalletBalance = async (client) => {
  try {
    const response = await client.ask("what's my wallet balance?");
    return response.balance;
  } catch (error) {
    console.error('Failed to fetch balance:', error);
    throw new Error('Failed to fetch wallet balance');
  }
}; 