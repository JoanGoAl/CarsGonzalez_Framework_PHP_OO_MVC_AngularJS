app.controller('controller_details', function($scope, $rootScope) {
    
    let info = $rootScope.infoDetailsCar

    function loadMap() {
        setTimeout(() => {
            mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdnNCIsImEiOiJjbDAxNDY3M3EwZ3FiM2NtZWd2cDFscWR4In0.i-vcBEVshSWAABkJjsXYxw';
            let map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [-0.4166700, 39], // [lng, lat]
                zoom: 7 // starting zoom
            });

            setTimeout(() => {
                let popup = new mapboxgl.Popup({ closeOnClick: true })
                    .setHTML(
                        '<p>' + info.name_brand + ' ' + info.name_model + '</p><img class="redirectPopup" src="backend/' + info.photo_car + '" alt=""><a class="popupRedirect" href="http://youtube.com">Pusle aqui para ver el coche</a>'
                    )

                new mapboxgl.Marker({
                        color: '#FF0000',
                        draggable: false
                    })
                    .setLngLat([info.lng, info.lat])
                    .setPopup(popup)
                    .addTo(map);
            }, 0);
        }, 0)
    }

    

    loadMap()
})