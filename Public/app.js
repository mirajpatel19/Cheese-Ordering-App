
var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Home/index.html',
            controller: ''
        })
        .when('/confirmation', {
            templateUrl: 'confirmation/confirmation.html',
            controller: ''
        })
        .when('/orders', {
            templateUrl: 'orders/orders.html',
            controller: 'orders/orderCtrl'
        })
        .when('/picklist', {
            templateUrl: 'picklist/picklist.html',
            controller: 'picklist/pickListCtrl'
        })
        .when('/payroll', {
            templateUrl: 'payroll/payroll.html',
            controller: 'payroll/payRollCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});