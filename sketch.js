var wall,Wimg;
var score = 0;
var Ghost,gImg;
var Cl,CImg,D,Di;
var doors,Climber,invisible;
var play = 1;
var end = 0;
var gameState = 1;
function preload(){
  gImg = loadImage("ghost-jumping.png")
  
  Wimg = loadImage("tower.png");
  
  CImg = loadImage("climber.png");
  
  Di = loadImage("door.png")
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  wall = createSprite(width/2,height/2,width,height);
  wall.addImage(Wimg);
  wall.scale = 2.15;
  
  Ghost = createSprite(width/2,height/2,20,20);
  Ghost.addImage(gImg);
  Ghost.scale = 0.3;
  
  
  doors = new Group();
  Climber = new Group();
  invisible = new Group();
}
function draw(){
  background("white");
  if(gameState === play){
    if(keyDown("space")){
      Ghost.velocityY = -10;
    }
    if(keyDown("left")){
      Ghost.x = Ghost.x - 3;
    }
    if(keyDown("right")){
      Ghost.x = Ghost.x + 3;
    }
    if(Ghost.isTouching(invisible) || Ghost.y > height ){
      Ghost.destroy();
      gameState = end;
    }
    Ghost.velocityY = Ghost.velocityY + 1/4;
    
    createClimber();
    
    score = score + Math.round(getFrameRate()/60);
  }
  drawSprites();
  text("Score : " + score,20,20);
}


function createClimber(){
  if(frameCount%240 === 0){
    D = createSprite(50,-55,50,50);
    D.x = Math.round(random(70,width-70));
    D.addImage(Di);
    D.velocityY = 2;
    Ghost.depth = D.depth + 1;
    doors.add(D);
    
    Cl = createSprite(50,0,20,20);
    Cl.x = D.x;
    Cl.addImage(CImg);
    Cl.velocityY = 2;
    Ghost.depth = Cl.depth + 1;
    Climber.add(Cl);
    
    C = createSprite(D.x,15,Cl.width,20)
    C.velocityY = 2
    C.visible = false;
    C.debug = true;
    invisible.add(C);
  }
  
}