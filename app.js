if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("node:path");
const ExpressError = require("./utils/ExpressErrors");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/reviewRoute");
const userRouter = require("./routes/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 8080;
const dburl = process.env.MONGODB_ATLAS_URL;

main()
  .then(() => {
    console.log("DataBase Connection Successful");
  })
  .catch((error) => {
    console.log(" Error! While Connecting to the database", error);
  });

async function main() {
  await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });
}

// EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", error);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

//authentication and authorization

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.deleted = req.flash("deleted");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/demouser", async (req, res) => {
  let fakeuser = new User({
    email: "student@gmail.com",
    // username: "delta2-student",
  });

  let registeredUser = await User.register(fakeuser, "helloworld");
  res.send(registeredUser);
});

// ---------------- Routes ----------------
app.use("/listings", listingRouter);
// --------------Review routes---------------------
app.use("/listings/:id/reviews", reviewRouter);
//--------------user route-------
app.use("/", userRouter);

//home Route
app.get("/", (req, res) => {
  res.send("Wanderlust app is live ✅");
});

// Middleware for undefined routes
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

// Server
app.listen(port, () => {
  console.log(" Server Running at port", port);
});
