dsf.directive('validateFav',function ( ) {
    return {
    	scope: true,
    	restrict: 'C',
        link: function (scope, element, attrs) {
        		var currectOfferItem=scope.$parent.favoriteItem.ID;
        		var favoriteItems=JSON.parse(localStorage.getItem('dsf-favoriteOffers'));
                if(favoriteItems)
        		  for(var x=0;x<favoriteItems.length;x++)
            		{
            			if(favoriteItems[x].OFFER_ID==currectOfferItem){
            			element.removeClass('inActiveMarkFavorite');
                        element.addClass('activeMarkFavorite');
            			}
            		}
            }
        
    };
});