//Variables sonido
let monitorear = false;
let mic;
let pitch;
let audioContext;
let gestorAmp;
let gestorPitch;
let haySonido;
let antesHabiaSonido;
let pitchMapeado;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
//Variables interaccion
let angulo;
let spacing = 180;
let nroRecorte = -1;
//Timers
let timerSeleccion = 10;
let timerAnimacion = 3;
let timerRecortes = 30;
let timerFinal = 10;
//Variable para cambio de escena
let escena;
//Arrays varios
let rev1recAnim = []; let rev2recAnim = []; let rev3recAnim = [];
let rev1recortes = []; let rev2recortes = []; let rev3recortes = [];
let recortes = [];
//Posicion Timer
let timerX = 615;
let timerRecortesX = 56;
//Valores X, Width, Height para las 3 portadas
let revista1XPos = 55; let revista1Width = 342; let revista1Height = 444; let revista2Width = 342;
let revista2Height = 444; let revista3Width = 342; let revista3Height = 444;
//Valores X e Y para los recortes de la animacion de la portada 1
let rev1recAnim0Xpos = 468; let rev1recAnim1Ypos = 138; let rev1recAnim2Xpos = 468; let rev1recAnim3Ypos = 138;
let rev1recAnim4Xpos = 468; let rev1recAnim5Ypos = 138; let rev1recAnim6Xpos = 468; let rev1recAnim7Ypos = 138;
let rev1recAnim8Xpos = 468; let rev1recAnim9Ypos = 138; let rev1recAnim10Ypos = 138; let rev1recAnim11Ypos = 138;
let rev1recAnim12Xpos = 468; let rev1recAnim13Ypos = 138; let rev1recAnim14Xpos = 468; let rev1recAnim15Xpos = 468; 
let rev1recAnim16Ypos = 138; let rev1recAnim17Xpos = 468; let rev1recAnim18Ypos = 138; let rev1recAnim19Xpos = 468;
//Valores X e Y para los recortes de la animacion de la portada 2
let rev2recAnim0Xpos = 468; let rev2recAnim1Ypos = 138; let rev2recAnim2Xpos = 468; let rev2recAnim3Ypos = 138;
let rev2recAnim4Xpos = 468; let rev2recAnim5Ypos = 138; let rev2recAnim6Xpos = 468; let rev2recAnim7Ypos = 138;
let rev2recAnim8Xpos = 468; let rev2recAnim9Ypos = 138; let rev2recAnim10Ypos = 138; let rev2recAnim11Ypos = 138;
let rev2recAnim12Xpos = 468; let rev2recAnim13Ypos = 138; let rev2recAnim14Xpos = 468;
//Valores X e Y para los recortes de la animacion de la portada 3
let rev3recAnim0Xpos = 468; let rev3recAnim1Ypos = 138; let rev3recAnim2Xpos = 468; let rev3recAnim3Ypos = 138;
let rev3recAnim4Xpos = 468; let rev3recAnim5Ypos = 138; let rev3recAnim6Xpos = 468; let rev3recAnim7Ypos = 138;
let rev3recAnim8Xpos = 468; let rev3recAnim9Ypos = 138; let rev3recAnim10Ypos = 138; let rev3recAnim11Ypos = 138;
let rev3recAnim12Xpos = 468; let rev3recAnim13Ypos = 138; let rev3recAnim14Xpos = 468; let rev3recAnim15Xpos = 468;
let rev3recAnim16Ypos = 138; let rev3recAnim17Xpos = 468; let rev3recAnim18Ypos = 138; let rev3recAnim19Xpos = 468;
//Variables boolean para detectar el hover en cada revista
let revista1Hover, revista2Hover, revista3Hover;
//Variables boolean para animacion de elegir revista
let elegirRevista1 = false; let elegirRevista2 = false; let elegirRevista3 = false;
//-------------------------------------
function preload() {
  //Precarga de imagenes
  reloj = loadImage ("imagenes/reloj.png");
  fondo = loadImage("imagenes/fondo.jpg");
  revista1 = loadImage ("imagenes/portadas/revista1.png");
  revista2 = loadImage ("imagenes/portadas/revista2.png");
  revista3 = loadImage ("imagenes/portadas/revista3.png");
  marco = loadImage("imagenes/marco.png");
  tapaReloj = loadImage("imagenes/tapaReloj.png");
  //Carga de recortes para animacion revista 1
  for (let i = 0; i < 20; i++) {
    rev1recAnim[i] = loadImage("imagenes/recortesAnim/revista1/rev1recAnim" + i + ".png");
  }
  //Carga de recortes para animacion revista 2
  for (let i = 0; i < 15; i++) {
    rev2recAnim[i] = loadImage("imagenes/recortesAnim/revista2/rev2recAnim" + i + ".png");
  }
  //Carga de recortes para animacion revista 3
  for (let i = 0; i < 20; i++) {
    rev3recAnim[i] = loadImage("imagenes/recortesAnim/revista3/rev3recAnim" + i + ".png");
  }
  //Carga de recortes revista 1
  for (let i = 0; i < 16; i++) {
    rev1recortes[i] = loadImage("imagenes/recortes/revista1/rev1rec" + i + ".png");
  }
  //Carga recortes revista 2
  for (let i = 0; i < 16; i++) {
    rev2recortes[i] = loadImage("imagenes/recortes/revista2/rev2rec" + i + ".png");
  }
  //Carga recortes revista 3
  for (let i = 0; i < 16; i++) {
    rev3recortes[i] = loadImage("imagenes/recortes/revista3/rev3rec" + i + ".png");
  }
  
}

