<?php

    class controller_search {
        // function view() {
        //     common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        // }

        function list_info_search() {
            // echo "aa";
            echo json_encode(common::load_model('search_model', 'get_list_info_search'));
        }

        function autocomplete() {
            echo json_encode(common::load_model('search_model', 'get_autocomplete', $_POST['city']));
        }

    }
?>