app.factory('services_search', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {

    let service = {
        searchInfo: searchInfo,
        cityInfo: cityInfo
    }
    return service

    function searchInfo() {

        return services.post('search', 'list_info_search')
            .then(function(response) {

                return response;

            }, function(error) {
                console.log(error);
            });
    }

    function cityInfo(data) {

        data == "" ? data = '%' : data = data

        return services.post('search', 'autocomplete', { city: data })
            .then(function(response) {

                return response;

            }, function(error) {
                console.log(error);
            });
    }


}])