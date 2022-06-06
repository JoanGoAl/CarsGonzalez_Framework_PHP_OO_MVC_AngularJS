app.factory('services_auth0', ['services', '$rootScope', 'toastr', function(services, $rootScope, toastr) {
    let service = {
        infoAuth0: infoAuth0,
        social_login_Google: social_login_Google,
        social_login_info: social_login_info
    };
    return service;

    function infoAuth0() {

        let webAuth = new auth0.WebAuth({
            domain: 'joangoal.eu.auth0.com',
            clientID: '4R7dzhd5tvOugxpujfAriHYNOirVjtpI',
            redirectUri: 'http://localhost/CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS/#/login',
            responseType: 'token',
            scope: 'openid profile email',
            audience: 'https://' + 'joangoal.eu.auth0.com' + '/userinfo',
        })

        $rootScope.webAuth = webAuth;

    }

    function social_login_Google() {

        $rootScope.webAuth.authorize({
            connection: 'google-oauth2'
        })

    }

    function social_login_info() {
        $rootScope.webAuth.parseHash((error, authResult) => {

            if (authResult) {
                $rootScope.webAuth.client.userInfo(authResult.accessToken, function(err, profile) {
                    
                    let user = {
                        idUser : profile.sub.split('|')[1],
                        name : profile.nickname,
                        email : profile.email,
                        avatar : profile.picture,
                        status : 'socialLogin'
                    }

                    services.post('login', 'register', user)
                            .then(function(response) {

                                response = response.replace(/['"]+/g, '')
                                let name = ''
                                response == 'user_exist' ? name = user.name : name = response
                                
                                services.post('login', 'login', {name: name})
                                .then(function(token) {
                                    localStorage.setItem('token', JSON.stringify(token))
                                    window.location.href = '#/home'
                                    location.reload()
                                });
                    },function(error) {
                        console.log(error);
                    });
                })
            }
        })

    }

}]);