<?php

require_once __DIR__ . '/config.php';

$con = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysql_error());

//TimeZone 
    $query = "SET SESSION time_zone = '+5:30'";
	mysqli_query($con,$query);
	mysqli_query($con,'SET CHARACTER SET utf8'); //Set Character set to UTF 8 for Unicode support
?>