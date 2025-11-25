var mongoose = require("mongoose")

var dbURI = "mongodb://localhost:27017/snippet_manager"

function connectDB() {
  mongoose
    .connect(dbURI)
    .then(() => {
      console.log("MongoDB connected successfully")
    })
    .catch((err) => {
      console.log("MongoDB connection error: " + err.message)
      process.exit(1)
    })
}

module.exports = connectDB
