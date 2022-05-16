<?php

    class shop_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_cars() {
            return $this -> bll -> get_cars_BLL();
        }

        public function get_filters($args) {
            return $this -> bll -> get_filters_BLL($args);
        }

        public function get_details_car($args) {
            return $this -> bll -> get_details_car_BLL($args);
        }

        public function get_brands_and_model() {
            return $this -> bll -> get_brands_and_model_BLL();
        }

        public function get_location() {
            return $this -> bll -> get_location_BLL();
        }

        public function get_car_visited($args) {
            return $this -> bll -> get_car_visited_BLL($args);
        }

        public function get_related_cars($args) {
            return $this -> bll -> get_related_cars_BLL($args);
        }

        public function set_click_likes($data) {
            return $this -> bll -> set_click_likes_BLL($data['car'], $data['token']);
        }

        public function get_user_likes($token) {
            return $this -> bll -> get_user_likes_BLL($token);
        }
    }

?>