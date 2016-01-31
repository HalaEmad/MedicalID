dsf
		.controller(
				'loginController',
				function($scope, $rootScope, $state, $filter, $log,
						localStorageService, MsgsModel, $timeout,databaseService) {
					$scope.$parent.hideHeader = true;
					$scope.$parent.hideDrawer = true;
					$scope.$parent.bodyClass = "homepageBackground";
					$scope.$parent.showFooter = false;
					$scope.$parent.PageHeaderParam = "MyDSF";
					/*$scope.patternToUSe="[\u0621-\u064A\u0660-\u0669 ]+$|([a-zA-Z]+\\s)*[a-zA-Z]+$";*/
					$scope.patternToUSe=/^([a-zA-Z\u0621-\u064A\u0660-\u0669 ]+\s)*[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/;

					$scope.mobilePrefix="+971";
					$timeout(function(){
						initCustomForms();
					}, 50);

					$scope.validateField = function() {
						var userdata={};
						userdata.loginUserName=$scope.username;
						if($scope.mobilePrefix!=undefined)
						{userdata.mobileNumber=$scope.mobileNo;}
						else
						{userdata.mobileNumber=$scope.mobileNo;}
						userdata.mobilePrefix=$scope.mobilePrefix;
						if($scope.cat1==true)
						{userdata.IsAdibCustomer='Y';}
						else
						{userdata.IsAdibCustomer='N';}
						localStorageService.setUserInfo(JSON.stringify(userdata));
						if(WL.Client.isConnected()==true)
						{
//							WL.Device.getNetworkInfo (function(deviceStatus){
//							if((deviceStatus && deviceStatus.isNetworkConnected&&deviceStatus.isNetworkConnected=="true"))
//							{
								var tempNo=userdata.mobilePrefix+$scope.mobileNo;
								databaseService.insertUserRecord(userdata.loginUserName,tempNo,callback);
//							}
//							});
						}
						else
							{
								callback('COMMFAILURE',"");
							}

					}
					function callback(flag,userID)
					{
						//doAuthenticateUser();
						if(flag=="SUCCESS")
							{
								localStorageService.setUserIdFromDB(JSON.stringify(userID));
								$state.go('home');
							}
						else if(flag=="FAILURE")
							{
							var msgtitle= $filter("translate")("");
							var msgbody= $filter("translate")("LOGIN_ADIBCUSTOMERALREADYREGISTERED");
							var confirmButtonText=$filter("translate")("close");
							var cancelButtonText="";
							var navigateUrl="home";
							MsgsModel.ThankyouMsg(msgtitle,msgbody,confirmButtonText,cancelButtonText,navigateUrl);
						
							}
						else
							{
							if(userID!=null&&userID!=undefined && userID!="")
								{
								if(userID&&userID.errorMsg.indexOf("unique constraint")>-1)
									{
									var msgtitle= $filter("translate")("");
									var msgbody= $filter("translate")("LOGIN_ADIBCUSTOMERALREADYREGISTERED");
									var confirmButtonText=$filter("translate")("close");
									var cancelButtonText="";
									var navigateUrl="home";
									MsgsModel.ThankyouMsg(msgtitle,msgbody,confirmButtonText,cancelButtonText,navigateUrl);
								
									}
								else
								{
								var msgtitle= $filter("translate")("");
								var msgbody= $filter("translate")("Login_popupMessageBody");
								var confirmButtonText=$filter("translate")("close");
								var cancelButtonText="";
								var navigateUrl="home";
								MsgsModel.ThankyouMsg(msgtitle,msgbody,confirmButtonText,cancelButtonText,navigateUrl);
								}
								}
							else
								{
								var msgtitle= $filter("translate")("");
								var msgbody= $filter("translate")("Login_popupMessageBody");
								var confirmButtonText=$filter("translate")("close");
								var cancelButtonText="";
								var navigateUrl="home";
								MsgsModel.ThankyouMsg(msgtitle,msgbody,confirmButtonText,cancelButtonText,navigateUrl);
								}
							}
					}
					// On focus event listeners for text input boxes that open keyboard (Android Only)
					if(WL.Client.getEnvironment() == WL.Environment.ANDROID){

					$('#username').focus(function(){
						  $('#content').scrollTo($('#username'), 800 );
					});$('#mobile').focus(function(){
						  $('#content').scrollTo( $('#mobile'), 800 );
					});
					}
					$scope.termsAndConditionspage = function() {
					
					//WL.App.openURL(encodeURI('https://docs.google.com/gview?embedded=true&url=https://adibonline.adib.ae/efs/efs/docs/ADIBTermsAndConditions.pdf'), '_blank', 'EnableViewPortScale=yes');
						WL.App.openURL('http://www.adib.ae/en/m/Pages/DSF_App_Terms_and_Conditions.aspx','_blank');		
					}
					$scope.validateData=function()
					{
						$state.go('verification');
					}
					
					$scope.validatePattern=function(){
						
						var testMobile=/^[0-9]*$/.test($scope.mobileNo);
						if($scope.mobilePrefix=="+971" &&testMobile &&$scope.mobileNo.length==9){
							return true;
						}
						else if (testMobile)
							{
								return testMobile;
							}
						else 
							{
								$scope.loginPage_form.mobileNo.$error.pattern=true;
								return false;
							}
					}
				});