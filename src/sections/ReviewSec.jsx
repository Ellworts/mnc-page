// src/sections/ReviewForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ onClose }) => {
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    if (!username) {
      alert('Please log in to submit a review.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/reviews', { username, review });
      alert('Review submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
