<?php

if (isset($_POST['submit'])) {
  $name = $_POST['name'];
  $subject = $_POST['subject'];
  $mailFrom = $_POST['mail'];
  $message = $_POST['message'];

  $mainTo = "blake-berringer@uiowa.edu";
  $headers = "From: ".$mailFrom;
  $txt = "Website Email from ".$name ".\n\n".$message;

  mail($mainTo, $subject, $txt, $headers)
  header("Location: index.php?mailsend");
}
