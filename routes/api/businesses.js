const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt_decode = require('jwt-decode');
const Business = require('../../models/Business');
const validateBusinessInput = require('../../validation/business');
const uploadMultiple = require('../../models/Images').uploadMultiple;
const getImages = require('../../models/Images').getImages;


router.get('/', (req, res) => {
  Business.find()
    .sort({ date: -1 })
    .then(businesses => res.json(businesses))
    .catch(err => res.status(404).json({ nobusinessesfound: 'No businesses found' }));
});

// router.get('/search/:searchLocation', (req, res) => {
//   Business.find({ city: req.params.searchLocation })
//       .sort({ date: -1 })
//       .then(businesses => { getImages('businesses')
//       .then(imgUrls => res.json({businesses, imgUrls}))
//     })
//     .catch(err => res.status(404).json({ nobusinessesfound: 'No businesses found' }));
// });

router.get('/search/:searchLocation', async (req, res) => {
  const businessesObj = {};
  const businesses = await Business.find({ city: req.params.searchLocation });
  for (let index = businesses.length - 1; index > 0; index--) {
    const business = businesses[index].toJSON();
    const reviews = await Review.getReviewsByBusinessId(business._id);

    business.reviews = reviews;
    businessesObj[business._id] = business
  }
  getImages('businesses').then(imgUrls => res.json({ businessesObj, imgUrls }))
});

router.get('/user/:user_id', (req, res) => {
  Business.find({ user: req.params.user_id })
    .sort({ date: -1 })
    .then(businesses => res.json(businesses))
    .catch(err =>
      res.status(404).json({ nobusinessesfound: 'No businesses found from that user' }
      )
    );
});

// get buisiness details
router.get('/:id', (req, res) => {
  Business.findById(req.params.id)
    .then(business => Review.find({ business: business.id })
      .then(reviews => {
        getImages('businesses')
        .then(imgUrls => {
          const reviewsObj = {};
          reviews.forEach(review => reviewsObj[review.id] = review);
          res.send({ business: business, reviews: reviewsObj, imgUrls:imgUrls })
        }
      )})
    )
    .catch(err =>
      res.status(404).json({ nobusinessfound: 'No business found with that ID' })
    );
});

router.post('/:id/review', (req, res, next) => {
   const token = req.headers.authorization;
  const user = jwt_decode(token);

  if (user) {
    const newReview = new Review ({
      rate: req.body.rate,
      comment: req.body.comment,
      business: req.body.businessId,
      author: user.id
    })
      newReview.save().then(review => {

        uploadMultiple(review._id, req, res)
        .then(data => { 
          getImages(review.id)
          .then((imgUrls)=>{ 
            review.photos = imgUrls;
            review.save();
            res.send({review, images: imgUrls})});
        }, (err)=> console.log(err))
    });
  }
})

router.post('/new',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBusinessInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newBusiness = new Business({
      business_name: req.body.business_name,
      price: req.body.price,
      city: req.body.city,
      state: req.body.state,
      street_address: req.body.street_address,
      phone: req.body.phone,
      long: req.body.long,
      lat: req.body.lat,
      user: req.user.id
    });

    newBusiness.save().then(business => res.json(business));
  }
);

module.exports = router;