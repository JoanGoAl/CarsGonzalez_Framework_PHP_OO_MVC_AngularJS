app.factory('services_login', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = {
        login: login,
        infoUser: infoUser,
        logout: logout
    };
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
                            window.location.href = '#/home'
                            location.reload()
                        });
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
}])