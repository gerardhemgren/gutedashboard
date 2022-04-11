// DATABASE
//

var db = firebase.firestore();
let tradesRef = db.collection('gutentrades');

// Cloud listener: onSnapshot as realtime listener

let trades
tradesRef.where("id", "!=", true)
    .onSnapshot(function (querySnapshot) {
        trades = [];    // resets array preventing append the updated collection
        querySnapshot.forEach(function (doc) {
            trades.push(doc.data());
        });
        render();
        newChart();
    });

let tradeAddBtn = document.getElementById('trade-add-btn').addEventListener('click', () => updateTrade(true))
let tradeSubBtn = document.getElementById('trade-sub-btn').addEventListener('click', () => updateTrade(false))
function updateTrade(condition) {
    if (selection) {
        let tradeSelection = trades.find(i => i.id == selection)
        condition == true ? tradeSelection.quant += 1 : tradeSelection.quant -= 1;
        return tradesRef.doc(selection).update({
            quant: tradeSelection.quant
        })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
    }
}


// RENDERING
//

let selection;
function selectItem(id) {
    selection = id;
    focusItem()
}

function focusItem() {
    let items = document.getElementsByClassName('item')
    for (let e = 0; e < items.length; e++) {
        items[e].classList.remove('focus');
    }
    if (selection) document.getElementById(selection).classList.add('focus');
}

function addQuantUpdateStyle() {
    if (selection) document.getElementById(selection).lastElementChild.classList.add('itemQuantUpdate');
}

let itemContainer = document.getElementById('itemContainer');
let chartLabel;
let chartQuant;
function render() {
    itemContainer.innerHTML = '';
    chartLabel = [];
    chartQuant = [];
    for (let e = 0; e < (trades.length); e++) {
        let item = document.createElement('div'); item.classList.add('item'); item.setAttribute('id', trades[e].id);
        let itemName = document.createElement('div'); itemName.classList.add('itemName'); itemName.innerHTML = `${trades[e].name}`;
        let itemQuant = document.createElement('div'); itemQuant.classList.add('itemQuant'); itemQuant.innerHTML = `${trades[e].quant}`;
        item.appendChild(itemName); item.appendChild(itemQuant);
        itemContainer.appendChild(item);
        chartLabel.push(trades[e].name);
        chartQuant.push(trades[e].quant);
        item.addEventListener('click', function () {
            selectItem(this.getAttribute('id'));
        });
    };
    focusItem();
    addQuantUpdateStyle();
}


// CHART
//

let ctx = document.getElementById('chart').getContext('2d');
let myChart;
function newChart() {
    if (myChart === undefined) {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabel,
                datasets: [{
                    label: ' ',
                    data: chartQuant,
                    backgroundColor: 'rgba(0, 250, 250, .4)',
                    hoverBackgroundColor: 'rgba(0, 250, 250, 1)',
                    borderColor: 'rgba(0, 250, 250, 1)',
                    borderWidth: 1,
                    borderRadius: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'rgba(0, 250, 250, .7)'
                        },
                        gridLines: {
                            color: "rgba(255, 255, 255,.15)",
                            borderDash: [2]
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#40f5f5'
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 0
                    }
                },
                animation: {
                    duration: 0
                },
                legend: {
                    display: false,
                }
            }
        });
    } else {
        updateConfigByMutating();
    }
}

function updateConfigByMutating() {
    myChart.data = {
        labels: chartLabel,
        datasets: [{
            label: ' ',
            data: chartQuant,
            backgroundColor: 'rgba(0, 250, 250, .4)',
            hoverBackgroundColor: 'rgba(0, 250, 250, 1)',
            borderColor: 'rgba(0, 250, 250, 1)',
            borderWidth: 1,
        }]
    }
    myChart.update();
}