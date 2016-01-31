dsf.service('offerModel', ['localStorageService','$filter',function(localStorageService,$filter) { 
var selectedOfferID;
var dsfOffersAddMoreCount=0;
var adibOffersAddMoreCount=0;
var dsfOffersFirstTimeLoadFlag="false";
var dsfOfferList;
var adibOfferList;
var that =this;
var DATA_EXPIRY_IN_MS=3600000;
var lastTimeSynch=JSON.parse(localStorageService.getGlobalDataRefreshLastTimeStamp());
var currentTimeStamp=new Date().getTime();
this.setOfferID = function(offerID){
	selectedOfferID=offerID;
}
this.getOfferID=function()
{
	return selectedOfferID;
}
this.setadibOffersAddMoreCount = function(offercount){
	adibOffersAddMoreCount=offercount;
}
this.getadibOffersAddMoreCount=function()
{
	return adibOffersAddMoreCount;
}
//DSF offers Not Formatted
this.setADIBOffersList = function(offerlist){
	adibOfferList=this.adjustADIBOfferList(offerlist);

}
this.getADIBOffersList=function()
{
	return adibOfferList;
}

this.setDSFOffersAddMoreCount = function(offerID){
	dsfOffersAddMoreCount=offerID;
}
this.getDSFOffersAddMoreCount=function()
{
	return dsfOffersAddMoreCount;
}

//DSF offers Not Formatted
this.setDSFOffersList = function(offerlist){
	dsfOfferList=this.adjustOfferList(offerlist);
	
}
this.getDSFOffersList=function()
{
	return dsfOfferList;
}
//this.adjustADIBOfferList = function(OffersList) {
//	var processedOffers = [];
//	var formalizedArray = [];
//	for (var i = 0; i < OffersList.length; i++) {
//		var offer = OffersList[i];
//		if (offer.IS_ADIB_OFFER === 'Y') {
//			if (processedOffers.indexOf(offer.ID) < 0) {
//				this.addOutlets(offer, formalizedArray);
//				processedOffers.push(offer.ID);
//			} else {
//				console.log("Offer " + offer.ID
//						+ " is duplicated... skipping it!");
//			}
//		}
//	}
//	return formalizedArray;
//}
this.adjustOfferList=function(OffersList){
	var processedOffers = [];
	var formalizedArray=[];
	for(var i=0;i<OffersList.length;i++){
		var offer = OffersList[i];
		if(processedOffers.indexOf(offer.ID) < 0){
			this.addOutlets(offer, formalizedArray);
			processedOffers.push(offer.ID);
		} else {
			console.log("Offer " + offer.ID + " is duplicated... skipping it!");
		}
		
	}
	formalizedArray=$filter('orderBy')(formalizedArray,'NAME');
	localStorageService.setAllOfferList(JSON.stringify(formalizedArray));
	this.filterADIBOfferList(formalizedArray);
	//return formalizedArray;
}
this.addOutlets = function(offer, outlets){
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
					"BRANDS_DISTRIBUTED":outlet[k].BRANDS_DISTRIBUTED,
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
			this.fillLocationInfo(outletIDs,o);
			outlets.push(o);
		}
		
	}
}
this.fillLocationInfo=function(outletIDs, formalizedObj)
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
this.filterADIBOfferList=function(offerList)
{ var adibOffers =[];
	for(var x=0;x<offerList.length;x++)
	{if (offerList[x].IS_ADIB_OFFER === 'Y')
		{
			adibOffers.push(offerList[x]);
		}
	}
	localStorageService.setADIBOfferList(JSON.stringify(adibOffers));
}
 this.setRatings=function(rating){
	var ratingsVals = {
        	one: 1<=rating?true:false,
        	two: 2<=rating?true:false,
        	three:3<=rating?true:false,
        	four: 4<=rating?true:false,
        	five: 5<=rating?true:false,
        };
return ratingsVals;
}

}]);