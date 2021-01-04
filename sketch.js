//Create variables here
var dog, dog_image, happydog_image;
var database;
var food, foodS;
var feed, addFood;
var fedTime, lastFed;
var readState, changeState, gameState;
var bedroom_image, garden_image, washroom_image;

function preload()
{
	//load images here
  dog_image = loadImage("Dog.png");
  happydog_image = loadImage("happydog.png");
  bedroom_image = loadImage("BedRoom.png");
  washroom_image = loadImage("WashRoom.png");
  garden_image = loadImage("Garden.png");
}

function setup() {
  //creating the canvas
	createCanvas(500, 550);

  

  //reading the database
  database = firebase.database();
  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState = data.val();
  })

  //creating the dog sprite
  dog = createSprite(250, 440, 100, 100);
  dog.addImage(dog_image);
  dog.scale = 0.2;

  //creating the food
  food = new Food();
  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
}


function draw() {  
  //add styles here
  fedTime = database.ref("feedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
  console.log(hour());
  
  textSize(20);
  fill("white");
  food.getFoodStock();
  
  if(foodS){
    console.log(foodS);
  }
  
  feed.mousePressed(feedDog);
  addFood.mousePressed(addfood);
  if(gameState){
    if(gameState !== "hungry"){
      feed.hide();
      addFood.hide();
    }else{
      feed.show();
      addFood.show();
    }
  }
    if(hour() === lastFed + 1){
      update("playing");
      garden();
    }
    if(hour() === lastFed + 2){
      update("sleeping");
      bedroom();
    }
    if(hour() > lastFed + 2 && hour() < lastFed + 4){
      update("washroom");
      washroom();
    }else{
      update("hungry");
      background(46, 139, 87);
      drawSprites();
      if(lastFed !== undefined){
        fill(255, 255, 254);
        textSize(15);
        if(lastFed>12){
          text("Last Fed : " + lastFed % 12 + " P.M", 150, 30);
        }else if(lastFed === 12){
          text("LastFed : " + lastFed + " P.M", 150, 30);
        }else{
          text("Last Fed : " + lastFed + " A.M", 150, 30);
        }
      }
      food.display();
    }
  console.log(gameState);
}

function feedDog(){
  if(foodS > 0){
    food.deductFood();
    food.updateFoodStock();
    database.ref("/").update({
      feedTime:hour()
    });
    dog.addImage(happydog_image);
  }
}

function addfood(){
  foodS = foodS + 1;
  database.ref("/").update({
    food: foodS
  });
}

function bedroom(){
  background(bedroom_image, 550, 500);
}

function garden(){
  background(garden_image, 550, 500);
}

function washroom(){
  background(washroom_image, 550, 500);
}

function update(state){
  database.ref("/").update({
    gameState: state
  });
}