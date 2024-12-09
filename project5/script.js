const firebaseConfig = {
  apiKey: "AIzaSyC-_5_7ID-Yv8zlbBDXoFz85GmB1wB0G4c",
  authDomain: "fir-nlc.firebaseapp.com",
  databaseURL: "https://fir-nlc-default-rtdb.firebaseio.com",
  projectId: "fir-nlc",
  storageBucket: "fir-nlc.firebasestorage.app",
  messagingSenderId: "468969211526",
  appId: "1:468969211526:web:0d0d2a7789b5bd125e3307",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = database.ref("stars");

const modal = document.getElementById("modal");
const kindnessForm = document.getElementById("kindnessForm");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const closeModalButton = document.getElementById("closeModalButton");

const descriptionDisplay = document.createElement("div");
descriptionDisplay.style.position = "absolute";
descriptionDisplay.style.backgroundColor = "#141A43"; 
descriptionDisplay.style.padding = "15px";
descriptionDisplay.style.width = "400px";
descriptionDisplay.style.height= "200px";
descriptionDisplay.style.borderRadius = "5px";
descriptionDisplay.style.color = "white";  
descriptionDisplay.style.fontFamily = '"Inter", sans-serif';  
descriptionDisplay.style.fontSize = "1rem";  
descriptionDisplay.style.fontWeight = "100";  
descriptionDisplay.style.zIndex = "9999";
descriptionDisplay.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";  
descriptionDisplay.style.display = "none";
document.body.appendChild(descriptionDisplay); 

window.addEventListener("load", () => {
  const isModalClosed = localStorage.getItem("modalClosed");

  if (!isModalClosed) {
    setTimeout(() => {
      modal.style.display = "flex"; 
    }, 3000);
  }
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none"; 
  localStorage.setItem("modalClosed", "true"); 
});

kindnessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const starData = {
    category: categoryInput.value,
    description: descriptionInput.value,
  };

  ref.push(starData); 


  categoryInput.value = "helping"; 
  descriptionInput.value = ""; 

  modal.style.display = "none"; 
  localStorage.setItem("modalClosed", "true"); 
});


ref.on("value", (snapshot) => {
  const data = snapshot.val();


  for (const key in data) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 2.6 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.borderRadius = "50%";
    star.style.position = "absolute"; 
    star.style.zIndex = "10"; 
    let baseTop, baseLeft;
    switch (data[key].category) {
      case "helping":
        baseTop = 100;
        baseLeft = 200;
        break;
      case "sharing":
        baseTop = 300;
        baseLeft = 500;
        break;
      case "teaching":
        baseTop = 500;
        baseLeft = 800;
        break;
      default:
        baseTop = 100;
        baseLeft = 200;
    }

    star.style.top = `${baseTop + Math.random() * 100}px`;
    star.style.left = `${baseLeft + Math.random() * 100}px`;

    
    star.addEventListener("click", (event) => {
      descriptionDisplay.style.display = "block"; 
      descriptionDisplay.innerHTML = `Category: <strong>${data[key].category}</strong><br> Description: <strong>${data[key].description}</strong>`;
      

      descriptionDisplay.style.top = `${event.clientY + 20}px`; 
      descriptionDisplay.style.left = `${event.clientX + 20}px`; 
    });

    document.body.appendChild(star); 
  }
});


window.addEventListener("click", (event) => {
  if (!descriptionDisplay.contains(event.target) && !event.target.classList.contains("star")) {
    descriptionDisplay.style.display = "none"; 
  }
});

