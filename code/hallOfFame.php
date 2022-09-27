<?php


//Comprovamos si existe algo en el formulario de la pagina anterior
if (isset($_GET["players"])) {
    $players = json_decode($_GET["players"], true);
} else {
    $players = [];
}

if (isset($_GET["scores"])) {
    $scores = json_decode($_GET["scores"], true);
} else {
    $scores = [];
}
if (isset($_GET["timers"])) {
    $timers = json_decode($_GET["timers"],true);
} else {
    $timers = [];
}

/////////////////////////////////////////////////////////////////
//Detector de si se refresca la pagina, si se refresca los valores que se mandan del formulario anterior se resetean
$pageWasRefreshed = isset($_SERVER['HTTP_CACHE_CONTROL']) && $_SERVER['HTTP_CACHE_CONTROL'] === 'max-age=0';

if($pageWasRefreshed ) {
    $timers = [];
    $scores = [];
    $players = [];
} 
/////////////////////////////////////////////////////////////////
//Si un jugador ha sacado una puntuacion superior a su partida anterior, la puntuacion se actualiza
for ($i = 0; $i < count($players); $i++) {
    for ($j = 0; $j < count($players); $j++) {

        if ($players[$i] == $players[$j]) {
            if ($scores[$i] > $scores[$j]) {
                $scores[$j] = $scores[$i];
            } elseif ($scores[$j] > $scores[$i]) {
                $scores[$i] = $scores[$j];
            }
        }
    }
}



/////////////////////////////////////////////////////////////////
//Creamos una array multidimensional asociativa y montamos los nombres, tiempos y puntuacion de cada jugador
$table = array();

for ($i = 0; $i < count($players); $i++) {
    $table[$i] = array("name" => "Jugador " . $players[$i], "time" => formatTime($timers[$i]), "score" => $scores[$i] . " Puntos");
}

/////////////////////////////////////////////////////////////////

//ordenamos el array para que muestre la puntuación de la mas alta a la mas pequeña
array_multisort(array_map(function ($element) {
    return $element["score"];
}, $table), SORT_DESC, $table);

/////////////////////////////////////////////////////////////////
//Donde se crea y actualiza la cookie y guardamos los valores de $table
if (isset($_COOKIE["table"])) {

    $table_cookie = json_decode($_COOKIE["table"], true);

    
      for ($i = 0; $i < count($table_cookie); $i++) {
            array_push($table, $table_cookie[$i]);
        }

        setcookie("table", json_encode($table), strtotime("+1 days"));  
    
} else {
    setcookie("table", json_encode($table),strtotime("+1 days"));
}

/////////////////////////////////////////////////////////////////

//Formatea el tiempo de seguandos a minutos y segundos
function formatTime($ss)
{

    $s = $ss % 60;
    if ($s < 10) {
        $s = "0" . $s;
    }
    $m = floor(($ss % 3600) / 60);
    if ($m < 10) {
        $m = "0" . $m;
    }

    return $m . ":" . $s;
}
/////////////////////////////////////////////////////////////////
//Creamos la tabla para el html
function buildTable($table)
{
    foreach ($table as $player) {
        echo "<tr><td>" . $player['name'] . "</td><td>" . $player['time'] . "</td><td class=\"score\">" . $player['score'] . "</td></tr>";
    }
}
/////////////////////////////////////////////////////////////////
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="score.css">
</head>

<body>
    
    <div class="top">
        <div class="logo">
            <img src="../images/fame_title.png" alt="" srcset="">
        </div>
    </div>
    <div class="middle">
        <div class="table">
            <table>
                <?php buildTable($table) ?>
            </table>
        </div>
    </div>
    <div class="bottom">
        <form action="formulario.html">
            <button type="submit">VOLVER AL MENU</button>
        </form>
    </div>
</body>

</html>