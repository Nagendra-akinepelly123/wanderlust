const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log("new Review saved");
  req.flash("success", "Review Created");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  const result = await Listing.findByIdAndUpdate(
    id,
    { $pull: { reviews: reviewId } },
    { new: true }
  );
  await Review.findByIdAndDelete(reviewId);
  req.flash("deleted", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
