<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_cars_BLL() {
			return $this -> dao -> select_data_cars($this -> db);
		}

		public function get_filters_BLL($args) {
			return $this -> dao -> select_data_filters($this -> db, $args["data"], $args["pos"], $args["pagination"]);
		}

		public function get_details_car_BLL($args) {
			return $this -> dao -> select_data_details($this -> db, $args["idcar"]);
		}

        public function get_brands_and_model_BLL() {
			return $this -> dao -> select_data_brands_and_model($this -> db);
		}

		public function get_location_BLL() {
			return $this -> dao -> select_data_location($this -> db);
		}

		public function get_car_visited_BLL($args) {
			return $this -> dao -> select_data_car_visited($this -> db, $args['idcar'], $args['num']);
		}

        public function get_related_cars_BLL($args) {
			return $this -> dao -> select_data_related_cars($this -> db, $args["cat"], $args["type"], $args["idcar"]);
		}

		public function set_click_likes_BLL($car, $token) {
			$json = json_decode(jwt_process::decode($token), TRUE);
			return $this -> dao -> set_data_click_likes($this -> db, $car, $json['name']);
		}

		public function get_user_likes_BLL($token) {
			$json = json_decode(jwt_process::decode($token), TRUE);
			return $this -> dao -> select_data_user_likes($this -> db, $json['name']);
		}

	}
?>