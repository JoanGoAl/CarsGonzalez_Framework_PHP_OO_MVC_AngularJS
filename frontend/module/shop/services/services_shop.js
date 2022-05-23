app.factory('services_shop', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) { 

    let service = {
        getModels: getModels,
        setFilters: setFilters,
        getCars: getCars
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

        return filtros
    }

    function getCars(filtros) {

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
            pos: 'def',
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
}])