import React, { useState, useEffect, useRef } from 'react';
import { PaymanClient } from "@paymanai/payman-ts";
import './WalletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const connectButtonRef = useRef(null);
  
  useEffect(() => {
    console.log("WalletConnect component mounted");
    
    // Check for existing token
    const checkExistingToken = async () => {
      const storedToken = localStorage.getItem('paymanToken');
      if (storedToken) {
        try {
          const newClient = PaymanClient.withToken(process.env.REACT_APP_PAYMAN_CLIENT_ID || "pm-test-lcq8UVCjv4kcFOXDp6WbwLGX", {
            accessToken: storedToken,
          });
          
          // Verify token is valid by making a simple request
          try {
            await newClient.ask("list all wallets");
            setClient(newClient);
            setIsConnected(true);
            fetchBalance(newClient);
          } catch (error) {
            console.log("Stored token is invalid, clearing it");
            localStorage.removeItem('paymanToken');
          }
        } catch (error) {
          console.error('Failed to initialize Payman with stored token:', error);
          localStorage.removeItem('paymanToken');
        }
      }
    };
    
    checkExistingToken();
    
    // Set up message listener for the Connect Button message
    window.addEventListener("message", handlePaymanMessage);
    
    // Load the Payman Connect script
    const loadPaymanScript = () => {
      console.log("Attempting to load Payman Connect script");
      
      // Remove any existing script to avoid duplicates
      const existingScript = document.querySelector('script[src="https://app.paymanai.com/js/pm-connect.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      
      const script = document.createElement('script');
      script.src = "https://app.paymanai.com/js/pm-connect.js";
      script.setAttribute('data-client-id', process.env.REACT_APP_PAYMAN_CLIENT_ID || "pm-test-lcq8UVCjv4kcFOXDp6WbwLGX");
      script.setAttribute('data-scopes', "read:balance read:list_wallets read:list_payees read:list_transactions");
      
      // Using full URL with port for the redirect
      const port = window.location.port || (window.location.protocol === 'https:' ? '443' : '80');
      const redirectUri = `${window.location.protocol}//${window.location.hostname}:${port}/callback`;
      console.log("Setting redirect URI to:", redirectUri);
      script.setAttribute('data-redirect-uri', redirectUri);
      
      script.setAttribute('data-target', "#payman-connect-container");
      script.setAttribute('data-dark-mode', "true");
      script.setAttribute('data-styles', JSON.stringify({
        borderRadius: "8px", 
        fontSize: "14px",
        padding: "10px 20px", 
        backgroundColor: "#4CAF50",
        color: "white"
      }));
      
      script.onload = () => {
        console.log("Payman Connect script loaded successfully");
        setScriptLoaded(true);
      };
      
      script.onerror = (error) => {
        console.error("Failed to load Payman Connect script:", error);
        setScriptLoaded(false);
      };
      
      document.body.appendChild(script);
      console.log("Script appended to body");
      
      // Debug: Check if env variables are available
      console.log("Client ID used:", process.env.REACT_APP_PAYMAN_CLIENT_ID || "pm-test-lcq8UVCjv4kcFOXDp6WbwLGX");
    };
    
    // Small delay to ensure DOM is fully rendered
    setTimeout(loadPaymanScript, 300);
    
    return () => {
      window.removeEventListener("message", handlePaymanMessage);
    };
  }, []);
  
  const handlePaymanMessage = async (event) => {
    console.log("Received message:", event.data);
    if (event.data.type === "payman-oauth-redirect") {
      setLoading(true);
      try {
        // Extract code from the redirect URI
        const url = new URL(event.data.redirectUri);
        const code = url.searchParams.get("code");
        console.log("Received OAuth code:", code ? "Code received" : "No code found");
        
        if (code) {
          await exchangeCodeForToken(code);
        }
      } catch (error) {
        console.error("Error handling OAuth redirect:", error);
        setLoading(false);
        alert("Failed to connect wallet. Please try again.");
      }
    }
  };
  
  const exchangeCodeForToken = async (code) => {
    try {
      console.log("Exchanging code for token...");
      // Create a temporary client with the auth code
      const tempClient = PaymanClient.withAuthCode(
        {
          clientId: process.env.REACT_APP_PAYMAN_CLIENT_ID || "pm-test-lcq8UVCjv4kcFOXDp6WbwLGX",
          clientSecret: process.env.REACT_APP_PAYMAN_CLIENT_SECRET || "your-client-secret-should-be-set-in-env"
        },
        code
      );
      
      // Exchange the auth code for an access token
      const tokenResponse = await tempClient.getAccessToken();
      localStorage.setItem('paymanToken', tokenResponse.accessToken);
      console.log("Token received and stored");
      
      // Create a new client with the access token
      const newClient = PaymanClient.withToken(process.env.REACT_APP_PAYMAN_CLIENT_ID || "pm-test-lcq8UVCjv4kcFOXDp6WbwLGX", {
        accessToken: tokenResponse.accessToken,
      });
      
      setClient(newClient);
      setIsConnected(true);
      fetchBalance(newClient);
      setLoading(false);
    } catch (error) {
      console.error('Failed to exchange code for token:', error);
      setLoading(false);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const fetchBalance = async (paymanClient) => {
    try {
      const response = await paymanClient.ask("what's my TSD wallet balance?");
      setBalance(response.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      alert('Error fetching balance. Please try again later.');
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('paymanToken');
    setClient(null);
    setIsConnected(false);
    setBalance(null);
    alert('Wallet Disconnected');
  };
  
  const handleManualConnect = () => {
    console.log("Manual connect button clicked");
    setLoading(true);
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Use the port from the current window location
    const port = window.location.port || (window.location.protocol === 'https:' ? '443' : '80');
    const redirectUri = `${window.location.protocol}//${window.location.hostname}:${port}/callback`;

    const authUrl = `https://app.paymanai.com/oauth/authorize?` +
      `client_id=${process.env.REACT_APP_PAYMAN_CLIENT_ID || "pm-test-lcq8UVCjv4kcFOXDp6WbwLGX"}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=read:balance read:list_wallets read:list_payees read:list_transactions`;

    console.log("Opening auth window with URL:", authUrl);
    window.open(
      authUrl,
      'Payman Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <>
      <div className="wallet-container">
        {!isConnected ? (
          <div className="connect-wrapper">
            <div id="payman-connect-container" className="payman-connect-btn">
              {/* Payman Connect Button will be rendered here */}
              {loading && <span className="loading-indicator">Connecting...</span>}
            </div>
            
            {/* Always show fallback button for now until we debug the script loading issue */}
            <button 
              className="connect-button fallback" 
              onClick={handleManualConnect}
            >
              Connect Payman Wallet
            </button>
          </div>
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
    </>
  );
};

export default WalletConnect; 