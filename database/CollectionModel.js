var mongoose = require("mongoose")

var collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "anonymous",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

var Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection
