
//alert("Fet per en \"Paul Soual\" 2n de DAW");

var time;//tiempo actual que cuenta atras
var time_saved;//tiempo definido por el usuario en el formulario

var characters = [];

var card1 = "";//nombre de la primera carta
var card2 = "";//nombre de la segunda carta
var turn = 1;//contador de turnos ej 1 = turno del jugador 1

var isPoint = false;//booleana para saber si jugador ha marcado punto

var p1_score = 0;//puntuacion jugador 1 etc..
var p2_score = 0;
var p3_score = 0;
var p4_score = 0;

var tempo1 = 1;
var tempo2 = 1;
var tempo3 = 1;
var tempo4 = 1;


var cards_found = [];//array de cartas encontradas (incluye las cartas duplicadas)
var counter_cards_found = 0;//contador de cartas encontradas

var state_card1;//document.getelementById (para trabajar con el estado de la carta si esta girada o no)
var state_card2;

var game_ended = false;//Cuando la partida esta acabada
var interval;//Para el temporizador 

//Variables para el cronometro;
var contar;//para definir el interval del cronometro
var ss = 0;//segundos
var mm = 0//minutos


//Escuchamos al teclado y mandamos el evento a la funcion
document.addEventListener("keypress", easterEgg, false);
var cont_pattern = 0;//contador de ocurrencias
var pattern = ["k", "o", "n", "a", "m", "i"];//codigo trampa :-)
var isCheater = false;//es tramposo ?
//Easter egg con codigo secreto
function easterEgg(event) {

    //Determinamos las ocurrencias seguidas entre teclado y pattern
    if (pattern[cont_pattern] === event.key) {
        cont_pattern++
    } else {//Si se falla una letra reiniciamos 
        cont_pattern = 0;
    }
    event.stopImmediatePropagation();

    //Si hemos encertado el pattern 
    if (cont_pattern == pattern.length) {


        flipCards();//Giramos todas las cartas
        var cheater = document.getElementById("name" + turn);
        cheater.innerHTML = "";
        cheater.innerHTML = "CHEATER";//Y cambiamos el nombre del jugador a "CHEATER"
        cont_pattern = 0;
        setCheater(true)//Cambiamos la booleana a true porque es tramposo
    }
}

function setCharacters(value) {

    switch (value) {
        case 1:
            //characters = ["Fischl", "Bennett", "Keqing", "Lisa", "Mona", "Ningguang", "Noelle", "Sucrose", "Venti", "Xiangling", "Xingqiu", "Beidou"];
            this.characters.push("Fischl", "Bennett", "Keqing", "Lisa", "Mona", "Ningguang", "Noelle", "Sucrose", "Venti", "Xiangling", "Xingqiu", "Beidou");
            break;
        case 2:
            this.characters.push("barbara_chibi", "fischil_chibi", "gorou_chibi", "heizou_chibi", "hutao_chibi", "kazuha_chibi", "kokomi_chibi", "paimon_chibi", "tartaglia_chibi", "venti_chibi", "yanfei_chibi", "yoimiya_chibi");
            break;

        default:
            break;
    }
}



function setCheater(valor) {
    this.isCheater = valor;
}

//Funcion que gira todas las cartas que tengan como clase "flipped"
function flipCards() {
    var cards = document.getElementsByClassName("flipped")

    //Repasamos todas las cartas 
    for (let i = 0; i < cards.length; i++) {
        var temp = cards[i];

        //Y comparamos la id con los personajes disponibles 
        for (let j = 0; j < characters.length; j++) {
            //Si la id es igual al personaje giramos carta
            if (temp.id.includes(characters[j])) {
                temp.src = "../images/" + characters[j] + ".png"
            }

        }
    }
}

//Funcion que devuelve todas las puntuaciones en funcion de la cantidad de jugadores
function getScores() {
    var scores = [p1_score, p2_score, p3_score, p4_score];

    var builded_scores = []

    for (let i = 0; i < num_players; i++) {
        builded_scores.push(scores[i]);
    }

    //Pasamos el array a string para mandarlo por formulario y actualizar cookie mas tarde
    return JSON.stringify(builded_scores);
}

function getTimers() {
    var timers =[tempo1,tempo2,tempo3,tempo4];
    var builded_timers = [];

    for (let i = 0; i < num_players; i++) {
        builded_timers.push(timers[i]);  
    }
    return JSON.stringify(builded_timers);
}


//Inicializamos el tiempo de turno definido por jugador
function setTime(time) {
    this.time = time;
    this.time_saved = time;
}

