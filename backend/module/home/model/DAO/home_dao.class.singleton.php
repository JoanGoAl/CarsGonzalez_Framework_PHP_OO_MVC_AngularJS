<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_brands($db) {
            $sql = "SELECT * FROM brand";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_categories($db) {
            $sql = "SELECT * FROM category";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_bodywork($db) {
            $sql = "SELECT * FROM bodywork";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>