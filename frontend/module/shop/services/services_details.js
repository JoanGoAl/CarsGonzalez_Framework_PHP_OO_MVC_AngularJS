app.factory('services_details', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {

    let service = {
        getCar: getCar,
        loadMap: loadMap,
        loadSwiper: loadSwiper,
        getRelatedCar: getRelatedCar
    }
    return service;

    function getCar(id) {

        return services.post('shop', 'details_car', { idcar: id })
            .then(function(response) {

                if (response[0].length == 0) {
                    return 'empty'
                }
                let photos = []
                response[1].forEach(element => {
                    photos.push(element.url_photo)
                });

                return [response[0][0], photos]

            }, function(error) {
                console.log(error);
            });
    }

    function getRelatedCar(data) {

        return services.post('shop', 'related_cars', data)
            .then(function(response) {

                return response;

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


            let popup = new mapboxgl.Popup({ closeOnClick: true })
                .setHTML(
                    '<p>' + info.name_brand + ' ' + info.name_model + '</p><img class="redirectPopup" src="backend/' + info.photo_car + '" alt=""><a class="popupRedirect"'
                )

            new mapboxgl.Marker({
                    color: '#FF0000',
                    draggable: false
                })
                .setLngLat([info.lng, info.lat])
                .setPopup(popup)
                .addTo(map);

        }, 0)
    }

    function loadSwiper() {
        setTimeout(() => {
            new Swiper('.swiper', {
                // Optional parameters
                direction: 'horizontal',
                slidesPerView: 1,
                speed: 400,
                loop: true,
                autoplay: {
                    delay: 3000
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // And if we need scrollbar
            });
        }, 0);
    }

}])