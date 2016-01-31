dsf.filter('heroPagination',function ( $timeout) {
	  return function(input, total) {
		    total = parseInt(total);
		    for (var i=0; i<total; i++)
		      input.push(i);
		    return input;
		  };
		
});