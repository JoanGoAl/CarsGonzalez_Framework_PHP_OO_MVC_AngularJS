app.controller('controller_login', function($scope, $rootScope, toastr, services_login) {

    $scope.login = () => {
        $scope.nameLogin == undefined ? $scope.error_name_login = "Tienes que introducir un usuario" : $scope.error_name_login = "";
        $scope.passwordLogin == undefined ? $scope.error_password_login = "Tienes que introducir una contraseña" : $scope.error_password_login = "";
        if ($scope.nameLogin != undefined && $scope.passwordLogin != undefined) {
            let user = { 'name': $scope.nameLogin, 'passwd': $scope.passwordLogin }
            services_login.login(user)
        }
    }
});