dsf.controller('merchantController',  function($scope, $rootScope, $state,
		$log, $filter, MsgsModel, $http, SearchModel, offerModel,$timeout , 
		databaseService, localStorageService,SocialShare,$window) {
	
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "offersBackground";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam = "DSF Merchants";
	var that=this;
	initBackgroundResize();

	
	WL.Device.getNetworkInfo (function(deviceStatus){
		if(WL.Client.isConnected()==true)
			{	
			if((deviceStatus && deviceStatus.isNetworkConnected&&deviceStatus.isNetworkConnected=="true"))
				{
					$scope.getlocation(JSON.parse(localStorageService.getMerchantList()));
				}
				
			}	
		else
			{
				$scope.searchList =$.makeArray(JSON.parse(localStorageService.getMerchantList()));
				if($scope.searchList.length==0)
					{

					$http.get('data/outlet.json').success(function(data, status) {
						var result = {};
								var offerListUpdated = {};
							$scope.getlocation(angular.fromJson(data));	
							});
					}
				else
					{
					$scope.getlocation(JSON.parse(localStorageService.getMerchantList()));
					}
			}
	});
	
	$scope.openWebSite=function(website){
		window.open("http://"+website,"_blank");
	}
	
	$scope.ListOffersInOutlet=function(outletid,outletobj,categoryid,categoryobj) {
		$state.go('filteredOfferList',{outletID:outletid,outletObj:outletobj,CategoryID:categoryid,CategoryObj:categoryobj});
	}
	
	$scope.getlocation=function(merchantList)
	{var outletLocationListSortedObject=[];
		locationsList=$.makeArray(JSON.parse(localStorageService.getLocationList()));
		for(var w=0;w<merchantList.length;w++) { var ListOfLocationID=[];
			if(merchantList[w].LOCATION!=null &&merchantList[w].LOCATION.indexOf(',')>-1){
				ListOfLocationID=(merchantList[w].LOCATION).split(',');/*List of locations for one merchant*/
			}
			var ListOfOutletLocationArracy=[];
			
			for(var loc=0;loc<ListOfLocationID.length;loc++) {
				for(var z=0;z<locationsList.length;z++)
				 { if(parseInt(ListOfLocationID[loc])==locationsList[z].ID)
						{
					 		ListOfOutletLocationArracy[loc]=locationsList[z];
							break;
						}
			}
			 
			}
	merchantList[w].LOCATION=ListOfOutletLocationArracy;//return outletLocationListSortedObject;
	}
		$scope.searchList =$.makeArray(merchantList);
		$timeout(function(){
			$scope.$apply();
			initOpenClose();
		}, 50);
	
	}
	
});