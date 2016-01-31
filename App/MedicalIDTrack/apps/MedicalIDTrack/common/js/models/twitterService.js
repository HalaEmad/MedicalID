
/* JavaScript content from js/models/twitterService.js in folder common */
angular.module('dsf.services', []).factory('twitterService', function($q, $http) {
	
    var tweets = [];

    return {
        initialize: function() {
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
            	tweets = result.data;
            	console.log(tweets);
            }, function(err) {
            	console.log(err);
            } );            
           return tweets;  
        }
    }
});