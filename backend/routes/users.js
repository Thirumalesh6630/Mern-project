var express = require("express")
var router = express.Router()
var User = require("../../database/UserModel")

router.post("/register", (req, res) => {
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" })
      }
      var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      return newUser.save()
    })
    .then((saved) => {
      if (saved) {
        res.status(201).json({
          id: saved._id,
          username: saved.username,
          email: saved.email,
        })
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
})

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" })
      }
      if (user.password !== req.body.password) {
        return res.status(401).json({ error: "Invalid credentials" })
      }
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
