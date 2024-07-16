// App.js
import './App.scss';
import Header from './modules/Header';
import React, { useState } from 'react';
import RegistrationForm from './modules/RegistrationForm';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  return (
    <div className="App">
      <Header onSignUpClick={handleShowRegistration} />
      <div className="home-page">
        <div className="content">
          <div className="buttons">
            <button className="register-btn" onClick={handleShowRegistration}>Register</button>
          </div>
          {showRegistration && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseRegistration}>&times;</span>
                <RegistrationForm onClose={handleCloseRegistration} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
