dsf.controller('socialTwitterController', function($scope, $rootScope, $state, $log,$filter,MsgsModel,$q, twitterService, $http) {
	$scope.hideHeader = false;
	$scope.hideDrawer = false;
	$scope.$parent.bodyClass = "userprofileBkgd";
	$scope.$parent.showFooter = false;
	$scope.$parent.PageHeaderParam="DSF Tweets";
	
	$scope.tweets = []; //array of tweets

	$scope.initialize = function() {
    	var request = $http({
            method: "get",
            url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
            params: {
            	screen_name: 'DSFsocial'
            },
            headers: {
            	Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAALMIigAAAAAAfpxoy6XAIkb8FWjgkO4pwiwZ8Rc%3DfIhFpCRR5WkTVVVre933EVFIV2HO9cBUXUmbfCf1DexQQs9SXh'
            }
        });
        request.then( function(result) {            	            	
        	$scope.tweets = result.data;
        }, function(err) {
        	console.log(err);
        } );          
    };
    
    $scope.initialize();

});