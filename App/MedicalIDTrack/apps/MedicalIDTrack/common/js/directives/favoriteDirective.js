dsf.directive('markFavorite',function ( $timeout) {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            scope.markFavoriteFn = function (offID) {
            	
            	if((element.attr('class')).indexOf('inActiveMarkFavorite')>-1)
            	{ element.removeClass('inActiveMarkFavorite');
                element.addClass('activeMarkFavorite');
                scope.prepareOfflerFavoriteList(offID);
            	}
            	else
            	{ element.removeClass('activeMarkFavorite');
                  element.addClass('inActiveMarkFavorite');
                  scope.removeOfferIDFromFavoriteList(offID);
                 
            	}
            }
        }
    };
});