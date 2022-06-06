<?php
    class login_bll {
        private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this -> db = db::getInstance();
		}

        public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        public function validate_register_BLL($data) {
            return $this -> dao -> select_validate_register($this -> db, $data);
        }

        public function register_BLL($data) {
            return $this -> dao -> insert_register($this -> db, $data);
        }

		public function login_BLL($name) {
			$res = $this -> dao -> select_login($this -> db, $name);
			return jwt_process::encode($res[0]['name_user']);
		}

		public function data_user_BLL($token) {
			$json = json_decode(jwt_process::decode($token), TRUE);
			return $this -> dao -> select_data_user($this -> db, $json)[0];
		}

		public function logout_BLL() {
			return $this -> dao -> do_logout();
		}

		public function validate_login_BLL($data) {
			return $this -> dao -> select_validate_login($this -> db, $data);
		}

		public function get_tokenEmail_BLL($email) {
			return $this -> dao -> select_tokenEmail($this -> db, $email);
		}

		public function set_statusUser_BLL($token_email) {
			return $this -> dao -> update_statusUser($this -> db, $token_email);
		}

		public function recoverPasswd_BLL($data) {
			return $this -> dao -> update_recoverPasswd($this -> db, $data);
		}

		public function check_email_BLL($email)	{
			return $this -> dao -> select_check_email($this -> db, $email);
		}
    }

?>