app.controller('controller_home', function($scope, brands, categories, services_home, bodywork) {

    $scope.cont = 0;
    $scope.list_brands = brands;
    $scope.list_categories = categories;
    $scope.list_bodywork = bodywork;
    if (localStorage.getItem('news')) {
        notice = JSON.parse(localStorage.getItem('news'))
        $scope.all_news = notice;
        $scope.news = $scope.all_news.splice(0, 3)
    } else {
        services_home.getNews().then((data) => {
            $scope.all_news = data;
            $scope.news = $scope.all_news.splice(0, 3)

        })
    }

    $scope.moreNews = function() {
        $scope.cont++
        if ($scope.cont == 20) {
            $scope.news = $scope.all_news.splice(0, 6)
        }
    }



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