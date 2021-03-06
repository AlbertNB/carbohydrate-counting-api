const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve()
  }

  console.log('=> using new database connection',process.env.db);
  return mongoose.connect(process.env.db)
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};