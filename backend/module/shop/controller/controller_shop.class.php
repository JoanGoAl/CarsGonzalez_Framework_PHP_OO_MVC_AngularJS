<?php

    class controller_shop {
        function view() {
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function list_cars() {
            echo json_encode(common::load_model('shop_model', 'get_cars'));
        }

        function filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters', $_POST));
        }

        function details_car() {
            echo json_encode(common::load_model('shop_model', 'get_details_car', $_POST));
        }

        function brands_and_model() {
            echo json_encode(common::load_model('shop_model', 'get_brands_and_model'));
        }

        function location() {
            echo json_encode(common::load_model('shop_model', 'get_location'));
        }

        function car_visited() {
            echo json_encode(common::load_model('shop_model', 'get_car_visited', $_POST));
        }

        function related_cars() {
            echo json_encode(common::load_model('shop_model', 'get_related_cars', $_POST));
        }

        function click_likes() {
            echo json_encode(common::load_model('shop_model', 'set_click_likes', $_POST));
            // echo json_encode('holaaaa');
        }

        function user_likes() {
            echo json_encode(common::load_model('shop_model', 'get_user_likes', $_POST['token']));
        }

    }
?>