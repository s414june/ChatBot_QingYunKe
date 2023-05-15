<?php

header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

if(!isset($_GET['key'])||!isset($_GET['msg'])) exit("0");

$key = $_GET['key'];
$msg = $_GET['msg'];

$api_url = "http://api.qingyunke.com/api.php?key=$key&msg=$msg";

// Read JSON file
$json_data = file_get_contents($api_url);
// Decode JSON data into PHP array
$json_decode_data = json_decode($json_data);
$response_data = json_encode($json_decode_data,JSON_UNESCAPED_UNICODE);
exit($response_data);

?>