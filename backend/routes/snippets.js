var express = require("express")
var router = express.Router()
var Snippet = require("../../database/SnippetModel")

router.get("/", (req, res) => {
  var query = {}
  if (req.query.language) {
    query.language = req.query.language
  }
  if (req.query.isPublic) {
    query.isPublic = req.query.isPublic === "true"
  }
  if (req.query.tag) {
    query.tags = { $in: [req.query.tag] }
  }
  if (req.query.search) {
    query.$text = { $search: req.query.search }
  }
  if (req.query.collection) {
    query.collection = req.query.collection
  }
  Snippet.find(query)
    .sort({ createdAt: -1 })
    .then((snippets) => {
      res.json(snippets)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

router.get("/:id", (req, res) => {
  Snippet.findById(req.params.id)
    .then((snippet) => {
      if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" })
      }
      res.json(snippet)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

router.post("/", (req, res) => {
  var newSnippet = new Snippet({
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    language: req.body.language,
    tags: req.body.tags || [],
    isPublic: req.body.isPublic || false,
    author: req.body.author || "anonymous",
    collection: req.body.collection || null,
  })
  newSnippet
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
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    language: req.body.language,
    tags: req.body.tags,
    isPublic: req.body.isPublic,
    collection: req.body.collection,
    updatedAt: Date.now(),
  }
  Snippet.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({ error: "Snippet not found" })
      }
      res.json(updated)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
})

router.delete("/:id", (req, res) => {
  Snippet.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ error: "Snippet not found" })
      }
      res.json({ message: "Snippet deleted" })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

router.post("/:id/fork", (req, res) => {
  Snippet.findById(req.params.id)
    .then((original) => {
      if (!original) {
        return res.status(404).json({ error: "Snippet not found" })
      }
      var forked = new Snippet({
        title: original.title + " (forked)",
        description: original.description,
        code: original.code,
        language: original.language,
        tags: original.tags,
        isPublic: false,
        author: req.body.author || "anonymous",
        forkedFrom: original._id,
      })
      return forked.save()
    })
    .then((saved) => {
      res.status(201).json(saved)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
})

module.exports = router
