const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://willy-j_22:NewGirl7@cluster0-rtykt.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'AgotaHomes'
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: Array }
});

module.exports = mongoose.model('User', userSchema);
