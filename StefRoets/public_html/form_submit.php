<?php
if($_POST){$
    $name = $_POST['input-6-0'];
    $email = $_POST['input-6-1'];
    $message = $_POST['input-5-0'] . "\nTelefoonnummer: " . $_POST['input-6-2'];
    $headers = 'From: ' . $email . "\r\n" ;
    $to = "info@stefroets.be";
    $subject = "Contactaanvraag van " . $_POST['input-6-0'];


//send email
    mail($to, $subject, $message, $headers);
}
?>
