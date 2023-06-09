require("./config/database").connect();
const express = require("express");
const serverless= require('serverless-http');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const { PORT, MONGODB_URL, SESSION_SECRET_KEY } = process.env;
const expressLayouts = require("express-ejs-layouts");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const router = require("./routes");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(expressLayouts);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "placement-cell",
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl:"mongodb+srv://ak4826636:H7aMUEzJwPPDOPsy@cluster0.grfhclg.mongodb.net/?retryWrites=true&w=majority",
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

// app.use('/.netlify/functions/index',router);

app.listen( 3000 || 8000 ,(err) => {
  
  if (err) {
    console.log(`Error in running the server: ${err}`);
    console.log(process.env.PORT)
  }
  console.log(`server is running on port: ${PORT}`);
});

