dsf.service('SearchModel',['$http', function($http) {
   var searchOfferKeyword;
   var ADIBOfferList = [ "Nike Men's Flex 2015 Rn Running Shoe", "Nike Team Training Gymsack", "Nike Men's Club Swoosh Full Zip Fleece Hoodie", "adidas Performance Women's Tiro Training Pant", "adidas Performance Men's Tiro 15 Training Pant", "Men's Condivo 14 Training Pants", "adidas Performance Men's Superstar Skate Shoe", "adidas Performance Men's Samba Classic Indoor Soccer Shoe", "adidas Performance Men's Speed Trainer 2 Training Shoe" ];
   var searchSearchEventsKeyword;
   var result =["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
	
   this.setSearchOffersKeyword=function(searchKeyWord){
    searchOfferKeyword=searchKeyWord;
   };
   this.getSearchOffersKeyword=function(){
    return searchOfferKeyword;
   };
   this.getADIBOffersList=function()
   {
	   return ADIBOfferList;
   }
   this.setADIBOffersList=function(adibOfferList)
   {
	    ADIBOfferList=adibOfferList;
   }
   
   this.setSearchEventsKeyword=function(searchKeyWord){
   searchSearchEventsKeyword=searchKeyWord;
   };
   this.getSearchEventsKeyword=function(){
    return searchSearchEventsKeyword;
   };
   this.getEventsResult=function()
   {
	   result= ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
	
   return result;
   }
}]);