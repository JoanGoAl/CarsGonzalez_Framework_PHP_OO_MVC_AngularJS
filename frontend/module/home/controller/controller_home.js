app.controller('controller_home', function($scope, $window, toastr, brands, categories, bodywork) {

    $scope.list_brands = brands;
    $scope.list_categories = categories;
    $scope.list_bodywork = bodywork;

    $scope.hola = () => {
        toastr.success('Hola');
    }
});