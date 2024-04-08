import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Reviews = () => {
  const { roomId } = useParams();
  const [reviewername, setReviewername] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userName = useSelector((state) => state.auth.userName);

  const reviewSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/dashboard/${roomId}`, {
        reviewername,
        rating,
        comment,
      });
      console.log("Success");
      window.alert("Review submitted successfully!");
      // Clear input fields after successful submission
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      window.alert("Failed to submit review. Please try again.");
    }
  };

  const handleStarClick = (star) => {
    setReviewername(userName);
    console.log(reviewername);
    setRating(star);
  };

  return (
    <div className="flex flex-col">
      <h1>Add Reviews</h1>

      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <div
              key={index}
              onClick={() => handleStarClick(ratingValue)}
              style={{ cursor: "pointer" }}
            >
              <FaStar
                className="star"
                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                size={20}
              />
            </div>
          );
        })}
      </div>
      <input
        type="text"
        className="h-5 border-2"
        placeholder="review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="button"
        className="bg-gray-500 text-white p-1"
        onClick={reviewSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Reviews;
