var app = angular.module('CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS', ['ngRoute', 'toastr', 'routeStyles', 'infinite-scroll']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "controller_home",
            resolve: {
                brands: function(services) {
                    return services.get('home', 'list_brands');
                },
                categories: function(services) {
                    return services.get('home', 'list_categories');
                },
                bodywork: function(services) {
                    return services.get('home', 'list_bodywork');
                }
            }
        }).when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "controller_contact"
        }).when("/shop", {
            templateUrl: "frontend/module/shop/view/shop.html",
            controller: "controller_shop",
            css: ['frontend/module/shop/view/css/filter.css', 'frontend/module/shop/view/css/likes.css', 'frontend/module/shop/view/css/location.css', 'frontend/module/shop/view/css/slider-details.css'],
            resolve: {
                cars: function(services) {
                    return services.get('shop', 'list_cars');
                },
                filters: function(services) {
                    return services.get('shop', 'brands_and_model');
                }
            }
        }).when("/details/:id", {
            templateUrl: "frontend/module/shop/view/details.html",
            controller: "controller_details",
            css: ['frontend/module/shop/view/css/filter.css', 'frontend/module/shop/view/css/likes.css', 'frontend/module/shop/view/css/location.css', 'frontend/module/shop/view/css/slider-details.css'],
        }).when("/login", {
            templateUrl: "frontend/module/login/view/login.html",
            css: ["https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap", "frontend/view/css/login.css"],
            controller: "controller_login"
        }).when("/verify/:token", {
            templateUrl: "frontend/module/login/view/login.html",
            css: ["https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap", "frontend/view/css/login.css"],
            controller: "controller_verify"
        }).otherwise("/home", {
            redirectTo: '/home'
        });
}]);

app.run(function($rootScope, services, services_search, services_login) {

    if (localStorage.getItem('token')) {
        $rootScope.loginOrLogout = 'logout';
        let token = JSON.parse(localStorage.getItem('token')).replace(/['"]+/g, '')
        services_login.infoUser(token).then((data => {
            $rootScope.infoUser = data
        }))

    } else {
        $rootScope.loginOrLogout = 'login';
    }

    $rootScope.logout = () => {
        services_login.logout();
    }

    let filtros = JSON.parse(localStorage.getItem('filtros'))
    $rootScope.catSearchSelect = filtros.category
    $rootScope.brandSearchSelect = filtros.id_brands

    $rootScope.onClickDocument = function() {
        if ($rootScope.seeCities == true) $rootScope.seeCities = false
    }

    services_search.searchInfo().then((data => {
        $rootScope.catSearch = data[0]
        $rootScope.brandSearch = data[1]
    }))

    $rootScope.getCities = function() {
        services_search.cityInfo(this.citySearch).then((data => {
            $rootScope.cities = data
        }))
        $rootScope.seeCities = true
    }

    $rootScope.setCity = function() {
        $rootScope.citySearch = this.item.city
        $rootScope.seeCities = false
        filtros.city = this.item.city
    }


    $rootScope.getInfoSearch = function() {
        filtros.category = this.catSearchSelect
        filtros.id_brands = this.brandSearchSelect
    }

    $rootScope.setSearch = function() {
        $rootScope.citySearch == undefined ? filtros.city = 'Allcities' : filtros = filtros

        filtros = {
            id_brands: filtros.id_brands,
            id_models: 'Allmodels',
            color: 'Allcolors',
            category: filtros.category,
            city: filtros.city,
            bodywork: 'Allbody'
        }

        localStorage.setItem('filtros', JSON.stringify(filtros))

        if (window.location.hash == '#/shop') {
            window.location = '#/home'
            window.location = '#/shop'
        } else {
            window.location = '#/shop'
        }


        $rootScope.citySearch = undefined


    }

});