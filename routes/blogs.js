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

router.get('/:blogid', (req, res) => {
  var collection = db.get('blogs')
  collection.findOne({_id: req.params.blogid}, (err, blog) => {
    if (err) throw err
    res.json(blog)
  })
})

router.post('/:blogid', (req, res) => {
  var collection = db.get('blogs')
  collection.update({_id: req.params.blogid}, {
    $push: {
      posts: {
        postid: Date.now().valueOf(),
        date: req.body.date,
        heading: req.body.heading,
        body: req.body.body
      }
    }
  }, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

router.delete('/:blogid', (req, res) => {
  var collection = db.get('blogs')
  collection.remove({_id: req.params.blogid}, (err, blog) => {
    if (err) throw err
    res.json(blog)
  })
})

router.delete('/:blogid/:postid', (req, res) => {
  var collection = db.get('blogs')
  collection.update({_id: req.params.blogid}, {
    $pull: {
      posts: {
        postid: parseInt(req.params.postid)
      }
    }
  }, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

router.put('/:blogid', (req, res) => {
  var collection = db.get('blogs')
  collection.findOne({_id: req.params.blogid}, (err, blog) => {
    if (err) throw err

    blog.rating = blog.rating + parseInt(req.body.rating)

    collection.update({_id: req.params.blogid}, blog, (errUpdated, blogUpdated) => {
      if (errUpdated) throw errUpdated
      res.json(blogUpdated)
    })
  })
})

module.exports = router
