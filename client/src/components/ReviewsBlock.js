import React from "react";
import Review from "./Review";
import { useSelector, useDispatch } from "react-redux";
import { selectReviews, getReviews } from "../features/reviews/reviewsSlice";
import "../styles/reviews.css";
function ReviewsBlock() {
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getReviews(3));
  }, []);

  return (
    <div className="reviews-container">
      <h1 className="header-text">Reviews</h1>
      <div className="reviews-block">
        {reviews.isLoading === false
          ? reviews.reviews.map((item, key) =>
              item.map((review) => <Review data={review} key={key} />)
            )
          : "adaasdawdawdawsd"}
      </div>
    </div>
  );
}

export default ReviewsBlock;
