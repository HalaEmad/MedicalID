dsf.controller('detailsPageController', function($scope, $rootScope, $state, $log,$filter,MsgsModel,$http,offerModel,SocialShare) {
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "searchBkgrd";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam="Offers";
	$scope.searchList="";
	$scope.selectedOfferID="";
	
	$http.get('data/offers.json').success(function(data, status) {
		var result = {};

		if (status == 200 && data) {
			result = angular.fromJson(data);
		}
		$scope.searchList=result;
		$scope.selectedOfferID=offerModel.getOfferID();
		for(var i=0; i < $scope.searchList.length; i++)
	        {
				if($scope.searchList[i].OfferID==$scope.selectedOfferID)
					{
						$scope.OfferMainHeaderDescription=$scope.searchList[i].OfferTitle;
						$scope.offerLongDescription=$scope.searchList[i].OfferLongDescription;
						$scope.getInTouchContent=$scope.searchList[i].OfferOutletContactValue;
						$scope.whereToFindUsContent=$scope.searchList[i].OfferOutletContactValue;
						$scope.fromHeaderContent=$scope.searchList[i].OfferValidityStartDate;
						$scope.toHeaderContent=$scope.searchList[i].OfferValidityEndDate;
						$scope.offerDiscountAmount=$scope.searchList[i].OfferDiscountValue;
						if($scope.searchList[i].IsADIBOffer=="true")
							{
								$scope.adibOfferContent=$scope.searchList[i].ADIBOfferDesription;
							}
						else
							{
								$scope.hideAdibOffer=true;
							}
						break;
					}
				
	        }  

		
	});
	$scope.socialShare=function()
	{
		SocialShare.share("Hala","Hala","")
	}

});