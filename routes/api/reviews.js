const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Review = require('../../models/Review');
const validateReviewInput = require('../../validation/review');

router.get('/:businessId', (req, res) => {
  console.log('in router.get by businessId')

  Review.find({ business: req.params.businessId })
      .then(reviews => res.json(reviews))
      .catch(err =>
          res.status(404).json({ noReviewsFound: 'No reviews found with that ID' })
      );
});

router.get('/:id', (req, res) => {
  Review.findById(req.params.id)
        .then(review => res.json(review))
        .catch(err =>
            res.status(404).json({ noReviewsFound: 'No reviews found with that ID' })
        );
});

router.post('/new', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateReviewInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newReview = new Review({
        author: req.user.id,
        // business: req.buisness.id,
        rate: req.body.rate,
        comment: req.body.comment
      });
      console.log(newReview)
      newReview.save().then(review => res.json(review));
    }
  );

  router.delete('/:id/delete', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateReviewInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Review.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
    }
  );

  router.put('/:id/update', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);
      
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Review.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully!');
  })
  }
);


  module.exports = router;