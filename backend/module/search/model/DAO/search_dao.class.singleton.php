<?php
    class search_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_info_search($db) {
            $sql_Category = "SELECT c.id_category, c.name_category
                        FROM category c";

            $sql_Brand = "SELECT b.id_brand, b.name_brand
                        FROM brand b";

            $stmtCategory = $db -> ejecutar($sql_Category);
            $stmtBrand = $db -> ejecutar($sql_Brand);

            $array = array(
                0 => $db -> listar($stmtCategory),
                1 => $db -> listar($stmtBrand)
            );

            return $array;
        }

        public function select_data_autocomplete($db, $city) {
            $sql = "SELECT DISTINCT c.city
                FROM car c
                WHERE c.city LIKE '" . $city . "%'";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>