<?php
//Importacion de las variables
$cant_players = isset($_GET["players_cant"]) ? $_GET["players_cant"] : 1;
$players = array();
$x = isset($_GET["x"]) ? $_GET["x"] : 2;
$y = isset($_GET["y"]) ? $_GET["y"] : 2;
//Array de posibles personages
$characters = array("Fischl", "Bennett", "Keqing", "Lisa", "Mona", "Ningguang", "Noelle", "Sucrose", "Venti", "Xiangling", "Xingqiu", "Beidou");
//Array que almacenará los personajes + personajes duplicados ej: Benett, Benett_dup
$characters_duplicate = array();
//Comprovacion si existen los jugadoeres para asignar variable y añadirlo dinamicamente en el array

if (isset($_GET["nom1"])){
    $nom1=$_GET["nom1"];
    array_push($players,$nom1);
}
if (isset($_GET["nom2"])){
    $nom2=$_GET["nom2"];
    array_push($players,$nom2);
}
if (isset($_GET["nom3"])){
    $nom3=$_GET["nom3"];
    array_push($players,$nom3);
}
if (isset($_GET["nom4"])){
    $nom4=$_GET["nom4"];
    array_push($players,$nom4);
}


//Funcion para crear los divs de cada jugador  
function createPlayer(){

    global $players;

    for ($i=0; $i <count($players); $i++) { 
        echo "<div id=\"p".($i+1)."\">";
        echo "<h2 id=\"name".($i+1)."\">" .  $players[$i] . "<h2 id=\"score".($i+1)."\">0</h2></h2>";
        echo "</div>";
        
    }
}
//Funcion que duplica los nombres de $characters ej: Bennett, Bennett_dup
function duplicateCharacters(){

    global $characters_duplicate;
    global $characters;
    global $x;
    global $y;

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
}

//Crea tabla con las tarjetas ya mezcladas
function createBoard(){

    global $characters_duplicate;
    global $x;
    global $y;

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
}

function playerCookies($players){
    


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

    
}

playerCookies($players);
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
<script src="script.js"></script>
<body>
    <div id="top">
        <h2 id="cronometro"></h2><!--cronometro que cuenta el tiempo total-->
        <img id="title" src="../images/logo.png" alt="">  
    </div>
    <div class="main">
        <div id="player_score">

            <!--Aquí es donde se generan los bloques con el nombre y puntuacion de los jugadores-->
            <?php createPlayer();?>
            
        </div>
    <div id="middle">
        <!--Llamamos la funciones para repartir las cartas-->
        <?php
        duplicateCharacters();
        shuffle($characters_duplicate);
        createBoard();
        ?>
    </div>
    </div><!--Nota : si quitamos este div se descolocan los botones-->
        <div id="bottom">
            <div id="buttons">
                <form id="fame" action="hallOfFame.php" method="post">

                </form>
            </div>
        </div>
</body>
<script>
         var characters_available ="<?php echo ($x*$y)/2 ?>";
         var num_players ="<?php echo $cant_players ?>";
         setTurn(<?php echo $cant_players ?>)//Para inicializar la variable turn en JS 
         turn_rotation();//Sirve para aleatorizar la variable turn y rotar el turno de cada jugador
         setTime(<?php echo $_GET["time"] ?>)//Se inicializa la variable time que sirve determinar el tiempo de cada ronda
         timer();//Funcion para crear el timer      
    </script>
</html>