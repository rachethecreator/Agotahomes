const express = require('express');
const shelterController = require('../controllers/shelterController');

const router = express.Router();

router.get('/home', shelterController.getShelters, (req, res) => {
  res.status(200).json(res.locals.shelters);
});

module.exports = router;
