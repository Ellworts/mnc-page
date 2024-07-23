// src/App.js
import React, { useState } from 'react';
import TopBar from './sections/Header';
import Tagline from './sections/Tagline';
import BrieflySection from './sections/Briefly';
import RegistrationForm from './sections/RegistrationForm';
import LoginForm from './sections/LoginForm';
import Footer from './sections/Footer';
import './App.scss';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogin = (username, status) => {
    setUser(username);
    setStatus(status);
  };

  return (
    <div className="App">
      <TopBar onSignUpClick={handleShowRegistration} onLoginClick={handleShowLogin} />
      <Tagline />
      <BrieflySection />
      {showRegistration && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseRegistration}>&times;</span>
            <RegistrationForm onClose={handleCloseRegistration} />
          </div>
        </div>
      )}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseLogin}>&times;</span>
            <LoginForm onClose={handleCloseLogin} onLogin={handleLogin} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
