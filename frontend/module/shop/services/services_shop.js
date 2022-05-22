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
        
        let totalData = {
            data: filtros,
            pos: 'def',
            pagination: 0
        }

        return services.post('shop', 'filters', totalData)
            .then(function(response) {

                return response;
                
            }, function(error) {
                console.log(error);
            });
    }
}])