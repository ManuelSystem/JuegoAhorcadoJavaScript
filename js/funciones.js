/* Documento JS ---juego Ahorcado
--Realizado por LUIS MANUEL JAIMES SILVA - 16132045--
--Asignatura : Electiva 3--
Fecha terminado: 07/03/2020;
*/


// -- Declaración de Variables globales --

// Array de palabras
var palabras = [["Colombia", "Un Pais"], ["Condor", "Un ave"], ["Volkswagen", "Marca de auto"], ["Mouse", "Parte del Computador"], ["facebook", "Red social"], ["Avion", "Transporte aereo"]];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");


// -- FUNCIONES --
// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 6).toFixed(0);//.toFixed Devuelve un String con el número o variable sobre el que se invoca el método con tantos decimales como indique el parámetro n. Si n es cero o vacío, redondea al entero más próximo.
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);//imprime en consola del navegador la palabra aleatoria del arreglo
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");//join() une todos los elementos de un array formando una cadena y separándolos con aquel argumento que definamos
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button style='border: none; border-radius: 3px; padding: 16px 32px; font-size: 14px; min-width: 21%;margin: 4px 2px;cursor: pointer;' value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button style='border: none; border-radius: 3px; color: white; padding: 16px 32px; font-size: 14px; min-width: 21%;text-decoration: none;margin: 4px 2px;cursor: pointer;' value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Sigue así!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Falló";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = alert("La pista es: "+palabras[rand][1]);
}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = "<img style='heigh:200px; width:200px; justify-content:center' src='img/ganaste-esponja.gif'></img><br>¡Sos un Ganador!";;
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "<img style='heigh:200px; width:200px; justify-content:center' src='img/perdiste-esponja.gif'></img><br>¡Oh rayos, perdiste!";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}

// Iniciar
window.onload = inicio();
