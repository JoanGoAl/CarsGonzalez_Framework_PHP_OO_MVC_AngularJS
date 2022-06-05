<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    $path = $_SERVER["DOCUMENT_ROOT"] . '/CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS/';
    require $path . '/backend/vendor/autoload.php';
    
    class Mail {
        public static function contactMail($nombre, $emailContacto, $message) {

            $mail = new PHPMailer(true);
            $smtpInfo = parse_ini_file('phpMailer.ini', true);

            try {
                $mail->isSMTP();
                $mail->SMTPAuth     = true;
                $mail->SMTPSecure   = 'tls';
                $mail->Host         = $smtpInfo["SMTP"]["host"];
                $mail->Port         = 587;
                $mail->Username     = $smtpInfo["SMTP"]["username"];
                $mail->Password     = $smtpInfo["SMTP"]["passwd"];
                
                $mail->setFrom($emailContacto, $nombre);
                $mail->addAddress($smtpInfo["SMTP"]["toAddress"], 'Joan González');
                $mail->addReplyTo($emailContacto);
                
                $mail->isHTML(true);
                $mail->Subject      = "Contact US: " . $nombre;
                $mail->Body         = $message;
                
                $mail->send();

                return "Mensaje enviado";
            } catch (Exception $e) {
                return "Message could not be sent. Mail error: {$mail->ErrorInfo}";
            }
        
        }
    
        public static function verify($nombre, $emailVerify, $tokenEmail) {
            $tokenEmail = str_replace('"', '', $tokenEmail);
            $mail = new PHPMailer(true);
            $smtpInfo = parse_ini_file('phpMailer.ini', true);

            try {
                $mail->isSMTP();
                $mail->SMTPAuth     = true;
                $mail->SMTPSecure   = 'tls';
                $mail->Host         = $smtpInfo["SMTP"]["host"];
                $mail->Port         = 587;
                $mail->Username     = $smtpInfo["SMTP"]["username"];
                $mail->Password     = $smtpInfo["SMTP"]["passwd"];
                
                $mail->setFrom('carsgonzales@verify.com', 'Verify');
                $mail->addAddress($emailVerify, $nombre);
                    
                $mail->isHTML(true);
                $mail->Subject      = "CarsGonzalez -> Verify: " . $nombre;
                $mail->Body         = 'Para verificar el usuario: ' . $nombre . ' Pulse aqui: ' . 'http://localhost/CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS/#/verify/' . $tokenEmail;
                
                $mail->send();

                return "Mensaje enviado";
            } catch (Exception $e) {
                return "Message could not be sent. Mail error: {$mail->ErrorInfo}";
            }
        }

        public static function recoverPasswd($email, $tokenEmail) {
            $tokenEmail = str_replace('"', '', $tokenEmail);
            $mail = new PHPMailer(true);
            $smtpInfo = parse_ini_file('phpMailer.ini', true);

            try {
                $mail->isSMTP();
                $mail->SMTPAuth     = true;
                $mail->SMTPSecure   = 'tls';
                $mail->Host         = $smtpInfo["SMTP"]["host"];
                $mail->Port         = 587;
                $mail->Username     = $smtpInfo["SMTP"]["username"];
                $mail->Password     = $smtpInfo["SMTP"]["passwd"];
                
                $mail->setFrom('carsgonzales@recover.com', 'Recover');
                $mail->addAddress($email);
                    
                $mail->isHTML(true);
                $mail->Subject      = "CarsGonzalez -> Recover: $email";
                $mail->Body         = 'Recover password email: ' . $email . ' Pulse aqui: ' . 'http://localhost/CarsGonzalez&Framework/CarsGonzalez_Framework_PHP_OO_MVC_AngularJS/#/changepw/' . $tokenEmail;
                
                $mail->send();

                return "Mensaje enviado";
            } catch (Exception $e) {
                return "Message could not be sent. Mail error: {$mail->ErrorInfo}";
            }
        }
    }
    
    ?>
