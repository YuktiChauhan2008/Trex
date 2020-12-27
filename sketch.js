var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundImg;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage, cloudsGroup;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameover, gameoverImage, restart, restartImage;

var score
var newImage;

var jumpSound , checkPointSound, dieSound

var sun, sunImage;


function preload(){
  
   backgroundImg = loadImage("backgroundImg.png")
  
trex_running = loadAnimation("trex_1.png","trex_2.png","trex_3.png");
  trex_collided = loadAnimation("trex_collided-1.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud-1.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  
  sunImage = loadImage("bigSun.png")
  
}

function setup() {
  
  createCanvas(600,200);
  
  //create a trex sprite
  trex = createSprite(50,100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.08;
  //trex.debug = true
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  groundImage.scale = 0.3
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  //creating gameover and restart sprites =D
  gameover = createSprite(300,100,400,20);
  gameover.addImage("gameover",gameoverImage);
  gameover.scale = 0.5
  gameover.visible = false
  
  restart = createSprite(300,130,400,20);
  restart.addImage("restart",restartImage);
  restart.scale = 0.5
  restart.visible = false
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  sun = createSprite(550,50,20,20);
  sun.addImage("sun",sunImage);
  sun.scale = 0.1;
  
    
  score = 0
}

function draw() {
  
  background(backgroundImg);
  
  
 if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    
    //jump the trex
   
    if(keyDown("space") && trex.y > 100) {
    //trex.velocityY = -13;
      trex.velocityY = -10;
      jumpSound.play();
      console.log(trex.y);
  }
    
    //add sound when score reaches 100 everytime
    if(score>0 && score% 500 === 0){
      checkPointSound.play();
    }
    
    //put thegravity for the trex to come back
      trex.velocityY = trex.velocityY + 0.8
    
    //infinite ground
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      dieSound.play();
    }
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    
    //to stop the obstacle and cloud.
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    
    obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
    
    //showing gameover and restart
     gameover.visible = true;
     restart.visible = true;
     
     
     //change the trex animation
     trex.changeAnimation("collided",trex_collided)

    trex.velocityY = 0;
    
    //when restart is pressed the game starts again
    if(mousePressedOver(restart)) {
      reset();
    }
}
    
  
   //stop trex from falling down
  trex.collide(invisibleGround);
  
 
  drawSprites();
  
  fill("black")
  textSize(20)
  text("score: "+ score, 300,50);
  }

//function reset to restart the game :D
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
}


//function to spawn the clouds
function spawnClouds(){
  
  
  if(frameCount%60===0){
    cloud = createSprite(600,100,20,20);
    cloud.y = Math.round(random(1,100))
     cloud.addImage("cloud",cloudImage);
  cloud.velocityX = -3
    cloud.scale = 0.6;
   
    //adjest the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;    
    
    //assign lifetime to the variable
     cloud.lifetime = 220;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600,170,40,10);
   obstacle.scale = 0.4;
    obstacle.velocityX = -3;
    var randomNumber = Math.round(random(1,6))
    switch(randomNumber){
        case 1: obstacle.addImage(obstacle1) ;
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
        default:break;
 }
    
     //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
    }
}

