const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({  
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  business: {
    type: Schema.Types.ObjectId,
    ref: 'business',
    required: false
  }, 
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// ReviewSchema.statics.getReviewsByBusinessId = function(businessId) {
//   Review.find({ business: businessId })
//       .then(reviews => res.json(reviews))
//       .catch(err =>
//           res.status(404).json({ noReviewsFound: 'No reviews found with that ID' })
//       );
// };

ReviewSchema.statics.getReviewsByBusinessId = function (businessId) {
  return Review.find({ business: businessId })
    .then(reviews => reviews)
    .catch(err => err);
};

ReviewSchema.statics.getReviewsByAuthorId = function (authorId) {
  return Review.find({ author: authorId })
    .then(reviews => reviews)
    .catch(err => err);
};


module.exports = Review = mongoose.model('reviews', ReviewSchema);
