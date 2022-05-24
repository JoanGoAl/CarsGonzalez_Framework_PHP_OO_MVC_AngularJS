app.controller('controller_home', function($scope, brands, services_shop, categories, bodywork) {

    $scope.list_brands = brands;
    $scope.list_categories = categories;
    $scope.list_bodywork = bodywork;

    $scope.redirect = function() {

        let filtros = {
            id_brands: 'Allbrand',
            id_models: 'Allmodels',
            color: 'Allcolors',
            category: 'Allcategories',
            city: 'Allcities',
            bodywork: 'Allbody'
        }

        if (this.item.id_brand) {
            filtros.id_brands = this.item.id_brand
            localStorage.setItem('filtros', JSON.stringify(filtros))
            window.location = "#/shop"
        } else if (this.item.id_bodywork) {
            filtros.bodywork = this.item.id_bodywork
            localStorage.setItem('filtros', JSON.stringify(filtros))
            window.location = "#/shop"
        } else if (this.item.id_category) {
            filtros.category = this.item.id_category
            localStorage.setItem('filtros', JSON.stringify(filtros))
            window.location = "#/shop"
        }

    }

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