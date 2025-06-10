import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import WalletConnect from './WalletConnect';

function Dashboard() {
  const navigate = useNavigate();

  const handleCreateAvatar = () => {
    navigate('/create-avatar');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Your Collections Dashboard</h1>
      </header>
      <main style={styles.main}>
        <WalletConnect />
        <p style={styles.welcomeText}>Welcome to your dashboard! Explore your virtual fashion world.</p>
        <button onClick={handleCreateAvatar} style={styles.createAvatarButton}>Create Avatar</button>
      </main>
      <footer style={styles.footer}>
        <button onClick={handleGoHome} style={styles.homeButton}>Home</button>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    padding: '20px',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#fff',
  },
  main: {
    flex: 1,
    padding: '40px',
    textAlign: 'center',
    backgroundImage: 'url("/assets/bgdashboard.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    position: 'relative',
  },
  welcomeText: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#515151',
    display: 'inline-block',
    maxWidth: '80%',
    margin: '0 auto',
  },
  createAvatarButton: {
    display: 'block',
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#f0ad4e',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  homeButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default Dashboard;