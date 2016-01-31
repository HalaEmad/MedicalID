
/* JavaScript content from js/Push.js in folder common */
var userdata={};
var subscribtionLoopStarted = false;
var subscribtionTwice = false;
var subscribtionTimeOut = {};

var authenticationLoopStarted = false;
var authenticationTimeOut = {};

//---------------------------- Set up push notifications -------------------------------
if (WL.Client.Push) {	
	WL.Client.Push.onReadyToSubscribe = function() {
		WL.Client.Push.registerEventSourceCallback(
			"ClientPushEventSource", 
			"PushAdapter", 
			"PushEventSource", 
			pushNotificationReceived);
	};
}

//--------------------------------- Subscribe ------------------------------------
function doSubscribe() {
    if(!subscribtionLoopStarted){
        subscribtionLoopStarted = true;
        subscribtionTimeOut = setTimeout(subscribe, 2000);    
    }

    function subscribe(){
    	if (WL.Client.Push.isPushSupported()){ 
    		WL.Client.Push.subscribe("ClientPushEventSource", {
                onSuccess: doSubscribeSuccess,
                onFailure: doSubscribeFailure
            });
    	}else{
    		alert("Push is not supported");
    	}        
    }
}

function doSubscribeSuccess() {
//    alert("Push Subscribtion == true");
    subscribtionLoopStarted = false;
    clearTimeout(subscribtionTimeOut);
    
    // Don't know why but it didn't work on iOS with one subscription request it needs to be twice
    if(!subscribtionTwice){
    	doSubscribe();
    	subscribtionTwice = true;
    }
	console.log("Push Subscribtion == true");
}

function doSubscribeFailure(error) {
    subscribtionLoopStarted = false;
	console.log("Push Subscribtion == false");
	console.log("Push Subscribtion == " + JSON.stringify(error));
}

//------------------------------- Unsubscribe ---------------------------------------
function doUnsubscribe() {
	WL.Client.Push.unsubscribe("ClientPushEventSource", {
		onSuccess: doUnsubscribeSuccess,
		onFailure: doUnsubscribeFailure
	});
}

function doUnsubscribeSuccess() {
	console.log("Push UnSubscribtion == true");
}

function doUnsubscribeFailure() {
	console.log("Push UnSubscribtion == false");
}

//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload) {
	var title = "ADIB DSF";
	var msgbody = "";
	if(props.alert.body)
		msgbody = props.alert.body;
	else
		msgbody = props.alert;
	var confirmButtonText = "Close";
	var cancelButtonText="";
	var navigateUrl="home";
	swal({   
        title: title,
        text: msgbody,
        type: "",
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm){});
}

//------------------------------- Notification realm handler ---------------------------------------
var singleStepAuthRealmChallengeHandler = WL.Client.createChallengeHandler("SingleStepAuthRealm");

singleStepAuthRealmChallengeHandler.submitSuccess = function(){
//    alert("AuthenticateUser == true");
    authenticationLoopStarted = false;
    clearTimeout(authenticationTimeOut);
    console.log("AuthenticateUser == true");
	doSubscribe();
}

singleStepAuthRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || !response.responseJSON || response.responseText === null) {
        return false;
    }
    if (typeof(response.responseJSON.authRequired) !== 'undefined'){
        return true;
    } else {
        return false;
    }
};

singleStepAuthRealmChallengeHandler.handleChallenge = function(response){
    var authRequired = response.responseJSON.authRequired;
    if (authRequired == true){
        console.log(JSON.stringify(response));
    } else if (authRequired == false){
        singleStepAuthRealmChallengeHandler.submitSuccess();
    }
};

function doAuthenticateUser() {
    if(!authenticationLoopStarted){
        authenticationLoopStarted = true;
        authenticationTimeOut = setTimeout(authenticateUser, 2000);    
    }

    function authenticateUser(){
        var invocationData = {
            adapter : "SingleStepAuthAdapter",
            procedure : "submitAuthentication",
            parameters : [ userdata.mobileNumber, userdata.loginUserName ]
        };
        singleStepAuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
    }
}

function unAuthenticateUser(){
	doUnsubscribe();
	singleStepAuthRealmChallengeHandler.submitFailure();
}