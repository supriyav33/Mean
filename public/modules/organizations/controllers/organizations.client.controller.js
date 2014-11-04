'use strict';

angular.module('organizations', []).service('sharedProperties', function (Organizations,$q){
	return {
		create:function(value,callback) {
			var deferred = $q.defer();
			var organization = new Organizations ({
				name: value
			});
			
			organization.$save(function(response) {
				deferred.resolve(response);
			}, function(errorResponse) {
				deferred.reject();
			});
			var myData = deferred.promise;
			myData.then(function(data) {
				callback(data);
			});
		}
	
	};
});

angular.module('organizations').controller('OrganizationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Organizations',
	function($scope, $stateParams, $location, Authentication, Organizations ) {
		$scope.authentication = Authentication;

		// Create new Organization
		$scope.create = function(companyname) {
			// Create new Organization object
			var organization = new Organizations ({
				name: companyname
			});

			// Redirect after save
			organization.$save(function(response) {
				//$location.path('organizations/' + response._id);

				// Clear form fields
				//$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			return response._id;
		};

		// Remove existing Organization
		$scope.remove = function( organization ) {
			if ( organization ) { organization.$remove();

				for (var i in $scope.organizations ) {
					if ($scope.organizations [i] === organization ) {
						$scope.organizations.splice(i, 1);
					}
				}
			} else {
				$scope.organization.$remove(function() {
					$location.path('organizations');
				});
			}
		};

		// Update existing Organization
		$scope.update = function() {
			var organization = $scope.organization ;

			organization.$update(function() {
				$location.path('organizations/' + organization._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Organizations
		$scope.find = function() {
			$scope.organizations = Organizations.query();
		};

		// Find existing Organization
		$scope.findOne = function() {
			$scope.organization = Organizations.get({ 
				organizationId: $stateParams.organizationId
			});
		};
	}
]);