app.controller('controller_details', function($scope, $rootScope, $routeParams, services_details) {

    services_details.getCar($routeParams.id).then((data => {
        $scope.car = data[0]
        $scope.carPhotos = data[1]

        services_details.getRelatedCar({ cat: $scope.car.id_category, type: $scope.car.id_type, idcar: $scope.car.id_car }).then((data => {
            $scope.numOfRelated = -3

            data.length < 4 ? $scope.seeMore = true : $scope.seeMore = false

            console.log($scope.numOfRelated + " " + data.length);

            $scope.moreRelated = function() {
                $scope.numOfRelated -= 3
                $scope.RelatedCar = data.slice($scope.numOfRelated)

                if ($scope.numOfRelated + data.length > -3 && $scope.numOfRelated + data.length < 1) {
                    $scope.seeMore = true
                }

            }
            $scope.RelatedCar = data.slice($scope.numOfRelated)

        }))

        let info = data[0]
        loadMap(info)
        loadSwiper()
    }))

    $scope.loadDetails = function() {
        window.location = "#/details/" + this.item.id_car
    }

    function loadSwiper() {
        services_details.loadSwiper()
    }

    function loadMap(info) {
        services_details.loadMap(info)
    }

})