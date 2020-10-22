


console.log("main script Loaded+++++++++++++++++++++++")
var ably = new Ably.Realtime('YxamlA.Va0Qtw:uyPGF7_BsNwKGb0R');
var channel = ably.channels.get('project');
console.log({channel})
// Subscribe to messages on channel
channel.subscribe('appliedToJob', function(message) {
    console.log({data:message.data})

/**
 * 
 * Need to apply all the checks like
 * compare with localstorage createdBy field , applied by user
 * 
 */
var user=JSON.parse(localStorage.getItem('userDetail'))
console.log({user})
if(user){
console.log(message.data.opening.createdBy==user._id)
        if(message.data.opening.createdBy==user._id){

            alert(message.data.message);
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "3000",
                "hideDuration": "2000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }
               toastr.info(message.data.message)
        }

}


});











