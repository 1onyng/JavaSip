const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Buisness = require('../../models/Buisness');
const validateBuisnessInput = require('../../validation/buisness');

router.get('/', (req, res) => {
  Buisness.find()
    .sort({ date: -1 })
    .then(buisnesses => res.json(buisnesses))
    .catch(err => res.status(404).json({ nobuisnessesfound: 'No buisnesses found' }));
});

router.get('/user/:user_id', (req, res) => {
  Buisness.find({ user: req.params.user_id })
    .sort({ date: -1 })
    .then(buisnesses => res.json(buisnesses))
    .catch(err =>
      res.status(404).json({ nobuisnessesfound: 'No buisnesses found from that user' }
      )
    );
});

router.get('/:id', (req, res) => {
  Buisness.findById(req.params.id)
    .then(buisness => res.json(buisness))
    .catch(err =>
      res.status(404).json({ nobuisnessfound: 'No buisness found with that ID' })
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBuisnessInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newBuisness = new Buisness({
      buisness_name: req.body.buisness_name,
      price: req.body.price,
      city: req.body.city,
      state: req.body.state,
      street_address: req.body.street_address,
      phone: req.body.phone,
      long: req.body.long,
      lat: req.body.lat,
      user: req.user.id
    });

    newBuisness.save().then(buisness => res.json(buisness));
  }
);

module.exports = router;