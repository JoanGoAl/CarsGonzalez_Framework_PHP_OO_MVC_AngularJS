app.factory('services_home', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = {
        getNews: getNews
    }
    return service;

    function getNews() {
        return services.get_api('https://gnews.io/api/v4/search?q=cars&token=4dbbb6e05004e319b00cc39aabbb62b0').then((data) => {
            news = data.articles
            localStorage.setItem('news', JSON.stringify(news))
            return news
        })
    }


}]);