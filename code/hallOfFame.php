<?php


//Comprovamos si existe algo en el formulario de la pagina anterior
    if (isset($_GET["players"])) {
         $players = json_decode($_GET["players"],true);
    }else{
        $players=[];
    }
   
    if (isset($_GET["scores"])) {
        $scores = json_decode($_GET["scores"],true);
   }else{
       $scores=[];
   }
    
    
   //Actualizamos las cookies, si es la primera vez que accedemos a esta pagina, creamos la cookie
    if (isset($_COOKIE["scores"])) {
        $cookie_scores = json_decode($_COOKIE["scores"],true);
        for ($i=0; $i < count($cookie_scores); $i++) { 
            array_push($scores,$cookie_scores[$i]);
        }
        $json = json_encode($scores);
        setcookie("scores",$json);
    }else {
        $json = json_encode($scores);
        setcookie("scores",$json);
    }

    if (isset($_COOKIE["players"])) {
        $cookie_players = json_decode($_COOKIE["players"],true);
        for ($i=0; $i < count($cookie_players); $i++) { 
            array_push($players,$cookie_players[$i]);
        }
        $json = json_encode($players);
        setcookie("players",$json);
    }else {
        $json = json_encode($players);
        setcookie("players",$json);
    }


    //Si un jugador ha sacado una puntuacion superior a su partida anterior, la puntuacion se actualiza
    for ($i=0; $i < count($players); $i++) { 
        for ($j=0; $j < count($players); $j++) { 
            
            if ($players[$i]==$players[$j]) {
                if ($scores[$i]>$scores[$j]) {
                    $scores[$j]=$scores[$i];
                }elseif ($scores[$j]>$scores[$i]) {
                    $scores[$i]=$scores[$j];
                }
            }
        }
    }

   
    //Combinamos en una tabla asociativa los jugadores con su puntuacion
    $table = array_combine($players,$scores);
    //Organizamos la tabla por la puntuacion mas alta
    arsort($table);


//Creamos la tabla para el html
function buildTable($table){
    
    
    
    foreach ($table as $player => $score) {
        echo "<tr>";
        echo "<td>";
        echo "Jugador: ".$player;
        echo "</td>";
        echo "<td class=\"score\">";
        echo $score." Puntos";
        echo "</td>";
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
            <div class= "logo">
                <img src="../images/fame_title.png" alt="" srcset="">
            </div>
        </div>
        <div class="middle">
            <div class="table">
                <table>
                    <?php buildTable($table)?>
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
