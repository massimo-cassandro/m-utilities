<!DOCTYPE html>
<html lang="it">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>CKEditor test</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <link rel="stylesheet" href="./test.css">
</head>
<body>
  <div class="container">
    <h1>CKEditor Test: server side results</h1>

    <p>Contenuto variabile $_POST</p>
    <?php
      foreach($_POST as $k => $v ) {
        echo "<strong>{$k}</strong><br>";
        echo '<pre class="bg-light p-2 text-wrap">';
        echo htmlspecialchars($v);
        echo '</pre>';

        echo '<div class="border border-dark p-2 mb-4">' . $v . '</div>';
      }
    ?>

  </body>
</html>
