let input = document.getElementById('userInput');
let button = document.getElementById('submitBtn');


function getRandomPosition() {
    let x = Math.floor(Math.random() * window.innerWidth);  
    let y = Math.floor(Math.random() * window.innerHeight); 
    return { x, y };
}

function createMark(text, position = getRandomPosition()) {
    let mark = document.createElement('span');
    mark.classList.add('mark');
    mark.innerText = text;
    mark.style.left = `${position.x}px`;
    mark.style.top = `${position.y}px`;
    document.body.appendChild(mark);
}

function saveMark(text, position) {
    let storedMarks = JSON.parse(localStorage.getItem('marks')) || [];
    storedMarks.push({ text, position });
    localStorage.setItem('marks', JSON.stringify(storedMarks));
}

function loadMarks() {
    let storedMarks = JSON.parse(localStorage.getItem('marks')) || [];
    storedMarks.forEach(mark => {
        createMark(mark.text, mark.position);
    });
}

function leaveMark() {
    let userText = input.value; 
    if (userText.trim() === '') return; 


    let position = getRandomPosition();


    createMark(userText, position);
    saveMark(userText, position);

    input.value = '';
}

button.addEventListener('click', leaveMark);
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        leaveMark();
    }
});


window.onload = loadMarks;
