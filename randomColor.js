let result;
function getRandomNumber() {
    let randomNum = 256;
    do {
        randomNum = Math.floor(Math.random() * 1000);
    } while (randomNum >= 256)
    return result = randomNum;
}

let solidColor = [];
let alphaColor = [];

function setColor() {
    let randomValue = [];
    for (let i = 0; i < 3; i++) {
        getRandomNumber();
        randomValue.push(parseFloat(result));
    }
    alphaColor.push(`rgba(${randomValue},.5)`);
    solidColor.push(`rgba(${randomValue}, 1)`);
}

export { setColor, solidColor, alphaColor };