<?php
/*
ini_set("display_errors", "1");
ini_set("display_startup_errors", "1");
error_reporting(E_ALL);
*/
header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
header("Access-Control-Allow-Credentials: true");

require_once("Parsedown.php");

$title = $_GET["title"] ?? "Untitled";
$postdata = file_get_contents("php://input");

$Parsedown = new Parsedown();
$body = $Parsedown->text($postdata);

$css = file_get_contents("style.css");
$filename = md5($title).".html";

$template = <<<TEMPLATE
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title</title>
    <style>$css</style>
</head>
<body>
    <h1>$title</h1>
    <hr>
    $body
</body>
</html>
TEMPLATE;

file_put_contents($filename, $template);
$selfUrl = str_replace("obsidian.php", "", $_SERVER["SCRIPT_URI"]);
echo $selfUrl.$filename;
?>
