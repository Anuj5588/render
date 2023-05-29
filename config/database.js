const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect("mongodb+srv://anuj55883795:NoUzr5z7wUWDjG6x@cluster0.d4o4st9.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((err) => {
      console.log("DB CONNECTION FAILED");
      console.log(err);
      process.exit(1);
    });
};
