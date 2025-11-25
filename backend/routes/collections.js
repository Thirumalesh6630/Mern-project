var express = require("express")
var router = express.Router()
var Collection = require("../../database/CollectionModel")
var Snippet = require("../../database/SnippetModel")

router.get("/", (req, res) => {
  Collection.find()
    .sort({ createdAt: -1 })
    .then((collections) => {
      res.json(collections)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

router.get("/:id", (req, res) => {
  var collectionData = null
  Collection.findById(req.params.id)
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }
      collectionData = collection
      return Snippet.find({ collection: req.params.id })
    })
    .then((snippets) => {
      res.json({ collection: collectionData, snippets: snippets })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

router.post("/", (req, res) => {
  var newCollection = new Collection({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author || "anonymous",
  })
  newCollection
    .save()
    .then((saved) => {
      res.status(201).json(saved)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
})

router.put("/:id", (req, res) => {
  var updateData = {
    name: req.body.name,
    description: req.body.description,
  }
  Collection.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({ error: "Collection not found" })
      }
      res.json(updated)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
})

router.delete("/:id", (req, res) => {
  Collection.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ error: "Collection not found" })
      }
      return Snippet.updateMany({ collection: req.params.id }, { collection: null })
    })
    .then(() => {
      res.json({ message: "Collection deleted" })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
