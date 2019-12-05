import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                {/* {`${user.reviews_count} reviews`} */}
              </p>
              <p className="profile-small">
                <FontAwesomeIcon icon="camera" />
                {/* {`${user.photos_count} photos`} */}
              </p>
            </div>
          </div>
          <div className="ri-body">
            {/* <div className={`br-mid-${review.rate}`}></div> */}
            <div className="rating" data-rating="1">
              <i className="star-1">★</i>
              <i className="star-2">★</i>
              <i className="star-3">★</i>
              <i className="star-4">★</i>
              <i className="star-5">★</i>
            </div>
            <p>{review.comment}</p>
            {deleteButton}
            {/* <div className="review-imgs">{reviewImg}</div> */}
          </div>
        </div>
      </li>
    );
  }


export default BusinessShowItem;