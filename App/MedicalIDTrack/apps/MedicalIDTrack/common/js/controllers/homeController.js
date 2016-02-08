dsf.controller('homeController', function($scope, $rootScope, $state,$http, $log, $timeout,offerModel,localStorageService,databaseService) {
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "homepageBackground";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam="My Dubai Festival";
	initCarousel();
	initCycleCarousel();

	$http.get('data/heroOffers.json').success(function(data, status) {
		var result = {};
		if (status == 200 && data) {
			$timeout(function(){
				$scope.heroOffers=$.makeArray(data);
				$scope.heroOffersCounter=4;
				console.log('counter'+$scope.heroOffersCounter);
				$scope.$apply();
				initCarousel();
				initCycleCarousel();
			},50);
		}
		});
	/*Adding this block of code for the details page so that we can make sure there is data to be displayed*/
//	$scope.offerListUpdated =($.makeArray(JSON.parse(localStorageService.getAllOfferList())));
//	if($scope.offerListUpdated.length==0)
//			{
//				$scope.fillOffersList();
//			}
//	databaseService.fetchHeroOffers(function(flag) {
//		if(flag=="SUCCESS") {
//				$scope.heroOffers=JSON.parse(localStorageService.getHeroOfferList());
//				console.log("offers:", $scope.heroOffers);
//				$timeout(function(){
//					$scope.$apply();
//					initCarousel();
//					initCycleCarousel();
//					
//				},100);
//		} else {
//
//
//			$http.get('data/heroOffers.json').success(function(data, status) {
//				var result = {};
//				if (status == 200 && data) {
//					$timeout(function(){
//						$scope.heroOffers=$.makeArray(data);
//						$scope.$apply();
//						initCarousel();
//						initCycleCarousel();
//
//					},0);
//					
//					
//				}	
//			});
//			
//		}
//	});
	$scope.navigateToOfferDetails=function(ID)
	{
		$scope.$parent.hideDrawer = false;
		switch (ID) {
	    case 1:
	    	$state.go('majorIllness');
	    	break;
	    case 2:
			$state.go('medicalEvents');
	    	break;
	    case 3:
			$state.go('medications');
	    	break;
	    case 4:
	    	$state.go('surgicalProcedures');
	    	break;
	}

			
	};


	
	
}); 