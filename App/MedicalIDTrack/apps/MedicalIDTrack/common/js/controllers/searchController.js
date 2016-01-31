dsf.controller('searchController', function($scope, $rootScope, $state,$timeout, $log,$filter,MsgsModel,$http,SearchModel,offerModel,databaseService,localStorageService) {
	$scope.$parent.hideHeader = false;
	$scope.$parent.hideDrawer = false;
	$scope.$parent.bodyClass = "searchMainBackground";
	$scope.$parent.showFooter = true;
	$scope.$parent.PageHeaderParam="Search";
	$scope.searchList="";
	$scope.selectedItem;

	$scope.locations = JSON.parse(localStorageService.getLocationList());

	
	$scope.search = {};

	$scope.filteredNames = [];
	// On focus event listeners for text input boxes that open keyboard
	if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
	$('#searchBox').focus(function(){
		  $('#content').scrollTo( $('#searchBox'), 800 );
	});
	}
	
	$("#selectMall").change(function () {
        var selectedVal = $(this).val();
        $scope.search.mallToSearch = selectedVal; 
    }).change();
	
	$http.get('data/mallsList.json').success(function(data, status) {
		var result = {};

		if (status == 200 && data) {
			result = data;
		}
		$scope.mallList=result;
		$timeout(function(){
			$scope.$apply();
			initCustomForms();
		},50);
	});
	$scope.search = function(){
		offerModel.setOfferID($scope.search.searchOfferKeyword);
		$state.go('searchResultDetails',{searchText:$scope.search.searchOfferKeyword,serachMall:$scope.search.mallToSearch});
	}
	
});