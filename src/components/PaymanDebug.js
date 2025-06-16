import React, { useState } from 'react';
import { PaymanClient } from "@paymanai/payman-ts";

const PaymanDebug = () => {
  const [debugInfo, setDebugInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const testSDKMethods = async () => {
    setLoading(true);
    let info = '';
    
    try {
      info += '=== SDK Method Test ===\n';
      info += `Available methods: ${Object.getOwnPropertyNames(PaymanClient).join(', ')}\n`;
      info += `PaymanClient type: ${typeof PaymanClient}\n`;
      
      // Test method availability
      info += `withClientCredentials available: ${typeof PaymanClient.withClientCredentials === 'function'}\n`;
      info += `withCredentials available: ${typeof PaymanClient.withCredentials === 'function'}\n`;
      info += `withToken available: ${typeof PaymanClient.withToken === 'function'}\n`;
      info += `withAuthCode available: ${typeof PaymanClient.withAuthCode === 'function'}\n`;
      
    } catch (error) {
      info += `SDK Test Error: ${error.message}\n`;
    }
    
    setDebugInfo(info);
    setLoading(false);
  };

  const testEnvironment = () => {
    let info = '';
    info += '=== Environment Variables ===\n';
    info += `REACT_APP_PAYMAN_CLIENT_ID: ${process.env.REACT_APP_PAYMAN_CLIENT_ID || 'NOT SET'}\n`;
    info += `REACT_APP_PAYMAN_CLIENT_SECRET: ${process.env.REACT_APP_PAYMAN_CLIENT_SECRET ? 'SET' : 'NOT SET'}\n`;
    info += `REACT_APP_PAYMAN_REDIRECT_URI: ${process.env.REACT_APP_PAYMAN_REDIRECT_URI || 'NOT SET'}\n`;
    info += `NODE_ENV: ${process.env.NODE_ENV}\n`;
    
    setDebugInfo(info);
  };

  const testDirectConnection = async () => {
    setLoading(true);
    let info = '';
    
    try {
      const clientId = process.env.REACT_APP_PAYMAN_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_PAYMAN_CLIENT_SECRET;
      
      info += '=== Direct Connection Test ===\n';
      info += `Client ID: ${clientId}\n`;
      info += `Client Secret: ${clientSecret ? 'Present' : 'Missing'}\n`;
      
      if (!clientId || !clientSecret) {
        info += 'ERROR: Missing credentials\n';
        setDebugInfo(info);
        setLoading(false);
        return;
      }

      info += 'Attempting to create client...\n';
      const client = PaymanClient.withClientCredentials({
        clientId: clientId,
        clientSecret: clientSecret
      });
      
      info += 'Client created successfully\n';
      info += 'Testing API call...\n';
      
      const response = await client.ask("list all wallets");
      info += `API Response: ${JSON.stringify(response, null, 2)}\n`;
      
    } catch (error) {
      info += `Direct Connection Error: ${error.message}\n`;
      info += `Error stack: ${error.stack}\n`;
      if (error.response) {
        info += `Response status: ${error.response.status}\n`;
        info += `Response data: ${JSON.stringify(error.response.data, null, 2)}\n`;
      }
    }
    
    setDebugInfo(info);
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      width: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <h3>Payman Debug Panel</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={testEnvironment} style={buttonStyle}>
          Test Environment
        </button>
        <button onClick={testSDKMethods} style={buttonStyle} disabled={loading}>
          Test SDK Methods
        </button>
        <button onClick={testDirectConnection} style={buttonStyle} disabled={loading}>
          Test Direct Connection
        </button>
      </div>
      
      {loading && <div>Loading...</div>}
      
      <pre style={{
        fontSize: '10px',
        overflow: 'auto',
        maxHeight: '300px',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        marginTop: '10px'
      }}>
        {debugInfo}
      </pre>
    </div>
  );
};

const buttonStyle = {
  margin: '2px',
  padding: '5px 10px',
  fontSize: '12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default PaymanDebug; 