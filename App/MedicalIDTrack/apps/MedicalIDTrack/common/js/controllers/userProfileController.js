
/* JavaScript content from js/controllers/userProfileController.js in folder common */
dsf.controller('userProfileController',
				function($scope, $rootScope, $timeout, $state, $log,
						CyclicJobsModel, $filter, $translate, MsgsModel,
						userModel, $http, localStorageService,databaseService) {
					$scope.$parent.hideHeader = false;
					$scope.$parent.hideDrawer = false;
					$scope.$parent.bodyClass = "homepageBackground";
					$scope.hideBankList = true;
					$scope.errorMessage = '';
					$scope.displayErrorMessage = false;
					$scope.counrtyListFromJson = '';
					$scope.showEmaritesList = false;
					$scope.$parent.showFooter = false;
					$scope.$parent.PageHeaderParam = "Personalize Your Account";
					$scope.minDateToAllow="1900-01-01";
					$scope.globalNoOfCategories=0;
					var categoriesIDList=[];
					
					/*Inintializing the checkboxs*/
					var ListOFSelectedCategories=localStorageService.getUserprofileCatIDs();
					if(ListOFSelectedCategories)
					{
						ListOFSelectedCategories=JSON.parse(localStorageService.getUserprofileCatIDs());
						for(var x=0;x<ListOFSelectedCategories.length;x++)
						{
							$scope[ListOFSelectedCategories[x]]=true;
						}
						if(ListOFSelectedCategories.length>3)
						{$scope.ShowCategoriesErrorFlag=true;}
						$scope.globalNoOfCategories=ListOFSelectedCategories.length;
					}
					/*$scope.patternToUSe="[\u0621-\u064A\u0660-\u0669 ]+$|([a-zA-Z]+\\s)*[a-zA-Z]+$";*/
					$scope.patternToUSe=/^([a-zA-Z\u0621-\u064A\u0660-\u0669 ]+\s)*[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/;
					
					/* DSF112 fix start [ Calculat max date val ] */
					var dateToBeFormated=new Date();
					var year = dateToBeFormated.getFullYear();
					var month = ((dateToBeFormated.getMonth() + 1) < 10 ? '0' : '') + (dateToBeFormated.getMonth() + 1);
					var date = (dateToBeFormated.getDate() < 10 ? '0' : '') + dateToBeFormated.getDate();
					$scope.maxDateToAllow = year + "-" + month + "-" + date;
					/* DSF112 fix end [ Calculat max date val ] */
					
					/*Setting values for the files in the page*/
					var userDetails=JSON.parse(localStorageService.getUserInfo());
					
					$scope.mobile=userDetails.mobileNumber;
					$scope.name=userDetails.loginUserName;
					$scope.email=userDetails.email;
					$scope.mobilePrefix=userDetails.mobilePrefix;
					if(userDetails&&userDetails.maritalstatus!=undefined)
					{
						$scope.maritalstatus=userDetails.maritalstatus;
					}
				else
					{
						$scope.maritalstatus="Single";
					}
					if(userDetails.DateOfBirth!=undefined)
					 {	$scope.DateOfBirth =new Date((userDetails.DateOfBirth.split("-"))[2]+"-"+(userDetails.DateOfBirth.split("-"))[1]+"-"+(userDetails.DateOfBirth.split("-"))[0]);}	
					else
					{	$scope.DateOfBirth =new Date("1980-01-01");}

					if(userDetails.nationality!=undefined)
					{
						$scope.nationality=userDetails.nationality;
						}
					else
					{	
						$scope.nationality="United Arab Emirates";
					}
					if(userDetails.countryofresidence!=undefined)
						{
							
							$scope.countryOfResidence=userDetails.countryofresidence;
							if($scope.countryOfResidence=="United Arab Emirates")
								{
								$scope.showEmaritesList = true;
									if(userDetails.emarite&&userDetails.emarite!=undefined)
										{
											$scope.emarite=userDetails.emarite;
										}
									else
										{$scope.emarite="Dubai";}
								}
						}
					else
						{
							$scope.countryOfResidence="United Arab Emirates";
								{
									$scope.showEmaritesList = true;
									if(userDetails.emarite&&userDetails.emarite!=undefined)
										{
											$scope.emarite=userDetails.emarite;
										}
									else
										{$scope.emarite="Dubai";}
								
								}
						}
					
					
					if(userDetails.noofchildren!=undefined)
					{$scope.numberOfChildren=userDetails.noofchildren;}
					else
						{$scope.numberOfChildren="0";}
					
					if(userDetails.bank!=undefined)
						{
							$scope.bank=userDetails.bank;
						}
					if(userDetails.IsAdibCustomer!=undefined)
						{
							if(userDetails.IsAdibCustomer==="N")
								{
									
									$scope.isAdib="No";
									$scope.hideBankList = false;
									
								}
							else
								{
									$scope.isAdib="Yes";
									$scope.hideBankList = true;
									
								}
						}
					else
						{
						$scope.isAdib="No";
						$scope.hideBankList = false;
						}
					if(userDetails.gender!=undefined)
					{
						if(userDetails.gender==="F")
							{
								
								$scope.genderToSet="Female";
								
								
							}
						else
							{
								$scope.genderToSet="Male";
							
							}
					}
					else
						{
							$scope.genderToSet="Female";
						}
					$timeout(function(){$scope.$apply();});
					$http.get('data/countryImgAndCode.json').success(
							function(data, status) {
								var result = {};
								if (status == 200 && data) {
									result = data;
									$scope.counrtyFlagAndCodeUserProfile = result;
									$timeout(function() {
									$scope.$apply();
										initCustomForms();	
										
									},50);
								}
						
							});
					// $scope.counrtyFlagAndCode=JSON.parse(localStorageService.getCountiresFlagAndCodeList());
					$scope.displayBankList = function() {
						$scope.isAdib="No";
						$scope.hideBankList = false;
					}
					$scope.hideBankListfn = function() {
						$scope.isAdib="Yes";
						$scope.hideBankList = true;
					}
					$scope.clearData = function(temp) {
						$("#" + temp).val('');
					};

					$http.get('data/countryList.json').success(
							function(data, status) {
								var result = {};

								if (status == 200 && data) {
									result = data;
								}
								$scope.counrtyListFromJson = result;
							});
					$scope.changeCountrySelected = function() {
						if ($scope.countryOfResidence == "United Arab Emirates") {
							$scope.showEmaritesList = true;
							if(userDetails.emarite&&userDetails.emarite!=undefined)
							{
								$scope.emarite=userDetails.emarite;
							}
						else
							{
								$scope.emarite="Dubai";
							}
							
						} else {
							$scope.showEmaritesList = false;
						}
						$timeout(function(){$scope.$apply();initCustomForms();	},10);
					}
					/* Enter button handler */
					$scope.saveUserData = function() {
						$scope.validateFields();
						if ($scope.displayErrorMessage == false) {
							localStorage.setItem('PersonalizePopupDisplay', false);
							CyclicJobsModel.cancelPersonalizeCyclicJob();
							userModel.UpdateUserData();
							var msgtitle= $filter("translate")("HOMEPAGE_THANKYOUMESSAGE");
							var msgbody= $filter("translate")("contactUs_popupMessageBody");
							var confirmButtonText=$filter("translate")("close");
							var cancelButtonText="";
							var navigateUrl="home";
							MsgsModel.ThankyouMsg(msgtitle,msgbody,confirmButtonText,cancelButtonText,navigateUrl);
						} else {
							$scope.displayErrorMessage = false;
						}
					};
						
					/* Validate positive number day value */
					$scope.validateDayValue = function() {
						if ($scope.date_day < 1 || $scope.date_day > 31
								|| $scope.date_day == undefined) {
							$scope.date_day = "";
						}
					}
					$scope.validateMonthValue = function() {
						if ($scope.date_month < 0 || $scope.date_month > 12
								|| $scope.date_month == undefined) {
							$scope.date_month = '';
						}
					}
					$scope.validateYearValue = function() {
						if ($scope.date_year < 1900 || $scope.date_year > 9999
								|| $scope.date_year == undefined) {
							$scope.date_year = '';
						}
					}
					// On focus event listeners for text input boxes that open keyboard
					if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
					$('#name').focus(function(){
					  $('#content').scrollTo( $('#name'), 800 );
					});
					$('#mobile').focus(function(){
					  $('#content').scrollTo( $('#mobile'), 800 );
					});
					$('#email').focus(function(){
					  $('#content').scrollTo( $('#email'), 800 );
					});
					$('#bank').focus(function(){
					  $('#content').scrollTo( $('#bank'), 800 );
					});
					
					$('#numberOfChildren').focus(function(){
						  $('#content').scrollTo( $('#numberOfChildren'), 800 );
						});
					}
					/*Handling submit action*/
					$scope.submitUserProfileUpdate = function(){
						/*get user name & to update local store and insert it in the database*/
						userDetails.loginUserName=$scope.name;
						/*get user mobile number & to update local store and insert it in the database*/
						if($scope.mobilePrefix!=undefined)
						{userDetails.mobileNumber=$scope.mobile;}
						else
							{userDetails.mobileNumber="00971"+$scope.mobile;}
						
						/*get user mobile prefix*/
						userDetails.mobilePrefix=$scope.mobilePrefix;
						/*get user email  & to update local store and insert it in the database*/
						userDetails.email=$scope.email;
						/*get user nationality  & to update local store and insert it in the database*/
						userDetails.nationality=$scope.nationality;
						/*get user country of residence  & to update local store and insert it in the database*/
						userDetails.countryofresidence=$scope.countryOfResidence;
						/*get user Emirate  & to update local store and insert it in the database*/
						userDetails.emarite=$scope.emarite;
						/*get user bank & to update local store and insert it in the database*/
						userDetails.bank=$scope.bank;
						/*get user date of birth  & to update local store and insert it in the database*/
						userDetails.DateOfBirth=$filter('date')(new Date($scope.DateOfBirth), 'dd-MM-yyyy');
						/*get user marital status  & to update local store and insert it in the database*/
						if($scope.maritalstatus!=undefined)
							{userDetails.maritalstatus=$scope.maritalstatus;}
						else
							{userDetails.maritalstatus="Single";}
						if(document.getElementById("male").checked==true)
							{userDetails.gender="M";}
						else if(document.getElementById("female").checked==true)
								{userDetails.gender="F";}
						else
							{userDetails.gender="";}
						/*get user number of children  & to update local store and insert it in the database*/
						if($scope.numberOfChildren!=undefined)
						{userDetails.noofchildren=$scope.numberOfChildren;}
						else
							{userDetails.noofchildren=0;}
						/*get user is adib offer or not  & to update local store and insert it in the database*/
						if(userDetails.bank!=undefined)
						{
							$scope.bank=userDetails.bank;
						}
						if(document.getElementById("isAdib").checked==true)
						{userDetails.IsAdibCustomer="Y";}
						else if(document.getElementById("isnotadib").checked==true)
							{userDetails.IsAdibCustomer="N";}
						
						localStorageService.setUserInfo(JSON.stringify(userDetails));
						localStorage.setItem('PersonalizePopupDisplay',
								false);
						var tempMobNo ="00"+$scope.mobilePrefix.trim().substring(1)+userDetails.mobileNumber;
						databaseService.updateUserInfo(userDetails.loginUserName,tempMobNo,userDetails.email,userDetails.nationality,userDetails.countryofresidence,userDetails.emarite,userDetails.gender,userDetails.DateOfBirth,userDetails.IsAdibCustomer,$scope.bank,$scope.maritalstatus,userDetails.noofchildren,callback);
						
							localStorage.setItem('PersonalizePopupDisplay',
									false);
							CyclicJobsModel.cancelPersonalizeCyclicJob();
							var msgtitle= $filter("translate")("HOMEPAGE_THANKYOUMESSAGE");
							var msgbody= $filter("translate")("contactUs_popupMessageBody");
							var confirmButtonText=$filter("translate")("close");
							var cancelButtonText="";
							var navigateUrl="home";
							MsgsModel.ThankyouMsg(msgtitle,msgbody,confirmButtonText,cancelButtonText,navigateUrl);
					}
					$scope.validateData=function()
					{
						if($scope.name==undefined)
							$scope.userprofile_form.name.$dirty=true;
						if($scope.mobile==undefined)
							$scope.userprofile_form.mobile.$dirty =true;
						if($scope.email==undefined)
							$scope.userprofile_form.email.$dirty=true;
						if($scope.nationality==undefined)
							$scope.userprofile_form.nationality.$dirty=true;
						if($scope.countryOfResidence==undefined)
							$scope.userprofile_form.countryOfResidence.$dirty=true; 
						if($scope.DateOfBirth==undefined)
							$scope.userprofile_form.date.$dirty=true;
						/* DSF112 fix start */
						checkDateValidity();
						/* DSF112 fix end */
						if($scope.numberOfChildren==undefined)	
							$scope.userprofile_form.numberOfChildren.$dirty=true;
					}
					/* DSF112 fix start [ Date change listener ] */
					$scope.dateofBirthValueChanged=function(){
			            checkDateValidity();
					}
					/* DSF112 fix end [ Date change listener ] */

					/* DSF112 fix start [ Validation function ] */
					var checkDateValidity=function(){
						if($scope.DateOfBirth != '') {
			                var inputValue = new Date($scope.DateOfBirth);
			                if(inputValue > new Date()) {
								$scope.userprofile_form.date.$dirty=true;
								$scope.userprofile_form.DateOfBirth.$error.max=true;
								$scope.userprofile_form.DateOfBirth.$error.min=false;
								$scope.userprofile_form.DateOfBirth.$error.required=false;
							} else if(inputValue < new Date("1920-01-01")) {
								$scope.userprofile_form.DateOfBirth.$error.max=false;
								$scope.userprofile_form.DateOfBirth.$error.min=true;
								$scope.userprofile_form.DateOfBirth.$error.required=false;
							}
			            } else {
							$scope.userprofile_form.date.$dirty=true;
							$scope.userprofile_form.DateOfBirth.$error.max=false;
							$scope.userprofile_form.DateOfBirth.$error.min=false;
							$scope.userprofile_form.DateOfBirth.$error.required=true;
			            }
					}
					/* DSF112 fix end [ Validation function ] */
					$scope.incrementCounter=function(ID)
					{var categoryExistAndRemoved=false;
					var IDOfCategoriesSelected=[];
						 IDOfCategoriesSelected=localStorageService.getUserprofileCatIDs();
						
						if(	$scope.globalNoOfCategories>0)
							{
							 IDOfCategoriesSelected=JSON.parse(localStorageService.getUserprofileCatIDs());
								for(var i=0;i<$.makeArray(IDOfCategoriesSelected).length;i++)
								{
									if(IDOfCategoriesSelected[i].indexOf(ID)>-1 &&IDOfCategoriesSelected[i].length==ID.length)
										{
											categoryExistAndRemoved=true;
											IDOfCategoriesSelected.splice(i, 1);
											localStorageService.setUserprofileCatIDs(JSON.stringify(IDOfCategoriesSelected));
											$scope.globalNoOfCategories--;
											if($scope.globalNoOfCategories<=3)
											{
												$scope.ShowCategoriesErrorFlag=false;
											}
											break;
										}
									
								}
								if(categoryExistAndRemoved==false)
								{
									IDOfCategoriesSelected[$scope.globalNoOfCategories]=ID;
									localStorageService.setUserprofileCatIDs(JSON.stringify(IDOfCategoriesSelected));
									$scope.globalNoOfCategories++;
									if($scope.globalNoOfCategories>3)
										{
											$scope.ShowCategoriesErrorFlag=true;
										}
								
								}
								
							}
							
						else
							{
						
							categoriesIDList[0]=ID;
							localStorageService.setUserprofileCatIDs(JSON.stringify(categoriesIDList));
							$scope.globalNoOfCategories=1;

							}
						//localStorageService.setUserprofileCatIDs(JSON.stringify(IDOfCategoriesSelected));
					}
					$timeout(function(){        
					    angular
					        .element(document.getElementById('dateofBirth'))
					        .bind('keyup change', function(){
					            /*var inputValue,
					                customDate,
					                isValid;

					            inputValue = this.value;
					            if(inputValue != ''){
					                customDate = new Date(inputValue);
					                isValid = !isNaN(customDate);

					                if(isValid){
					                	$scope.userprofile_form.DateOfBirth.$dirty=false;
						            	$scope.userprofile_form.DateOfBirth.$invalid=false	;
					                }
					                else{
					                	$scope.userprofile_form.DateOfBirth.$dirty=true;
						            	$scope.userprofile_form.DateOfBirth.$invalid=true;
					                }
					            }
					            else{
					            	$scope.userprofile_form.DateOfBirth.$dirty=true;
					            	$scope.userprofile_form.DateOfBirth.$invalid=true;
					            }*/
					        });
					}, 400);
									
				});
function callback(flag)
{}	