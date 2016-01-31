var busyInd;
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	//var busyIndicator = new WL.BusyIndicator();
	busyInd = new WL.BusyIndicator('content', {text : 'Loading...', boxLength: 255.5});

	WL.Client.connect({
		     		onSuccess: function(){console.log("WL server connect")},
		     		onFailure: function(){console.log("WL server not connected")}
		     });
}
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}