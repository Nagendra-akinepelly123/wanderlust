const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image[url]"),
    validateListing,
    wrapAsync(listingController.createRoute)
  );

// New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.newRoute));

router
  .route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image[url]"),
    validateListing,
    wrapAsync(listingController.updateRoute)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyeRoute));

router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editRoute));

module.exports = router;
