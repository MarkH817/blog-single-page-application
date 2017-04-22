/* global angular */

var app = angular.module('OnlineBlogging', ['ngResource', 'ngRoute'])

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

  .when('/deleteblog/:id', {
    templateUrl: 'partials/blog-delete.html',
    controller: 'DeleteBlogCtrl'
  })

  // .when('/viewblog/:blogid', {
  //   templateUrl: '',
  //   controller: ''
  // })

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
    $scope.save = function () {
      var Blogs = $resource('/api/blogs')

      Blogs.save($scope.blog, function () {
        $location.path('/')
      })
    }
  }
])

app.controller('DeleteBlogCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function ($scope, $resource, $location, $routeParams) {
    var Blogs = $resource('/api/blogs')

    Blogs.get({_id: $routeParams.id}, function (blog) {
      $scope.blog = blog
    })

    $scope.delete = function () {
      Blogs.delete({_id: $routeParams.id}, function (movie) {
        $location.path('/')
      })
    }
  }
])
