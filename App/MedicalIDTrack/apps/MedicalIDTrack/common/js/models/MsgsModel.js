dsf.service('MsgsModel',['$state', function($state) { 
	
 onclickBasic=function(){
    swal("Here's a message!");
};
onsuccess=function (){
    swal("Good job!", "You clicked the button!", "success")
};
this.confirm=function (){
    swal({   
        title: "Are you sure?",
        text: "You will not be able to recover this file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm){
    if (isConfirm){
      swal("Deleted!", "Your file has been deleted!", "success");
    } else {
      swal("Cancelled", "Your file is safe!", "error");
    }
    });
};
this.errorHappened=function (){
    swal("Oops...", "Something went wrong!", "error");
};
this.test=function (){
    swal({   
        title: "Are you sure?",
        text: "You will not be able to recover this file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm){
    if (isConfirm){
      swal("Deleted!", "Your file has been deleted!", "success");
    } else {
      swal("Cancelled", "Your file is safe!", "error");
    }
    });
};

this.ThankyouMsg= function (title,msgbody,confirmButtonText,cancelButtonText,navigateUrl){
    swal({   
        title: title,
        text: msgbody,
        type: "",
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm){
        	$state.go(navigateUrl);
        } 
        });
    };
this.userPersonalizeMsg= function (title,msgbody,confirmButtonText,cancelButtonText,navigateUrl){
        swal({   
            title: title,
            text: msgbody,
            type: "",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm){
            	$state.go(navigateUrl);
            } 
            });
        };
this.displayErrorMessage= function (title,msgbody,confirmButtonText,cancelButtonText){
    swal({   
        title: title,
        text: msgbody,
        type: "",
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        closeOnConfirm: true,
        closeOnCancel: true
        });
    };   
}]);
