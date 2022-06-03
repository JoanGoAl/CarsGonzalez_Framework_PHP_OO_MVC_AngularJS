<?php

    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function search_name($db, $name) {
    
            $sql = "SELECT * FROM user u
                    WHERE u.name_user = '$name'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
    
        function search_email($db, $email) {    
            $sql = "SELECT * FROM user u
                    WHERE u.email_user = '$email'";
    
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_validate_register($db, $data) {

            $check_name = $this -> search_name($db, $data['name']);

            $check_email = $this -> search_email($db, $data['email']);

            if ($check_name && $check_email) {
                return "both_exist";
            } else if ($check_name){
                return "user_exist";
            } else if ($check_email){
                return "email_exist";
            } else {
                return "all_ok";
            }    
        }

        public function insert_register($db, $data) {
            $sql = "SELECT * FROM user u
            WHERE u.name_user = '".$data['name']."'";

            $res = $db -> listar($db -> ejecutar($sql));

            if (empty($res[0])) {
                empty($data['passwd']) ? $hashed_pass = null : $hashed_pass = password_hash($data['passwd'], PASSWORD_DEFAULT, ['cost' => 12]);
                empty($data['email']) ? $data['email'] = null : $data['email'] = $data['email'];


                if (array_key_exists('idUser', $data)) {
                    $idUser = $data['idUser'];
                } else {
                    $idUser = common::generate_token_secure(21);
                }

                $avatar = "https://api.multiavatar.com/". $data['name'] .".svg";

                $sql = "INSERT INTO `user`(`id_user`, `name_user`, `email_user`, `avatar_user`, `passwd_user`, `type_user`, `status_user`, `token_email`) 
                    VALUES ('". $idUser ."', '" .$data['name'] ."','" .$data['email'] ."', '$avatar','$hashed_pass','default','false', '" . common::generate_token_secure(45) . "')";

                $db -> ejecutar($sql);
                return $data['name'];
            } else {
                return "user_exist";
            }
        }

        public function select_login($db, $name) {
            $sql = "SELECT * FROM user u
                WHERE u.name_user = '$name'";
    
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_user($db, $json) {
            $sql = "SELECT u.name_user, u.email_user, u.avatar_user, u.type_user FROM user u
                WHERE u.name_user LIKE '". $json['name'] ."'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function do_logout() {
            session_unset();
            return '_logout';
        }

        public function select_validate_login($db, $data) {
            $check_name = $this -> search_name($db, $data['name']);

            if ($check_name == null) {
                return "name_not_exist";
            } else if (password_verify($data['passwd'],$check_name[0]['passwd_user']) && $check_name[0]['status_user'] == 'true') {
                return "all_ok";
            } else if ($check_name[0]['status_user'] == 'false') {
                return 'user_not_verify';
            } else if ($check_name) {
                return "passwd_not_match";
            } else {  
                return "passwd_not_match"; 
            }
        
        }
        public function select_tokenEmail($db, $email) {
            $sql = "SELECT `token_email` FROM `user` WHERE email_user = '$email'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function update_statusUser($db, $token_email) {
            $sql = "UPDATE `user` SET `status_user` = 'true' WHERE `token_email` = '$token_email'";

            $stmt = $db -> ejecutar($sql);

            if ($stmt == true) {
                return "_verify";
            } else {
                return "error";
            }

        }
    }

?>