dsf.service('userModel',['$state', function($state,$filter) { 

this.UpdateUserData = function(){
		var _this = this;

			WL.Client.invokeProcedure({
				adapter: "databaseAdapter",
				procedure: "updateUserData",
				parameters: []
			}, {
				onSuccess: function(response){
					if(response && response.responseJSON)
					{
						if (response.responseJSON.isSuccessful)
						{	
						}
					}
				},
				onFailure: function(err){
					WL.Analytics.log("");
					callback(false);
				}
			});
	}
}]);