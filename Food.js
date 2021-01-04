class Food{
    constructor(){
        this.image = loadImage("Milk.png");
    }

    getFoodStock(){
        var foodStockRef = database.ref("food");
        foodStockRef.on("value", function(data){
            foodS = data.val();
        });
    }

    deductFood(){
        if(foodS <= 0){
            foodS = 0
        }else{
            foodS = foodS - 1;
        }
    }

    updateFoodStock(){
        database.ref("/").update({
            food: foodS
        });
    }
    
    display(){
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
        for(var i = 0; i < foodS; i++){
            if(i % 10 === 0){
                x = 80;
                y = y +50;
            }
            image(this.image, x, y, 50, 50);
            x = x + 30;
        }
    }
}