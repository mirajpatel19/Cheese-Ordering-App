var app = angular.module('myApp', [
    'ngRoute'
]);
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

$routeProvider
    .when('/index', {
        templateUrl: '/index.html',
        controller: ''
    })
    .when('/orders', {
        templateUrl: '/orders.html',
        controller: '/Controllers/orderCtrl'
    })
    .when('/picklist', {
        templateUrl: '/picklist.html',
        controller: '/Controllers/pickListCtrl'
    })
    .when('/payroll', {
        templateUrl: '/payroll.html',
        controller: '/Controllers/payRollCtrl'
    })