const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema(
  {
    block: { type: String, required: true },
    floor: { type: Number, required: true },
    room_number: { type: Number, required: true, unique: true },
    price: { type: Number, required: true },
    space: { type: Number, required: true }, // in square meters
    balcony: { type: Boolean, default: false },
    apartment_condition: {
      type: String,
      enum: ["Black frame", "White frame", "Green frame"],
      required: true,
    },
    rooms: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    status: { type: String, required: true },
    status: {
        type: String,
        enum: ["saled", "booked", "avaliable"],
        required: true,
      },
  },
  { collection: "rooms" }
);

module.exports = mongoose.model("Apartment", ApartmentSchema);
