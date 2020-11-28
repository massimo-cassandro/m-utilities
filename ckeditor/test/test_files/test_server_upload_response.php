<?php
/*

Esempio di uploader PHP lato server

L'applicazione riceve la variabile $_FILES contenente il file caricato:

  $_FILES = Array
  (
      [upload] => Array
          (
              [name] => 0005007.jpg
              [type] => image/jpeg
              [tmp_name] => /Applications/MAMP/tmp/php/php64Ig2V
              [error] => 0
              [size] => 60100
          )

  )


Provvede alla sua registrazione e restituisce un json contentenente l'id del file registrato
e la larghezza dell'immagine:

  {
    "id":7365,
    "width":1067
  }

L'adapter ADA provede quindi a generare un url che utilizzi il viewer ADA e visualizza l'immagine.

A scopo di demo, l'adapter ada accetta anche un json di questo tipo (utilizzato in questo script):

  {
    demo: base_64_string
  }

In sostanza, l'immagine caricata viene convertita in base 64 e restituita all'uplaoder per la visualizzazione
senza che nulla sia salvato su disco


*/

$type = $_FILES['upload']['type'];
$data = file_get_contents($_FILES['upload']['tmp_name']);
echo json_encode(
  array(
    'demo' => 'data:' . $type . ';base64,' . base64_encode($data)
  )
);
