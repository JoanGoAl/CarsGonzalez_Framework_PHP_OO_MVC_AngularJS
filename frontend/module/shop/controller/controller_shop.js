app.controller('controller_shop', function($scope, services_shop, cars, filters) {

    // $scope.cars = cars
    $scope.brands = filters[0]

    $scope.models = function() {
        // services_shop.getModels()
        console.log(this);
    }
})