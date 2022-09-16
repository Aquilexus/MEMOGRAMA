<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>


<body>
    
    <div id="top">
        <!--<div id="timer">
            <h2 id="countdown"></h2>
        </div>-->
        <img id="title" src="../images/logo.png" alt="">
    </div>
    
    <div id="nav">

    </div>
    <div class="main">
        <div id="player_score">

            <!--Aquí es donde se generan los bloques con el nombre y puntuacion de los jugadores-->
            <?php

            $cant_players = $_GET["players_cant"];
            $nom1 = $_GET["nom1"];
            echo "<div id=\"p1\">";
            echo "<h2 id=\"name1\">" . $nom1 . "<h2 id=\"score1\">0</h2></h2>";
            echo "</div>";



            if ($cant_players >= 2) {
                $nom2 = $_GET["nom2"];
                echo "<div id=\"p2\">";
                echo "<h2 id=\"name2\">" . $nom2 . "<h2 id=\"score2\">0</h2></h2>";
                echo   "</div>";
            }
            if ($cant_players >= 3) {
                $nom3 = $_GET["nom3"];
                echo "<div id=\"p3\">";
                echo "<h2 id=\"name3\">" . $nom3 . "<h2 id=\"score3\">0</h2></h2>";
                echo "</div>";
            }
            if ($cant_players == 4) {
                $nom4 = $_GET["nom4"];
                echo "<div id=\"p4\">";
                echo "<h2 id=\"name4\">" . $nom4 . "<h2 id=\"score4\">0</h2></h2>";
                echo  "</div>";
            }





            ?>
        </div>
    <div id="middle">


       
        <script type="text/javascript">
            var num_players ="<?php echo $cant_players ?>";
            setTurn(<?php echo $cant_players ?>)
            turn_rotation();
        </script>
        <script src="script.js"></script>



        <!--Codigo PHP para repartir las cartas-->
        <?php


        $x = $_GET["x"];
        $y = $_GET["y"];

        //En caso de si algunas de las variables sobre el tamaño de la tabla del juego son nulos los iniciamos por defecto
        if ($x == null) {
            $x = 2;
        }
        if ($y == null) {
            $y = 2;
        }

        //Asignamos las figuras
        $characters = array("Fischl", "Bennett", "Keqing", "Lisa", "Mona", "Ningguang", "Noelle", "Sucrose", "Venti", "Xiangling", "Xingqiu", "Beidou");
        //Nos servira para duplicar las figuras
        $characters_duplicate = array();


        //Crear un segundo array y duplicar valores ej: 1,1,2,2,3,3 etc
        $contador = 0;
        for ($i = 0; $i < ($x * $y) / 2; $i++) {

            for ($j = 0; $j < 2; $j++) {

                //Para poder diferenciar las cartas con la misma figura, a la segunda carta le añadimos el prefijo _dup
                if ($j == 0) {
                    $characters_duplicate[$contador] = $characters[$i];
                } else {
                    $characters_duplicate[$contador] = $characters[$i] . "_dup";
                }

                $contador++;
            }
        }

        //Mezclamos los personajes para que salgan en desorden en las cartas
        shuffle($characters_duplicate);





        //Condicion para saber si las cartas son divisibles por 2
        if (($x * $y) % 2 == 0) {

            
            echo "<div id=\"main\">";
            echo "<table id=\"board\">";


            //Creamos una tabla con los valores "x" y "y" definido por el cliente
            $contador_posicion = 0;
            for ($i = 0; $i < $y; $i++) {
                echo "<tr>";
                for ($j = 0; $j < $x; $j++) {
                    //Se asignan las imagenes
                    echo "<td><img class=\"flipped\" id=\"" . $characters_duplicate[$contador_posicion] . "\" src=\"../images/card back.png\" onclick=\"flip(this.id)\" width=\"100px\" height=\"170\"></td>";
                    $contador_posicion++;
                }
                echo "</tr>";
            }

            echo "</table>";
            echo "</div>";
        } else {
            echo "<h2>" . "La cantidad de cartas debe de ser divisible por 2" . "</h2>";
        }

        ?>
        <script type="text/javascript">
            var characters_available ="<?php echo ($x*$y)/2 ?>";
        </script>
        <script>
        setTime(<?php echo $_GET["time"] ?>)
        timer();
    </script>
    </div>
    </div>
     
    <div id="bottom">
        <div id="buttons">
        </div>

    </div>
</body>

</html>