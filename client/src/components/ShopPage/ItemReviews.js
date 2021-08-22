import React from "react";

function ItemReviews({ review, userID, handleReviewDelete }) {
  const date = new Date(review.date);
  function starDisplay() {
    let white = review.rating;
    let black = 5 - review.rating;

    const resultArray = [];
    for (let i = 0; i < black; i++) {
      let empty = "empty";
      resultArray.unshift(
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          key={empty + i}
        >
          <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
        </svg>
      );
    }
    for (let i = 0; i < white; i++) {
      resultArray.unshift(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          key={i}
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      );
    }

    return resultArray;
  }
  return (
    <li className="single-review">
      {review.author_id === userID ? (
        <button onClick={() => handleReviewDelete(review._id)}>
          &times; Delete
        </button>
      ) : (
        ""
      )}
      <h1>{review.author_name}</h1>
      <h1>{review.rating}/5</h1>
      <h2>{starDisplay()}</h2>
      <p>{review.text}</p>
      <h2>{date.toLocaleDateString()}</h2>
    </li>
  );
}

export default ItemReviews;
