let result;
function getRandomNumber() {
    let random = 256;
    do {
        random = Math.floor(Math.random() * 1000);
    } while (random >= 256)
    return result = random;
}

let randomColor = [];
let randomColorAlpha = []
function setColor() {
    let randomValue = [];
    for (let i = 0; i < 3; i++) {
        getRandomNumber();
        randomValue.push(parseFloat(result));
    }
    // randomValue.push(.3);
    randomColorAlpha.push(`rgba(${randomValue},.6)`);
    randomColor.push(`rgb(${randomValue})`);
}

export default setColor;