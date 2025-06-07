import React, { useState, useEffect } from 'react';
import { PaymanClient } from "@paymanai/payman-ts";
import './WalletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [client, setClient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const initializePayman = async () => {
      try {
        const storedToken = localStorage.getItem('paymanToken');
        if (storedToken) {
          const newClient = PaymanClient.withToken(process.env.REACT_APP_PAYMAN_CLIENT_ID, {
            accessToken: storedToken,
          });
          setClient(newClient);
          setIsConnected(true);
          fetchBalance(newClient);
        }
      } catch (error) {
        console.error('Failed to initialize Payman:', error);
      }
    };

    initializePayman();

    // Handle OAuth popup callback
    window.handlePaymanCallback = async (code) => {
      if (code) {
        try {
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
          });

          setClient(newClient);
          setIsConnected(true);
          fetchBalance(newClient);
          setShowModal(false);
          alert('Wallet Connected Successfully!');
        } catch (error) {
          console.error('Failed to exchange code:', error);
          alert('Failed to connect wallet. Please try again.');
        }
      }
    };

    return () => {
      delete window.handlePaymanCallback;
    };
  }, []);

  const fetchBalance = async (paymanClient) => {
    try {
      const response = await paymanClient.ask("what's my TSD wallet balance?");
      setBalance(response.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      alert('Error fetching balance. Please try again later.');
    }
  };

  const handleConnect = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authUrl = `https://app.paymanai.com/oauth/authorize?` +
      `client_id=${process.env.REACT_APP_PAYMAN_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent('https://fstrends.vercel.app/callback.html')}` +
      `&response_type=code` +
      `&scope=read:balance read:list_wallets read:list_payees read:list_transactions`;

    window.open(
      authUrl,
      'Payman Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleDisconnect = () => {
    localStorage.removeItem('paymanToken');
    setClient(null);
    setIsConnected(false);
    setBalance(null);
    alert('Wallet Disconnected');
  };

  return (
    <>
      <div className="wallet-container">
        {!isConnected ? (
          <button className="connect-button" onClick={() => {
            setShowModal(true);
            handleConnect();
          }}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <div className="balance-container">
              <span className="balance-label">Balance:</span>
              <span className="balance-amount">{balance ? `${balance} TSD` : 'Loading...'}</span>
            </div>
            <button className="disconnect-button" onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h2>Connecting to Wallet...</h2>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              Please complete the authentication in the popup window.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect; 