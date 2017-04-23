/* global angular */

var app = angular.module('OnlineBlogging', ['ngResource', 'ngRoute'])

app.config(['$locationProvider', ($locationProvider) => {
  $locationProvider.hashPrefix('')
}])

app.config(['$routeProvider', ($routeProvider) => {
  $routeProvider

  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  })

  .when('/add-blog', {
    templateUrl: 'partials/blog-form.html',
    controller: 'AddBlogCtrl'
  })

  .when('/delete-blog/:blogid', {
    templateUrl: 'partials/blog-delete.html',
    controller: 'DeleteBlogCtrl'
  })

  .when('/viewblog/:blogid', {
    templateUrl: 'partials/blog-view.html',
    controller: 'ViewBlogCtrl'
  })

  .when('/add-post/:blogid', {
    templateUrl: 'partials/post-form.html',
    controller: 'AddPostCtrl'
  })

  .when('/delete-post/:blogid/:postid', {
    templateUrl: 'partials/post-delete.html',
    controller: 'DeletePostCtrl'
  })

  .otherwise({
    redirectTo: '/'
  })
}])

app.controller('HomeCtrl', ['$scope', '$resource', function ($scope, $resource) {
  var Blogs = $resource('/api/blogs')

  Blogs.query(function (blogs) {
    $scope.blogs = blogs
  })
}])

app.controller('AddBlogCtrl', ['$scope', '$resource', '$location',
  function ($scope, $resource, $location) {
    $scope.createblog = function () {
      var Blogs = $resource('/api/blogs')

      Blogs.save($scope.blog, function () {
        $location.path('/')
      })
    }
  }
])

app.controller('DeleteBlogCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function ($scope, $resource, $location, $routeParams) {
    var Blogs = $resource('/api/blogs/:blogid')

    Blogs.get({blogid: $routeParams.blogid}, function (blog) {
      $scope.blog = blog
    })

    $scope.delete = function () {
      Blogs.delete({blogid: $routeParams.blogid}, function (blog) {
        $location.path('/')
      })
    }
  }
])

app.controller('ViewBlogCtrl', ['$scope', '$resource', '$routeParams', '$http',
  function ($scope, $resource, $routeParams, $http) {
    var Blogs = $resource('/api/blogs/:blogid')

    Blogs.get({blogid: $routeParams.blogid}, function (blog) {
      $scope.blog = blog
    })

    $scope.rateit = function (rating) {
      $http.put('/api/blogs/' + $routeParams.blogid, {
        rating: rating
      })
      .then((success) => {
        $scope.blog.rating += rating
      }, (err) => {
        throw err
      })
    }
  }
])

app.controller('AddPostCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function ($scope, $resource, $location, $routeParams) {
    var Blogs = $resource('/api/blogs/:blogid')

    Blogs.get({blogid: $routeParams.blogid}, function (blog) {
      $scope.blog = blog

      $scope.createblogpost = function () {
        var BlogsPost = $resource('/api/blogs/' + $scope.blog._id)
        BlogsPost.save($scope.post, function () {
          $location.path('/viewblog/' + $routeParams.blogid)
        })
      }
    })
  }
])

app.controller('DeletePostCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function ($scope, $resource, $location, $routeParams) {
    var Blogs = $resource('/api/blogs/:blogid')

    Blogs.get({blogid: $routeParams.blogid}, function (blog) {
      $scope.blog = blog

      for (let post of blog.posts) {
        if (post.postid == $routeParams.postid) {
          $scope.post = post
          break
        }
      }
    })

    $scope.delete = function () {
      var BlogsPost = $resource('/api/blogs/:blogid/:postid')

      BlogsPost.delete({blogid: $routeParams.blogid, postid: $routeParams.postid},
      function (blog) {
        $location.path('/viewblog/' + $routeParams.blogid)
      })
    }
  }
])
