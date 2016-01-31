dsf.controller('termsAndCnditionsController', function($scope, $rootScope, $state,
		$log, $filter, MsgsModel, $http) {
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "homepageBackground";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam = "Terms And Conditions";
	var that=this;
	initCustomForms();
	initBackgroundResize();
	$scope.termsAndConditionspage=function()
	{
		WL.App.openURL('http://www.adib.ae/en/m/Pages/DSF_App_Terms_and_Conditions.aspx','_blank');	
	}
});