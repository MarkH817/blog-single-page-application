var express = require('express')
var router = express.Router()

var monk = require('monk')
var db = monk('localhost:27017/blog-spa')

router.get('/', (req, res) => {
  var collection = db.get('blogs')

  collection.find({}, (err, blogs) => {
    if (err) throw err

    res.json(blogs)
  })
})

router.post('/', (req, res) => {
  var collection = db.get('blogs')

  collection.insert({
    title: req.body.title,
    author: req.body.author,
    rating: 0,
    posts: []
  }, (err, blog) => {
    if (err) throw err

    res.json(blog)
  })
})

module.exports = router
