app.controller('controller_shop', function($scope, $rootScope, services_shop, cars, filters) {

    $scope.brands = filters[0]
    $scope.colors = filters[2]

    let filtros = services_shop.setFilters()[0]
    let orderBy = services_shop.setFilters()[1]

    function loadCars() {
        services_shop.getCars(filtros, orderBy).then((data => {

            data.cars.length === 0 ? $scope.notFound = true : $scope.notFound = false

            for (i in data.cars) data.cars[i].fav_class = 'no-like'

            if (localStorage.getItem('token')) {

                services_shop.loadLikes(JSON.parse(localStorage.getItem('token')).replace(/['"]+/g, '')).then((infolikes => {

                    for (i in data.cars) {
                        for (j in infolikes) {
                            if (data.cars[i].id_car === infolikes[j].id_car) {
                                data.cars[i].fav_class = 'like'
                            }
                        }
                    }
                }))

            }

            $rootScope.infocars = data.cars;
            $scope.pages = data.pages;
            $scope.actualpage = data.calcpag
            loadMap()
        }))
    }

    $scope.pagMore = function() {
        if ($scope.actualpage < $scope.pages) {
            localStorage.setItem('pagination', JSON.stringify($scope.actualpage * 6))
            loadCars()
        }
    }

    $scope.pagLess = function() {
        if ($scope.actualpage != 1) {
            localStorage.setItem('pagination', localStorage.getItem('pagination') - 6)
            loadCars()
        }
    }

    function highlights() {
        $scope.brandSelected = filtros.id_brands
        $scope.modelSelected = filtros.id_models
        $scope.colorSelected = filtros.color
        $scope.orderSelected = orderBy
    }

    $scope.getModels = function() {
        $scope.modelos = services_shop.getModels(this.brandSelected, filters[1])

        filtros.id_brands = this.brandSelected
        filtros.id_models = 'Allmodels'

        localStorage.setItem('filtros', JSON.stringify(filtros))
        localStorage.setItem('pagination', 0)
        loadCars()
    }

    $scope.loadCarsForModel = function() {
        filtros.id_models = this.modelSelected
        localStorage.setItem('filtros', JSON.stringify(filtros))
        localStorage.setItem('pagination', 0)
        loadCars()
    }

    $scope.loadCarsForColor = function() {
        filtros.color = this.colorSelected
        localStorage.setItem('filtros', JSON.stringify(filtros))
        localStorage.setItem('pagination', 0)
        loadCars()
    }

    $scope.loadCarsForOrder = function() {
        orderBy = this.orderSelected
        localStorage.setItem('orderBy', JSON.stringify(orderBy))
        localStorage.setItem('pagination', 0)
        loadCars()
    }

    $scope.removeFilters = function() {
        filtros = {
            id_brands: 'Allbrand',
            id_models: 'Allmodels',
            color: 'Allcolors',
            category: 'Allcategories',
            city: 'Allcities',
            bodywork: 'Allbody'
        }
        localStorage.setItem('filtros', JSON.stringify(filtros))
        $scope.modelos = []

        orderBy = 'def'
        localStorage.setItem('orderBy', JSON.stringify(orderBy))

        loadCars()
        highlights()
    }

    function loadMap() {
        services_shop.loadMap($scope.infocars)
    }

    $scope.loadDetails = function() {
        window.location = "#/details/" + this.item.id_car
    }

    $scope.clickFav = function() {

        services_shop.setFav(this.item.id_car).then((data => {
            if (data == 'eliminado') {
                this.item.fav_class = "no-like"
            } else if (data == 'insertado') {
                this.item.fav_class = "like"
            }
        }))

    }

    loadCars()
    highlights()

})