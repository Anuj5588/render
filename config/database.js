const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect("mongodb+srv://ak4826636:H7aMUEzJwPPDOPsy@cluster0.grfhclg.mongodb.net/?retryWrites=true&w=majority", {
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
