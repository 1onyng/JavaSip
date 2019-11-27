const express = require('express');
const router = express.Router();
const passport = require('passport');
const Review = require('../../models/Review');

router.get('/:id', (req, res) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err =>
      res.status(404).json({ noReviewsFound: 'No reviews found with that ID' })
  );
});

router.delete('/:id/delete', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Review.findByIdAndDelete(req.params.id, function (err) {
      if (err) return next(err);
      res.send({reviewId: req.params.id});
    })
  }
);

router.put('/:id/update', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Review.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true}, (err, updatedReview) => {
      if (err) return next(err);
      res.send(updatedReview);
    })
  }
);

module.exports = router;