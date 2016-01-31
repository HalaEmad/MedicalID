dsf.directive('getSiblings',function () {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            scope.clicked = function (offID,permitNo,ratingIndex) {
                element.siblings().removeClass('activeRatingStars');
                element.addClass('activeRatingStars');
                element.prevAll().addClass('activeRatingStars');
                element.nextAll().addClass('inActiveRatingStars');
                scope.rateOffers(offID, permitNo, ratingIndex);
            }
        }
    };
});