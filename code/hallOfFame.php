<?php

    if (isset($_POST["test"])) {
        $score = $_POST["test"];
    echo($score);
    }
    

/*
    $jugador = [];


    if (isset($_COOKIE['jugador'])) {
        $players = json_decode($_COOKIE['players']);
        for ($i=0; $i < count($players); $i++) { 
            array_push($jugador,$players[$i]);
            echo $players[$i];
        }
        setcookie("jugador",json_encode($jugador));
    }else{
        $players = json_decode($_COOKIE['players']);
        //$jugador = [];
        for ($i=0; $i < count($players); $i++) { 
            array_push($jugador,$players[$i]);
        }
        setcookie("jugador",json_encode($jugador));
    }




    $scores = [];
    if (isset($_COOKIE['score'])) {
        
    for ($i=0; $i < count($players); $i++) { 
        $score = json_decode($_COOKIE['score'.$i]);
        array_push($scores,$score);
    }
    }
    */
    
    //$table = array_combine($players,$scores);
    //arsort($table);







function buildTable(){
    
    global $table;
    
    foreach ($table as $player => $score) {
        echo "<tr>";
        echo "<td>";
        echo $player;
        echo "</td>";
        echo "<td class=\"score\">";
        echo $score;
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
                    <?php //buildTable()?>
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
