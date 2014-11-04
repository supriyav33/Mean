'use strict';

var app=angular.module('users', [] );
app.controller('AuthenticationController',['$scope', '$http', '$location', 'Authentication','sharedProperties','Users','$stateParams',
	function($scope, $http, $location, Authentication,sharedProperties,Users,$stateParams) {
		$scope.authentication = Authentication;
       //$scope.user = Authentication.user;
        //$scope.myData = [];
		//$scope.myData = Users.query();
        
        //Load list of Users
		$scope.find = function() {
			$scope.users = Users.query();
			$scope.gridOptions = {
				data: 'users',
				enablePaging: true,
				showFooter: true,
				totalServerItems: 'totalServerItems',
				pagingOptions: $scope.pagingOptions,
				filterOptions: $scope.filterOptions,
				selectedItems: $scope.mySelections,
      			multiSelect: false
			};

		};


		//if ($scope.authentication.user) $location.path('/accounts/create');
		
		$scope.signup = function() {
			if($scope.credentials.companyName != null && $scope.credentials.companyName != ''){
				
				$scope.credentials.role = "admin";
				sharedProperties.create($scope.credentials.companyName,function(result){
				
				angular.forEach(result, function(value , key) {
						if(key == '_id'){
							$scope.assingValue(value);	  
						}
					});
					}
				);
			}
			else {
				$scope.credentials.role = "user";
				$scope.credentials.orgId = $scope.authentication.user.orgId;
				$http.post('/auth/signup', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					//$scope.authentication.user = response;
					// And redirect to the index page
					$location.path('/adminindexpage');
				}).error(function(response) {
					$scope.error = response.message;
			});
			}
		};
		
		
		$scope.assingValue = function(value) {
			$scope.credentials.orgId = value;
			
			/*angular.forEach($scope.credentials, function(value , key) {
			console.log("value+--"+value+"key+--"+key);
			});*/
			
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;
					// And redirect to the index page
					$location.path('/adminindexpage');
				}).error(function(response) {
					$scope.error = response.message;
			});
		};
		
		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//$scope.authentication.user = response;
				angular.forEach($scope.authentication.user, function(value , key) {
					//console.log("1value+--"+value+"1key+--"+key);
					if(key=='role' && value =='admin'){
                        $location.path('/adminindexpage');
						//console.log("1value+--"+value+"1key+--"+key);
					}
					else{ 
                       $location.path('/userhome');  
                       //console.log("1value+--"+value+"1key+--"+key);
					}

				});	
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
