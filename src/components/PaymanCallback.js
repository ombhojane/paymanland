import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymanCallback.css';

const PaymanCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PaymanCallback component mounted");
    
    // Extract the code from the URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    console.log("OAuth callback received:", { code: code ? "Present" : "Missing", error });
    
    // If there's an error parameter, log it
    if (error) {
      console.error("OAuth error:", error);
    }
    
    // If there's a code, try to notify the opener window
    if (code && window.opener && !window.opener.closed) {
      try {
        console.log("Sending code to opener window");
        // Send the code back to the opener window using postMessage
        window.opener.postMessage({
          type: "payman-oauth-redirect",
          redirectUri: window.location.href
        }, "*");
        
        // Close this window after a short delay
        setTimeout(() => {
          window.close();
        }, 1000);
      } catch (err) {
        console.error("Failed to communicate with opener:", err);
      }
    } else {
      console.log("No opener window or code found, redirecting to main page");
      // No opener or no code, navigate back to the main page
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return (
    <div className="callback-container">
      <div className="callback-message">
        <h2>Connecting to Payman...</h2>
        <p>Please wait while we complete the connection.</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default PaymanCallback; 