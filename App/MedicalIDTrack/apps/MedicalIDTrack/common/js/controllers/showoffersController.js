dsf.controller('showoffersController', function($scope, $rootScope, $state,
		$log, $filter, MsgsModel, $http, SearchModel, offerModel,$timeout , 
		databaseService, localStorageService,SocialShare) {
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "offersBackground";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam = "DSF Offers";
	offerModel.setDSFOffersAddMoreCount(0);
	var that=this;
	initBackgroundResize();
 if(WL.Client.isConnected()==true)
	{
	 WL.Device.getNetworkInfo (function(deviceStatus){
			if((deviceStatus && deviceStatus.isNetworkConnected&&deviceStatus.isNetworkConnected=="true"))
			{
				$scope.offerListUpdated =($.makeArray(JSON.parse(localStorageService.getAllOfferList()))).slice(0,100);
				if($scope.offerListUpdated.length==0)
					{
						$scope.fillOffersList();
						$timeout(function(){
							$scope.offerListUpdated =($.makeArray(JSON.parse(localStorageService.getAllOfferList()))).slice(0,100);
							$scope.$apply();
							initOpenClose();
							initSwipeRows();
						},100);

					}
		$timeout(function(){
			$scope.$apply();
			initOpenClose();
			initSwipeRows();
			
		},50);
			}
			
	 });
	}
else
	{
	$scope.offerListUpdated =($.makeArray(JSON.parse(localStorageService.getAllOfferList()))).slice(0,100);
		if($scope.offerListUpdated.length==0)
				{
					$scope.fillOffersList();
					$timeout(function(){
						$scope.offerListUpdated =($.makeArray(JSON.parse(localStorageService.getAllOfferList()))).slice(0,100);
						$scope.$apply();
						initOpenClose();
						initSwipeRows();
					},100);
	
				}
	$timeout(function(){
		$scope.$apply();
		initOpenClose();
		initSwipeRows();
		
	},50);

	}

	
	$scope.appendmore=function()
	{
		var roundNo=offerModel.getDSFOffersAddMoreCount();
		var temp;
		if(roundNo>0)
			{
			tempArray=$.makeArray(JSON.parse(localStorageService.getAllOfferList())).slice(((roundNo+1)*100+1),(roundNo+1)*100+100);
			
			offerModel.setDSFOffersAddMoreCount(roundNo+1);
			}
		else{
			if(localStorageService.getGlobalDataRefreshLastTimeStamp()==null)
				{
					$scope.fillOffersList();
					$timeout(function(){
						
					}, 100)
				}
			 tempArray=$.makeArray(JSON.parse(localStorageService.getAllOfferList())).slice(101,200);
				offerModel.setDSFOffersAddMoreCount(roundNo+1);
			}
			for(var x=0;x<tempArray.length;x++)
				{	
					$scope.offerListUpdated.push(tempArray[x]);
				}
			
		$timeout(function(){
			initSwipeRows();
			initOpenClose();
		}, 50)
	}

 }
);