<?php
if($_POST){
    $name = $_POST['input-6-0'];
    $email = $_POST['input-6-1'];
    $message = $_POST['input-6-2'];

//send email
    mail("jentevandenreyt@outlook.com", "This is an email from:" .$email, $message);
}
?>