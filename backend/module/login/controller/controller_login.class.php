<?php

    class controller_login {
        function view() {
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login.html');
        }

        function validate_register() {
            echo json_encode(common::load_model('login_model', 'validate_register', $_POST));
        }

        function register() {
            echo json_encode(common::load_model('login_model', 'register', $_POST));
        }
        
        function verifyRegister() {
            include "utils/mail.inc.php";
            $tokenEmail = common::load_model('login_model', 'get_tokenEmail', $_POST['email']);
            echo json_encode(Mail::verify($_POST['name'], $_POST['email'], json_encode($tokenEmail[0]['token_email'])));
        }

        function recoverEmail() {
            include "utils/mail.inc.php";
            $tokenEmail = common::load_model('login_model', 'get_tokenEmail', $_POST['email']);
            echo json_encode(Mail::recoverPasswd($_POST['email'], json_encode($tokenEmail[0]['token_email'])));
        }

        function checkEmail() {
            echo json_encode(common::load_model('login_model', 'check_email', $_POST['email']));
        }

        function recoverPasswd() {
            echo json_encode(common::load_model('login_model', 'recoverPasswd', $_POST));
        }
            
        function changeStatusUser() {
            echo json_encode(common::load_model('login_model', 'set_statusUser', $_POST['token_email']));
        }
        
        function validate_login() {
            echo json_encode(common::load_model('login_model', 'validate_login', $_POST));
        }

        function login() {
            echo json_encode(common::load_model('login_model', 'login', $_POST['name']));
        }
        
        function data_user() {
            echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
        }

        function logout() {
            echo json_encode(common::load_model('login_model', 'logout'));
        }

        function controll_user() {
            echo json_encode(common::load_model('login_model', 'controll_user'));
        }

        function activity() {
            echo json_encode(common::load_model('login_model', 'activity'));
        }

    }
?>