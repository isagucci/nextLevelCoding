
let container = document.getElementById("dataHere");

let sheetID = '1u1tkCOrk5plO2shQNXCaCrGlFv3h4OPTJEoBWHtyGWQ';
let tabName = 'Sheet1';

let myURL = `https://opensheet.elk.sh/${sheetID}/${tabName}`;

const fragranceColors = {
  'Floral': '#ff8c94',
  'Tropical': '#ffab4c',
  'Herbal': '#C576F6',
  'Woody': '#c89f91',
  'Clean': '#94d3ff',
  'Fruity': '#afc96e',
  'Default': '#ffffff'
};

const functionTextures = {
  'Anti-Frizz': 'url(antifrizz.svg)',
  'Moisture': 'url(moisture.svg)',
  'Thickening': 'url(thickenning.svg)',
  'Repair': 'url(repair.svg)',
  'Volumizing': 'url(volume.svg)',
  'Regenerate': 'url(regenerate.svg)',
  'Tone': 'url(tone.svg)',
  'Default': 'none'
};

async function getData() {
  try {
    const response = await fetch(myURL);
    const data = await response.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function displayData(data) {
  data.forEach(item => {
    let backgroundDiv = document.createElement("div");
    backgroundDiv.classList.add("back");
    backgroundDiv.style.position = "relative"; 

    let routineDiv = document.createElement("div");
    routineDiv.classList.add("routine");

    let productDiv = document.createElement('div');
    productDiv.className = 'product';

    let svgImg = document.createElement('img');
    svgImg.src = 'logoblack.svg';
    svgImg.alt = 'Product Icon';
    svgImg.classList.add('product-icon');

    let opacity = map(item.routine, 4, 0, 0.2, 1);
    routineDiv.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;

    backgroundDiv.style.backgroundColor = fragranceColors[item.fragrance] || fragranceColors['Default'];

    let texture = functionTextures[item.function] || functionTextures['Default'];
    backgroundDiv.style.backgroundImage = texture;
    backgroundDiv.style.backgroundSize = 'cover'; 
    backgroundDiv.style.backgroundRepeat = 'no-repeat'; 


    routineDiv.innerHTML = `<p>${item.routine}</p>`;

    productDiv.innerHTML = `
      <h2>${item.name}</h2>
      <p>Hair Type: ${item.hair}</p>
      <p>Function: ${item.function}</p>
      <p>Fragrance: ${item.fragrance}</p>
    `;

    backgroundDiv.appendChild(productDiv);
    productDiv.insertBefore(svgImg, productDiv.firstChild);
    backgroundDiv.appendChild(routineDiv); 
    container.appendChild(backgroundDiv);
  });
}

getData();
