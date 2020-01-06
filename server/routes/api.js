const express = require('express');
const shelterController = require('../controllers/shelterController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', shelterController.getShelters, (req, res) => {
  res.status(200).json(res.locals.shelters);
});

// router.post(
//   '/favs',
//   userController.getUserFavs,
//   userController.updateUserFavs,
//   (req, res, next) => {
//     res.status(200).json(res.locals.favs);
//   }
// );

// router.get('/favs', userController.getUserFavs, (req, res, next) => {
//   res.status(200).json(res.locals.favs);
// });

module.exports = router;
