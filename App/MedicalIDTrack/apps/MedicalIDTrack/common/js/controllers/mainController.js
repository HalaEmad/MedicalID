dsf.controller('mainController', function($scope, $rootScope, $state, $log, $timeout,$http,MsgsModel,offerModel,SocialShare,CyclicJobsModel,databaseService,localStorageService,$interval) {
	//wlInitOptions["onSuccess"]=adjustDSFOfferLocalStore;
	WL.Client.init(wlInitOptions);
	$scope.hideHeader = false;
	$scope.hideDrawer = false;
	$scope.bodyClass = "default";
	$scope.PageHeaderParam="MyDSF";
	$scope.counrtyFlagAndCodeUserProfile;
	var DATA_EXPIRY_IN_MS=240000;
	var lastTimeSynch=JSON.parse(localStorageService.getGlobalDataRefreshLastTimeStamp());
	var currentTimeStamp=new Date().getTime();
	initBackgroundResize();

	/*Menu Navigation Block*/
	/*Home Page Navigation fn*/	
	if($.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length>0)
	{
		$scope.favoritesCount=$.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length;
		$scope.counterflag=true;
	}
	$scope.userLang=localStorageService.getAppLanguage();
	$scope.homePageNav=function(){
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('home');
	};
	/*Favorites Page Navigation fn*/	
	$scope.FavPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('favorites');
	};
	/*ShowOffer Page Navigation fn*/	
	$scope.showOfferPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		/*This function invocation is responsible to retrieve list of offers from the database*/
		$state.go('showoffers');
	};
	/*Events Page Navigation fn*/	
	$scope.eventsPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('merchant');
	};
	/*Adib offers Page Navigation fn*/	
	$scope.adibOffersPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('adiboffers');
	};
	/*Contact Us Page Navigation fn*/	
	$scope.contactusPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('contactus',{NavFromAdib:false});
	};
	/*User Profile Page Navigation fn*/	
	$scope.userProfilePageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('userProfile');
	
	};
	/*Adib TopRated offers Page Navigation fn*/	
	$scope.adibTopRatedOffersPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('adibtopratedoffers');
	};	
	
	$scope.allergiesPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('allergies');
	};
	$scope.majorIllnessPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('majorIllness');
	};
	$scope.medicalEventsPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('medicalEvents');
	};
	$scope.medicationsPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('medications');
	};
	$scope.investigationsPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('investigations');
	};
	$scope.surgicalProceduresPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('surgicalProcedures');
	};
	$scope.anaesthesiaProblemPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('anaesthesiaProblem');
	};
	$scope.traumaHistoryPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('traumaHistory');
	};
	$scope.cancerPageNav=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('cancerhistory');
	};
	$scope.foodAndDiet=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('foodndiet');
	};
	$scope.dsftTermsAndConditions=function()
	{
		$('.sideMenuHide').toggleClass('nav-active');
		$state.go('TermsAndConditions');

	};
	/*Search  Page Navigation fn*/	
	$scope.searchPageNav=function()
	{
		$state.go('search');
	};
	if(WL.Client.getEnvironment()==WL.Environment.IPHONE ||WL.Client.getEnvironment()==WL.Environment.IPAD ||WL.Client.getEnvironment()==WL.Environment.ANDROID)
		{
			$("body").attr("style","-webkit-overflow-scrolling:touch;");
		}
	
	/*check if the cyclic job was run before or not
	 * if it didn't run before then will set the cyclic job
	 */
	var personalizePopupstatus=localStorage.getItem('PersonalizePopupDisplay');
	if(personalizePopupstatus==undefined ||personalizePopupstatus==null ||personalizePopupstatus=="true")
		{
			/*will set the cyclic job*/
			localStorage.setItem('PersonalizePopupDisplay',true);
			CyclicJobsModel.setUserInterval();
		};

		//CyclicJobsModel.updateAppData();
		/*Loading countries Flag and Codes*/	
		
		/*Loading countries Flag and codes */
		$http.get('data/countryImgAndCode.json').success(function(data, status) {
			var result = {};

			if (status == 200 && data) {
				result = data;
			}
			$scope.counrtyFlagAndCodeUserProfile=result;
			//localStorageService.setCountiresFlagAndCodeList(JSON.stringify(result));// localStorageService.setCountiresFlagAndCodeList(JSON.stringify(result));
			
		});

		$scope.prepareOfflerFavoriteList=function(offerID){
			var favoriteOF=[];
			if(localStorageService.getFavoriteOfferList()!=null)
				{
					var listLength= $.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length;
					var realFavoriteArray=$.makeArray(JSON.parse(localStorageService.getFavoriteOfferList()));
					var offerAlreadyExistFlag=false;
					for(var i=0;i<listLength;i++)
					{
						if(realFavoriteArray[i].OFFER_ID==offerID)
							{offerAlreadyExistFlag=true;break;}
					}
					if(offerAlreadyExistFlag==false)
					{
						realFavoriteArray[listLength]={};
						realFavoriteArray[listLength].OFFER_ID=offerID;
						localStorageService.setFavoriteOfferList(JSON.stringify(realFavoriteArray));
					}
					if($.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length>0)
					{
						$scope.favoritesCount=$.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length;
						$scope.counterflag=true;
					}
				}
			else
				{
				favoriteOF[0]={}
				favoriteOF[0].OFFER_ID=offerID;
					localStorageService.setFavoriteOfferList(JSON.stringify(favoriteOF));
					$scope.favoritesCount=1;
					$scope.counterflag=true;
			
				}
		}
		$scope.removeOfferIDFromFavoriteList=function(offerID)
		{
			var favoriteOF=[];
			if(localStorageService.getFavoriteOfferList()!=null)
			{
				var listLength= $.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length;
				favoriteOF=$.makeArray(JSON.parse(localStorageService.getFavoriteOfferList()));
				for(var i=0;i<listLength;i++)
				{
					if(favoriteOF[i].OFFER_ID==offerID)
						{
							var itemToRemove=i;
							favoriteOF.splice(itemToRemove, 1);
							localStorageService.setFavoriteOfferList(JSON.stringify(favoriteOF));
							if($.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length>0)
							{
								$scope.favoritesCount=$.makeArray(JSON.parse(localStorageService.getFavoriteOfferList())).length;
								$scope.counterflag=true;
							}
							else
								{
								$scope.counterflag=false;
								}
							break;
						}
				}
			}
		}

	$scope.openMapLocation=function(Latitude,Longitude){
		WL.App.openURL("http://maps.google.com/?q="+Latitude+','+Longitude,"_blank");
		//WL.App.openURL("http://maps.google.co.uk/maps?q="+locName+"&lat="+Latitude+"&long="+Longitude+"&zoom=11&z=11","_blank");
		};
	$scope.dialNumber=function(numbertoDial){
		window.open("tel:+"+numbertoDial,"_system");
	}
	$scope.invokeMail=function(mailaccount){
		window.open("mailto:"+mailaccount,"_system");
	}
	
	$scope.socialShare=function(outletname)
	{
		var socialShareURl='';
		if(JSON.parse(localStorageService.getADIBSocialShareURL())!=null)
			{
				socialShareURl=JSON.parse(localStorageService.getADIBSocialShareURL());
			}
		SocialShare.share("I just found a great DSF offer at "+outletname+" Download the Dubai Festivals App to get the latest DSF offers "+socialShareURl,"I just found a great DSF offer at "+outletname+" Download the Dubai Festivals App to get the latest DSF offers "+socialShareURl,"")
	}
	
	$scope.rateOffers=function(offerID, permitNo, rating)
	{
		var mobileNo = JSON.parse(localStorageService.getUserInfo()).mobileNumber;
		databaseService.submitRating(offerID, permitNo, rating,mobileNo);
		localStorageService.saveRatesLocally(offerID, rating);
		adjustOfferByRatingValues(offerID,rating);
	}
	/*This function is responsible for adding the rating */
	function adjustOfferByRatingValues(offerID,rating)
	{
		var offersList=JSON.parse(localStorageService.getAllOfferList());
		for(var x=0;x<offersList.length;x++)
			{
			if(offersList[x].ID==offerID)
				{		
				if(offersList[x].offerRating==null)
					{	
						offersList[x].offerRating='';
						//var ratinval = ;
						offersList[x].offerRating={"ratingsVals":offerModel.setRatings(rating)};
							
					}
				else
					{
						offersList[x].offerRating.ratingsVals=offerModel.setRatings(rating);
					}
				}
			}
		localStorageService.setAllOfferList(JSON.stringify(offersList));
	}
	
	databaseService.getADIBURLSOCI();

