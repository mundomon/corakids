
// The number for the player to guess - a random number from 0-100.
const theNumber = Math.floor(Math.random() * 100);

// Instances of TextInput and ResultText
let marray = null;
let imgbt1 = null;
let imgbt2 = null;

let resultTextInst = null;

//globales
let gameArray = null;
let figurasArray = null;
let spriteAnimales = null;
let NUM_BTNS = null;
let NUM_FIG = 8;


// Add handlers to get "beforeprojectstart" event
runOnStartup(async runtime =>
{
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Now the runtime is ready, get the TextInput and ResultText instances
	//textInputInst = runtime.objects.TextInput.getFirstInstance();
	resultTextInst = runtime.objects.Iniciar.getFirstInstance();
	imgbt1 = runtime.objects.ImgBtn.getFirstInstance();
	//var mav = runtime.globalVars.RandomButtonsJson.getFirstInstance();
	gameArray = runtime.objects.ArrayAdivina.getFirstInstance(); //elementos a adivinar
	figurasArray = runtime.objects.ArrayFiguras.getFirstInstance(); //Todos los elementos
	NUM_BTNS = runtime.globalVars.ap_NUM_BUT;
	
	marray = generarArrayUnico();
}


// Export functions to get the number, the guessed number, and show a message.

export function getEnteredNumber()
{
	return Number(textInputInst.text);	// convert text to number
}

// Pone el nombre de los animales en un array, en el mismo orden que los frames del sprite iap_animales
// Rellena el GameArray (el object ArraFiguras) con frames aleatorios sin rep
export function rellenarGameArray()
{
	marray = generarArrayUnico();
	for(var i=0;i<marray.length;i++){
		gameArray.setAt(marray[i],i,0,0);
	}
	//resultTextInst.text = JSON.stringify(marray);//marray.join(', ');//message;
	
	//Relleno el array de figuras con el nombre de los animales (por orden en delos frames)
	figurasArray.setAt("Mapache",0,0,0);
	figurasArray.setAt("Pajaro",1,0,0);
	figurasArray.setAt("Pez",2,0,0);
	figurasArray.setAt("Erizo",3,0,0);
	figurasArray.setAt("Lagartija",4,0,0);
	figurasArray.setAt("Ardilla",5,0,0);
	figurasArray.setAt("Rana",6,0,0);
	figurasArray.setAt("Tortuga",7,0,0);
	
}

export function getTheArray(i)
{
	return marray[i];
}



//Genera un array de numeros (de frames) sin repeticion de elementos con el numero de imagenes (frames) del sprite
function generarArrayUnico() {
	
  var array = [];
  // Generar NUM_BTNS números aleatorios únicos.
  while (array.length < NUM_BTNS) {
    var numeroAleatorio = Math.floor(Math.random() * NUM_FIG); // Genera un número aleatorio del 0 al Numero de figuras que haya
    if (array.indexOf(numeroAleatorio) === -1) { // Verifica si el número no está en el array
      array.push(numeroAleatorio); // Agrega el número al array
    }
  }
  

  return array;
}

