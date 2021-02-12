var ball;
var db, positionRef;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    db = firebase.database();

    // READ
    // To create a reference - ref()
    positionRef = db.ref("Ball");
    // Permanent listener whenever value change occurs - on()
    positionRef.on("value", readPosition, showError);


    // var data = {
    //     Ball : {
    //         X : 250,
    //         Y : 250
    //     }
    // }
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){    
    // write to the database - set()
    positionRef.set({
        X : ball.x + x,
        Y : ball.y + y
    });
}

function readPosition(data) {
    // Extract the JSON data - val()
    var pos = data.val();  // {X : 250, Y : 250}
    ball.x = pos.X;
    ball.y = pos.Y;
}

function showError(errorMsg) {
    console.log(errorMsg);
}
