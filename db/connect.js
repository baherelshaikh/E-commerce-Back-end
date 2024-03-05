const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url);
};

// user 
// products
//contact

module.exports = connectDB;
