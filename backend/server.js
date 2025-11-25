var express = require("express")
var cors = require("cors")
var connectDB = require("../database/db")
var snippetRoutes = require("./routes/snippets")
var collectionRoutes = require("./routes/collections")
var userRoutes = require("./routes/users")

var app = express()
var PORT = 5000

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/snippets", snippetRoutes)
app.use("/api/collections", collectionRoutes)
app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Snippet Manager API Running" })
})

app.listen(PORT, () => {
  console.log("Server started on port " + PORT)
})
