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

  .when('/deleteblog/:blogid', {
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

app.controller('ViewBlogCtrl', ['$scope', '$resource', '$routeParams',
  function ($scope, $resource, $routeParams) {
    var Blogs = $resource('/api/blogs/:blogid')

    Blogs.get({blogid: $routeParams.blogid}, function (blog) {
      $scope.blog = blog
    })
  }
])

app.controller('AddPostCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function ($scope, $resource, $location, $routeParams) {
    $scope.createblogpost = function () {
      var Blogs = $resource('/api/blogs/:blogid')

      Blogs.get({blogid: $routeParams.blogid}, function (blog) {
        $scope.blog = blog
      })
    }
  }
])
