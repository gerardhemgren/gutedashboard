let result;
let solidColor = [];
let alphaColor = [];

function getRandomNumber() {
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * 1000);
    } while (randomNum >= 200) // threshold
    return result = parseFloat(randomNum);
}

function setColor() {
    getRandomNumber();
    alphaColor.push(`rgba(${result}, 240, 250, 0.5)`);
    solidColor.push(`rgba(${result}, 240, 250, 0.8)`);
}

export { setColor, solidColor, alphaColor };