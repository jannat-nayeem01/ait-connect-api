const mongoose = require('mongoose');

const mongouri = 'mongodb+srv://st124438:Japan01@cluster0.wwgr6yd.mongodb.net/aitConnect_development';
//mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1); // Exit the process on connection error
  });
// mongoose.Promise = global.Promise;
module.exports = mongoose;