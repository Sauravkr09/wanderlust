const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review.js");

const listingschema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do { location: { type: String } }
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: [
      "Farm",
      "Swimming pool",
      "Rooms",
      "Castles",
      "Camping",
      "Arctic",
      "Temple",
      "Mountains",
      "Iconic cities",
    ], // Add other categories as needed
  },
  category: {
    type: String,
    enum: ['Farm', 'Swimming pool', 'Rooms', 'Castles', 'Camping', 'Arctic', 'Temple','Mountains','Iconic cities'], // Add other categories as needed
}
});

listingschema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;