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
                // Server Site
                $mail->isSMTP();
                // $mail->SMTPDebug    = 2;
                $mail->SMTPAuth     = true;
                $mail->SMTPSecure   = 'tls';
                $mail->Host         = $smtpInfo["SMTP"]["host"];
                $mail->Port         = 587;
                $mail->Username     = $smtpInfo["SMTP"]["username"];
                $mail->Password     = $smtpInfo["SMTP"]["passwd"];
                
                // Recipient
                $mail->setFrom($emailContacto, $nombre);
                $mail->addAddress($smtpInfo["SMTP"]["toAddress"], 'Joan González');
                $mail->addReplyTo($emailContacto);
                
                
                // Content
                $mail->isHTML(true);
                $mail->Subject      = "Contact US: " . $nombre;
                $mail->Body         = $message;
                
                $mail->send();

                return "Mensaje enviado";
            } catch (Exception $e) {
                return "Message could not be sent. Mail error: {$mail->ErrorInfo}";
            }
        
        }
    
        public static function verify($nombre, $emailVerify) {
            $mail = new PHPMailer(true);
            $smtpInfo = parse_ini_file('phpMailer.ini', true);

            try {
                // Server Site
                $mail->isSMTP();
                // $mail->SMTPDebug    = 2;
                $mail->SMTPAuth     = true;
                $mail->SMTPSecure   = 'tls';
                $mail->Host         = $smtpInfo["SMTP"]["host"];
                $mail->Port         = 587;
                $mail->Username     = $smtpInfo["SMTP"]["username"];
                $mail->Password     = $smtpInfo["SMTP"]["passwd"];
                
                // Recipient
                $mail->setFrom($emailVerify, 'Verify');
                $mail->addAddress('carsgonzales@verify.com', 'Joan González');
                // $mail->addReplyTo($emailVerify);
                    
                
                // Content
                $mail->isHTML(true);
                $mail->Subject      = "Contact US: " . $nombre;
                $mail->Body         = 'Este es el mensaje de verificacion';
                
                $mail->send();

                return "Mensaje enviado";
            } catch (Exception $e) {
                return "Message could not be sent. Mail error: {$mail->ErrorInfo}";
            }
        }

    }

    // Mail::contactMail("Moises", "gfmois@gmail.com", "Primer mensaje de prueba");
    ?>
