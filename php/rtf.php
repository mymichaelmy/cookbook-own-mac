<?php
header("Content-type: text/rtf ");

$title=$_GET["title"];
header("Content-Disposition: attachment;Filename=rtf.rtf");


$string1 = $_GET["content"];
echo "{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}
{\\colortbl ;\\red0\\green0\\blue255;}
{\\*\\generator Msftedit 5.41.21.2509;}\\viewkind4\\uc1\\pard\\sa200\\sl276\\slmult1\\lang9\\f0\\fs22\\f0\\fs22" . "{" . $string1 . "}}"; 

?>