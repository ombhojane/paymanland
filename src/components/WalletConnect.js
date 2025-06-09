import React, { useState, useEffect } from 'react';
import { PaymanClient } from "@paymanai/payman-ts";
import './WalletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializePayman = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('paymanToken');
        if (storedToken) {
          const newClient = PaymanClient.withToken(process.env.REACT_APP_PAYMAN_CLIENT_ID, {
            accessToken: storedToken,
          });
          setClient(newClient);
          setIsConnected(true);
          await fetchBalance(newClient);
        }
      } catch (error) {
        console.error('Failed to initialize Payman:', error);
        setError('Failed to initialize wallet connection');
        handleDisconnect();
      } finally {
        setLoading(false);
      }
    };

    initializePayman();

    // Handle OAuth messages
    const handleOAuthMessage = async (event) => {
      if (event.data.type === 'payman-oauth-redirect') {
        const url = new URL(event.data.redirectUri);
        const code = url.searchParams.get('code');
        if (code) {
          try {
            setLoading(true);
            setError(null);
            
            // Initialize client with auth code
            const tempClient = PaymanClient.withAuthCode(
              {
                clientId: process.env.REACT_APP_PAYMAN_CLIENT_ID,
                clientSecret: process.env.REACT_APP_PAYMAN_CLIENT_SECRET
              },
              code
            );

            const tokenResponse = await tempClient.getAccessToken();
            localStorage.setItem('paymanToken', tokenResponse.accessToken);

            const newClient = PaymanClient.withToken(process.env.REACT_APP_PAYMAN_CLIENT_ID, {
              accessToken: tokenResponse.accessToken,
              expiresIn: tokenResponse.expiresIn
            });

            setClient(newClient);
            setIsConnected(true);
            await fetchBalance(newClient);
          } catch (error) {
            console.error('Failed to exchange code:', error);
            setError('Failed to connect wallet. Please try again.');
            handleDisconnect();
          } finally {
            setLoading(false);
          }
        }
      }
    };

    window.addEventListener('message', handleOAuthMessage);

    return () => {
      window.removeEventListener('message', handleOAuthMessage);
    };
  }, []);

  const handleConnect = () => {
    try {
      // Open Payman OAuth in a popup
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const authUrl = `https://app.paymanai.com/oauth/authorize?` +
        `client_id=${process.env.REACT_APP_PAYMAN_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}` +
        `&response_type=code` +
        `&scope=read_balance,read_list_wallets,read_list_payees,read_list_transactions`;

      window.open(
        authUrl,
        'Payman Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (error) {
      console.error('Failed to open OAuth window:', error);
      setError('Failed to open connection window');
    }
  };

  const fetchBalance = async (paymanClient) => {
    try {
      setError(null);
      const response = await paymanClient.ask("what's my wallet balance?");
      setBalance(response.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setError('Error fetching balance');
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('paymanToken');
    setClient(null);
    setIsConnected(false);
    setBalance(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="wallet-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="wallet-container">
      {error && (
        <div className="error-message">
          {error}
          <button className="error-dismiss" onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      {!isConnected ? (
        <button className="game-button connect-button" onClick={handleConnect}>
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <div className="balance-container">
            <span className="balance-label">Balance:</span>
            <span className="balance-amount">
              {balance ? `${balance} USD` : 'Loading...'}
            </span>
          </div>
          <button className="disconnect-button" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 