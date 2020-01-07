import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingStar from "../rating/star_rating_container";

const BusinessShowItem = ({ review, user, removeReview, currentUser}) => {
  let reviewImg;
  if (review.photos) {
    if (review.photos.length !== 0) {
      reviewImg = review.photos.map((photo, idx) => {
        return <img key={idx} src={photo} />;
      });
    }
  }

  let deleteButton;
  if (review.author === currentUser.id) {
    deleteButton = (
      <div className="delete_button">
        <button onClick={() => removeReview(review._id)}>
          <FontAwesomeIcon icon="trash-alt" />
        </button>
      </div>
    );
  }

  let photoCount = 0;
  user.reviews.forEach(review => {
    review.photos.forEach(() => photoCount += 1)
  })

  return (
    <li>
      <div className="review-item">
        <div className="ri-userinfo">
          <img className="profile-img" src={user.imgURL} />
          <div>
            <p className="profile-name">{user.username}</p>
            <p className="profile-small">
              <FontAwesomeIcon icon="star" />
              {`${user.reviews.length} reviews`}
            </p>
            <p className="profile-small">
              <FontAwesomeIcon icon="camera" />
              {`${photoCount} photos`}
            </p>
          </div>
        </div>
        <div className="ri-body">
          <div className="review-header">
            <div className="user-rate">
              <RatingStar name="rate" rate={review.rate} readOnly="true" />
            </div>
            {deleteButton}
          </div>
          <p class="review-comment">{review.comment}</p>
          <div className="review-imgs">{reviewImg}</div>
        </div>
      </div>
    </li>
  );
}

export default BusinessShowItem;