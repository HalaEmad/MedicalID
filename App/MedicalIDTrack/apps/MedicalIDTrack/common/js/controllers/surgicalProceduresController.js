dsf
		.controller(
				'surgicalProceduresController',
				function($scope, $rootScope, $state, $log, $filter, MsgsModel,
						$timeout,$stateParams, localStorageService, databaseService) {
					$scope.hideHeader = false;
					$scope.hideDrawer = false;
					$scope.$parent.bodyClass = "homepageBackground";
					$scope.$parent.showFooter = false;
					$scope.$parent.PageHeaderParam = "Surgical Procedures";
					initOpenClose();
					
				});