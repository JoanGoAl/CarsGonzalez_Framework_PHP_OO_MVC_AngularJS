app.factory('services_shop', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) { 

    let service = {
        getModels: getModels
    }
    return service;

    function getModels() {
        return 'HOlaa';
    }

}])