function reiniciar() {
  recortes.splice(0);
  //Reseteo de timer
  timerX = 615;
  timerRecortesX = 56;
  timerSeleccion = 10;
  timerAnimacion = 3;
  timerRecortes = 30;
  timerFinal = 10;
  //Restaurar valores X e Y para los recortes de la animacion de la portada 1
  rev1recAnim0Xpos = 468; rev1recAnim1Ypos = 138; rev1recAnim2Xpos = 468; rev1recAnim3Ypos = 138;
  rev1recAnim4Xpos = 468; rev1recAnim5Ypos = 138; rev1recAnim6Xpos = 468; rev1recAnim7Ypos = 138;
  rev1recAnim8Xpos = 468; rev1recAnim9Ypos = 138; rev1recAnim10Ypos = 138; rev1recAnim11Ypos = 138;
  rev1recAnim12Xpos = 468; rev1recAnim13Ypos = 138; rev1recAnim14Xpos = 468; rev1recAnim15Xpos = 468; 
  rev1recAnim16Ypos = 138; rev1recAnim17Xpos = 468; rev1recAnim18Ypos = 138; rev1recAnim19Xpos = 468;
  //Restaurar valores X e Y para los recortes de la animacion de la portada 2
  rev2recAnim0Xpos = 468; rev2recAnim1Ypos = 138; rev2recAnim2Xpos = 468; rev2recAnim3Ypos = 138;
  rev2recAnim4Xpos = 468; rev2recAnim5Ypos = 138; rev2recAnim6Xpos = 468; rev2recAnim7Ypos = 138;
  rev2recAnim8Xpos = 468; rev2recAnim9Ypos = 138; rev2recAnim10Ypos = 138; rev2recAnim11Ypos = 138;
  rev2recAnim12Xpos = 468; rev2recAnim13Ypos = 138; rev2recAnim14Xpos = 468;
  //Restaurar valores X e Y para los recortes de la animacion de la portada 3
  rev3recAnim0Xpos = 468; rev3recAnim1Ypos = 138; rev3recAnim2Xpos = 468; rev3recAnim3Ypos = 138;
  rev3recAnim4Xpos = 468; rev3recAnim5Ypos = 138; rev3recAnim6Xpos = 468; rev3recAnim7Ypos = 138;
  rev3recAnim8Xpos = 468; rev3recAnim9Ypos = 138; rev3recAnim10Ypos = 138; rev3recAnim11Ypos = 138;
  rev3recAnim12Xpos = 468; rev3recAnim13Ypos = 138; rev3recAnim14Xpos = 468; rev3recAnim15Xpos = 468;
  rev3recAnim16Ypos = 138; rev3recAnim17Xpos = 468; rev3recAnim18Ypos = 138; rev3recAnim19Xpos = 468;
  //Reset de booleans para elegir revista
  elegirRevista1 = false; elegirRevista2 = false; elegirRevista3 = false;
  //Cambio a escena principal
  escena = 0;
}


