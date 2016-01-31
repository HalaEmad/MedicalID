dsf.service('databaseService',['$state','localStorageService','offerModel',function($state,localStorageService,offerModel) { 
	
	var SUCCESSFLAG="SUCCESS";
	var FAILUREFLAG="FAILURE";
	var COMMFAILUREFLAG="COMMFAILURE";
	var that=this;
	/*
	 * Asynchronous Function to fetch DFS Categories list from the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchCategoriesList = function(callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getCategoriesListProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (	response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						localStorageService.setCategoryList(JSON.stringify(response.responseJSON.resultSet));
							callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	
	/*
	 * Asynchronous Function to fetch DFS offers list from the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchAllOffersList = function(callback){
		var cleanofferList;
		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getAllOffersListProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet &&response.responseJSON.resultSet.length){
						cleanofferList=	response.responseJSON.resultSet;
						offerModel.setDSFOffersList(response.responseJSON.resultSet);
						callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	
	/*
	 * Asynchronous Function to fetch DFS offers list in a certain category from the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchAllOffersInCategoryList = function(catID,callback){
		var clearOfflerList=[];
		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getOffersListInCategoryProc',
			parameters : [catID]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						clearOfflerList=response.responseJSON.resultSet;
						callback(SUCCESSFLAG,clearOfflerList);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	
	/*
	 * Asynchronous Function to fetch DFS offers list in a certain category from the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.	fetchOffersListWithOutlet = function(outletID,callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getOffersListInOutletProc',
			parameters : [outletID]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet &&response.responseJSON.resultSet.length){
						cleanofferList=	response.responseJSON.resultSet;
						/*Retrieve the outlet list so that we can formulate the offer list with all required details
						 *
						 */
						callback(SUCCESSFLAG,cleanofferList);
						
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	/*
	 * Asynchronous Function to fetch DFS ADIB offers list from the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchADIBOffersList = function(callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getAdibOffersListProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (	response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						localStorageService.setADIBOfferList(JSON.stringify(response.responseJSON.resultSet));
							callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	
	/*
	 * Asynchronous Function to fetch DFS events list from the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchEventsList = function(callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getEventsListProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (	response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						localStorageService.setEventList(JSON.stringify(response.responseJSON.resultSet));
							callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	/*
	 * Asynchronous Function to insert user information in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.insertUserRecord = function(username,mobilenumber,callback){
		
		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'insertUserRecordProc',
			parameters : [username,mobilenumber]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful){
						
						WL.Client.invokeProcedure ({
							adapter : 'databaseAdapter',
							procedure : 'getuserIDProc',
							parameters : [username,mobilenumber]
						},
						{
							onSuccess: function(response){
								if(response && response.responseJSON)
								{
									if	 (	response.responseJSON.isSuccessful 
											&& 	response.responseJSON.resultSet){
										localStorageService.setUserIdFromDB(JSON.stringify(response.responseJSON.resultSet[0].ID));
										callback(SUCCESSFLAG,response.responseJSON.resultSet[0].ID);
									}
									else
									{
										callback(FAILUREFLAG);
									}
								}
							},
							onFailure: function(err){
								callback(COMMFAILUREFLAG,err);
							}
						});
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG,err);
			}
		});
	}
	/*
	 * Asynchronous Function to update user information in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.updateUserInfo = function(updatedUsename,mobileno,email,nationality,residencecountry,emarite,gender,birthdate,isAdibCutomer,bankname,maritalstatus,numberofchildren,userIdrInfo,callback){
		var userID=JSON.parse(localStorageService.getUserIdFromDB());
		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'updateUserInformationProc',
			parameters :[updatedUsename,mobileno,email,nationality,residencecountry,emarite,gender,birthdate,isAdibCutomer,bankname,maritalstatus,numberofchildren,userID]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (	response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						
						//callback(SUCCESSFLAG);
						console.log("success"+response.responseJSON.resultSet);
					}
					else
					{
						//callback(FAILUREFLAG)
						console.log("failure"+response.responseJSON.resultSet);
					}
				}
			},
			onFailure: function(err){
				console.log("commfailure"+err);
			}
		});
	}
	/*
	 * Asynchronous Function to insert contact us case in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.insertContactUsRecord = function(userdata,callback){
		var userID=localStorageService.getUserIdFromDB();
		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'insertContactUsRecordProc',
			parameters : [userdata.lastName,userdata.mobileNo,userdata.email,userdata.messageContent,userdata.category ,userID]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.updateStatementResult.updateCount==1){
						
						callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(FAILUREFLAG);
			}
		});
	}
	
	/*
	 * Asynchronous Function to insert contact us case in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchOUtletsList = function(callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getOutletsListProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						localStorageService.setMerchantList(JSON.stringify(response.responseJSON.resultSet));
						callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	
	/*
	 * Asynchronous Function to insert contact us case in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.getListOfOutletsLinkedToOFFer= function(offerID,callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getListOfOutletsLinkedToOFFerProc',
			parameters : [offerID]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						
						callback(SUCCESSFLAG,response.responseJSON.resultSet);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	
	/*
	 * Asynchronous Function to insert contact us case in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.submitRating= function(offerID,permitNo,rating,MobileNo){
		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'submitOfferRatingProc',
			parameters : [offerID,permitNo,rating,MobileNo]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						
						console.log(response.responseJSON.resultSet);
					}
					else
					{
						console.log(response.responseJSON.resultSet);
					}
				}
			},
			onFailure: function(err){
				console.log(err)
			}
		});
	}
	
	/*
	 * Asynchronous Function to insert contact us case in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchOffersListWithInCategory= function(catID,callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getOffersListInCategoryProc',
			parameters : [catID]
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						
						callback(SUCCESSFLAG,response.responseJSON.resultSet);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	
	
	/*
	 * Asynchronous Function to insert contact us case in the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchHeroOffers= function(callback){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getHeroOffersListProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						localStorageService.setHeroOfferList(JSON.stringify(response.responseJSON.resultSet));
						callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
//	that.adjustOffersListWithOutletDetails=function(offerListToAdjust,OutletList)
//	{	var vararrayIndex=0;
//		var formattedOfferList=[];
//		for(var i=0;i<offerListToAdjust.length;i++) {
//			for(var j=0;j<OutletList.length;j++) {
//				if(offerListToAdjust[i].OUTLET_ID==OutletList[j].ID)
//					{	formattedOfferList[i]=offerListToAdjust[i];
//						formattedOfferList[i].OUTLET_NAME=OutletList[j].NAME;
//						formattedOfferList[i].CONTACT_EMAIL=OutletList[j].CONTACT_EMAIL;
//						formattedOfferList[vararrayIndex].CONTACT_NO=OutletList[j].CONTACT_NO;
//						var locationInfo=that.getlocation(OutletList[j].LOCATION);
//						if(locationInfo.length>0)
//						{formattedOfferList[vararrayIndex].LOCATIONNAME=locationInfo[0].LocationName;
//						formattedOfferList[vararrayIndex].LONGITUDE=locationInfo[0].LONGITUDE;
//						formattedOfferList[vararrayIndex].LATITUDE=locationInfo[0].LATITUDE;
//						}
//						vararrayIndex++;
//					}
//			}
//			
//		}
//		localStorageService.setAllOfferList(JSON.stringify(formattedOfferList));
//	}
//	that.adjustADIBOffersListWithOutletDetails =function(offerListToAdjust,OutletList)
//	{	var vararrayIndex=0;
//		var formattedOfferList=[];
//		for(var i=0;i<offerListToAdjust.length;i++) {
//			for(var j=0;j<OutletList.length;j++) {
//				if(offerListToAdjust[i].OUTLET_ID==OutletList[j].ID&&offerListToAdjust[i].IS_ADIB_OFFER=="Y")
//					{	
//						formattedOfferList[vararrayIndex]=offerListToAdjust[i];
//						formattedOfferList[vararrayIndex].OUTLET_NAME=OutletList[j].NAME;
//						formattedOfferList[vararrayIndex].CONTACT_EMAIL=OutletList[j].CONTACT_EMAIL;
//						formattedOfferList[vararrayIndex].CONTACT_NO=OutletList[j].CONTACT_NO;
//						vararrayIndex++;
//					}
//			}
//			
//		}
//		localStorageService.setADIBOfferList(JSON.stringify(formattedOfferList));
//	}
	that.getlocation=function(locationID)
	{var locatonObject=[];
		locationsList=$.makeArray(JSON.parse(localStorageService.getLocationList()));
		for(var w=0;w<locationsList.length;w++)
			{
				if(locationsList[w].LocationID==locationID)
					{
						
						locatonObject[0]=locationsList[w];
						break;
					}
			}
		return locatonObject;
	}
	 /* Asynchronous Function to fetch DFS ADIB offers list from the database 
	 * onSuccess: Callback invoked on successful finishing the request
	 * onFailure: Callback invoked on failure
	 */
	that.fetchADIBTopRatedOffersList = function(callback){
		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getAdibTopRatedOffersListProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (	response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
						localStorageService.setADIBTopRatedOfferList(JSON.stringify(response.responseJSON.resultSet));
							callback(SUCCESSFLAG);
					}
					else
					{
						callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				callback(COMMFAILUREFLAG);
			}
		});
	}
	that.getADIBURLSOCI = function(){
	WL.Client.invokeProcedure ({
	    adapter : 'databaseAdapter',
	    procedure : 'getADIBUrl',
	    parameters : []
	    }, {
	    onSuccess: function(response){
	    console.log(JSON.stringify(response));
	    if(response && response.responseJSON) {
	    if ( response.responseJSON.isSuccessful){
	    	localStorageService.setADIBSocialShareURL(JSON.stringify(response.responseJSON.url));
	   
	    }
	    }
	    },
	    onFailure: function(err){
	   
	    }
	    });
	}
	
	that.fetchLocationsList= function(){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getLocationsList',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
							localStorageService.setLocationList(JSON.stringify(response.responseJSON.resultSet));
							//callback(SUCCESSFLAG);
					}
					else
					{
						//callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				//callback(COMMFAILUREFLAG);
			}
		});
	}
	
	that.fetchOffersOutletList= function(){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getOfferOutletList',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
							localStorageService.setofflineoutletOfferList(JSON.stringify(response.responseJSON.resultSet));
							//callback(SUCCESSFLAG);
					}
					else
					{
						//callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				//callback(COMMFAILUREFLAG);
			}
		});
	}
	that.fetchOutletsOfflineList= function(){

		WL.Client.invokeProcedure ({
			adapter : 'databaseAdapter',
			procedure : 'getOfflineoutletProc',
			parameters : []
		},
		{
			onSuccess: function(response){
				if(response && response.responseJSON)
				{
					if (response.responseJSON.isSuccessful 
							&& 	response.responseJSON.resultSet){
							localStorageService.setofflineoutletsList(JSON.stringify(response.responseJSON.resultSet));	
							//callback(SUCCESSFLAG);
					}
					else
					{
						//callback(FAILUREFLAG);
					}
				}
			},
			onFailure: function(err){
				//callback(COMMFAILUREFLAG);
			}
		});
	}	
	
}]);