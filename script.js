const container = document.querySelector("#container");
const button = document.querySelector("#resize")

let rowDiv;
let pixelDiv;

button.addEventListener(`click`,resizeGrid);

// listen for mouse down and moving to color
// listen for mouse up to stop coloring
container.addEventListener('mousedown', function(e) {
    container.addEventListener('mousemove', mouseMove);
    container.addEventListener('mouseup', mouseUp);
});
function mouseMove(e){
    let targetPixelID = '#' + e.target.id;
    let targetPixel = document.querySelector(targetPixelID);
    targetPixel.style.backgroundColor = randomColour();
    let currentOpacity = window.getComputedStyle(targetPixel).getPropertyValue('opacity')
    let newOpacity = (Number(currentOpacity)*10 + 1)/10;
    targetPixel.style.opacity = newOpacity;
    console.log(targetPixel.style.opacity = newOpacity);
}
function mouseUp(event){
    container.removeEventListener('mousemove', mouseMove);
    container.removeEventListener('mouseup', mouseUp);
}

// grab random color for cell
function randomColour(){
    function randomRGB(){
        let rGB = (Math.random()*256);
        rGB = Math.floor(rGB);
        return rGB;
    }
    let colour1 = randomRGB();
    let colour2 = randomRGB();
    let colour3 = randomRGB();
    let finalColour = `rgb(${colour1},${colour2},${colour3})`
    return finalColour;
}

//resizing grid by user input
function resizeGrid(){
    let promptMessage = `Choose your grid dimension! Enter a number between 1 and 100.`;
    let newSize = prompt(promptMessage);
    newSize = Number(newSize);
    while (isNaN(newSize)
        || newSize < 1
        || newSize > 100
        || newSize != Math.round(newSize)){
        if (newSize === null) return;
        alert(`Invalid input`);
        newSize = prompt(promptMessage);
    }
    container.textContent = ``;
    createRow(newSize);
}

// create rows and cells
function createRow(numberOfRows){
    for (let i = 0; i < numberOfRows; i++){
        rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.setAttribute(`id`,`row${i}`);
        container.appendChild(rowDiv);
        createCell(numberOfRows, i);
    }
}
function createCell(numberOfRows,rowNumber){
    for (let j = 0; j < numberOfRows; j++){
        pixelDiv = document.createElement("div");
        pixelDiv.classList.add("pixel");
        pixelDiv.setAttribute(`id`,`pixel${rowNumber}-${j}`);
        pixelDiv.style.opacity = 0;
        document.querySelector(`#row${rowNumber}`).appendChild(pixelDiv);
    }
}

//default grid setup
createRow(16);