//-------------------------------
function keyPressed() {
  if (key == '+') {
    if (spacing < 220) {
      spacing = spacing + 10;
      print('Spacing: ' + spacing);
    }
  }
  if (key == '-') {
    if (spacing > 140) {
      spacing = spacing - 10;
      print('Spacing: ' + spacing);
    }
  }
}
//------------------------------      
function setup() {
  //Inicializo la escucha de sonido
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  gestorAmp = new GestorSenial(0.01, 0.4);
  gestorPitch = new GestorSenial(30, 80);
  userStartAudio();
  antesHabiaSonido = false;

  //Seteo de booleans
  elegirRevista1 = false; elegirRevista2 = false; elegirRevista3 = false; boton = false;
  escena = 0;
  createCanvas(1280, 720);
}
//---------------------------------
function draw() { 
  let vol = mic.getLevel();
  gestorAmp.actualizar(vol);
  //Medir si hay sonido o no
  haySonido = gestorAmp.filtrada>0.1;
  //comparando el pasado con el presente
  //Decido que el sonido inicio ahora
  let inicioElSonido = haySonido && !antesHabiaSonido;
  //Comparado el pasado con el presente
  //Deccido que el sonido finalizo ahora
  let finDelSonido = !haySonido && antesHabiaSonido;
  antesHabiaSonido = haySonido;
  pitchMapeado = map(gestorPitch.filtrada, 0, 1, -120, 90)
  //console.log(gestorAmp.filtrada);
  console.log(pitchMapeado);

  if (escena == 0) {
    if (frameCount % 60 == 0 && timerSeleccion > 0) {
      timerSeleccion --;
    }
    if(timerSeleccion == 0 && revista1Hover == true) {
      spacing = 180;
      escena = 1;
    }
    if(timerSeleccion == 0 && revista2Hover == true) {
      spacing = 180;
      escena = 2;
    }
    if(timerSeleccion == 0 && revista3Hover == true) {
      spacing = 180;
      escena = 3;
    }
    imageMode(CORNER);
    image(fondo, 0, 0);
    image(revista1, revista1XPos, 190, revista1Width, revista1Height);
    //tint(255, revista1Tint);
    image(revista2, 469, 190, revista2Width, revista2Height);
    //tint(255, revista2Tint);
    image(revista3, 883, 190, revista3Width, revista3Height);
    //tint(255, revista3Tint);
    //Hover Revista 1
    if(gestorPitch.filtrada < 0.3){
      revista1Hover = true;
    } else {
      revista1Hover = false;
    }
    if (revista1Hover == true) {
      if (revista1Width < 362) {
        revista1Width ++;
        revista1Height ++;
      }
      } else {
        revista1Width = 342;
        revista1Height = 444;
      }
    //Hover Revista 2
    if(gestorPitch.filtrada > 0.3 && gestorPitch.filtrada < 0.6){
      revista2Hover = true;
    } else {
      revista2Hover = false;
    }
    if (revista2Hover == true) {
      if (revista2Width < 362) {
        revista2Width ++;
        revista2Height ++;
      }
      } else {
        revista2Width = 342;
        revista2Height = 444;
      }
    //Hover Revista 3
    if(gestorPitch.filtrada > 0.6 && gestorPitch.filtrada < 1){
      revista3Hover = true;
    } else {
      revista3Hover = false;
    }
    if (revista3Hover == true) {
      if (revista3Width < 362) {
        revista3Width ++;
        revista3Height ++;
      }
      } else {
        revista3Width = 342;
        revista3Height = 444;
      }
    //Animacion elegir revista 2
    if (elegirRevista2 == true) {
      revista1XPos --;
    }
    //Monitoreo
    if(monitorear) {
      gestorAmp.dibujar(100, 100);
      gestorPitch.dibujar(100, 300);
    }
    textSize(60);
    text(timerSeleccion, timerX, 119);
    image(reloj, 581, 25);

    if(timerSeleccion == 9) {
      timerX = 631;
    }
    }
    //Animacion recortes revista 1
    if (escena == 1) {
      imageMode(CORNER);
      image(fondo, 0, 0);
      //Recortes para animacion de la revista 1
      image(rev1recAnim[0], rev1recAnim0Xpos, 138, 342, 444);
      image(rev1recAnim[1], 468, rev1recAnim1Ypos, 342, 444);
      image(rev1recAnim[2], rev1recAnim2Xpos, 138, 342, 444);
      image(rev1recAnim[3], 468, rev1recAnim3Ypos, 342, 444);
      image(rev1recAnim[4], rev1recAnim4Xpos, 138, 342, 444);
      image(rev1recAnim[5], 468, rev1recAnim5Ypos, 342, 444);
      image(rev1recAnim[6], rev1recAnim6Xpos, 138, 342, 444);
      image(rev1recAnim[7], 468, rev1recAnim7Ypos, 342, 444);
      image(rev1recAnim[8], rev1recAnim8Xpos, 138, 342, 444);
      image(rev1recAnim[9], 468, rev1recAnim9Ypos, 342, 444);
      image(rev1recAnim[10], 468, rev1recAnim10Ypos, 342, 444);
      image(rev1recAnim[11], 468, rev1recAnim11Ypos, 342, 444);
      image(rev1recAnim[12], rev1recAnim12Xpos, 138, 342, 444);
      image(rev1recAnim[13], 468, rev1recAnim13Ypos, 342, 444);
      image(rev1recAnim[14], rev1recAnim14Xpos, 138, 342, 444);
      image(rev1recAnim[15], rev1recAnim15Xpos, 138, 342, 444);
      image(rev1recAnim[16], 468, rev1recAnim16Ypos, 342, 444);
      image(rev1recAnim[17], rev1recAnim17Xpos, 138, 342, 444);
      image(rev1recAnim[18], 468, rev1recAnim18Ypos, 342, 444);
      image(rev1recAnim[19], rev1recAnim19Xpos, 138, 342, 444);
      //Movimiento de los recortes
      rev1recAnim0Xpos ++; rev1recAnim1Ypos --; rev1recAnim2Xpos --; rev1recAnim3Ypos ++; rev1recAnim4Xpos ++;
      rev1recAnim5Ypos --; rev1recAnim6Xpos --; rev1recAnim7Ypos ++; rev1recAnim8Xpos ++; rev1recAnim9Ypos ++;
      rev1recAnim10Ypos ++; rev1recAnim11Ypos --; rev1recAnim12Xpos ++; rev1recAnim13Ypos --; rev1recAnim14Xpos --;
      rev1recAnim15Xpos --; rev1recAnim16Ypos --; rev1recAnim17Xpos ++; rev1recAnim18Ypos ++; rev1recAnim19Xpos --;
      //Timer
      if (frameCount % 60 == 0 && timerAnimacion > 0) {
        timerAnimacion --;
      }
      if (timerAnimacion == 1) {
        rev1recAnim0Xpos = 2000; rev1recAnim1Ypos = 2000; rev1recAnim2Xpos = 2000; rev1recAnim3Ypos = 2000;
        rev1recAnim4Xpos = 2000; rev1recAnim5Ypos = 2000; rev1recAnim6Xpos = 2000; rev1recAnim7Ypos = 2000;
        rev1recAnim8Xpos = 2000; rev1recAnim9Ypos = 2000; rev1recAnim10Ypos = 2000; rev1recAnim11Ypos = 2000;
        rev1recAnim12Xpos = 2000; rev1recAnim13Ypos = 2000; rev1recAnim14Xpos = 2000; rev1recAnim15Xpos = 2000;
        rev1recAnim16Ypos = 2000; rev1recAnim17Xpos = 2000; rev1recAnim18Ypos = 2000; rev1recAnim19Xpos = 2000;
      }
      if (timerAnimacion == 0) {
        escena = 4;
      }
    }
    //Animacion recortes revista 2
    if (escena == 2) {
      imageMode(CORNER);
      image(fondo, 0, 0);
      //Recortes para animacion de la revista 2
      image(rev2recAnim[0], rev2recAnim0Xpos, 138, 342, 444);
      image(rev2recAnim[1], 468, rev2recAnim1Ypos, 342, 444);
      image(rev2recAnim[2], rev2recAnim2Xpos, 138, 342, 444);
      image(rev2recAnim[3], 468, rev2recAnim3Ypos, 342, 444);
      image(rev2recAnim[4], rev2recAnim4Xpos, 138, 342, 444);
      image(rev2recAnim[5], 468, rev2recAnim5Ypos, 342, 444);
      image(rev2recAnim[6], rev2recAnim6Xpos, 138, 342, 444);
      image(rev2recAnim[7], 468, rev2recAnim7Ypos, 342, 444);
      image(rev2recAnim[8], rev2recAnim8Xpos, 138, 342, 444);
      image(rev2recAnim[9], 468, rev2recAnim9Ypos, 342, 444);
      image(rev2recAnim[10], 468, rev2recAnim10Ypos, 342, 444);
      image(rev2recAnim[11], 468, rev2recAnim11Ypos, 342, 444);
      image(rev2recAnim[12], rev2recAnim12Xpos, 138, 342, 444);
      image(rev2recAnim[13], 468, rev2recAnim13Ypos, 342, 444);
      image(rev2recAnim[14], rev2recAnim14Xpos, 138, 342, 444);
      //Movimiento de los recortes
      rev2recAnim0Xpos ++; rev2recAnim1Ypos --; rev2recAnim2Xpos --; rev2recAnim3Ypos ++; rev2recAnim4Xpos ++;
      rev2recAnim5Ypos --; rev2recAnim6Xpos --; rev2recAnim7Ypos ++; rev2recAnim8Xpos ++; rev2recAnim9Ypos ++;
      rev2recAnim10Ypos ++; rev2recAnim11Ypos --; rev2recAnim12Xpos ++; rev2recAnim13Ypos --; rev2recAnim14Xpos --;
      //Timer
      if (frameCount % 60 == 0 && timerAnimacion > 0) {
        timerAnimacion --;
      }
      if (timerAnimacion == 1) {
        rev2recAnim0Xpos = 2000; rev2recAnim1Ypos = 2000; rev2recAnim2Xpos= 2000; rev2recAnim3Ypos = 2000;
        rev2recAnim4Xpos = 2000; rev2recAnim5Ypos = 2000; rev2recAnim6Xpos = 2000; rev2recAnim7Ypos = 2000;
        rev2recAnim8Xpos = 2000; rev2recAnim9Ypos = 2000; rev2recAnim10Ypos = 2000; rev2recAnim11Ypos = 2000;
        rev2recAnim12Xpos = 2000; rev2recAnim13Ypos = 2000; rev2recAnim14Xpos = 2000;
      }
      if (timerAnimacion == 0) {
        escena = 5;
      }
    }
    //Animacion recortes revista 3
    if (escena == 3) {
      imageMode(CORNER);
      image(fondo, 0, 0);
      image(rev3recAnim[0], rev3recAnim0Xpos, 138, 342, 444);
      image(rev3recAnim[1], 468, rev3recAnim1Ypos, 342, 444);
      image(rev3recAnim[2], rev3recAnim2Xpos, 138, 342, 444);
      image(rev3recAnim[3], 468, rev3recAnim3Ypos, 342, 444);
      image(rev3recAnim[4], rev3recAnim4Xpos, 138, 342, 444);
      image(rev3recAnim[5], 468, rev3recAnim5Ypos, 342, 444);
      image(rev3recAnim[6], rev3recAnim6Xpos, 138, 342, 444);
      image(rev3recAnim[7], 468, rev3recAnim7Ypos, 342, 444);
      image(rev3recAnim[8], rev3recAnim8Xpos, 138, 342, 444);
      image(rev3recAnim[9], 468, rev3recAnim9Ypos, 342, 444);
      image(rev3recAnim[10], 468, rev3recAnim10Ypos, 342, 444);
      image(rev3recAnim[11], 468, rev3recAnim11Ypos, 342, 444);
      image(rev3recAnim[12], rev3recAnim12Xpos, 138, 342, 444);
      image(rev3recAnim[13], 468, rev3recAnim13Ypos, 342, 444);
      image(rev3recAnim[14], rev3recAnim14Xpos, 138, 342, 444);
      image(rev3recAnim[15], rev3recAnim15Xpos, 138, 342, 444);
      image(rev3recAnim[16], 468, rev3recAnim16Ypos, 342, 444);
      image(rev3recAnim[17], rev3recAnim17Xpos, 138, 342, 444);
      image(rev3recAnim[18], 468, rev3recAnim18Ypos, 342, 444);
      image(rev3recAnim[19], rev3recAnim19Xpos, 138, 342, 444);
      rev3recAnim0Xpos ++; rev3recAnim1Ypos --; rev3recAnim2Xpos --; rev3recAnim3Ypos ++; rev3recAnim4Xpos ++;
      rev3recAnim5Ypos --; rev3recAnim6Xpos --; rev3recAnim7Ypos ++; rev3recAnim8Xpos ++; rev3recAnim9Ypos ++;
      rev3recAnim10Ypos ++; rev3recAnim11Ypos --; rev3recAnim12Xpos ++; rev3recAnim13Ypos --; rev3recAnim14Xpos --;
      rev3recAnim15Xpos --; rev3recAnim16Ypos --; rev3recAnim17Xpos ++; rev3recAnim18Ypos ++; rev3recAnim19Xpos --;
      if (frameCount % 60 == 0 && timerAnimacion > 0) {
        timerAnimacion --;
      }
      if (timerAnimacion == 1) {
        rev3recAnim0Xpos = 2000; rev3recAnim1Ypos = 2000; rev3recAnim2Xpos = 2000; rev3recAnim3Ypos = 2000;
        rev3recAnim4Xpos = 2000; rev3recAnim5Ypos = 2000; rev3recAnim6Xpos = 2000; rev3recAnim7Ypos = 2000;
        rev3recAnim8Xpos = 2000; rev3recAnim9Ypos = 2000; rev3recAnim10Ypos = 2000; rev3recAnim11Ypos = 2000;
        rev3recAnim12Xpos = 2000; rev3recAnim13Ypos = 2000; rev3recAnim14Xpos = 2000; rev3recAnim15Xpos = 2000;
        rev3recAnim16Ypos = 2000; rev3recAnim17Xpos = 2000; rev3recAnim18Ypos = 2000; rev3recAnim19Xpos = 2000;
      }
      if (timerAnimacion == 0) {
        escena = 6;
      }
    }  
    //Pegar recortes revista 1
    if (escena == 4 ) {

      if(haySonido) {
        if (nroRecorte >= 15) {
          nroRecorte = -1;
        }
        nroRecorte++
        let tipo = rev1recortes[nroRecorte];
        let b = new objetoRecorte(640, 345, tipo);
        recortes.push(b);
      }

      imageMode(CORNER);
      background(fondo);
      imageMode(CENTER);
      for (let i = 0; i < recortes.length; i++) {
        recortes[i].show();
      }
      if (recortes.length > 15) {
        recortes.splice(0, 1);
      }
      
      if (frameCount % 60 == 0 && timerRecortes > 0) {
        timerRecortes --;
      }

      if(timerRecortes == 0) {
        escena = 7;
      }

      textSize(60);
      text(timerRecortes, timerRecortesX, 660);
      image(reloj, 90, 630);

      if(timerRecortes == 9) {
        timerRecortesX = 72;
      }
    }
    //Pegar recortes revista 2
    if (escena == 5 ) {
      if(haySonido) {
        if (nroRecorte >= 15) {
          nroRecorte = -1;
        }
        nroRecorte++
        let tipo = rev2recortes[nroRecorte];
        let b = new objetoRecorte(640, 345, tipo);
        recortes.push(b);
      }
      imageMode(CORNER);
      background(fondo);
      imageMode(CENTER);
      for (let i = 0; i < recortes.length; i++) {
        recortes[i].show();
      }
      if (recortes.length > 15) {
        recortes.splice(0, 1);
      }

      if (frameCount % 60 == 0 && timerRecortes > 0) {
        timerRecortes --;
      }

      if(timerRecortes == 0) {
        escena = 7;
      }

      textSize(60);
      text(timerRecortes, timerRecortesX, 660);
      image(reloj, 90, 630);

      if(timerRecortes == 9) {
        timerRecortesX = 72;
      }
    }
    //Pegar recortes revista 3
    if (escena == 6 ) {
      if(haySonido) {
        if (nroRecorte >= 15) {
          nroRecorte = -1;
        }
        nroRecorte++
        let tipo = rev3recortes[nroRecorte];
        let b = new objetoRecorte(640, 345, tipo);
        recortes.push(b);
      }
      imageMode(CORNER);
      background(fondo);
      imageMode(CENTER);
      for (let i = 0; i < recortes.length; i++) {
        recortes[i].show();
      }
      if (recortes.length > 15) {
        recortes.splice(0, 1);
      }

      if (frameCount % 60 == 0 && timerRecortes > 0) {
        timerRecortes --;
      }

      if(timerRecortes == 0) {
        escena = 7;
      }

      textSize(60);
      text(timerRecortes, timerRecortesX, 660);
      image(reloj, 90, 630);

      if(timerRecortes == 9) {
        timerRecortesX = 72;
      }
    }

  if (escena == 7) {
    imageMode(CORNER);
    image(tapaReloj, 0, 0);
    image(marco, 0, 0);

    if (frameCount % 60 == 0 && timerFinal > 0) {
      timerFinal --;
    }

    if (timerFinal == 0) {
      reiniciar();
    }
  }
}

function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
  if (frequency) {    	
    let midiNum = freqToMidi(frequency);
    //console.log( midiNum );
    gestorPitch.actualizar( midiNum );
  }
  getPitch();
})
}

class objetoRecorte {
  constructor(x, y, img) {
    this.tipo = img;
    this.x = constrain(x, this.tipo.width/2, width-this.tipo.width/2);
    this.y = constrain(y, this.tipo.height/2, height-this.tipo.height/2);
    this.x += random(-spacing, spacing);
    this.y += random(-spacing, spacing);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(radians(pitchMapeado));
    image(this.tipo, 0, 0);
    pop();
  }
}
