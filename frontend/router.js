var app = angular.module('CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS', ['ngRoute', 'toastr']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "controller_home"
        }).when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "controller_contact"
        }).when("/shop", {
            templateUrl: "frontend/module/shop/view/shop.html",
            controller: "controller_shop"
        }).otherwise("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "controller_home"
                // resolve: {
                //     carousel: function (services) {
                //         return services.get('home','carousel');
                //     },
                //     categoria: function (services) {
                //         return services.get('home','categoria');
                //     },
                //     brands: function (services) {
                //         return services.get('home','brands');
                //     }
                // }
        });
}]);