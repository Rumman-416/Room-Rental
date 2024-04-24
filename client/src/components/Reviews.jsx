import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Reviews = () => {
  const { roomId } = useParams();
  const [reviewername, setReviewername] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const userName = useSelector((state) => state.auth.userName);

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/${roomId}`
      );
      setReviews(response.data.reviews);
      console.log(response.data.reviews);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };
  useEffect(() => {
    fetchRoomDetails();
  }, [rating]);

  const reviewSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/dashboard/${roomId}`, {
        reviewername,
        rating,
        comment,
      });
      console.log("Success");
      window.alert("Review submitted successfully!");
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
    <div className="flex flex-col justify-center gap-5 bg-slate-100 p-3 ">
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
                color={ratingValue <= rating ? "#ff5757" : "#e4e5e9"}
                size={20}
              />
            </div>
          );
        })}
      </div>
      <input
        type="text"
        className="h-7 border-2"
        placeholder="review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="button"
        className="bg-gray-500 text-white p-1 rounded-lg"
        onClick={reviewSubmit}
      >
        Submit
      </button>
      <div></div>
      <div>
        <h1>Reviews</h1>
        {reviews.map((review, index) => (
          <div className=" p-3 border-b border-gray-300" key={index}>
            <h1>{review.reviewername}</h1>
            <div className=" flex">
              <FaStar className=" text-BT" /> {review.rating}
            </div>
            <h1>{review.comment}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
