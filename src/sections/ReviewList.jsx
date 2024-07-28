import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteLastReview = async () => {
    if (reviews.length === 0) {
      alert('No reviews to delete.');
      return;
    }
    const lastReview = reviews[reviews.length - 1];
    try {
      await axios.delete(`http://localhost:5000/reviews/${lastReview.id}`);
      setReviews((prevReviews) => prevReviews.slice(0, -1));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  if (reviews.length === 0) {
    return null; // Do not display anything if there are no reviews
  }

  return (
    <div className="reviews-container">
      <button className="delete-button" onClick={handleDeleteLastReview}>Delete Last Review</button>
      <div className="reviews-inner" ref={sliderRef}>
        <div className="review-slider">
          {reviews.map((review, index) => (
            <div className="review-card" key={review.id}>
              <div className="review-text">"{review.review}"</div>
              <div className="review-author">
                <img src="path/to/default/profile/image.jpg" alt="Profile" />
                {review.username}
              </div>
              <div className="review-date">{review.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
