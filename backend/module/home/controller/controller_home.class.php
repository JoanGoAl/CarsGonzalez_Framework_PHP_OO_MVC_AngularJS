<?php

    class controller_home {
        function view() {
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }

        function list_brands() {
            echo json_encode(common::load_model('home_model', 'get_brands'));
        }

        function list_categories() {
            echo json_encode(common::load_model('home_model', 'get_categories'));
        }

        function list_bodywork() {
            echo json_encode(common::load_model('home_model', 'get_bodywork'));
        }

    }
?>