//Funcion que crea los divs para posicionar la cuenta atras
function timer() {

    if (time_saved != 0) {
        var top = document.getElementById("nav");
        var div = document.createElement("div");
        div.id = "timer";
        top.prepend(div);

        var div1 = document.getElementById("timer");
        var h2 = document.createElement("h2");
        h2.id = "countdown";
        div1.appendChild(h2);

        //Cada segundo repetimos la funcion definida
        interval = setInterval(countdown, 1000);
        contar = setInterval(cronometro, 1000);
    }



}
//Esta funcion actualiza los numeros del contador
function countdown() {

    var time_div = document.getElementById("countdown");
    time_div.innerHTML = "";

    //Cuando el tiempo llegue a - de 0 reseteamos tiempo, cambimos turno y reseteamos LA carta girada
    if (time < 0) {
        time = this.time_saved;
        turn++
        resetCards();
        turn_rotation();
    }

    var time_player = document.getElementById("tempo" + turn);



    time_div.innerHTML = time;
    time--;


    switch (turn) {
        case 1:
            var temp_str =  toMinutes(tempo1)+":"+toSeconds(tempo1);
            time_player.innerHTML = "";
            time_player.innerHTML = temp_str;
            
            break;
        case 2:
            var temp_str =  toMinutes(tempo2)+":"+toSeconds(tempo2);
            time_player.innerHTML = "";
            time_player.innerHTML = temp_str;
            
            break;
        case 3:
            var temp_str =  toMinutes(tempo3)+":"+toSeconds(tempo3);
            time_player.innerHTML = "";
            time_player.innerHTML = temp_str;
            
            break;
        case 4:
            var temp_str =  toMinutes(tempo4)+":"+toSeconds(tempo4);
            time_player.innerHTML = "";
            time_player.innerHTML = temp_str;
            
            break;
    }
}


function toSeconds(time) {

   
    let extraSeconds = time % 60;
   
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    
    return extraSeconds.toString();

}

function toMinutes(time){
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes.toString();
}


//Funcion que calcula el tiempo total del juego
function cronometro() {
    ss++;
    if (ss < 10) {
        ss = "0" + ss;
    }

    if (ss == 60) {
        mm++;
        ss = "0" + 0;
    }


    tempo1++;
    tempo2++;
    tempo3++;
    tempo4++;
    var cronometro = document.getElementById("cronometro");
    cronometro.innerHTML = mm + ":" + ss;
}

//Resetear cartas hacia boca abajo
function resetCards() {
    var cards = document.getElementsByClassName("flipped");

    //Repasamos todas las cartas de clase flipped y las volvemos a girar
    for (let i = 0; i < cards.length; i++) {

        var card = cards[i];
        card.src = "../images/card back.png";
    }
    //Reseteamos los nombres de las cartas seleccionadas
    this.card1 = "";
    this.card2 = "";

    enableClick();//Se reactiva el click a todas las cartas de classe flipped
}

//Determina quien empieza primero
function setTurn(num_of_players) {
    turn = Math.floor(Math.random() * num_of_players + 1);
}

//Esta funcion muestra a los jugadores a quien le toca modificando estilo del jugador actual y a los que no les toca 
function turn_rotation() {

    //Reset de contador de turnos
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

//Actualiza la puntuacion de cada jugador
function updateScore() {

    //Segun el turno de cada jugador si hay punto se le asigna el punto al jugador correspondiente
    switch (turn) {
        case 1: p1_score++;
            var score = document.getElementById("score1");
            score.innerText = "";//importante borrar la puntuacion anterior y actualizar por la nueva
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


//Esta funcion modifica los imputs text del formulario en funcion de la cantidad de jugadores escogido
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


    //Cargamos un sonido
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
        //Cada vez que le damos click a una carta desactivamos el evento de esta carta
        state_card1.removeAttribute("onclick");
    } else {
        state_card2 = state_card;
        state_card2.removeAttribute("onclick")
        card2 = nombre;
        setTimeout(check_cards, 500);//timout para dejar al jugador ver la segunda carta durante un instante
        setTimeout(check_ended, 1000);
        removeClick();//Funcion que desactiva el click de las otras cartas mientras se comprueba si las 2 cartas


    }


}
//Esta funcion comprueba si las cartas son iguales en funcion de su id en HTML
function check_cards() {

    //Para saber cual carta tiene la extension _dup
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

    //Actualizamos el turno del jugador y resetamos los nombres de carta1 y 2
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

//Verificacion si se encontraron todas las cartas
//Generacion de los botones nueva partida y hall of fame
function check_ended() {

    if ((cards_found.length / 2) == characters_available) {
        game_ended = true;
    }
    if (game_ended && (!isCheater)) {

        var butons = document.getElementById("buttons");

        var imput = document.createElement("BUTTON");
        imput.appendChild(document.createTextNode("Nueva Partida"));
        imput.setAttribute("onclick", "window.history.go(-1);");
        imput.id = "new_game";
        imput.className = "button"
        butons.prepend(imput);

        butons = document.getElementById("fame")
        var imput2 = document.createElement("BUTTON");
        imput2.appendChild(document.createTextNode("Hall of Fame"));
        imput2.id = "hall_of_fame";
        imput2.className = "button";
        imput2.type = "submit";
        butons.appendChild(imput2);

        var hidden = document.createElement("input");
        hidden.setAttribute("name", "scores");
        hidden.setAttribute("value", getScores());
        hidden.setAttribute("type", "hidden");
        butons.appendChild(hidden);

        var hidden2 = document.createElement("input");
        hidden2.setAttribute("name","timers");
        hidden2.setAttribute("value",getTimers());
        hidden2.setAttribute("type","hidden");
        butons.appendChild(hidden2);

    }
    if (isCheater && game_ended) {
        alert("NO TE MERECES TENER TU NOMBRE EN EL SALON DE LA FAMA !");
        alert("TRAMPOSO !")
        alert("ESCORIA !");

    }

    if (game_ended) {
        //Paramos los temporizadores
        clearInterval(interval);
        clearInterval(contar);
    }

}

    



