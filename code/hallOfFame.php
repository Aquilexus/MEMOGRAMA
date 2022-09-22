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
    $timers = json_decode($_GET["timers"]);
} else {
    $timers = [];
}


//Actualizamos las cookies, si es la primera vez que accedemos a esta pagina, creamos la cookie
/*
if (isset($_COOKIE["scores"])) {
    $cookie_scores = json_decode($_COOKIE["scores"], true);
    for ($i = 0; $i < count($cookie_scores); $i++) {
        array_push($scores, $cookie_scores[$i]);
    }
    $json = json_encode($scores);
    setcookie("scores", $json);
} else {
    $json = json_encode($scores);
    setcookie("scores", $json);
}

if (isset($_COOKIE["players"])) {
    $cookie_players = json_decode($_COOKIE["players"], true);
    for ($i = 0; $i < count($cookie_players); $i++) {
        array_push($players, $cookie_players[$i]);
    }
    $json = json_encode($players);
    setcookie("players", $json);
} else {
    $json = json_encode($players);
    setcookie("players", $json);
}
*/




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

$table = array();

for ($i = 0; $i < count($players); $i++) {
    $table[$i] = array("Jugador " . $players[$i],formatTime($timers[$i]),$scores[$i] . " Puntos");
}



if (isset($_COOKIE["table"])) {
    $table_cookie = json_decode($_COOKIE["table"],true);
    
    for ($i=0; $i < count($table_cookie); $i++) { 
        array_push($table,$table_cookie[$i]);
    }
    if (count(array_diff($table,$table_cookie)) != null) {
       setcookie("table",json_encode($table));
    }
    
}else{
    setcookie("table",json_encode($table));
}

/////////////////////////////////////////////////////////////////

function formatTime($ss)
{

    $s = $ss % 60;
    if ($s < 10) {
        $s = "0".$s;
    }
    $m = floor(($ss % 3600) / 60);
    if ($m < 10) {
        $m = "0".$m;
    }

    return $m.":".$s;
}

//Creamos la tabla para el html
function buildTable($table, $first_dim, $second_dim)
{


    for ($i = 0; $i < $first_dim; $i++) {
        echo "<tr>";
        for ($j = 0; $j < $second_dim; $j++) {



            echo "<td>";
            echo $table[$i][$j];
            echo "</td>";
        }
        echo "</tr>";
    }
}
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
                <?php buildTable($table, count($table), 3) ?>
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