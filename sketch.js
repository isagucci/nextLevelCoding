let colors = ['#E8E51B', '#16A42C', '#F45911', '#D21A57', '#F82424', '#9B1AD2'];
let myBallsData = [];
const numBalls = 50;
const fallingSpeed = 6; 
let images = ['project2/hinge.svg', 'project2/tinder.svg']; 

function preload() {
    images = images.map(img => loadImage(img, 
        () => console.log("Loaded: " + img), 
        err => console.error("Failed to load image: " + err)
    ));
}

function setup() {
    createCanvas(500, 400);
    
    for (let i = 0; i < numBalls; i++) {
        let ballsData = {
            color: random(colors),
            xPos: random(width * 0.3, width * 0.7),
            yPos: random(-100, 0), 
            outerWidth: 30,
            image: random(images) 
        };
       
        myBallsData.push(ballsData);
    }
}

function draw() {
    background("white");

    for (let balls of myBallsData) {
        balls.yPos += fallingSpeed;
        
        if (balls.yPos > height + 50) {
            balls.yPos = random(-100, 0); 
            balls.xPos = random(width * 0.3, width * 0.7); 
            balls.image = random(images); 
        }

        drawBalls(balls.xPos, balls.yPos, balls.outerWidth, balls.color, balls.image);
    }
    
    drawCandyBox(width * 0.2, 0, width * 0.6, 150);
}

function drawBalls(xPos, yPos, size, color, img) {
    fill(color); 
    noStroke();
    ellipse(xPos, yPos, size, size); 
    
    let imgSize = size * 0.6; 
    image(img, xPos - imgSize / 2, yPos - imgSize / 2, imgSize, imgSize); 
}

function drawCandyBox(xPos, yPos, width, height) {
    fill("pink"); 
    rect(xPos, yPos + 20, width, height - 20); 

    fill("lightpink");
    beginShape();
    vertex(xPos, yPos + 20); 
    vertex(xPos + width, yPos + 20); 
    vertex(xPos + width - 20, yPos); 
    vertex(xPos + 20, yPos); 
    endShape(CLOSE);

    
    textFont("ziclets"); 
    fill("darkred");
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Date Night", xPos + width / 2, yPos + height / 2 + 20); 
}

