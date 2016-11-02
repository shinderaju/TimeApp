/**
 * Main js
 *
 */
var HrApp = angular.module('HrApp', ['ui.bootstrap','ui.router','toastr','ngAnimate']);
HrApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('signin', {
	         url: '/',
	         templateUrl:'views/signin.html',
	         controller: 'loginCtrl'
	       })
		   .state('profile', {
	          url: '/profile?param?id',
	         templateUrl:'views/profile.html',
	         controller: 'profileCtrl'
	       })
});
