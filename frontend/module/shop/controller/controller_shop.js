app.controller('controller_shop', function($scope, services_shop, cars, filters) {

    $scope.brands = filters[0]
    $scope.colors = filters[2]

    let filtros = services_shop.setFilters()

    function loadCars() {
        services_shop.getCars(filtros).then((data => {
            $scope.cars = data[0];
        }))
    }

    function highlights() {
        $scope.brandSelected = filtros.id_brands
        $scope.modelSelected = filtros.id_models
    }

    loadCars()
    highlights()

    $scope.getModels = function() {
        $scope.modelos = services_shop.getModels(this.brandSelected, filters[1])

        filtros.id_brands = this.brandSelected
        filtros.id_models = 'Allmodels'

        localStorage.setItem('filtros',  JSON.stringify(filtros))

        loadCars()
    }

    $scope.loadCarsForModel = function() {
        filtros.id_models = this.modelSelected
        localStorage.setItem('filtros',  JSON.stringify(filtros))
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
        localStorage.setItem('filtros',  JSON.stringify(filtros))

        loadCars()
        highlights()
    }
    
    // $scope.seeLS = function() {
    //     $scope.ls = JSON.parse(localStorage.getItem('filtros'))
    // }
})