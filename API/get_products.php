<?php

//Connect to DB
include_once('../lib/dbconnect.php');
//fech items

$sql = "SELECT * FROM product
        LIMIT 10";

$result = mysqli_query($con,$sql);
$products = array();

while ( $row = mysqli_fetch_assoc($result) )
{
    $products[] = $row;
}
echo json_encode( $products );


?>