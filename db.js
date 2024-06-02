const mongoose = require('mongoose');
/*define a mongodb connection url*/
const mongourl = 'mongodb://localhost:27017/hotels'// replace 'hotels' with your database name//

//set up mongodb connection\\
mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//get the default connection
//mongoose maintain the default connection object representing the mongodb connection.//

const db = mongoose.connection;
//define eventlistner for database connection//

db.on('connected', () => {
  console.log("connected to mognodb server");
});

db.on('error', (err) => {
  console.log('mongodb connection error:', err);
});

db.on('disconnected', () => {
  console.log("mongodb disconnected");
});
//export the database connection//
module.exports = db;





















