app.factory('services_contact', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {

    let service = { sendEmail: sendEmail };
    return service;

    function sendEmail(data) {

        console.log(services.post('contact', 'sendinfo', data));


        // .then(function(response) {

        //     console.log(response);
        //     // if (response != "Error!") {
        //     //     toastr.success("Send email");
        //     // } else {
        //     //     toastr.error("Error sending email");
        //     // }
        //     // location.href = "#/home";
        //     // window.location.reload();
        //     return;
        // }, function(error) {
        //     console.log(error);
        // });

    }

}])