dsf.directive('deleteDirective',function ( $timeout) {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            scope.markFavorite = function (offID) {            	
                  scope.removeOfferIDFromFavoriteList(offID);
                  scope.displayFavoriteOffers();

            }
        }
    };
});