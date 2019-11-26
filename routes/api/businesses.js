const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Business = require('../../models/Business');
const validateBusinessInput = require('../../validation/business');

router.get('/', (req, res) => {
  Business.find()
    .sort({ date: -1 })
    .then(businesses => res.json(businesses))
    .catch(err => res.status(404).json({ nobusinessesfound: 'No businesses found' }));
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

router.get('/:id', (req, res) => {

  Business.findById(req.params.id)
    .then(business => res.json(business))
    .catch(err =>
      res.status(404).json({ nobusinessfound: 'No business found with that ID' })
    );
});

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