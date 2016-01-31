dsf
		.controller(
				'FoodAndDietController',
				function($scope, $rootScope, $state, $log, $filter, MsgsModel,
						$timeout,$stateParams, localStorageService, databaseService) {
					$scope.hideHeader = false;
					$scope.hideDrawer = false;
					$scope.$parent.bodyClass = "homepageBackground";
					$scope.$parent.showFooter = false;
					$scope.$parent.PageHeaderParam = "Food/Diet Supplementaries";
					/*$scope.patternToUSe="[\u0621-\u064A\u0660-\u0669 ]+$|([a-zA-Z]+\\s)*[a-zA-Z]+$";*/
					$scope.patternToUSe=/^([a-zA-Z\u0621-\u064A\u0660-\u0669 ]+\s)*[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/;
					$scope.errorMessage = '';
					$timeout(function() {
						initCustomForms();
					}, 50);
					if($stateParams.NavFromAdib==true)
						{
							$scope.categories="Interested in ADIB offer";
						}
					else
						{
							$scope.categories="Please select from dropdown";
						}
					var userDetails = JSON.parse(localStorageService
							.getUserInfo());
					$scope.mobile = userDetails.mobileNumber;
					$scope.lname = userDetails.loginUserName;
					$scope.email = userDetails.email;
					$scope.mobilePrefix = userDetails.mobilePrefix;
					$scope.showThankyouMsg = function() {
						if (($scope.firstName != "" && $scope.firstName != undefined)
								&& ($scope.lastName != "" && $scope.lastName != undefined)
								&& ($scope.mobileNo != "" && $scope.mobileNo != undefined)
								&& ($scope.email != "" && $scope.email != undefined)
								&& ($scope.messageContent != "" && $scope.messageContent != undefined)) {
							var msgtitle = $filter("translate")(
									"CONTACTUS_THANKYOUMESSAGE");
							var msgbody = $filter("translate")(
									"contactUs_popupMessageBody");
							var confirmButtonText = $filter("translate")(
									"close");
							var cancelButtonText = "";
							var navigateUrl = "home";
							MsgsModel.ThankyouMsg(msgtitle, msgbody,
									confirmButtonText, cancelButtonText,
									navigateUrl);
						} else {
							var msgtitle = $filter("translate")(
									"CONTACTUS_ERRORMESSAGE");
							var msgbody = $filter("translate")(
									"contactUs_popupMessageBody");
							var confirmButtonText = $filter("translate")(
									"close");
							var cancelButtonText = "";
							var navigateUrl = "contactus";
							MsgsModel.ThankyouMsg(msgtitle, msgbody,
									confirmButtonText, cancelButtonText,
									navigateUrl);

						}
					}

					$scope.validateFields = function() {
						if ($scope.lname == undefined && $scope.lname == null) {
							$scope.errorMessage += $filter("translate")(
									"CONTACTUS_LASTNAMEERROR");
							$scope.displayErrorMessage = true;
							return true;
						}

						if ($scope.fname == undefined && $scope.fname == null) {
							$scope.errorMessage += $filter("translate")(
									"CONTACTUS_FIRSTNAMEERROR");
							$scope.displayErrorMessage = true;
							return true;
						}

						if ($scope.email == undefined && $scope.email == null) {
							$scope.errorMessage += $filter("translate")(
									"USERPROFILE_EMAILERRORMESSAGE");
							$scope.displayErrorMessage = true;
							return true;
						}

						if ($scope.mobile == undefined && $scope.mobile == null) {
							$scope.errorMessage += $filter("translate")(
									"USERPROFILE_MOBILEERRORMESSAGE");
							$scope.displayErrorMessage = true;
							return true;
						}

						if ($scope.message == undefined
								&& $scope.message == null) {
							$scope.errorMessage += $filter("translate")(
									"CONTACTUS_MESSAGE");
							$scope.displayErrorMessage = true;
							return true;
						}
					}
					$scope.submitFeedback = function() {
						var userdata = {};
						var tempMobNo ="00"+$scope.mobilePrefix.trim().substring(1)+$scope.mobile;
						userdata.firstName = $scope.fname;
						userdata.lastName = $scope.lname;
						userdata.mobileNo = tempMobNo;
						userdata.email = $scope.email;
						userdata.category =$scope.categories
						userdata.messageContent = $scope.message;
						
						databaseService.insertContactUsRecord(userdata,
								callback);
						/* Marketing requirements to send show pop-oup message */
						var msgtitle = $filter("translate")(
								"CONTACTUS_THANKYOUMESSAGE");
						var msgbody = $filter("translate")(
								"contactUs_popupMessageBody");
						var confirmButtonText = $filter("translate")("close");
						var cancelButtonText = "";
						var navigateUrl = "home";
						MsgsModel.ThankyouMsg(msgtitle, msgbody,
								confirmButtonText, cancelButtonText,
								navigateUrl);

					}
					function callback(flag) {
					}
					$scope.validateData = function() {
						if ($scope.lname == undefined)
							$scope.contactus_form.lname.$dirty = true;
						if ($scope.message == undefined)
							$scope.contactus_form.message.$dirty = true;
						// if($scope.fname==undefined)
						// $scope.contactus_form.fname.$dirty=true;
						if ($scope.email == undefined)
							$scope.contactus_form.email.$dirty = true;
						if ($scope.mobile == undefined)
							$scope.contactus_form.mobile.$dirty = true;
					}
					$scope.mobilePrefix = userDetails.mobilePrefix;
					/* the below is responsible for */
				});