var app = angular.module('CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS', ['ngRoute', 'toastr']);

app.config(['$routeProvider', function($routeProvider, services) {
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
            controller: "controller_shop"
        }).when("/login", {
            templateUrl: "frontend/module/login/view/login.html",
            // controller: "controller_shop"
        }).otherwise("/home", {
            redirectTo: '/home'
        });
}]);