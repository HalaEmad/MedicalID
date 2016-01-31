dsf.controller('offerDetailsController', function($scope, $rootScope, $state, $log, $filter, MsgsModel, $http, SearchModel, offerModel,$timeout , databaseService, localStorageService,SocialShare) {
	
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "offersBackground";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam = "Offer Details";
	var that=this;
	initCustomForms();
	initBackgroundResize();

	var favoriteItem;
	
	favoriteItem=parseInt(localStorageService.getOfferInfo());
	
	$http.get('data/offers.json').success(function(data, status) {
		var result = {};

		if (status == 200 && data) {
			$scope.favoriteItems = offerItemAdjust(favoriteItem,angular.fromJson(data));
			$timeout(function(){
				$scope.$apply();
				initOpenClose();
				initSwipeRows();
				$('.opener').trigger("click");
			}, 100);
		}
	});
	
	offerItemAdjust = function(favoriteItem,OriginalOffersList){
		var formattedFavoriteOffersList=[];
		var OriginalOffersList=$.makeArray(JSON.parse(localStorageService.getAllOfferList()));
		for(var j=0;j<OriginalOffersList.length;j++) {
			if(favoriteItem==OriginalOffersList[j].ID){
				formattedFavoriteOffer = OriginalOffersList[j];
				formattedFavoriteOffer.offerRating = localStorageService.getOneOffersRating(favoriteItem);
				if(formattedFavoriteOffer.offerRating == null)
					formattedFavoriteOffer.offerRating = {offerID: favoriteItem, rating: 0, ratingsVals: { one: false, two: false, three: false, four: false, five: false }};
				 formattedFavoriteOffersList[0]=formattedFavoriteOffer;
				return that.adjustOfferList(formattedFavoriteOffersList);
			}
		}
		return null;
	}
	
	that.adjustOfferList=function(OffersList,catID){
		var processedOffers = [];
		var formalizedArray=[];
		for(var i=0;i<OffersList.length;i++){
			var offer = OffersList[i];
			if(processedOffers.indexOf(offer.ID) < 0){
				$scope.addOutlets(offer, formalizedArray);
				processedOffers.push(offer.ID);
			} else {
				console.log("Offer " + offer.ID + " is duplicated... skipping it!");
			}
			
		}
		
		
		return formalizedArray;
	}
	$scope.addOutlets = function(offer, outlets){
		var outletOffer=$.makeArray(JSON.parse(localStorageService.getofflineoutletOfferList()));
		var outlet=$.makeArray(JSON.parse(localStorageService.getofflineoutletsList()));

		// get ID of outlets.
		var outletIDs = [];
		for(var j=0;j<outletOffer.length ;j++){
			if(outletOffer[j].OFFER_ID==offer.ID && outletIDs.indexOf(outletOffer[j].OUTLET_ID) < 0){
				outletIDs.push(outletOffer[j].OUTLET_ID); // list of outlets for that specific offer
			}
		}
		if(offer.ID == 2){
			console.log("2-------");
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
						"TITLE":offer.TITLE,
						"ADIB_DESCRIPTION":offer.ADIB_DESCRIPTION,
						"OUTLET_ID":outlet[k].ID,
						"ID":offer.ID,
						"CATEGORY":offer.CATEGORY,
						"LOCATION":outlet.LOCATION
				};

				o.offerRating = localStorageService.initializeRating(offer.ID);

				// get location of outlet $scope.getLocationInfo
				$scope.fillLocationInfo(outletIDs,o);
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

});