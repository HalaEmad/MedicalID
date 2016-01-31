dsf.service('localStorageService', function() {
	
	/*This function is responsible to set the language of the application in the local storage*/
	this.setAppLanguage=function(lang){
		localStorage.setItem('dsf-language',lang);
	}
	
	/*This function is responsible to get the language of the application from the local storage*/
	this.getAppLanguage=function()
	{
		return localStorage.getItem('dsf-language');
	}
	
	/*This function is responsible to set the offers list of the application in the local storage*/
	this.setAllOfferList=function(offerlist){
		localStorage.setItem('dsf-allOfferlist',offerlist);
	}
	
	/*This function is responsible to get the offers list of the application from the local storage*/
	this.getAllOfferList=function()
	{
		return localStorage.getItem('dsf-allOfferlist');
	}
	
	/*This function is responsible to set the ADIB offers list of the application in the local storage*/
	this.setADIBOfferList=function(offerlist){
		localStorage.setItem('dsf-adibOfferlist',offerlist);
	}
	
	/*This function is responsible to get the ADIB offers list of the application from the local storage*/
	this.getADIBOfferList=function()
	{
		return localStorage.getItem('dsf-adibOfferlist');
	}
	
	/*This function is responsible to set the categories list of the application in the local storage*/
	this.setCategoryList=function(categorylist){
		localStorage.setItem('dsf-categorylist',categorylist);
	}
	
	/*This function is responsible to get the categories list of the application from the local storage*/
	this.getCategoryList=function()
	{
		return localStorage.getItem('dsf-categorylist');
	}
	/*This function is responsible to set the categories list of the application in the local storage*/
	this.setEventList=function(eventlist){
		localStorage.setItem('dsf-eventlist',eventlist);
	}
	
	/*This function is responsible to get the categories list of the application from the local storage*/
	this.getEventList=function()
	{
		return localStorage.getItem('dsf-eventlist');
	}
	
	/*This function is responsible to set the Outlet list of the application in the local storage*/
	this.setOutletList=function(outlitList){
		localStorage.setItem('dsf-outletlist',outlitList);
	}
	
	/*This function is responsible to get the Outlet list of the application from the local storage*/
	this.getOutletList=function()
	{
		return localStorage.getItem('dsf-outletlist');
	}
	
	/*This function is responsible to set the counties flag & code list of the application in the local storage*/
	this.setCountiresFlagAndCodeList=function(counties){
		localStorage.setItem('dsf-CountiesFlagAndCode',counties);
	}
	
	/*This function is responsible to get the counties flag & code list of the application from the local storage*/
	this.getCountiresFlagAndCodeList=function()
	{
		return localStorage.getItem('dsf-CountiesFlagAndCode');
	}
	
	/*This function is responsible to set the favorite offers list of the application in the local storage*/
	this.setFavoriteOfferList=function(counties){
		localStorage.setItem('dsf-favoriteOffers',counties);
	}
	
	/*This function is responsible to get the counties flag & code list of the application from the local storage*/
	this.getFavoriteOfferList=function()
	{
		return localStorage.getItem('dsf-favoriteOffers');
	}
	
	/*This function is responsible to set the rating offers list of the application in the local storage*/
	this.setOffersRating=function(offers){
		localStorage.setItem('dsf-ratingOffers', offers);
	}
	
	/*This function is responsible to get the rating offers list of the application in the local storage*/
	this.getOffersRating=function(){
		return localStorage.getItem('dsf-ratingOffers');
	}

	/*This function is responsible to get the rating of one offer of the application in the local storage*/
	this.getOneOffersRating=function(offerID){
		var localOffersRating = JSON.parse(this.getOffersRating());
		if(localOffersRating){
			for(var i = 0; i < localOffersRating.length; i++){
				if(offerID === localOffersRating[i].offerID)
					return localOffersRating[i];
			}
		}
		return null;
	}
	
	/*This function is responsible to set the favorite offers list of the application in the local storage*/
	this.setUserInfo=function(userinfo){
		localStorage.setItem('dsf-userInfo',userinfo);
	}
	
	/*This function is responsible to get the counties flag & code list of the application from the local storage*/
	this.getUserInfo=function()
	{
		return localStorage.getItem('dsf-userInfo');
	}
	/*This function is responsible to the get selected  offer of the application in the local storage*/
	this.setOfferInfo=function(offerinfo){
		localStorage.setItem('dsf-offerInfo',offerinfo);
	}
	
	/*This function is responsible to set the counties flag & code list of the application from the local storage*/
	this.getOfferInfo=function()
	{
		return localStorage.getItem('dsf-offerInfo');
	}
	/*This function is responsible to the get selected  offer of the application in the local storage*/
	this.setUserIdFromDB=function(userid){
		localStorage.setItem('dsf-userID',userid);
	}
	
	/*This function is responsible to set the counties flag & code list of the application from the local storage*/
	this.getUserIdFromDB=function()
	{
		return localStorage.getItem('dsf-userID');
	}
	/*This function is responsible to the get selected  offer of the application in the local storage*/
	this.setUserprofileCatIDs=function(catsID){
		localStorage.setItem('dsf-userProfileCatsID',catsID);
	}
	
	/*This function is responsible to set the counties flag & code list of the application from the local storage*/
	this.getUserprofileCatIDs=function()
	{
		return localStorage.getItem('dsf-userProfileCatsID');
	}
	this.setLocationList=function(locationlist)
	{
		localStorage.setItem('dsf-locationsList',locationlist);
	}
	
	this.getLocationList=function()
	{
		return localStorage.getItem('dsf-locationsList');
	}
	
	this.setHeroOfferList=function(herooffers)
	{
		return localStorage.setItem('dsf-heroOffers',herooffers);
	}
	this.getHeroOfferList=function()
	{
		return localStorage.getItem('dsf-heroOffers');
	}
	/*this is for offline categories offers*/
	this.setofflineoutletsList=function(offlineOutlet)
	{
		return localStorage.setItem('dsf-offlineOutlets',offlineOutlet);
	}
	this.getofflineoutletsList=function()
	{
		return localStorage.getItem('dsf-offlineOutlets');
	}
	/*this is for offline categories offers*/
	this.setofflineoutletOfferList=function(offlineOfferOutlet)
	{
		return localStorage.setItem('dsf-offlineOffersOutlets',offlineOfferOutlet);
	}
	this.getofflineoutletOfferList=function()
	{
		return localStorage.getItem('dsf-offlineOffersOutlets');
	}
	
	/**offers rating offline*/
	this.setOfferRatingList=function(offerRating)
	{
		return localStorage.setItem('dsf-offersRating',offerRating);
	}
	this.getOfferRatingList=function()
	{
		return localStorage.getItem('dsf-offersRating');
	}

	this.saveRatesLocally = function(offerID, rating){
		var localOffersRating = JSON.parse(this.getOffersRating());
		if(localOffersRating){
			var founded = false;
			for(var i = 0; i < localOffersRating.length; i++){
				if(offerID === localOffersRating[i].offerID){
					localOffersRating[i].rating = rating;
					localOffersRating[i].ratingsVals = setRatings(localOffersRating[i]);
					founded = true;
					break;
				}
			}
			if(!founded){
				var offerRating = {offerID: offerID, rating: rating};
				offerRating.ratingsVals = setRatings(offerRating);
				localOffersRating.push(offerRating);
			}
		}else{
			localOffersRating = [];
			var offerRating = {offerID: offerID, rating: rating};
			offerRating.ratingsVals = setRatings(offerRating);
			localOffersRating.push(offerRating);
		}

		this.setOffersRating(JSON.stringify(localOffersRating));


		function setRatings(offer){
			var ratingsVals = {
			        	one: false,
			        	two: false,
			        	three: false,
			        	four: false,
			        	five: false
			        };
			switch(offer.rating) {
			    case 1:
			        ratingsVals = {
			        	one: true,
			        	two: false,
			        	three: false,
			        	four: false,
			        	five: false
			        };
			        break;
			    case 2:
			        ratingsVals = {
			        	one: true,
			        	two: true,
			        	three: false,
			        	four: false,
			        	five: false
			        };
			        break;
			    case 3:
			        ratingsVals = {
			        	one: true,
			        	two: true,
			        	three: true,
			        	four: false,
			        	five: false
			        };
			        break;
			    case 4:
			        ratingsVals = {
			        	one: true,
			        	two: true,
			        	three: true,
			        	four: true,
			        	five: false
			        };
			        break;
			    case 5:
			        ratingsVals = {
			        	one: true,
			        	two: true,
			        	three: true,
			        	four: true,
			        	five: true
			        };
			        break;
			}
			return ratingsVals;
		}
	}

	this.initializeRating = function(offerID){
		var formattedFavoriteOffersList=[];
		var OriginalOffersList=$.makeArray(JSON.parse(this.getAllOfferList()));
		for(var j=0;j<OriginalOffersList.length;j++) {
			if(offerID==OriginalOffersList[j].ID){
				var offerRating = this.getOneOffersRating(offerID);
				if(offerRating == null)
					offerRating = {offerID: offerID, rating: 0, ratingsVals: { one: false, two: false, three: false, four: false, five: false }};
				return offerRating;
			}
		}
		return null;
	}

	/*This function is responsible to set the ADIB Top Rated offers list of the application in the local storage*/
	this.setADIBTopRatedOfferList=function(offerlist){
		localStorage.setItem('dsf-adibTopRatedOfferlist',offerlist);
	}
		
	/*This function is responsible to get the ADIB top rated offers list of the application from the local storage*/
	this.getADIBTopRatedOfferList=function()
	{
		return localStorage.getItem('dsf-adibTopRatedOfferlist');
	}
	/*This function is responsible to set the ADIB Top Rated offers list of the application in the local storage*/
	this.setADIBSocialShareURL=function(url){
		localStorage.setItem('dsf-socialShareURL',url);
	}
		
	/*This function is responsible to get the ADIB top rated offers list of the application from the local storage*/
	this.getADIBSocialShareURL=function()
	{
		return localStorage.getItem('dsf-socialShareURL');
	}
	
	/*This function is responsible to time stamp for the last time dsf offers synchronize of the application in the local storage*/
	this.setOffersLastTimeStamp=function(offertimestamp){
		localStorage.setItem('dsf-dsfofferTimeStamp',offertimestamp);
	}
		
	/*This function is responsible to get the ADIB top rated offers list of the application from the local storage*/
	this.getOffersLastTimeStamp=function()
	{
		return localStorage.getItem('dsf-dsfofferTimeStamp');
	}
	
	/*first time load dsf data*/
	this.setFirstTimeLoadDSF = function(flag){
		localStorage.setItem('dsf-dsfofferflagLoaded',flag);
	}
	this.getFirstTimeLoadDSF=function()
	{
		return localStorage.getItem('dsf-dsfofferflagLoaded');
	}
	
	/*This function is responsible to time stamp for the last time ADIB offers synchronize of the application in the local storage*/
	this.setADIBOffersLastTimeStamp=function(offertimestamp){
		localStorage.setItem('dsf-dsfADIBofferTimeStamp',offertimestamp);
	}
		
	/*This function is responsible to get the ADIB top rated offers list of the application from the local storage*/
	this.getADIBOffersLastTimeStamp=function()
	{
		return localStorage.getItem('dsf-dsfADIBofferTimeStamp');
	}
	
	/*first time load dsf data*/
	this.setFirstTimeLoadADIB = function(flag){
		localStorage.setItem('dsf-adibofferflagLoaded',flag);
	}
	this.getFirstTimeLoadADIB=function()
	{
		return localStorage.getItem('dsf-adibofferflagLoaded');
	}
	
	/*This section is for the time stamps for refreshing the data in the application from the database*/
	
	/*This function is responsible to time stamp for the last time ADIB offers synchronize of the application in the local storage*/
	this.setGlobalDataRefreshLastTimeStamp=function(globalDataRefresh){
		localStorage.setItem('dsf-dsfGlobalDataRefreshTimeStamp',globalDataRefresh);
	}
	
	/*This function is responsible to get the ADIB top rated offers list of the application from the local storage*/
	this.getGlobalDataRefreshLastTimeStamp=function()
	{
		return localStorage.getItem('dsf-dsfGlobalDataRefreshTimeStamp');
	}
	/*Preparing Merchants List*/
	
	this.setMerchantList=function(merchantList){
		localStorage.setItem('dsf-dsfMerchantList',merchantList);
	}
	
	/*This function is responsible to get the ADIB top rated offers list of the application from the local storage*/
	this.getMerchantList=function()
	{
		return localStorage.getItem('dsf-dsfMerchantList');
	}
	
	
	
	this.setAppSyncFlag=function(flag){
		localStorage.setItem('dsf-appSyncFlag',flag);
	}
	
	/*This function is responsible to get the ADIB top rated offers list of the application from the local storage*/
	this.getAppSyncFlag=function()
	{
		return localStorage.getItem('dsf-appSyncFlag');
	}
});