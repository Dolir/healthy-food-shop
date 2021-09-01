import React from "react";
import {
  getSingleItem,
  selectSingleItem,
  clearSingleItem,
  postReviews,
  deleteReviews,
} from "../../features/items/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "../../styles/singleItem.css";
import CartModal from "../CartModal";
import { addCartItem, addCartItemAsync } from "../../features/cart/cartSlice";
import SingleItemLoading from "./SingleItemLoading";
import ItemReviews from "./ItemReviews";
import { v4 as uuidv4 } from "uuid";
function SingleItem() {
  const params = useParams();
  const dispatch = useDispatch();
  const singleItem = useSelector(selectSingleItem);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [modal, setModal] = React.useState(false);
  const [review, setReview] = React.useState({
    text: "",
    rating: 5,
    author_name: "",
    author_id: "",
    _id: uuidv4(),
    date: Date.now(),
  });

  React.useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    dispatch(getSingleItem(params.id));
    return () => {
      dispatch(clearSingleItem());
    };
  }, []);
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      setReview((prev) => ({
        ...prev,
        author_name: auth.user.name,
        author_id: auth.user._id,
      }));
    }
  }, [auth.isAuthenticated]);

  function handleToCart() {
    setModal(true);
    if (auth.isAuthenticated) {
      dispatch(
        addCartItemAsync({
          item: { ...singleItem, quantity: 1 },
          userID: auth.user._id,
        })
      );
    } else {
      dispatch(addCartItem({ ...singleItem, quantity: 1 }));
    }
  }
  function goBack() {
    history.goBack();
  }
  function handleReviewSubmit(e) {
    e.preventDefault();
    dispatch(
      postReviews({
        itemID: singleItem._id,
        review: review,
      })
    );
    setReview((prev) => ({ ...prev, text: "" }));
  }
  function handleReviewDelete(reviewID) {
    dispatch(deleteReviews({ itemID: singleItem._id, reviewID: reviewID }));
  }
  function handleReviewChange(e) {
    if (e.target.nodeName !== "TEXTAREA") {
      setReview((prev) => ({ ...prev, rating: parseInt(e.target.value) }));
    } else {
      setReview((prev) => ({ ...prev, text: e.target.value }));
    }
  }

  if (singleItem) {
    return (
      <div className="sngitem">
        {modal ? <CartModal modal={modal} setModal={setModal} /> : ""}
        <div className="single-item-container">
          <button onClick={goBack} id="goback-btn">
            Go back
          </button>
          <div className="single-item">
            <div className="single-item-img">
              <img src={singleItem.url} alt={singleItem.name} />
            </div>
            <div className="single-item-info">
              <h1 className="item-name">{singleItem.name}</h1>
              <div className="single-item-info-upper">
                <div className="single-item-price">
                  <h5 className="old-price">
                    {parseInt(singleItem.discount) === 0
                      ? ""
                      : parseInt(singleItem.price) +
                        parseInt(singleItem.discount) +
                        "$"}
                  </h5>
                  <h3 className="item-price">{singleItem.price}$</h3>
                </div>
                <div className="single-item-btns">
                  <button
                    className=" buy-btn tocart-btn"
                    onClick={handleToCart}
                  >
                    To cart
                  </button>
                </div>
              </div>
              <p>{singleItem.description}</p>
            </div>
          </div>
          <div className="single-reviews-container">
            {auth.isAuthenticated ? (
              <div className="single-reviews-form">
                <form onSubmit={handleReviewSubmit}>
                  <div className="single-rating">
                    <h3>Rating</h3>
                    <div className="rate">
                      <input
                        type="radio"
                        id="star5"
                        name="rate"
                        value="5"
                        onClick={handleReviewChange}
                      />
                      <label htmlFor="star5" title="text">
                        5 stars
                      </label>
                      <input
                        type="radio"
                        id="star4"
                        name="rate"
                        value="4"
                        onClick={handleReviewChange}
                      />
                      <label htmlFor="star4" title="text">
                        4 stars
                      </label>
                      <input
                        type="radio"
                        id="star3"
                        name="rate"
                        value="3"
                        onClick={handleReviewChange}
                      />
                      <label htmlFor="star3" title="text">
                        3 stars
                      </label>
                      <input
                        type="radio"
                        id="star2"
                        name="rate"
                        value="2"
                        onClick={handleReviewChange}
                      />
                      <label htmlFor="star2" title="text">
                        2 stars
                      </label>
                      <input
                        type="radio"
                        id="star1"
                        name="rate"
                        value="1"
                        onClick={handleReviewChange}
                      />
                      <label htmlFor="star1" title="text">
                        1 star
                      </label>
                    </div>
                  </div>
                  <div className="single-text">
                    <h3>Review</h3>
                    <textarea
                      name="text"
                      rows="14"
                      cols="10"
                      wrap="soft"
                      value={review.text}
                      onChange={handleReviewChange}
                      required
                    ></textarea>
                  </div>

                  <button>Submit</button>
                </form>
              </div>
            ) : (
              <div className="not-logged-reviews">
                You need to log in to make reviews
              </div>
            )}

            <ul className="single-reviews-list">
              {singleItem.reviews.map((x, key) => (
                <ItemReviews
                  handleReviewDelete={handleReviewDelete}
                  review={x}
                  key={key}
                  userID={auth.isAuthenticated ? auth.user._id : null}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  const response = document.querySelector(".single-item-container");
  return (
    <div className="sngitem">
      <div className="single-item-container adaptive-mobile">
        <SingleItemLoading mobile="true" className="single-item-container" />
      </div>
      <div className="single-item-container not-adaptive">
        <SingleItemLoading className="single-item-container" />
      </div>
    </div>
  );
}

export default SingleItem;
