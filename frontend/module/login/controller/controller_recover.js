app.controller('controller_recover', function($scope, $rootScope, toastr, $routeParams, services_recover) {

    $scope.changePasswd = false

    $scope.sendEmailRecover = () => {
        services_recover.recover($scope.recoverEmail)
    }

    if ($routeParams.token) {
        $scope.changePasswd = true

        $scope.changePasswdFunc = function() {
            services_recover.changePasswdFunc($routeParams.token)
        }
    }

});