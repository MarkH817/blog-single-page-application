/* global angular */

var app = angular.module('OnlineBlogging', ['ngResource', 'ngRoute'])

app.config(['$routeProvider', ($routeProvider) => {
  $routeProvider

  .when('/', {
    templateUrl: 'partials/home.html'
  })

  .otherwise({
    redirectTo: '/'
  })
}])
