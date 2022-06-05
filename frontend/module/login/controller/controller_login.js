app.controller('controller_login', function($scope, $rootScope, toastr, services_login, $routeParams) {

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

    $scope.sendEmailRecover = () => {
        services_login.recover($scope.recoverEmail)
    }

    // Mirar perque no funciona el auth controler
    $scope.socialLogin = function() {
        services_login.social_login()
    }

});