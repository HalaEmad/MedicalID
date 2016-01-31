dsf.controller('filteredOfferListController', function($scope, $rootScope, $state,$stateParams,
		$log, $filter, MsgsModel, $http, SearchModel, offerModel,$timeout , 
		databaseService, localStorageService,SocialShare) {
	
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "offersBackground";
	$scope.$parent.showFooter = false;
	$scope.outletID=$stateParams.outletID;
	if($stateParams.headerTitle!=null)
	{$scope.$parent.PageHeaderParam = $stateParams.headerTitle}
	else
		{$scope.$parent.PageHeaderParam ="Offers"}
	if($stateParams.CategoryID!=null)
		{$scope.iconClassToSelect="cat"+$stateParams.CategoryID;}
	else {$scope.iconClassToSelect="catdefault";}
	initBackgroundResize();
	var that=this;
	
	WL.Device.getNetworkInfo (function(deviceStatus){
		if(WL.Client.isConnected()==true)
			{

			if((deviceStatus && deviceStatus.isNetworkConnected&&deviceStatus.isNetworkConnected=="true")){
				if($stateParams.outletID!=null&&$stateParams.CategoryID==null)
				{
					databaseService.fetchOffersListWithOutlet($stateParams.outletID,callback);
				}
			else if($stateParams.CategoryID!=null&&$stateParams.outletID==null)
				{
					databaseService.fetchAllOffersInCategoryList($stateParams.CategoryID,callbackcategory);
				}
			else
				{
					databaseService.fetchAllOffersInCategoryList($stateParams.CategoryID,callback);
				}
			}
			
			}
		else
			{
			if($stateParams.outletID!=null&&$stateParams.CategoryID==null)
				{
					callback('COMMFAILURE');
				}
			else if($stateParams.CategoryID!=null&&$stateParams.outletID==null)
				{
					callbackcategory('COMMFAILURE');
				}
			else
				{
					callback('COMMFAILURE');
				}
				
			}
	});
	
	
	
	

	function callback(flag,OffersList) {
		var offerUpdatedList;
		var offerListUpdated = {};
		if (flag == "SUCCESS")
		{	
			$scope.offerUpdatedList=that.adjustOfferList($.makeArray(OffersList));
			
			$timeout(function(){
				$scope.$apply();
				initOpenClose();
				initSwipeRows();
				
			}, 100);
		} 
			else {
				$http.get('data/offers.json').success(function(data, status) {
				$scope.offerUpdatedList =that.adjustOfferList( angular.fromJson(data));
				$timeout(function(){
					initOpenClose();
					initSwipeRows();
				}, 50);
				});		
		}
	}
	
	function callbackcategory(flag,offerList) {
		var offerUpdatedList;
		var offerListUpdated = {};
		if (flag == "SUCCESS")
		{	
			$scope.offerUpdatedList=that.adjustOfferList($.makeArray(offerList));//that.adjustOfferList(OffersList,$stateParams.outletObj);
			$timeout(function(){
				$scope.$apply();
				initOpenClose();
				initSwipeRows();
				
			}, 100);
		}
			else {
				$http.get('data/offline_categories.json').success(function(data, status) {
					var result = {};

					if (status == 200 && data) {
						$scope.offerUpdatedList =that.adjustOfferList((angular.fromJson(data))[$stateParams.CategoryID],$stateParams.CategoryID);
						$timeout(function(){
							initOpenClose();
							initSwipeRows();
							
						}, 50);
						
					}
					
	});
			
		}
	}
	that.adjustOfferList=function(OffersList,catID){
		var formalizedArray=[];
		for(var i=0;i<OffersList.length;i++){
			var offer = OffersList[i];
			$scope.addOutlets(offer, formalizedArray);
		}
		
		
		return formalizedArray;
	}
	$scope.addOutlets = function(offer, outlets){
		var outletOffer=$.makeArray(JSON.parse(localStorageService.getofflineoutletOfferList()));
		var outlet=$.makeArray(JSON.parse(localStorageService.getofflineoutletsList()));

		// get ID of outlets.
		var outletIDs = [];
		for(var j=0;j<outletOffer.length ;j++){
			if(outletOffer[j].OFFER_ID==offer.ID){
				outletIDs.push(outletOffer[j].OUTLET_ID); 
				
			}
		}
		var targetOutletID = outletIDs[parseInt(Math.random() * outletIDs.length)];

		// get actual outlet
		for(var k=0;k<outlet.length;k++){
			if(outlet[k].ID==targetOutletID) {
				var o = {
						"NAME":outlet[k].NAME,
						"CONTACT_EMAIL":outlet[k].CONTACT_EMAIL,
						"WEBSITE":outlet[k].WEBSITE,
						"CONTACT_NO":outlet[k].CONTACT_NO,
						"DESCRIPTION":offer.DESCRIPTION,
						"START_DATE":offer.START_DATE,
						"END_DATE":offer.END_DATE,
						"PERMIT_NUMBER":offer.PERMIT_NUMBER,
						"IS_ADIB_OFFER":offer.IS_ADIB_OFFER,
						"ADIB_DESCRIPTION":offer.ADIB_DESCRIPTION,
						"TITLE":offer.TITLE,
						"ID":offer.ID,
						"CATEGORY":offer.CATEGORY
				};

				o.offerRating = localStorageService.initializeRating(offer.ID);

				// get location of outlet $scope.getLocationInfo
				$scope.fillLocationInfo(outletIDs, o);
				outlets.push(o);
			}
			
		}
	}
	$scope.fillLocationInfo=function(outletIDs, formalizedObj)
	{
		var outlet=$.makeArray(JSON.parse(localStorageService.getofflineoutletsList()));
		var locationsIDs=[]
		for(var k=0;k<outletIDs.length;k++){
			for(var m=0;m<outlet.length;m++){//this for loop to get list of location IDs 
				if(outlet[m].ID==outletIDs[k])
					{
						if(outlet[m].LOCATION!=null)
						{locationsIDs.push(outlet[m].LOCATION);}
					}
			}
		}
		var locations =$.makeArray(JSON.parse(localStorageService.getLocationList()));
		var ListOfLocationID=[];
		var ListOfOutletLocationArracy=[];
		
		for(var loc=0;loc<locationsIDs.length;loc++) {
			for(var z=0;z<locations.length;z++)
			 { if(parseInt(locationsIDs[loc])==locations[z].ID)
					{
				 		ListOfOutletLocationArracy[loc]=locations[z];
						break;
					}
		}
		 
		}
		formalizedObj.LOCATION=ListOfOutletLocationArracy;//return outletLocationListSortedObject;
	}	
	$scope.navigateToContactUs=function(){
		$state.go('contactus',{NavFromAdib:true});
	}
});