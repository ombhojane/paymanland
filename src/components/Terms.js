import React from 'react';
import './Legal.css';

const Terms = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <h1>Terms of Service</h1>
        <div className="legal-date">Last Updated: {new Date().toLocaleDateString()}</div>

        <p>
          Welcome to Fashion Street. By accessing our platform, you agree to these terms and conditions.
        </p>

        <div className="legal-section">
          <h2>1. Service Overview</h2>
          <p>
            Fashion Street provides a virtual shopping experience integrated with Payman wallet services. Our platform enables users to:
          </p>
          <ul>
            <li>Browse virtual fashion items</li>
            <li>Connect digital wallets</li>
            <li>Process secure transactions</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>2. User Responsibilities</h2>
          <p>As a user of Fashion Street, you agree to:</p>
          <ul>
            <li>Maintain accurate account information</li>
            <li>Protect your wallet credentials</li>
            <li>Use the platform in compliance with applicable laws</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. Wallet Integration</h2>
          <p>
            Our platform uses Payman for payment processing and wallet services. By using these features, you also agree to Payman's terms of service.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Limitations</h2>
          <p>Fashion Street reserves the right to:</p>
          <ul>
            <li>Modify or discontinue services</li>
            <li>Update these terms at any time</li>
            <li>Restrict access for policy violations</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:ombhojane05@gmail.com">
              ombhojane05@gmail.com
            </a>
          </p>
        </div>

        <div className="legal-footer">
          © {new Date().getFullYear()} Fashion Street. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Terms; 