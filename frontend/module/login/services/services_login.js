app.factory('services_login', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = {
        login: login,
        infoUser: infoUser,
        logout: logout,
        register: register
    };
    return service;

    function login(user) {
        services.post('login', 'validate_login', user)
            .then(function(response) {
                data = response.replace(/['"]+/g, '')

                if (data == "name_not_exist" || data == "passwd_not_match") $rootScope.error_password_login = "Usuario o contraseña incorrectos";
                if (data == "all_ok") {
                    services.post('login', 'login', user)
                        .then(function(response) {
                            localStorage.setItem('token', JSON.stringify(response))
                            window.location.href = '#/home'
                            location.reload()
                        });
                } else if (data == "user_not_verify") {
                    toastr.warning('Usuario no verificado, compruebe su correo');
                }

            }, function(error) {
                console.log(error);
            });
    }

    function infoUser(token) {
        return services.post('login', 'data_user', { token: token })
            .then(function(response) {

                return response;

            }, function(error) {
                console.log(error);
            });
    }

    function logout() {
        services.post('login', 'logout')
            .then(function(response) {

                if (response == '"_logout"') {
                    localStorage.removeItem('token');
                    $rootScope.loginOrLogout = 'login';
                    $rootScope.infoUser = null;
                    location.reload()
                }

            }, function(error) {
                console.log(error);
            });
    }

    function register(data) {

        services.post('login', 'validate_register', data)
            .then(function(response) {
                    info = response.replace(/['"]+/g, '')
                    info == "user_exist" ? $rootScope.error_name_register = "Usuario no disponible" : $rootScope.error_name_register = "";
                    info == "email_exist" ? $rootScope.error_email_register = "Correo no disponible" : $rootScope.error_email_register = "";
                    info == "both_exist" ? $rootScope.error_name_register = "Usuario y correo no disponibles" : $rootScope.error_name_register = "";

                    if (info == "all_ok") {
                        services.post('login', 'register', data)
                            .then(function(response) {
                                    nombre = response.replace(/['"]+/g, '')
                                    toastr.success('Bienvenido ' + nombre + ': Usuario registrado correctamente, compruebe su correo para la verificación');

                                    let infoMail = {
                                            'name': nombre,
                                            'email': data.email
                                        }
                                        // console.log(infoMail);

                                    services.post('login', 'verifyRegister', infoMail)
                                        .then(function(response) {
                                            console.log(response);
                                        }, function(error) {
                                            console.log(error);
                                        });
                                },
                                function(error) {
                                    console.log(error);
                                });
                    }
                },
                function(error) {
                    console.log(error);
                });

    }
}])