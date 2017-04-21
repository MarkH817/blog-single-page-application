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
