<?php
header("Content-type: application/vnd.ms-word");

$title=$_GET["title"];
header("Content-Disposition: attachment;Filename=$title.doc");


$string1 = $_GET["content"];
echo "<html>";
echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
echo "<body>";
echo "<b>Collection of resources and links</b> <br /> <br />";

echo $string1;
echo "</body>";
echo "</html>";
?>