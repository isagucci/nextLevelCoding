
const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
    container.addEventListener('onclick', () => {
        container.style.pointerEvents = 'none'; 
    });

    container.addEventListener('onclick', () => {
        container.style.pointerEvents = 'auto'; 
    });
});
