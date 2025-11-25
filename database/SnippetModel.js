var mongoose = require("mongoose")

var snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: "javascript",
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    default: "anonymous",
  },
  forkedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Snippet",
    default: null,
  },
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

snippetSchema.index({ title: "text", description: "text", tags: "text" })

var Snippet = mongoose.model("Snippet", snippetSchema)

module.exports = Snippet
