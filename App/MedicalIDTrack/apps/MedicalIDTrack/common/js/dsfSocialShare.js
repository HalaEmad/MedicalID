dsf.factory('SocialShare', function() {
	
	return {
		share : function(title, message, link) {
			if(window && window.plugins && window.plugins.socialsharing) {
				window.plugins.socialsharing.share(message, title, null, link);
			}
		}
	};
});