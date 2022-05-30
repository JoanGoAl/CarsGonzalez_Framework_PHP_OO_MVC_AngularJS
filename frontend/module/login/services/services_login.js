app.factory('services_login', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = { login: login };
    return service;

    function login(user) {
        return services.post('login', 'validate_login', user)
            .then(function(response) {
                data = response.replace(/['"]+/g, '')

                if (data == "name_not_exist" || data == "passwd_not_match") toastr.warning('Usuario o contraseña incorrectos');
                if (data == "all_ok") {
                    services.post('login', 'login', user)
                        .then(function(response) {
                            localStorage.setItem('token', JSON.stringify(response))
                            window.location = '#/home'
                        });
                }
            }, function(error) {
                console.log(error);
            });
    }
}])