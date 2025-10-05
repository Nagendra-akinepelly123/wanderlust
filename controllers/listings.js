const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find();
  res.render("listing/index.ejs", { allListing });
};

module.exports.newRoute = async (req, res) => {
  res.render("listing/createform.ejs");
};

module.exports.showRoute = async (req, res) => {
  const { id } = req.params;
  const singleItem = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .populate("owner");
  // console.log(singleItem);
  // if (!singleItem) throw new ExpressError(404, "Listing Not Found");
  if (!singleItem) {
    req.flash("error", "listing that you want to access was not found");
    return res.redirect("/listings");
  }
  res.render("listing/show.ejs", { singleItem });
};

module.exports.editRoute = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing that you want to edit was not found");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listing/edit.ejs", { listing, originalImageUrl });
};

module.exports.createRoute = async (req, res, next) => {
  const url = req.file.path;
  const filename = req.file.filename;
  // console.log(url, "..", filename);
  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;

  // Fetch the listing first
  let listing = await Listing.findById(id);

  // Remove image field from req.body if no new file uploaded
  if (!req.file) {
    delete req.body.image; // prevents overwriting with empty field
  }

  // Update other fields
  listing.set(req.body);

  // If a new file is uploaded, update image
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyeRoute = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("deleted", `listing with id:${req.params.id} deleted`);
  res.redirect("/listings");
};
