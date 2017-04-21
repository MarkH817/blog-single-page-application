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

module.exports = router
