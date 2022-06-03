app.factory('services_contact', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = { sendEmail: sendEmail };
    return service;

    function sendEmail(data) {
        services.post('contact', 'sendinfo', data)
            .then(function(response) {
                if (response == '"Mensaje enviado"') {
                    toastr.success('Mensaje enviado');
                } else {
                    toastr.error('Mensaje no enviado, compruebe los datos');
                }
            }, function(error) {
                console.log(error);
            });
    }
}])