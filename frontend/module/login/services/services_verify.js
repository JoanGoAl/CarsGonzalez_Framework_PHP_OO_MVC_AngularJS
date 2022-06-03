app.factory('services_verify', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = {
        verify: verify
    };
    return service;

    function verify(token_email) {

        services.post('login', 'changeStatusUser', { token_email: token_email })
            .then(function(response) {
                console.log(response);
                if (response == '"_verify"') {
                    toastr.success('Usuario verificado, puede iniciar sesión');
                    setTimeout(() => {
                        window.location.href = '#/login'
                    }, 0);
                }
            }, function(error) {
                console.log(error);
            });
    }
}])