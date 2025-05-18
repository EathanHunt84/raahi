import React, { useState, useEffect } from 'react';
import { reviews as initialReviews } from '../data/reviews';

const SocialFeed = ({ routeId = null }) => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
  const [reviews, setReviews] = useState(initialReviews);

  // Filter reviews when routeId or reviews change
  useEffect(() => {
    if (routeId) {
      setFilteredReviews(reviews.filter(review => review.routeId === routeId));
    } else {
      setFilteredReviews(reviews);
    }
  }, [routeId, reviews]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!newReview.comment.trim()) return;

    const submittedReview = {
      routeId: routeId || 1,
      user: "User" + Math.floor(Math.random() * 1000),
      comment: newReview.comment,
      rating: newReview.rating,
      timestamp: new Date().toISOString(),
    };

    setReviews(prev => [submittedReview, ...prev]);
    setNewReview({ comment: '', rating: 5 });
  };

  // Star Rating Component with higher contrast colors
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i}
            className={i < rating ? "text-amber-500" : "text-gray-400"}
            style={{ fontSize: '1.25rem' }}
          >
            &#9733;
          </span>
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">
          ({rating}/5)
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-bold">Route Experiences</h2>
        <p className="text-sm opacity-90">
          {routeId ? `Reviews for Route ${routeId}` : 'Recent Community Experiences'}
        </p>
      </div>

      {/* Review Submission Form */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate this route
            </label>
            <div className="flex items-center mb-2">
              <StarRating rating={newReview.rating} size={24} />
            </div>
            <select
              className="w-full px-3 py-2 border rounded-md bg-white"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            >
              <option value={5}>5 ★ - Very Safe</option>
              <option value={4}>4 ★ - Safe</option>
              <option value={3}>3 ★ - Neutral</option>
              <option value={2}>2 ★ - Unsafe</option>
              <option value={1}>1 ★ - Dangerous</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share your experience
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
              placeholder="How was your experience on this route?"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Share Experience
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {filteredReviews.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          filteredReviews.map((review, index) => (
            <div key={index} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                    {review.user.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{review.user}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(review.timestamp).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialFeed;