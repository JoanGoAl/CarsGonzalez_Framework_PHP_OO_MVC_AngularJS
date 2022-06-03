app.controller('controller_login', function($scope, $rootScope, toastr, services_login) {

    $scope.login = () => {
        $scope.nameLogin == undefined ? $scope.error_name_login = "Tienes que introducir un usuario" : $scope.error_name_login = "";
        $scope.passwordLogin == undefined ? $rootScope.error_password_login = "Tienes que introducir una contraseña" : $rootScope.error_password_login = "";
        if ($scope.nameLogin != undefined && $scope.passwordLogin != undefined) {
            let user = { 'name': $scope.nameLogin, 'passwd': $scope.passwordLogin }
            services_login.login(user)
        }
    }

    $scope.register = () => {

        $scope.nameRegister == undefined ? $rootScope.error_name_register = "Tienes que introducir un usuario" : $rootScope.error_name_register = " ";
        $scope.emailRegister == undefined ? $rootScope.error_email_register = "Tienes que introducir un correo" : $rootScope.error_email_register = " ";
        $scope.passwdRegister == undefined ? $rootScope.error_password_register = "Tienes que introducir una contraseña" : $rootScope.error_password_register = " ";
        $scope.passwd2Register == undefined ? $rootScope.error_repeat_password_register = "Tienes que repetir la contraseña" : $rootScope.error_repeat_password_register = " ";
        if ($scope.nameRegister != undefined && $scope.passwdRegister != undefined && $scope.emailRegister != undefined && $scope.passwd2Register != undefined) {

            $scope.passwdRegister != $scope.passwd2Register ? $rootScope.error_repeat_password_register = "Las contraseñas no coinciden" : $rootScope.error_repeat_password_register = " ";

            if ($scope.passwdRegister != $scope.passwd2Register) {
                $rootScope.error_repeat_password_register = "Las contraseñas no coinciden";
            } else {
                $rootScope.error_repeat_password_register = " ";
                let data = {
                    'name': $scope.nameRegister,
                    'email': $scope.emailRegister,
                    'passwd': $scope.passwdRegister,
                    'passwd2': $scope.passwd2Register
                }
                services_login.register(data)
            }
        }
    }

    // Mirar perque no funciona el auth controler

    // let webAuth = new auth0.WebAuth({
    //     domain: 'joangoal.eu.auth0.com',
    //     clientID: '4R7dzhd5tvOugxpujfAriHYNOirVjtpI',
    //     redirectUri: 'http://localhost/CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS/#/login',
    //     responseType: 'token id_token',
    //     scope: 'openid profile email',
    //     leeway: 60
    // })

    // $scope.googleLogin = () => {
    //     webAuth.authorize({
    //         connection: 'google-oauth2'
    //     })
    // }

    // function socialLogin() {
    //     webAuth.parseHash((error, authResult) => {
    //         if (authResult && authResult.accessToken && authResult.idToken) {
    //             window.location.hash = '';
    //             setSessionExpiration(authResult)

    //             let user = {
    //                 idUser: authResult.idTokenPayload.sub.split('|')[1],
    //                 name: authResult.idTokenPayload.nickname,
    //                 email: authResult.idTokenPayload.email
    //             }

    //             services.post('login', 'register', user)
    //                 .then(function(response) {
    //                         console.log(response);
    //                         // if (response == '"user_exist') {
    //                         //     services.post('login', 'login', user)
    //                         //         .then(function(response) {
    //                         //                 localStorage.setItem('token', JSON.stringify(response))
    //                         //                     // window.location.href = '#/home'
    //                         //             },
    //                         //             function(error) {
    //                         //                 console.log(error);
    //                         //             });
    //                         // }
    //                     },
    //                     function(error) {
    //                         console.log(error);
    //                     });

    //         } else if (error) {
    //             console.log(error);
    //         }
    //     })
    // }

    // function setSessionExpiration(authResult) {
    //     let expires_at = JSON.stringify(
    //         authResult.expiresIn * 1000 + new Date().getTime()
    //     );

    //     localStorage.setItem('access_token', authResult.accessToken);
    //     localStorage.setItem('id_token', authResult.idToken);
    //     localStorage.setItem('expires_at', expires_at);
    // }

    // socialLogin()

});