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
				$scope.heroOffersCounter=$.makeArray(data).length;
				console.log('counter'+$scope.heroOffersCounter);
				$scope.$apply();
				initCarousel();
				initCycleCarousel();
			},50);
		}
		});
	/*Adding this block of code for the details page so that we can make sure there is data to be displayed*/
	$scope.offerListUpdated =($.makeArray(JSON.parse(localStorageService.getAllOfferList())));
	if($scope.offerListUpdated.length==0)
			{
				$scope.fillOffersList();
			}
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
	
	$http.get('data/categories.json').success(function(data, status) {
		var result = {};
		if (status == 200 && data) {
			$timeout(function(){
				//$scope.catOrder=$scope.sortCatOrder();
				$scope.categoriesList=$scope.sortCatOrder($.makeArray(data.Categories));
				$scope.$apply();
			},50);
		}
		});
	$scope.sortCatOrder=function(categoriesList)
	{
		var catorder=[];
		var userProfSelectedCat=[];
		if(localStorageService.getUserprofileCatIDs()==undefined||localStorageService.getUserprofileCatIDs()=="")
			{
				catorder=categoriesList;
			}
		else
			{
				//list of IDs of categories selected by the client 
			userProfSelectedCat=$.makeArray(JSON.parse(localStorageService.getUserprofileCatIDs()));
				var count=userProfSelectedCat.length;

				for(var i=0;i<categoriesList.length;i++){
						var catIDexist=false;
						for(var j=0;j<userProfSelectedCat.length;j++)
							{
								if(parseInt($.makeArray(JSON.parse(localStorageService.getUserprofileCatIDs()))[j].substring(3))==categoriesList[i].cat_id)
									{
										catIDexist=true;
										catorder[j]=categoriesList[i];
									}
							}
						if(catIDexist==false)
						{
							
							catorder[count]=categoriesList[i];
							count++;
						}
							
					}
			}
		return catorder;
	}
	$scope.adibOffersPageNav=function()
	{
		$scope.$parent.hideDrawer = false;
		$state.go('adiboffers');
	};

	$scope.navigateToOfferDetails=function(index)
	{		
		localStorageService.setOfferInfo(index);
		$state.go('offerDetails');
	};

	$scope.goTooffer=function(index)
	{
		$state.go('showoffers');
	};
	$scope.eventsList=function()
	{
		$state.go('events');
	};
	
	$scope.goToCategoryPage=function(outletID,outletobj,catID,CatObj,headertext)
	{
		$state.go('filteredOfferList',{outletID:outletID,outletObj:outletobj,CategoryID:catID,CategoryObj:CatObj,headerTitle:headertext});
	}
}); 