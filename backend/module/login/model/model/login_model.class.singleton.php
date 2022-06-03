<?php

    class login_model {
        private $bll;
        static $_instance;

        function __construct(){
            $this -> bll = login_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function validate_register($data) {
            return $this -> bll -> validate_register_BLL($data);
        }

        public function register($data) { 
            return $this -> bll -> register_BLL($data);
        }

        public function login($name) {
            return $this -> bll -> login_BLL($name);
        }

        public function get_data_user($token) {
            return $this -> bll -> data_user_BLL($token);
        }

        public function logout() {
            return $this -> bll -> logout_BLL();
        }

        public function validate_login($data) {
            return $this -> bll -> validate_login_BLL($data);
        }

        public function get_tokenEmail($email) {
            return $this -> bll -> get_tokenEmail_BLL($email);
        }

        public function set_statusUser($token_email) {
            return $this -> bll -> set_statusUser_BLL($token_email);
        }

    }

?>