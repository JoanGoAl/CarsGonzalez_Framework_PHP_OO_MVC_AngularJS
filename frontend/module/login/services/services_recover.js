app.factory('services_recover', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = {
        recover: recover,
        changePasswdFunc: changePasswdFunc
    };
    return service;

    function recover(email) {
        if (email != undefined) {
            services.post('login', 'recoverEmail', { email: email })
                .then(function(response) {
                    if (response == '"Mensaje enviado"') {
                        toastr.success('Mensaje enviado')
                    }

                }, function(error) {
                    console.log(error);
                });
        }
    }

    function changePasswdFunc(token) {
        $rootScope.recoverPasswd == undefined ? $rootScope.error_recover1 = 'No has introducido ninguna' : $rootScope.error_recover1 = ''
        $rootScope.recoverPasswdRepeat != $rootScope.recoverPasswd ? $rootScope.error_recover2 = 'Las contraseñas no coinciden' : $rootScope.error_recover2 = ''

        if ($rootScope.recoverPasswd != undefined && $rootScope.recoverPasswdRepeat == $rootScope.recoverPasswd) {
            services.post('login', 'recoverPasswd', { token: token, passwd: $rootScope.recoverPasswd })
                .then(function(response) {

                    if (response == '"_recover"') {
                        toastr.success('La contraseña se ha actualizado correctamente')
                        setTimeout(() => {
                            window.location.href = '#/login'
                        }, 0);
                    }

                }, function(error) {
                    console.log(error);
                });
        }
    }

}])