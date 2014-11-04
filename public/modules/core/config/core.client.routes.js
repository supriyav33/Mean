'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('userhome', {
			url: '/userhome',
			templateUrl: 'modules/core/views/userindexpage.html'
		}).
		state('accountDetailPage', {
			url: '/accountDetailPage',
			templateUrl: 'modules/accounts/views/account-home.html'
		}).
		state('contactDetailPage', {
			url: '/contactDetailPage',
			templateUrl: 'modules/contacts/views/contact-home.html'
		}).
		state('adminsingupPage', {
			url: '/adminsingupPage',
			templateUrl: 'modules/organizations/views/admin-login.html'
		}).
		state('adminindexpage', {
			url: '/adminindexpage',
			templateUrl: 'modules/core/views/adminindexpage.html'
		}).
		state('createuserpage', {
			url: '/createuserpage',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('viewusers', {
			url: '/viewusers',
			templateUrl: 'modules/core/views/viewusers.html'
		});
	}
]);