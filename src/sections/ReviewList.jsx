import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ReviewList = ({ onReviewClick }) => {
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reviews');
      const reviewData = response.data;
      setReviews(reviewData);
      setVisibleReviews(reviewData.slice(0, 6)); // Initially display first 6 reviews
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  useEffect(() => {
    if (reviews.length > 4) {
      const interval = setInterval(() => {
        slideReviews();
      }, 3000); // Adjust the interval as needed for slower sliding

      return () => clearInterval(interval);
    }
  }, [reviews, visibleReviews]);

  const slideReviews = () => {
    if (!sliderRef.current) return;

    sliderRef.current.style.transition = 'transform 1s linear';
    sliderRef.current.style.transform = 'translateX(-450px)'; // Move slightly more than one review width to the left

    setTimeout(() => {
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = 'translateX(0)';

      const newVisibleReviews = [...visibleReviews.slice(1), visibleReviews[0]];
      setVisibleReviews(newVisibleReviews);
    }, 1000);
  };

  const handleAddReview = async (reviewText, username) => {
    try {
      await axios.post('http://localhost:5000/reviews', {
        review: reviewText,
        username,
        date: new Date().toISOString()
      });
      fetchReviews(); // Refresh reviews after adding a new one
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleDeleteLastReview = async () => {
    if (reviews.length === 0) {
      alert('No reviews to delete.');
      return;
    }
    const lastReview = reviews[reviews.length - 1];
    try {
      await axios.delete(`http://localhost:5000/reviews/${lastReview.id}`);
      fetchReviews(); // Refresh reviews after deleting one
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <div className="reviews-container">
      <button className="delete-button" onClick={handleDeleteLastReview}>Delete Last Review</button>
      <div className="reviews-inner">
        <div className="review-slider" ref={sliderRef}>
          {visibleReviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-text">"{review.review}"</div>
              <div className="review-author">
                <img src="path/to/default/profile/image.jpg" alt="Profile" />
                {review.username}
              </div>
              <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
