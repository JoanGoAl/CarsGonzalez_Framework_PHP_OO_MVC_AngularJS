app.factory('services_shop', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {

    let service = {
        getModels: getModels,
        setFilters: setFilters,
        getCars: getCars,
        loadMap: loadMap,
        loadLikes: loadLikes
    }
    return service;

    function getModels(brand, models) {
        let arry = []

        models.forEach(item => {
            if (brand == item.id_brand) arry.push(item)
        })

        return arry;
    }

    function setFilters() {
        let filtros = {}
        if (localStorage.getItem('filtros')) {
            filtros = JSON.parse(localStorage.getItem('filtros'))
        } else {
            filtros = {
                id_brands: 'Allbrand',
                id_models: 'Allmodels',
                color: 'Allcolors',
                category: 'Allcategories',
                city: 'Allcities',
                bodywork: 'Allbody'
            }

            localStorage.setItem('filtros', JSON.stringify(filtros))
        }

        if (localStorage.getItem('orderBy')) {
            orderBy = JSON.parse(localStorage.getItem('orderBy'))
        } else {
            orderBy = "def"

            localStorage.setItem('orderBy', JSON.stringify(orderBy))
        }


        return [filtros, orderBy]
    }

    function getCars(filtros, order) {

        if (localStorage.getItem('pagination')) {
            position = JSON.parse(localStorage.getItem('pagination'))
        } else {
            position = 0
            localStorage.setItem('pagination', JSON.stringify(position))
        }

        if (position < 0) {
            position = 0
        }

        let totalData = {
            data: filtros,
            pos: order,
            pagination: position
        }

        return services.post('shop', 'filters', totalData)
            .then(function(response) {

                let numofpages = Math.ceil(response[1][0].numofcars / 6)
                let cars = response[0]

                numofpages == 0 ? calcpag = 0 : calcpag = (position / 6) + 1

                return {
                    cars: cars,
                    pages: numofpages,
                    calcpag: calcpag
                };

            }, function(error) {
                console.log(error);
            });
    }

    function loadMap(info) {
        setTimeout(() => {
            mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdnNCIsImEiOiJjbDAxNDY3M3EwZ3FiM2NtZWd2cDFscWR4In0.i-vcBEVshSWAABkJjsXYxw';
            let map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [-0.4166700, 39], // [lng, lat]
                zoom: 7 // starting zoom
            });

            info.forEach(element => {
                setTimeout(() => {
                    let popup = new mapboxgl.Popup({ closeOnClick: true })
                        .setHTML(
                            '<p>' + element.name_brand + ' ' + element.name_model + '</p><img class="redirectPopup" src="backend/' + element.photo_car + '" alt=""><a class="popupRedirect" href="#/details/' + element.id_car + '">Pusle aqui para ver el coche</a>'
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

    function loadLikes(token) {
        return services.post('shop', 'user_likes', { token: token })
            .then(function(response) {
                return response;

                // if (localStorage.getItem('token')) {


                //     for (i in data.cars) {
                //         for (j in response) {
                //             if (data.cars[i].id_car === response[j].id_car) {
                //                 data.cars[i].fav_class = 'like'
                //             }
                //         }
                //     }

                // } else {
                //     $scope.statusLike = 'no-like'
                // }
            }, function(error) {
                console.log(error);
            });
    }

}])