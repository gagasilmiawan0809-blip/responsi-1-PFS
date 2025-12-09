<?php
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$database = "praktikum_fullstack";

$koneksi = mysqli_connect($servername, $username, $password, $database);

if (!$koneksi) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Koneksi gagal: " . mysqli_connect_error()]);
    exit();
}

mysqli_set_charset($koneksi, "utf8");
?>