//	WL.App.overrideBackButton(function(){
//		if($('.sideMenuHide').hasClass('nav-active'))
//			{
//				$('.sideMenuHide').toggleClass('nav-active');
//			}
//		else /*this else will keep taking the button to the back state in history*/
//			{
//				window.history.back();
//			}
//	});

	//set the dsf offers in the model 
	if(localStorageService.getGlobalDataRefreshLastTimeStamp()==null&&(localStorageService.getAllOfferList()==null||localStorageService.getAllOfferList()=="[]"))
	{
		var offerUpdatedList;
		
		$http.get('data/offers.json').success(function(data, status) {
			var result = {};
			if (status == 200 && data) {
				offerUpdatedList = angular.fromJson(data);
				//offerUpdatedList=$filter('orderBy')(offerUpdatedList,'NAME');
				offerModel.setDSFOffersList(offerUpdatedList.slice(0,100));
			};
		
		});
	$http.get('data/outletOffline.json').success(function(data, status) {
		var result = {};
		if (status == 200 && data) {
			outletlistfromLocal = angular.fromJson(data);
			
			localStorageService.setofflineoutletsList(JSON.stringify(outletlistfromLocal));
			
		}	
	});
	$http.get('data/OFFER_OUTLET.json').success(function(data, status) {
		var result = {};
		if (status == 200 && data) {
			offerOutletList = angular.fromJson(data);
			localStorageService.setofflineoutletOfferList(JSON.stringify(offerOutletList));
			
		}	
	});
	$http.get('data/locations.json').success(function(data, status) {
		var result = {};
		if (status == 200 && data) {
			locations = angular.fromJson(data);
			localStorageService.setLocationList(JSON.stringify(locations));
			
		}	
	});
	$http.get('data/outlet.json').success(function(data, status) {
		var result = {};
		if (status == 200 && data) {
			outletLocal = angular.fromJson(data);
			
			localStorageService.setMerchantList(JSON.stringify(outletLocal));
			
		}	
	});
	//$scope.fillOffersList();
}
	this.test=function()
	{
		console.log('inside test');
	}
	/*This is a common function to be called if filling the data */
	$scope.fillOffersList=function(){
	var offerUpdatedList;
	
	$http.get('data/offers.json').success(function(data, status) {
		var result = {};
		if (status == 200 && data) {
			offerUpdatedList = angular.fromJson(data);
			offerModel.setDSFOffersList(offerUpdatedList);
			//sofferModel.setDSFOffersList(offerUpdatedList);
		};
	});
	}
	/*contact us function call*/
	
	$scope.navigateToContactUs=function(){
		$state.go('contactus',{NavFromAdib:true});
	}
	
	/*This function is invoked once the applicatin get connected to worklight server*/
	function adjustDSFOfferLocalStore()
	{
		 WL.Client.connect({
	         onSuccess: onConnectSuccess,
	         onFailure: onConnectFailure
	     });
		
	}
	/*This function is the success callback once the application get connected to worklight server*/
	function onConnectSuccess()
	{
		

	}
	/*This function is the failure callback get invoked when the application fail to connect to worklight server*/
	function connectionDetected()
	{};
	
	function onConnectFailure()
	{
	}
	// Scroll up to avoid keyboard covering input boxes
	;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);	

});