<?php

header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

if(!isset($_GET['converter'])||!isset($_GET['text'])) exit("0");

$converter = $_GET['converter'];
$text = $_GET['text'];

$api_url = "https://api.zhconvert.org/convert?converter=$converter&text=$text";

// Read JSON file
$json_data = file_get_contents($api_url);
// Decode JSON data into PHP array
$json_decode_data = json_decode($json_data);
$response_data = json_encode($json_decode_data,JSON_UNESCAPED_UNICODE);
exit($response_data);

?>