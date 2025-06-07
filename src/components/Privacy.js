import React from 'react';
import './Legal.css';

const Privacy = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <h1 className="legal-title">Privacy Policy</h1>
        <div className="legal-date">Effective: {new Date().toLocaleDateString()}</div>
        
        <div className="legal-section">
          <p className="legal-intro">
            At Fashion Street, we take your privacy seriously. This policy describes how we collect, use, and protect your information.
          </p>
        </div>

        <div className="legal-section">
          <h2>Data Collection</h2>
          <p>We collect minimal information necessary to provide our services:</p>
          <ul>
            <li>Wallet address</li>
            <li>Transaction data</li>
            <li>Account balances</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Data Usage</h2>
          <p>Your information is used exclusively for:</p>
          <ul>
            <li>Processing transactions</li>
            <li>Displaying account information</li>
            <li>Service improvements</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Security</h2>
          <p>
            We employ industry-standard security measures to protect your data. All transactions are processed through secure infrastructure provided by Payman.
          </p>
        </div>

        <div className="legal-section">
          <h2>Contact</h2>
          <p>
            For privacy-related inquiries, please contact our team at{' '}
            <a href="mailto:ombhojane05@gmail.com" className="legal-link">
            ombhojane05@gmail.com
            </a>
          </p>
        </div>

        <footer className="legal-footer">
          © {new Date().getFullYear()} Fashion Street. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Privacy; 