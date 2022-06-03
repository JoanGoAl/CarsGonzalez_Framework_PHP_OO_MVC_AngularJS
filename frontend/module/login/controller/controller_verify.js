app.controller('controller_verify', function($scope, $rootScope, toastr, $routeParams, services_verify) {

    services_verify.verify($routeParams.token)

});