dsf.controller('searchResultDetailsController', function($scope,$stateParams, $rootScope, $state, $log,$filter,$http,$timeout,SearchModel,offerModel,localStorageService) {
	$scope.hideHeader = false;
	$scope.hideDrawer = false;
	$scope.$parent.bodyClass = "offersBackground";
	$scope.$parent.showFooter = true;
	$scope.$parent.PageHeaderParam="Search Results";
	var that =this ;
	$scope.searchText=$stateParams.searchText;
	$scope.serachMall=$stateParams.serachMall;
	
	$scope.displayListOfOFfers="false";
	/*to be validated tomorrow*/
			$scope.formattedFavoriteOffersList=$.makeArray(JSON.parse(localStorageService.getAllOfferList()));
			if($scope.formattedFavoriteOffersList.length==0)
			{
				$scope.fillOffersList();
				$timeout(function(){
					$scope.formattedFavoriteOffersList =($.makeArray(JSON.parse(localStorageService.getAllOfferList())));
					$scope.$apply();
					initOpenClose();
					initSwipeRows();
				},50);

			}
			$timeout(function(){
				initOpenClose();
				initSwipeRows();
			}, 50);
});