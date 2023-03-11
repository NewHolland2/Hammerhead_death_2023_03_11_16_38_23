// Mostrar a bolinha, são variaveis.

let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;

// Velocidade da bolinha.

let velocidadeXBolinha = 8
let velocidadeYBolinha = 8
// Raio onde a bolinha não bate no centro
let raio = diametro / 2 ;

// Variavel para criar a raquete.
let xRaquete = 5;
let yRaquete = 140;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

let colidiu = false;

// variaveis do oponente.

let mostrarRaqueteOponente;
let xRaqueteOponente = 585;
let yRaqueteOponente = 140;
let velocidadeYoponente;

// Variavel placar de pontos.

let MeusPontos = 0;
let PontosDoOponente = 0;

// sons da raquete.

let raquetada;
let ponto;
let trilha;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentoBolinha();
  verificacaocolisao();
  CriandoRaquete(xRaquete,yRaquete);
  movimentoRaquete();
  colisaobolinharaquete(yRaquete);
  colisaoMinhaRaquete();
  CriandoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoMinhaRaquete(xRaqueteOponente,yRaqueteOponente);
  PlacarPontos();
  MarcaPonto();
}

function mostrarBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificacaocolisao(){
  if (xBolinha + raio > width ||
    xBolinha - raio < 0 ){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
      yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

// Criação da raquete

function CriandoRaquete(x,y){
  rect(x,y,comprimentoRaquete,alturaRaquete);
}

// Criar movimento da raquete.

function movimentoRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

// Verificação de colisão da raquete.

function colisaobolinharaquete(){
  if(xBolinha - raio < xRaquete + comprimentoRaquete  &&
     yBolinha - raio < yRaquete + alturaRaquete &&
     yBolinha + raio > yRaquete){
     velocidadeXBolinha *= -1;
     raquetada.play()
  }
}

function colisaoMinhaRaquete(x,y){
  colidiu = collideRectRect(x , y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio, xRaqueteOponente,);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente(){
  velocidadeYoponente = yBolinha -yRaqueteOponente - comprimentoRaquete / 2 - 50;
  yRaqueteOponente += velocidadeYoponente;
}
function PlacarPontos(){
  textAlign(CENTER)
  fill(color("#000066"));
  rect(135,16,30,16)
  fill(255);
  fill(color("#000066"));
  rect(435,16,30,16)
  stroke(255)
  fill(255);
  text(MeusPontos, 150, 28);
  fill(255);
  text(PontosDoOponente, 450, 28)
}

function MarcaPonto(){
  if (xBolinha < 10){
    PontosDoOponente += 1;
    ponto.play()
  }
  if (xBolinha > 590){
    MeusPontos += 1;
    ponto.play()
  }
}

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}