dsf
		.controller(
				'majorIllnessController',
				function($scope, $rootScope, $state, $log, $filter, MsgsModel,
						$timeout,$stateParams, localStorageService, databaseService) {
					$scope.hideHeader = false;
					$scope.hideDrawer = false;
					$scope.$parent.bodyClass = "homepageBackground";
					$scope.$parent.showFooter = false;
					$scope.$parent.PageHeaderParam = "Major Illness";
					/*$scope.patternToUSe="[\u0621-\u064A\u0660-\u0669 ]+$|([a-zA-Z]+\\s)*[a-zA-Z]+$";*/
					
					/* the below is responsible for */
				});