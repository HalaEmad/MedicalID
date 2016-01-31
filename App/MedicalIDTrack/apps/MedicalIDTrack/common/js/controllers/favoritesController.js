
/* JavaScript content from js/controllers/favoritesController.js in folder common */
dsf.controller('favoritesController', function($scope, $rootScope, $state,
		$log, $filter, MsgsModel, $http, SearchModel, offerModel,$timeout , 
		databaseService, localStorageService,SocialShare) {
	
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "offersBackground";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam = "My Favourites";
	var that=this;

	$scope.changeRating=function(){
	    $(this).siblings('.icon-star').removeClass('active');
	    $(this).prevAll('.icon-star').addBack().addClass('active');
	
	}	
	
//	$scope.searchList=$.makeArray(JSON.parse(localStorageService.getFavoriteOfferList()));
	$timeout(function(){
		$scope.displayFavoriteOffers();
	}, 50);
	
	
	function callback(flag) {
		var offerUpdatedList;
		if (flag == "SUCCESS")

		{
			$scope.searchList = JSON.parse(localStorageService
					.getAllOfferList());
		} else if (flag == "FAILURE"
				&& localStorageService.getAllOfferList() != "") {

	} 
			else {
				$http.get('data/offers.json').success(function(data, status) {
					var result = {};
					if (status == 200 && data) {
						offerUpdatedList = angular.fromJson(data);
						$timeout(function(){
							//$scope.initOpenCloseWrapper();
							initOpenClose();
							initSwipeRows();
						}, 50);

					}
	});
		}
	}

	$scope.changeRating=function(){

	}
	$scope.displayFavoriteOffers=function()
	{
		var formattedFavoriteOffersList=[];
		var updatedOfferList_Index=0;
		var favoriteOffersList=$.makeArray(JSON.parse(localStorageService.getFavoriteOfferList()));
		var OriginalOffersList=$.makeArray(JSON.parse(localStorageService.getAllOfferList()));
		if(favoriteOffersList.length>0)
		{
			if(OriginalOffersList.length>0)
				{
					
					for(var i=0;i<favoriteOffersList.length;i++) {
							for(var j=0;j<OriginalOffersList.length;j++) {
								
								if(favoriteOffersList[i].OFFER_ID==OriginalOffersList[j].ID)
									{
										formattedFavoriteOffersList[updatedOfferList_Index]=OriginalOffersList[j];
										updatedOfferList_Index++;
										break;
									}
							}
							}
					$scope.formattedFavoriteOffersList=formattedFavoriteOffersList;
					$timeout(function(){
						$scope.$apply();
						//$scope.initOpenCloseWrapper();
						initOpenClose();
						initSwipeRows();
					}, 50);
				}
			else
				{
					$scope.fillOffersList();
					$scope.displayFavoriteOffers();
				}
			
		}
		else{
			$scope.formattedFavoriteOffersList=[];
		}
	} 
});