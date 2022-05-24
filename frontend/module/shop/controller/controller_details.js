app.controller('controller_details', function($scope, $routeParams, services_details) {
    
    services_details.getCar($routeParams.id).then((data => {
        $scope.car = data[0]
        $scope.carPhotos = data[1]

        let info = data[0]
        loadMap(info)
        loadSwiper()
    }))
    
    function loadSwiper() {
        services_details.loadSwiper()
    }

    function loadMap(info) {
        services_details.loadMap(info)
    }

})