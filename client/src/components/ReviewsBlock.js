import React from "react";
import Review from "./Review";
import { useSelector, useDispatch } from "react-redux";
import { selectReviews, getReviews } from "../features/reviews/reviewsSlice";
import "../styles/reviews.css";
function ReviewsBlock() {
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getReviews());
  }, []);
  return (
    <div className="reviews-container">
      <h1 className="header-text">Reviews</h1>
      <div className="reviews-block">
        {reviews.isLoading === false
          ? reviews.reviews[0].reviews.map((x, key) => (
              <Review data={x} key={key} />
            ))
          : ""}
      </div>
    </div>
  );
}

export default ReviewsBlock;
