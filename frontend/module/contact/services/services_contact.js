app.factory('services_contact', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = { sendEmail: sendEmail };
    return service;

    function sendEmail(data) {
        services.post('contact', 'sendinfo', data)
            .then(function(response) {
                // toastr.success(response);
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    }
}])