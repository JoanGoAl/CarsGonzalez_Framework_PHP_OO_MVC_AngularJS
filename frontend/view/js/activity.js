function autologout() {
    ajaxPromise("GET", "modules/login/ctrl/controller_login.php?op=logout", "json")
        .then((res) => {
            console.log(res);

            if (res == '_logout') {
                localStorage.removeItem('token');
                window.location.href = "index.php?modules=controller_home";
            }

        }).catch(function() {
            console.log('Error ajax logout')
        })
}

function protecturl() {
    setInterval(() => {
        ajaxPromise("GET", "modules/login/ctrl/controller_login.php?op=controluser", "json")
            .then((res) => {
                console.log(res);

                if (res == "no_logged") {
                    toastr.warning('Debes realizar login')
                    window.location.href = window.location.href;
                } else {
                    setTimeout(console.log('user_default'), 1000);
                }

            }).catch(function() {
                console.log('Error protecturl')
            })
    }, 600000);
}

function activity_User() {
    setInterval(() => {
        ajaxPromise("GET", "modules/login/ctrl/controller_login.php?op=activity", "json")
            .then((res) => {

                if (res == 'inactivo') {
                    toastr.warning('Se ha cerrado la cuenta por inactividad')
                    autologout()
                } else if (res == 'no-logged') {
                    console.log('Usuario no legged');
                } else {
                    console.log('usuario activo');
                }

            }).catch(function() {
                console.log('Error protecturl')
            })
    }, 120000);
}


$(document).ready(function() {
    // activity_User()
    // protecturl()
});
