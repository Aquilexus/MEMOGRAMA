

//alert("Fet per en \"Paul Soual\" 2n de DAW");




var time;
var time_saved;

const characters = ["Fischl", "Bennett", "Keqing", "Lisa", "Mona", "Ningguang", "Noelle", "Sucrose", "Venti", "Xiangling", "Xingqiu", "Beidou"];

var card1 = "";
var card2 = "";
var turn = 1;

var isPoint = false;
//var num_players;
var p1_score = 0;
var p2_score = 0;
var p3_score = 0;
var p4_score = 0;


var cards_found = [];
var counter_cards_found = 0;

var state_card1;
var state_card2;

var game_ended=false;


function setTime(time){
this.time = time;
this.time_saved = time;
}

function timer() {

    if (time_saved != 0 ) {
        var top = document.getElementById("nav");
        var div=document.createElement("div");
        div.id = "timer";
        top.prepend(div);

        var div1=document.getElementById("timer");
        var h2=document.createElement("h2");
        h2.id="countdown";
        div1.appendChild(h2);

        setInterval(countdown, 1000);
    }
     

    function countdown() {
        if (game_ended) {
            clearInterval(countdown());
        }
        var time_div = document.getElementById("countdown");
        time_div.innerHTML = "";
        
        if (time < 0) {
            time = this.time_saved;
            turn++
            resetCards();
            turn_rotation();
        }
        

        time_div.innerHTML = time;
        time--;


    }
}

function resetCards(){
    var cards = document.getElementsByClassName("flipped");

    for (let i = 0; i < cards.length; i++) {
        
        var card = cards[i];
        card.src="../images/card back.png";
    }
    this.card1="";
    this.card2="";
    enableClick();
}

function setTurn(num_of_players){
   turn = Math.floor(Math.random() * num_of_players+1);
}

//Esta funcion hace repetir la rotacion de cada jugador 
function turn_rotation() {
    if (turn > num_players) {
        turn = 1;
    }


    for (let i = 1; i <= num_players; i++) {
        var bg = document.getElementById("name" + i);

        if (i == turn) {
            bg.style.fontWeight = "900";
            bg.style.webkitTextStrokeWidth = "1px";
            bg.style.webkitTextStrokeColor = "white"
            time = this.time_saved;
        } else {
            bg.style.fontWeight = "normal";
            bg.style.webkitTextStrokeWidth = "0px";
        }

    }

}

function updateScore() {

    //Segun el turno de cada jugador si hay punto se le asigna el punto al jugador correspondiente
    switch (turn) {
        case 1: p1_score++;
            var score = document.getElementById("score1");
            score.innerText = "";
            score.innerText = p1_score;

            break;
        case 2: p2_score++;
            var score = document.getElementById("score2");
            score.innerText = "";
            score.innerText = p2_score;

            break;
        case 3: p3_score++;
            var score = document.getElementById("score3");
            score.innerText = "";
            score.innerText = p3_score;

            break;
        case 4: p4_score++;
            var score = document.getElementById("score4");
            score.innerText = "";
            score.innerText = p4_score;

            break;


    }




}


//Esta funcion es para el formulario lo qu hace es generar imputs para los jugadores en funcion del valor que retorna el select
function set_PlayerName(cant) {

    num_players = cant;

    var div = document.getElementById("player_names");
    div.innerHTML = "";

    for (let i = 0; i < cant; i++) {

        if (i == 2) {
            var br1 = document.createElement("br");
            div.appendChild(br1);
            var br2 = document.createElement("br");
            div.appendChild(br2);
        }

        var input = document.createElement("input");
        input.type = "text";
        input.id = "Jugador_" + i;
        input.className = "Player_nameField";
        input.name = "nom" + (i + 1);
        input.maxLength = "13"
        input.required = true;
        input.required;

        div.appendChild(input);
    }

    for (let i = 0; i < cant; i++) {
        document.getElementById("Jugador_" + i).placeholder = "Jugador " + (i + 1);

    }

}


//Funcion que lo que hace es cambiar la imagen de la carta por el personage correspondiente segun su id
function flip(nombre) {



    var flip_sound = new Audio("../sound/Card-flip-sound-effect.mp3")


    //Esta parte compara la id de la imagen con la lista de personajes disponibles, una vez que encuentra correspondencia
    //Le asigna la imagen del personage correspondiente de la id
    let i = 0;
    var found = false;//Condicion para salir del bucle una vez encuentre correspondencia
    while ((i < characters.length) && (!found)) {

        //Si la id incluye un nombrer de la lista de caracteres (porque hay id's que contienen la extension _dup ej: pepito_dup)
        if (nombre.includes(characters[i])) {
            var state_card = document.getElementById(nombre);
            document.getElementById(nombre).src = "../images/" + characters[i] + ".png";
            flip_sound.play();
            found = true;
        }
        else i++;
    }
    /////////////////////////////////


    //Esta parte esta para guardar valores de las 2 cartas (cada 2 clicks), una vez tenemos las 2 cartas las comparamos
    if (card1 == "") {
        card1 = nombre;
        state_card1 = state_card;
        //Cada vez que le damos click a una carta desactivamos el evento 
        state_card1.removeAttribute("onclick");
    } else {
        state_card2 = state_card;
        state_card2.removeAttribute("onclick")
        card2 = nombre;
        setTimeout(check_cards, 500);
        setTimeout(check_ended, 1000);
        removeClick();


    }


}

