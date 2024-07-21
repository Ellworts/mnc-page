// App.js
import React, { useState } from 'react';
import TopBar from './sections/Header';
import Tagline from './sections/Tagline';
import BrieflySection from './sections/Briefly';
import RegistrationForm from './sections/RegistrationForm';
import './App.scss';

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
      <TopBar onSignUpClick={handleShowRegistration} />
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
    </div>
  );
}

export default App;
