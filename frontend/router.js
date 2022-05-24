var app = angular.module('CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS', ['ngRoute', 'toastr', 'routeStyles']);

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
            css: ['frontend/module/shop/view/css/filter.css', 'frontend/module/shop/view/css/likes.css', 'frontend/module/shop/view/css/location.css', 'frontend/module/shop/view/css/slider-details.css']
        }).when("/login", {
            templateUrl: "frontend/module/login/view/login.html",
            css: ["https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap", "frontend/view/css/login.css"]
                // controller: "controller_shop"
        }).otherwise("/home", {
            redirectTo: '/home'
        });
}]);