function check_cards() {

    var card1_dup = false;
    var card2_dup = false;



    //Verificamos si una de las cartas contiene el nombre _dup y lo quitamos para comparar el nombre
    if (card1.includes("_dup")) {
        card1_dup = true;
        card1 = card1.replace("_dup", "");
    } else if (card2.includes("_dup")) {
        card2_dup = true;
        card2 = card2.replace("_dup", "");
    }

    //comprobamos el nombre de las cartas, si no son iguales se le vuelve a asignar el nombre _dup y se vuelven a girar
    if (card1 != card2) {


        //Los 2 if's es para saber a que carta hay que reasignar el _dup
        if (card1_dup) {
            document.getElementById(card1 + "_dup").src = "../images/card back.png";
            document.getElementById(card2).src = "../images/card back.png";
        } else {
            document.getElementById(card2 + "_dup").src = "../images/card back.png";
            document.getElementById(card1).src = "../images/card back.png";
        }

        if (card1_dup && card2_dup) {
            document.getElementById(card2 + "_dup").src = "../images/card back.png";
            document.getElementById(card1 + "_dup").src = "../images/card back.png";
        } else {
            document.getElementById(card2).src = "../images/card back.png";
            document.getElementById(card1).src = "../images/card back.png";
        }

        //Volvemos a activar el click a todas las cartas
        enableClick();

        turn++;
    } else {


        //Si las cartas son iguales (el if es para distingir quien tenia el _dup)
        if (card1_dup && !card2_dup) {


            var x = document.getElementById(card1 + "_dup");
            var y = document.getElementById(card2);

            cards_found[counter_cards_found] = card2;
            counter_cards_found++;
            cards_found[counter_cards_found] = card1;
            counter_cards_found++;

            isPoint = true;

            //Actualizamos la puntuacion del jugador correspondiente
            updateScore();

            x.className = "ok";
            y.className = "ok";
            enableClick();

            //Y le volvemos a quitar el click a las cartas pares


            var point = new Audio("../sound/short-success.mp3");
            point.play();

        } else if (card2_dup && !card1_dup) {


            var x = document.getElementById(card1);
            var y = document.getElementById(card2 + "_dup");


            //Sirve para contar y listar las cartas encontradas
            cards_found[counter_cards_found] = card1;
            counter_cards_found++;
            cards_found[counter_cards_found] = card2;
            counter_cards_found++;
            ///////////////////////////////////////////////////

            //Se actualiza la puntuacion del jugador actual, se cambia la clase de la carta y se vuelve a activar el evento onclick de las otras cartas
            updateScore();
            x.className = "ok";
            y.className = "ok";
            enableClick();



            isPoint = true;


            var point = new Audio("../sound/short-success.mp3");
            point.play();

        }


    }

    turn_rotation();
    card1 = "";
    card2 = "";

}
//Esta funcion le quita el evento click a todas las cartas
function removeClick() {
    var card = document.getElementsByClassName("flipped");

    for (let i = 0; i < card.length; i++) {
        var temp = card[i];
        temp.removeAttribute("onclick");

    }

}

//Esta funcion reactiva la funcion clic a todas las cartas
function enableClick() {

    var card = document.getElementsByClassName("flipped")

    for (let i = 0; i < card.length; i++) {

        var temp = card[i];
        temp.setAttribute("onclick", "flip(this.id)");

    }

}


function check_ended() {

    if ((cards_found.length / 2) == characters_available) {
        var butons = document.getElementById("buttons");
        var imput = document.createElement("BUTTON");
        imput.appendChild(document.createTextNode("Nueva Partida"));
        imput.setAttribute("onclick", "location.reload();");
        imput.id = "new_game";
        imput.className="button"
     butons.appendChild(imput);

        var imput2 = document.createElement("BUTTON");
        imput2.appendChild(document.createTextNode("Hall of Fame"));
        //imput2.setAttribute("onclick", "location.reload();");
        imput2.id = "hall_of_fame";
        imput2.className="button";
        imput2.type="submit";
     butons.appendChild(imput2);

        game_ended=true;
    }
}
