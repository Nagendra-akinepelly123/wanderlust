const { ref } = require("joi");
const mongoose = require("mongoose");
const Review = require("./reviews");
const { Schema } = mongoose;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Title Is required Field"],
    // trim: true,
  },
  description: {
    type: String,
    // required: [true, "Description Is required Field"],
    // trim: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    default: 1000,
    // required: [true, "Price is required Field"],
  },
  location: {
    type: String,
    // required: [true, "Location Is required Field"],
    // trim: true,
  },
  country: {
    type: String,
    // required: [true, "Country Is required Field"],
    // trim: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
