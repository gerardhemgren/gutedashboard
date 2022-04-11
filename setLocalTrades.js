// Set  innitial trades from trades.js

function setLocalTrades() {
    for (t in tradesStore) {
        tradesRef.doc(`${tradesStore[t].id}`).set({
            name: tradesStore[t].name,
            id: tradesStore[t].id,
            quant: tradesStore[t].quant
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }
}

export default setLocalTrades;