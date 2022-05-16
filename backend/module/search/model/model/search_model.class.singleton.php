<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_list_info_search() {
            return $this -> bll -> get_list_info_search_BLL();
        }

        public function get_autocomplete($args) {
            return $this -> bll -> get_autocomplete_BLL($args);
        } 

    }
?>