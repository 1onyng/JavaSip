import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingStar from "../rating/star_rating_container";

  const BusinessShowItem = ({ review, user, removeReview, currentUser}) => {
  //RETRIVING REVIEW PHOTOS///////////
  // let reviewImg;
  // if (review.photoUrls) {
  //   if (review.photoUrls.length !== 0) {
  //     reviewImg = review.photoUrls.map((photo, idx) => {
  //       return <img key={idx} src={photo} />;
  //     });
  //   }
  // }
  ////////////////////////////////////
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
                {/* {`${user.photos_count} photos`} */}
              </p>
            </div>
          </div>
          <div className="ri-body">
            <RatingStar name="rate" rate={review.rate} readOnly="true"/>
            <p>{review.comment}</p>
            {deleteButton}
            {/* <div className="review-imgs">{reviewImg}</div> */}
          </div>
        </div>
      </li>
    );
  }


export default BusinessShowItem;