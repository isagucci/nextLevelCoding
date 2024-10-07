let color = ['#E8E51B', '#16A42C', '#F45911', '#D21A57', '#F82424', '#9B1AD2'];
let svgImages = ['hinge.svg', 'tinder.svg']; 

document.addEventListener('scroll', createFallingBalls);

function createFallingBalls() {
    for (let i = 0; i < 7; i++) {
        let ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.backgroundColor = getRandomColorFromArray(); 
        ball.style.left = `${getRandomInt(0, window.innerWidth - 50)}px`; 
        ball.style.bottom = '0'; 
        
        
        let img = document.createElement('img');
        img.src = getRandomSVG(); 
        img.style.width = '100%'; 
        img.style.height = '100%';
   
        img.style.display = 'block';
        img.style.borderRadius = '50%'; 


        ball.appendChild(img);
        document.body.appendChild(ball);

        
        if (document.querySelectorAll('.ball').length >20) {
            document.removeEventListener('scroll', createFallingBalls);
        }
    }
}


function getRandomColorFromArray() {
    return color[Math.floor(Math.random() * color.length)];
}


function getRandomSVG() {
    return svgImages[Math.floor(Math.random() * svgImages.length)];
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
