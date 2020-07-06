//Global Variables
var bananaImage, obstacleImage,monkeyImage, backgroundImg, groundImg, gameOverImg, restartImg;
var player, backgroundPlay, ground;
var obstacleGroup, bananaGroup;
var score;
var PLAY = true;
var END = false;
var gameState = PLAY;



function preload(){
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  backgroundImg = loadImage("jungle.jpg");
  groundImg = loadImage("ground.jpg");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
  
  backgroundPlay = createSprite(300, 80); 
  backgroundPlay.addImage("playBackground", backgroundImg);
  backgroundPlay.scale = 1;
  
  player = createSprite(103, 258);
  player.addAnimation("monkeyRun", monkeyImage);
  player.scale = 0.1;
  
  ground = createSprite(100, 300);
  ground.addImage("playerGround", groundImg);
  ground.scale = 0.03;
  ground.visible = false;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  gameOver = createSprite(300, 150);
  gameOver.addImage("gameOverUI", gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(300, 190);
  restart.addImage("restartUI", restartImg);
  restart.visible = false;
  restart.scale = 0.5;
    
  score = 0;
  
}


function draw(){
  background(255);
  player.collide(ground);
  
  if (gameState === PLAY) {
    backgroundPlay.velocityX = -4;
    
    if (backgroundPlay.x < 0) {
      backgroundPlay.x = backgroundPlay.width/2;
    }
    if (keyDown("space") && player.y >= 252) {
      player.velocityY = -14;
    }
    player.velocityY += 0.8;
    spawnObstacles();
    spawnBananas();
    increaseScore();
    
    if (player.isTouching(obstacleGroup)) {
      gameState = END;
    }
    
    if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      backgroundPlay.velocityX = 0;
      player.velocityX = 0;
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      
      if (mousePressedOver(restart)) {
        reset();
      }
      
    }
  }
  
  drawSprites();
  text("Score: " + score, 10, 40);
}

function spawnObstacles() {
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(620, 258);
    obstacle.addImage("obstacles", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 170;
    obstacleGroup.add(obstacle);
  }
}


function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(620, 258);
    var randomY = Math.round(random(150, 258));
    banana.y = randomY;
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 170;
    bananaGroup.add(banana);
  }
}

function increaseScore() {
  for (var i = 0; i < bananaGroup.length; i++) {
    if (player.isTouching(bananaGroup.get(i))) {
      bananaGroup.get(i).lifetime = 0;
      score ++;
    }
  }  
}

function reset() {
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  gameState = PLAY;
}