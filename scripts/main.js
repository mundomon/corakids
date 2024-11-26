
// The number for the player to guess - a random number from 0-100.
const theNumber = Math.floor(Math.random() * 100);

//globales
let imgbtn = null;
let gameArray = null;
let mapasArray = null;
let figurasArray = null;
let NUM_BTNS = null;
let NUM_FIG = 0;
let NUM_MAPS_L1 = 0;
let NUM_RONDAS = 0;
let mapas = null;


// Add handlers to get "beforeprojectstart" event
runOnStartup(async runtime =>
{
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	
	gameArray = runtime.objects.ArrayAdivina.getFirstInstance(); //elementos a adivinar
	mapasArray = runtime.objects.ArrayMapas.getFirstInstance(); //mapas para la partida
	NUM_BTNS = runtime.globalVars.ap_NUM_BUT;
	mapas = runtime.objects.ap_MapaImagen.getFirstInstance();
	NUM_MAPS_L1 = runtime.globalVars.ap_NUM_MAPS_LEVEL1;
	NUM_RONDAS  = runtime.globalVars.ap_NUM_RONDAS;
	
	

}

// Rellena ArrayFiguras (GameArray) con frames aleatorios sin repeticion
export function ap_rellenarGameArrayDeBotones(numMapa, newImgbtn)
{	imgbtn = newImgbtn;
	let marray = generarArrayBotonesUnico(numMapa);
	for(var i=0;i<marray.length;i++){
		gameArray.setAt(marray[i],i,0,0);
	}
}
export function ap_rellenarGameArrayDeMapas()
{
	let marray = generarArrayMapasUnico();
	for(var i=0;i<marray.length;i++){
		mapasArray.setAt(marray[i],i,0,0);
	}
 
}

/*Genera un array de numeros (de frames) sin repeticion de elementos con el numero de imagenes (frames) del sprite. 
Recibe numMapa, el mapa (animacion) de MapaImagen que se esta utilizando
*/
function generarArrayBotonesUnico(numMapa) {
  var array = [];
  
  imgbtn.setAnimation("Animation " + numMapa);
  
  let NUM_FIG = imgbtn.animation.frameCount;
  
  //console.log("Animation:"+numMapa+"- numFrames:" + NUM_FIG);
  
  // Generar NUM_BTNS números aleatorios únicos.
  while (array.length < NUM_BTNS) {
    var numeroAleatorio = Math.floor(Math.random() * NUM_FIG); // Genera un número aleatorio del 0 al Numero de figuras que haya
    if (array.indexOf(numeroAleatorio) === -1) { // Verifica si el número no está en el array
      array.push(numeroAleatorio); // Agrega el número al array
    }
  }
  return array;
}

//Genera un array con los mapas a jugar en cada ronda
function generarArrayMapasUnico(){ 
  //imgbt1.setAnimation("Animation " + numAnim);
  
  //console.log("numFrames:" + imgbtn.animation.frameCount);
  
  var array = [];
  // Generar NUM_RONDAS numeros aleatorios únicos.
  while (array.length < NUM_RONDAS) {
    var numeroAleatorio = Math.floor(Math.random() * NUM_MAPS_L1); // Genera un número aleatorio del 0 al Numero de mapas que tenga el nivel
    if (array.indexOf(numeroAleatorio) === -1) { // Verifica si el número no está en el array
      array.push(numeroAleatorio); // Agrega el número al array
    }
  }
  return array;

}
