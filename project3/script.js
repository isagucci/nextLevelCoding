async function getData() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            console.log(response); 

            if (response.content && Object.keys(response.content).length > 0) {
                const content = response.content;
                const firstSongKey = Object.keys(content)[0]; 
                const artistName = content[firstSongKey].artist; 
                console.log("Artist Name:", artistName); 
                
                changeBackgroundColor(); 
                createWaveEffectLogo(artistName);

            } else {
                console.error("No content found in response");
            }
        }
    });

    xhr.open('GET', 'https://billboard-api2.p.rapidapi.com/radio-songs?date=2024-06-01&range=1-10');
    xhr.setRequestHeader('x-rapidapi-key', '75e8b635fbmsh9139d315aa67327p1d8ad5jsn4b8eae368c7a'); 
    xhr.setRequestHeader('x-rapidapi-host', 'billboard-api2.p.rapidapi.com');

    xhr.send(data);
}


getData();

function createWaveEffectLogo(artistName) {
    const h1 = document.querySelector('h1');
    h1.innerHTML = 'billboard'; 
    const letters = h1.textContent.split('');
    h1.innerHTML = '';

    letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        const stretch = Math.sin((i / letters.length) * Math.PI * 2) * (artistName.length * 3); 
        span.style.display = 'inline-block'; 
        span.style.transform = `translateY(${stretch}px)`;
        span.style.transition = 'transform 0.3s'; 
        h1.appendChild(span); 
    });
}


function getRandomColor() {
    const colors = ['#24AA4A', '#FA9D1D', '#ED1C34', '#FDDE04', '#2EAEE4'];
    const randomIndex = Math.floor(Math.random() * colors.length); 
    return colors[randomIndex]; 
}


function changeBackgroundColor() {
    const circle = document.querySelector('.circle');
    const randomColor = getRandomColor();
    circle.style.backgroundColor = randomColor; 
}


getData();
