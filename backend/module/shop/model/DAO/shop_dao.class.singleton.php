<?php
    class shop_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_cars($db) {
            $sql = "SELECT *
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand
                ORDER BY c.visited DESC";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_filters($db, $opc, $order, $pag) {
            if ($order == 'price') {
                $order = "ORDER BY c.price DESC";
            } else if ($order == 'km') {
                $order = "ORDER BY c.kms DESC";
            } else {
                $order = "ORDER BY c.visited DESC";
            }
    
            if (empty($opc)) {
                $sql = "SELECT *
                    FROM brand b, model m, car c, c.lat, c.lng, c.city
                    WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand " . $order;
                    
            } else {
                $sql = "SELECT b.name_brand, m.name_model, c.price, c.id_car, c.photo_car, c.lat, c.lng, c.city 
                    FROM brand b, model m, car c 
                    WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand ";
    
                if ($opc['id_brands'] != 'Allbrand') {
                    $sql .= 'AND b.id_brand = ' . '"' . $opc['id_brands'] . '"';
                };
    
                if ($opc['id_models'] != 'Allmodels') {
                    $sql .= 'AND m.id_model = ' . '"' . $opc['id_models'] . '"';
                };
    
                if ($opc['color'] != 'Allcolors') {
                    $sql .= 'AND c.color = ' . '"' . $opc['color'] . '"';
                };
    
                if ($opc['city'] != 'Allcities') {
                    $sql .= 'AND c.city = ' . '"' . $opc['city'] . '"';
                };
    
                if ($opc['category'] != 'Allcategories') {
                    $sql .= 'AND c.id_category = ' . '"' . $opc['category'] . '"';
                }
    
                if ($opc['bodywork'] != 'Allbody') {
                    $sql .= 'AND c.id_bodywork = ' . '"' . $opc['bodywork'] . '"';
                }
    
                $sql .= $order;
    
                $sql .= ' LIMIT '. $pag .', 6';
            }
    
            if (empty($opc)) {
                $sqlcont = "SELECT COUNT(c.id_car)
                    FROM brand b, model m, car c, c.lat, c.lng, c.city
                    WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand " . $order;
            } else {
                $sqlcont = "SELECT COUNT(c.id_car) AS numofcars
                    FROM brand b, model m, car c 
                    WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand ";
    
                if ($opc['id_brands'] != 'Allbrand') {
                    $sqlcont .= 'AND b.id_brand = ' . '"' . $opc['id_brands'] . '"';
                };
    
                if ($opc['id_models'] != 'Allmodels') {
                    $sqlcont .= 'AND m.id_model = ' . '"' . $opc['id_models'] . '"';
                };
    
                if ($opc['color'] != 'Allcolors') {
                    $sqlcont .= 'AND c.color = ' . '"' . $opc['color'] . '"';
                };
    
                if ($opc['city'] != 'Allcities') {
                    $sqlcont .= 'AND c.city = ' . '"' . $opc['city'] . '"';
                };
    
                if ($opc['category'] != 'Allcategories') {
                    $sqlcont .= 'AND c.id_category = ' . '"' . $opc['category'] . '"';
                }
    
                if ($opc['bodywork'] != 'Allbody') {
                    $sqlcont .= 'AND c.id_bodywork = ' . '"' . $opc['bodywork'] . '"';
                }
    
                $sqlcont .= $order;
    
            }
            $stmt = $db -> ejecutar($sql);
            $stmtcont = $db -> ejecutar($sqlcont);

            $array = array(
                0 => $db -> listar($stmt),
                1 => $db -> listar($stmtcont)
            );

            return $array;
        }

        public function select_data_details($db, $idcar) {
            $sql_cars = "SELECT c.*, b.name_brand, m.name_model
                FROM brand b, model m, car c
                WHERE c.id_car = ". $idcar ." AND c.id_model = m.id_model AND m.id_brand = b.id_brand";
            $sql_photos = "SELECT id_photo, url_photo
                        FROM car_photo
                        WHERE id_car = ". $idcar;
            
            $stmtcar = $db -> ejecutar($sql_cars);
            $stmtphoto = $db -> ejecutar($sql_photos);

            $array = array(
                0 => $db -> listar($stmtcar),
                1 => $db -> listar($stmtphoto)
            );
            return $array;
        }

        public function select_data_brands_and_model($db) {
            $sqlbrands = "SELECT b.id_brand, b.name_brand
                FROM brand b";
        
            $sqlmodels = "SELECT m.id_model, m.name_model, m.id_brand
                    FROM model m
                    WHERE m.id_brand IN (SELECT id_brand
                                        FROM brand)";
            
            $sqlcolors = "SELECT DISTINCT color
                    FROM car";

            $stmtbrand = $db -> ejecutar($sqlbrands);
            $stmtmodel = $db -> ejecutar($sqlmodels);
            $stmtcolor = $db -> ejecutar($sqlcolors);

            $array = array(
                0 => $db -> listar($stmtbrand),
                1 => $db -> listar($stmtmodel),
                2 => $db -> listar($stmtcolor)
            );

            return $array;
        }

        public function select_data_location($db) {
            $sql = "SELECT c.id_car, b.name_brand, m.name_model, c.lat, c.lng, c.city 
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_car_visited($db, $idcar, $num) {
            $sql = "UPDATE car
                SET visited = ". $num ."
                WHERE id_car = " . $idcar;
            $db -> ejecutar($sql);
        }

        public function select_data_related_cars($db, $cat, $type, $idcar) {
            $sql = "SELECT b.name_brand, m.name_model, c.price, c.id_car, c.photo_car, c.lat, c.lng, c.city 
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand AND c.id_car <> '". $idcar ."'
                AND ( c.id_category = '". $cat ."' OR c.id_type = '". $type ."')";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function set_data_click_likes($db, $car, $name) {
            $sql = "SELECT u.id_user FROM user u
                WHERE u.name_user LIKE '". $name ."'";

            $user = $db -> listar($db -> ejecutar($sql));

            $user = $user[0]['id_user'];
            $idcar = $car['id_car'];

            $sql = "SELECT `id_user`, `id_car` FROM `likes` WHERE `id_user` = $user AND `id_car` = $idcar";

            $comp = $db -> listar($db -> ejecutar($sql));

            if (empty($comp)) {
            
                $sql = "INSERT INTO `likes`(`id_user`, `id_car`) VALUES ($user, ". $idcar .")";
                $db -> ejecutar($sql);
    
                return 'insertado';
    
            } else {
    
                $sql = "DELETE FROM `likes` WHERE `id_user` = $user AND `id_car` = $idcar";
                $db -> ejecutar($sql);

                return 'eliminado';
    
            }

        }

        public function select_data_user_likes($db, $name) {
            $sql = "SELECT u.id_user FROM user u
                WHERE u.name_user LIKE '". $name ."'";
            $user = $db -> listar($db -> ejecutar($sql));
            $user = $user[0]['id_user'];

            $sql = "SELECT * FROM `likes` WHERE `id_user` = $user";
            $res = $db -> listar($db -> ejecutar($sql));

            if (!empty($res)) {
                return $res;
            }

            return null;
        }

    }
?>