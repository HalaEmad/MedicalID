dsf.directive(
				'flagCode',
				function($http) {
					return {
						restrict : 'EA',
						transclude : false,
						link : function(scope, element, attrs) {
						},
						scope : {
							counrtyFlagAndCode : "@"
						},
						template : '<option  ng-repeat="countryItem in counrtyFlagAndCode"  data-image="{{countryItem.countryImg}}">{{countryItem.CountryCode}}</option>',

					};
				});