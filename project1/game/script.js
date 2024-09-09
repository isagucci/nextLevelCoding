let one = "wine.png";//mycode
let two = "mule.png";
let three = "martini.png";
let four = "cosmo.png";
let five = "cigarette.png";
let pictures = [one, two, three, four, five];

let timeRemaining = 20; 
let timerElement = document.getElementById('timer');


function myFunction() {
    if (timeRemaining <= 0) return; 

    let randomIndex = Math.floor(Math.random() * pictures.length);//mycode
    let body = document.querySelector("body");
    let image = document.createElement("img");
    image.src = pictures[randomIndex];
    image.style.width = "200px";
    image.style.position = "absolute"; 
    image.style.top = (Math.random() * 90) + "%";
    image.style.left = (Math.random() * 95) + "%";
    body.appendChild(image);
 

    image.addEventListener('click', function() {
        body.removeChild(image);
    });

   
}
//sourced
let gameInterval;
let countdownInterval;
let myInterval = setInterval(myFunction, 1000);

function startGame() {
    timeRemaining =20;
    timerElement.textContent = timeRemaining;
    gameInterval = setInterval(myFunction, 1000);

    countdownInterval = setInterval(function() {
        timeRemaining--;
        timerElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(gameInterval);
            clearInterval(countdownInterval);
            alert("Time's up! It's time to go home!");
            if (confirm("Do you want to try again?")) {
                window.location.reload(); 
            }
        }
    }, 1000);
}

window.onload = startGame;
