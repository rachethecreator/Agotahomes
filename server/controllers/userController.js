const User = require('../models/userModel');
const userController = {};

userController.createUser = (req, res, next) => {
  // console.log('req inside usercontroller.createuser', req)
  User.create(
    { username: req.body.username, password: req.body.password, favorites: [] },
    (err, users) => {
      //favorites may not be needed here
      if (err) {
        console.log('error in userController create user');
        // res.render('../..Component/signUpComponent', {error: "error in userController.createUser"})
        return next();
      } else {
        res.locals.id = users._id;
        console.log(
          'res.locals.id in usercontroller.createuser',
          res.locals.id
        );
      }
      return next();
    }
  );
};

userController.updateUserFavs = (req, res, next) => {
  const newFavs = req.body.favs;
  const username = req.body.username;
  User.findOneAndUpdate(
    { username },
    { favorites: newFavs },
    { new: true },
    (err, updatedFavs) => {
      if (err) console.log('Error in updateUserFavs');
      res.locals.favs = updatedFavs;
      return next();
    }
  );
};

userController.getUserFavs = (req, res, next) => {
  const favs = req.params.favorites;
  Student.findOne({ favs }, (err, favs) => {
    if (err) return console.log('Error in getUserFavs');
    else if (!doc) return res.status(404).send('Bookmarks not found');
    res.locals.favs = favs;
    return next();
  });
};
