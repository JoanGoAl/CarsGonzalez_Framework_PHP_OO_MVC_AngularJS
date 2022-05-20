app.controller('controller_home', function($scope, brands, categories, bodywork) {

    $scope.list_brands = brands;
    $scope.list_categories = categories;
    $scope.list_bodywork = bodywork;

    setTimeout(() => {
        new Swiper('.swiper', {
            loop: true,
            direction: 'horizontal',
            speed: 400,
            slidesPerView: 3,
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 3500
            },
        });
    }, 0)

});