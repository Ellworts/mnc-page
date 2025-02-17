import React, { useState, useEffect, useRef } from 'react';
import './styles/main.scss';
import axios from 'axios';
import TopBar from './sections/Header';
import Tagline from './sections/Tagline';
import BrieflySection from './sections/Briefly';
import RegistrationForm from './sections/RegistrationForm';
import LoginForm from './sections/LoginForm';
import TaleSection from './sections/TaleSection';
import Footer from './sections/Footer';
import OurCraft from './sections/OurCraft';
import ReviewForm from './sections/ReviewSec';
import ReviewList from './sections/ReviewList';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [reviews, setReviews] = useState([]);

  const registrationRef = useRef(null);
  const loginRef = useRef(null);
  const reviewFormRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedStatus = localStorage.getItem('status');
    if (savedUser) {
      setUser(savedUser);
      setStatus(savedStatus);
    }

    const handleClickOutside = (event) => {
      if (registrationRef.current && !registrationRef.current.contains(event.target)) {
        setShowRegistration(false);
      }
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLogin(false);
      }
      if (reviewFormRef.current && !reviewFormRef.current.contains(event.target)) {
        setShowReviewForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShowRegistration = () => {
    if (!showLogin) {
      setShowRegistration(true);
    }
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  const handleShowLogin = () => {
    if (!showRegistration) {
      setShowLogin(true);
    }
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleShowReviewForm = () => {
    if (user) {
      setShowReviewForm(true);
    } else {
      alert('Please log in to submit a review.');
    }
  };

  const handleCloseReviewForm = () => {
    setShowReviewForm(false);
  };

  const handleLogin = (username, status) => {
    setUser(username);
    setStatus(status);
    localStorage.setItem('user', username);
    localStorage.setItem('status', status);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setStatus(null);
    localStorage.removeItem('user');
    localStorage.removeItem('status');
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/deleteAccount', { data: { username: user } });
      handleLogout();
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="App">
      {showRegistration && (
        <div className="modal">
          <div className="modal-content" ref={registrationRef}>
            <span className="close" onClick={handleCloseRegistration}>&times;</span>
            <RegistrationForm onClose={handleCloseRegistration} />
          </div>
        </div>
      )}
      {showLogin && (
        <div className="modal">
          <div className="modal-content" ref={loginRef}>
            <span className="close" onClick={handleCloseLogin}>&times;</span>
            <LoginForm onClose={handleCloseLogin} onLogin={handleLogin} />
          </div>
        </div>
      )}
      {showReviewForm && (
        <div className="modal">
          <div className="modal-content" ref={reviewFormRef}>
            <span className="close" onClick={handleCloseReviewForm}>&times;</span>
            <ReviewForm onClose={handleCloseReviewForm} onAddReview={handleAddReview} />
          </div>
        </div>
      )}
      <TopBar 
        user={user} 
        status={status} 
        onLogout={handleLogout} 
        onDeleteAccount={handleDeleteAccount} 
        onSignUpClick={handleShowRegistration} 
        onLoginClick={handleShowLogin}
        onReviewClick={handleShowReviewForm}
      />
      <Tagline />
      <BrieflySection />
      <TaleSection />
      <OurCraft />
      <ReviewList reviews={reviews} />
      <Footer />
    </div>
  );
}

export default App;
