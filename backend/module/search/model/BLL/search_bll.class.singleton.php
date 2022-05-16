<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_list_info_search_BLL() {
			return $this -> dao -> select_data_info_search($this -> db);
		}

		public function get_autocomplete_BLL($args) {
			return $this -> dao -> select_data_autocomplete($this -> db, $args);
		}
	}
?>