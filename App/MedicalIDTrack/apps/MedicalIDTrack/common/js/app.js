var dsf = angular.module('dsf', ['pascalprecht.translate','ui.router', 'ngSanitize', 'ngTouch','angular-carousel','dsf.services']);

dsf.config(function ($translateProvider, $urlRouterProvider, $sceDelegateProvider, $stateProvider, $compileProvider, $logProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|geo|tel|sms|local|ghttps?|ms-appx|x-wmapp0):/);
	if(WL.Client.getEnvironment() == WL.Environment.BLACKBERRY10){
    	$compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|local):|data:image\/)/);
    } else {
    	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);
    }

	//$mdGestureProvider.skipClickHijack();
    $logProvider.debugEnabled(true);

    var userLang = localStorage.getItem('dsf-language');
    if (!userLang) {
        localStorage.setItem('dsf-language', 'en');
        userLang = 'en';
    }
    $translateProvider
	.useStaticFilesLoader({
	    prefix: 'langages/',
	    suffix: '.json'
	})
	.registerAvailableLanguageKeys(['en', 'ar'], {
	    'en-*': 'en',
	    'ar-*': 'ar'
	})
	.preferredLanguage(userLang);
    $translateProvider.use(userLang);
    
    $sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain. Notice the difference between * and **.
		'http://*.domain.ae/**'
    ]);



    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                'viewContent': {
                    templateUrl: "templates/home.html",
                    controller: "homeController"
                }
            }
        })
         .state('userProfile', {
            url: '/userProfile',
            views: {
                'viewContent': {
                    templateUrl: "templates/userProfile.html",
                    controller: "userProfileController"
                }
            }
        })
         .state('login', {
            url: '/login',
            views: {
                'viewContent': {
                    templateUrl: "templates/login.html",
                    controller: "loginController"
                }
            }
        })
         .state('contactus', {
        	params:{NavFromAdib:null},
            url: '/contactus',
            views: {
                'viewContent': {
                    templateUrl: "templates/contactus.html",
                    controller: "contactusController"
                }
            }
        })
        .state('search', {
            url: '/search',
            views: {
                'viewContent': {
                    templateUrl: "templates/search.html",
                    controller: "searchController"
                }
            }
        })
     
         .state('socialTwitter', {
            url: '/socialTwitter',
            views: {
                'viewContent': {
                    templateUrl: "templates/socialTwitter.html",
                    controller: "socialTwitterController"
                }
            }
        })
        .state('favorites', {
            url: '/favorites',
            views: {
                'viewContent': {
                    templateUrl: "templates/favorites.html",
                    controller: "favoritesController"
                }
            }
        })
        .state('showoffers', {
            url: '/showoffers',
            views: {
                'viewContent': {
                    templateUrl: "templates/showoffers.html",
                    controller: "showoffersController"
                }
            }
        })
        .state('merchant', {
            url: '/merchant',
            views: {
                'viewContent': {
                    templateUrl: "templates/merchant.html",
                    controller: "merchantController"
                }
            }
        })
       .state('adiboffers', {
            url: '/adiboffers',
            views: {
                'viewContent': {
                    templateUrl: "templates/adiboffers.html",
                    controller: "adiboffersController"
                }
            }
        })
        .state('searchResultDetails', {
        	params:{searchText:null,serachMall:null},
            url: '/searchResultDetails',
            views: {
                'viewContent': {
                    templateUrl: "templates/searchResultDetails.html",
                    controller: "searchResultDetailsController"
                }
            }
        })
      
  
     .state('offerDetails', {
        url: '/offerDetails',
        views: {
            'viewContent': {
                templateUrl: "templates/offerDetails.html",
                controller: "offerDetailsController"
            }
        }
    })
     .state('filteredOfferList', {
    	params:{outletID:null,outletObj:null,CategoryID:null,CategoryObj:null,headerTitle:null},
        url: '/filteredOfferList',
        views: {
            'viewContent': {
                templateUrl: "templates/filteredOfferList.html",
                controller: "filteredOfferListController"
            }
        }
    })
      .state('TermsAndConditions', {
        url: '/TermsAndConditions',
        views: {
            'viewContent': {
                templateUrl: "templates/termsAndConditions.html",
                controller: "termsAndCnditionsController"
            }
        }
    })
     .state('adibtopratedoffers', {
            url: '/adibtopratedoffers',
            views: {
                'viewContent': {
                    templateUrl: "templates/adibtopratedoffers.html",
                    controller: "adibtopratedoffersController"
                }
            }
        })
      .state('verification', {
            url: '/verification',
            views: {
                'viewContent': {
                    templateUrl: "templates/verification.html",
                    controller: "verificationController"
                }
            }
        })   
    ;

   if(localStorage.getItem('dsf-userID')=="undefined" || localStorage.getItem('dsf-userID')==null)
    {
	   $urlRouterProvider.otherwise('/login');
    }
   else
   { 
	   $urlRouterProvider.otherwise('/home');
   }
    	
});
