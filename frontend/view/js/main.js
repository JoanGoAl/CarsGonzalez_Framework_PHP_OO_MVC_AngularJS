function load_menu() {

    if (localStorage.getItem('token')) {

        let token = localStorage.getItem('token')

        url = friendlyURL("?page=login&op=data_user")
        ajaxPromise("POST", url, "json", { token: token })
            .then((res) => {

                let imgavatar = document.getElementById('menu-area-main')

                imgavatar.style = 'background-image: url("' + res.avatar_user + '");height: 50px;width: 50px;';

                let container = document.createElement('div');
                container.id = 'container-info-user'

                let goProfile = document.createElement('div');
                let goLogout = document.createElement('div');

                goProfile.id = 'see-profile'
                goLogout.id = 'butt-logout'

                goProfile.className = 'info-user'
                goLogout.className = 'info-user'

                goProfile.appendChild(document.createTextNode('Profile'))
                goLogout.appendChild(document.createTextNode('Logout'))

                imgavatar.appendChild(container)
                container.appendChild(goProfile)
                container.appendChild(goLogout)

                logout()

            }).catch(function() {
                console.log('Error data user')
            })



    } else {
        let alogin = document.createElement('a');

        alogin.appendChild(document.createTextNode('Login'));
        alogin.href = 'login';

        document.getElementById('menu-area-main').appendChild(alogin);
    }

}

function logout() {

    $('#butt-logout').on('click', function() {

        url = friendlyURL("?page=login&op=logout")
        ajaxPromise("POST", url, "json")
            .then((res) => {
                console.log(res);

                if (res == '_logout') {
                    localStorage.removeItem('token');
                    window.location.href = "home";
                }

            }).catch(function() {
                console.log('Error ajax logout')
            })
    });

}

$(document).ready(function() {
    load_menu()
});