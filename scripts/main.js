
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
	NUM_MAPS_L1 = runtime.globalVars.ap_NUM_MAPS_LEVEL1;
	NUM_RONDAS  = runtime.globalVars.ap_NUM_RONDAS;
}

// Rellena ArrayFiguras (GameArray) con frames aleatorios sin repeticion
export function ap_rellenarGameArrayDeBotones(numMapa, newImgbtn, nivel)
{	imgbtn = newImgbtn;
	let marray = generarArrayBotonesUnico(numMapa, nivel);
	for(var i=0;i<marray.length;i++){
		gameArray.setAt(marray[i],i,0,0);
	}
}

//Rellena Array;apas con los mapas de cada ronda. Le envio el sprite de mapas para que coga
export function ap_rellenarGameArrayDeMapas(nivel, newMapa)
{
	mapas = newMapa;
	let marray = generarArrayMapasUnico(nivel);
	for(var i=0;i<marray.length;i++){
		//mapasArray.setAt(marray[i],i,0,0);
		mapasArray.setAt(3,i,0,0);
	}
 
}

/*Genera un array de numeros (de frames) sin repeticion de elementos con el numero de imagenes (frames) del sprite. 
Recibe numMapa, el mapa (animacion) de MapaImagen que se esta utilizando
Rencibe nivel. En caso de nivel 2 solo ponemos las imagenes que tengan definido un frame
*/
function generarArrayBotonesUnico(numMapa, nivel) {
  var array = [];
  
  imgbtn.setAnimation("Animation " + numMapa);
  
  let NUM_FIG = imgbtn.animation.frameCount;
  
  console.log("Nivel:" +nivel+"Animation:"+numMapa+"- numFrames:" + NUM_FIG);
  let cont=0; //valor de seguridad para evitar bucle ininito
  
  // Generar NUM_BTNS números aleatorios únicos.
  while (array.length < NUM_BTNS && cont<1000) {
    var numeroAleatorio = Math.floor(Math.random() * NUM_FIG); // Genera un número aleatorio del 0 al Numero de figuras que haya
	
	
    if (array.indexOf(numeroAleatorio) === -1 ) { // Verifica si el número no está en el array
		imgbtn.animationFrame = numeroAleatorio;
		if(nivel==2){
			if(imgbtn.animationFrameTag !==""){
				array.push(numeroAleatorio); // En nivel dos solo agrega al array si tiene Tag definido 
				console.log("añandido: "+imgbtn.animationFrameTag)
			}else{
				console.log("Sin tag");
			}
		
		}else{
			array.push(numeroAleatorio); // Agrega el número al array
		}
      	
    }
	cont++;
  }
  return array;
}

//Genera un array con los mapas a jugar en cada ronda
function generarArrayMapasUnico(nivel){ 
  var max, min;
  //imgbt1.setAnimation("Animation " + numAnim);
  
  //console.log("numFrames:" + imgbtn.animation.frameCount);
  //Nivel 1 y 2 son los frames de 0 hasta NUM_MAPS_L1, en nivel 3 son los restantes (de NUM_MAPS_L1 hasta el final)
  console.log("Nivel: "+nivel+"-max:"+max+"-min:"+min);
  if(nivel==3){
  	max = mapas.animation.frameCount;
	min = NUM_MAPS_L1;
  	//var numeroAleatorio = Math.floor(Math.random() * NUM_MAPS_L1);
	console.log("Nivel: "+nivel+"-max:"+max+"-min:"+min);
  }else{
  	max = NUM_MAPS_L1;
	min = 0;
	console.log("Nivel: "+nivel+"-max:"+max+"-min:"+min);
  }
  
  var array = [];
  // Generar NUM_RONDAS numeros aleatorios únicos.
  while (array.length < NUM_RONDAS) {
    var numeroAleatorio = Math.floor(Math.random() * (max-min) + min); // Genera un número aleatorio del 0 al Numero de mapas que tenga el nivel
	console.log("Numero aleatorio: "+ numeroAleatorio);
    if (array.indexOf(numeroAleatorio) === -1) { // Verifica si el número no está en el array
      array.push(numeroAleatorio); // Agrega el número al array
    }
  }
  return array;

}
