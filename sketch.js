

function preload(){
 boyrunning = loadAnimation("boy1.png","boy2.png","boy3.png");
 bg = loadImage("forest.jpg");
 infinitebg = loadImage("infinite forest.jpg");
 wood1 = loadImage("long_wood_spike.png");
 wood2 = loadImage("small_wood_spike.png");
 coinImg = loadImage("coin.png");
 
  
}

function setup() {

  createCanvas(windowWidth,windowHeight-10)
  gameState = "start";
  
  infbg = createSprite(width/2,height/2)
  infbg.addImage(infinitebg)

  boy = createSprite(150,height-150)
  boy.addAnimation("running", boyrunning)
  boy.scale = 1.2

  ground = createSprite(width/2,height-65,width,20)
  ground.visible = false

  coinsGroup = createGroup()
}

function draw() {
  background(bg)

  if(gameState=="start"){
    infbg.visible=false
    boy.visible = false
    textAlign(CENTER)
    textSize(90)
    fill("red")
    stroke("black")
    strokeWeight(3)
    textFont("Times New Roman")
    text("Runner",width/2,250)

    textSize(50)
    fill("white")
    stroke("black")
    strokeWeight(3)
    textFont("Times New Roman")
    text("Press enter to start...",width/2,400)

    if(keyDown("enter")){
      gameState = "play"
    }
  }
  if(gameState=="play"){
    infbg.visible = true
    infbg.velocityX = -15

    if(infbg.x<0){
      infbg.x = infbg.width/2 
    }
    boy.visible = true
    boy.collide(ground)
    if((keyDown ("up") || keyDown ("space")) && boy.y>height-200){
      boy.velocityY = -20
    }
    boy.velocityY +=1.2
    
    createCoins()

    for(var i=0;i<coinsGroup.length;i++){
      if(boy.isTouching(coinsGroup[i])){
        coinsGroup[i].destroy()
      }
    }
  }
  if(gameState=="end"){

  }

  drawSprites(); 
  
}

function createCoins(){
  if(frameCount%(Math.round(random(70,90)))==0){
    coin = createSprite(width,random(height/2+50,height-100))
    coin.addImage(coinImg)
    coin.velocityX = -15
    coin.scale = 0.2
    coinsGroup.add(coin)
    coin.lifetime = 500
  }
}

