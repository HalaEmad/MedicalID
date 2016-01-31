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
      .state('TermsAndConditions', {
        url: '/TermsAndConditions',
        views: {
            'viewContent': {
                templateUrl: "templates/termsAndConditions.html",
                controller: "termsAndCnditionsController"
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
    .state('allergies', {
      url: '/allergies',
      views: {
          'viewContent': {
              templateUrl: "templates/allergies.html",
              controller: "allergiesController"
          }
      }
        })
        .state('majorIllness', {
        	url: '/majorIllness',
        	views: {
        	  'viewContent': {
              templateUrl: "templates/majorillness.html",
              controller: "majorIllnessController"
          }
      }
  })     
  .state('medicalEvents', {
      url: '/medicalEvents',
      views: {
          'viewContent': {
              templateUrl: "templates/medicalEvents.html",
              controller: "medicalEventsController"
          }
      }
  })   
     .state('medications', {
         url: '/medications',
         views: {
             'viewContent': {
                 templateUrl: "templates/medications.html",
                 controller: "medicationsController"
             }
         }
     })   
    .state('investigations', {
        url: '/investigations',
        views: {
            'viewContent': {
                templateUrl: "templates/tests.html",
                controller: "testsController"
            }
        }
    })  
    .state('surgicalProcedures', {
            url: '/surgicalProcedures',
            views: {
                'viewContent': {
                    templateUrl: "templates/surgicalProcedure.html",
                    controller: "surgicalProceduresController"
                }
            }
        })        
    .state('anaesthesiaProblem', {
            url: '/anaesthesiaProblem',
            views: {
                'viewContent': {
                    templateUrl: "templates/anaesthesiaProblem.html",
                    controller: "anaesthesiaProblemController"
                }
            }
        })         
    .state('traumaHistory', {
            url: '/traumaHistory',
            views: {
                'viewContent': {
                    templateUrl: "templates/traumaHistory.html",
                    controller: "traumaHistoryController"
                }
            }
        })     
    .state('cancerhistory', {
            url: '/cancerhistory',
            views: {
                'viewContent': {
                    templateUrl: "templates/cancerHistory.html",
                    controller: "cancerHistoryController"
                }
            }
        }) 
        
    .state('foodndiet', {
            url: '/foodndiet',
            views: {
                'viewContent': {
                    templateUrl: "templates/FoodAndDiet.html",
                    controller: "FoodAndDietController"
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
