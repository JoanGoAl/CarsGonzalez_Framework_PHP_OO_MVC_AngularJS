app.controller('controller_shop', function($scope, $rootScope, services_shop, cars, filters) {

    $scope.brands = filters[0]
    $scope.colors = filters[2]

    let filtros = services_shop.setFilters()

    function loadCars() {
        services_shop.getCars(filtros).then((data => {
            $scope.infocars = data.cars;
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

        loadCars()
        highlights()
    }

    $scope.redirectDetails = function() {
        console.log('holaa');
    }

    function loadMap() {

        setTimeout(() => {
            mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdnNCIsImEiOiJjbDAxNDY3M3EwZ3FiM2NtZWd2cDFscWR4In0.i-vcBEVshSWAABkJjsXYxw';
            let map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [-0.4166700, 39], // [lng, lat]
                zoom: 7 // starting zoom
            });

            $scope.infocars.forEach(element => {
                setTimeout(() => {
                    let popup = new mapboxgl.Popup({ closeOnClick: true })
                        .setHTML(
                            '<p>' + element.name_brand + ' ' + element.name_model + '</p><img class="redirectPopup" src="backend/' + element.photo_car + '" alt=""><a class="popupRedirect" href="http://youtube.com">Pusle aqui para ver el coche</a>'
                        )


                    new mapboxgl.Marker({
                            color: '#FF0000',
                            draggable: false
                        })
                        .setLngLat([element.lng, element.lat])
                        .setPopup(popup)
                        .addTo(map);
                }, 0);
            });
        }, 0)

    }

    $scope.loadDetails = function() {
        // console.log(this.item.id_car);
        // $scope.infoDetailsCar = this.item
        $rootScope.infoDetailsCar = this.item
        window.location = "#/details"
    }

    loadCars()
    highlights()
})