dsf.service('CyclicJobsModel',['$state','$interval','MsgsModel','$filter', function($state,$interval,MsgsModel,$filter) { 
	/*User Personalize Messagebox interval*/
	var personalizePopupCyclicJob;
	this.setUserInterval=function()
	{
		 personalizePopupCyclicJob=$interval(function(){
			var title=$filter("translate")("PERSONALIZEMESSAGEHEADER");
			var msgbody="";
			var confirmButtonText=$filter("translate")("YES");
			var cancelButtonText=$filter("translate")("NO");
			var navigateUrl="userProfile";
		MsgsModel.userPersonalizeMsg(title,msgbody,confirmButtonText,cancelButtonText,navigateUrl);
	},600000);
	},
	
	this.cancelPersonalizeCyclicJob=function()
	{
		$interval.cancel(personalizePopupCyclicJob);
	}
}]);