<?php


// array for JSON response
$inputJSON = file_get_contents('php://input');

$input= json_decode( $inputJSON, TRUE ); //convert JSON into array
$postdata = (array) $input; // cast (convert) the object to an array

$data = json_encode($postdata);
echo $data;

?>