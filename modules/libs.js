function metersToMiles(routeLength) {
    return parseFloat((routeLength / 1610).toFixed(2))
}

//--------------------------------given function
const calculateCharges = (routeLength) => {
    /* Distance in miles */
    const dist = metersToMiles(routeLength);

    let deliveryCharges = 7.0;


    deliveryCharges = parseFloat(
        (dist + 1).toFixed(2),
    );
    if (dist < 2.5) {
        deliveryCharges = 1.0;
    } else if (dist > 2.49 && dist < 5) {
        deliveryCharges = 2.0;
    } else if (dist > 4.99 && dist < 7) {
        deliveryCharges = 3.0;
    } else if (dist < 10.01) {
        deliveryCharges = 5;
    } else {
        deliveryCharges = 10
    }

    return deliveryCharges;
};

function getFormattedOutput(currentCustomer, nextCustomer, shortestRoute) {

    return {
        "customer": `${nextCustomer}`,
        "deliveryCharges": `${calculateCharges(shortestRoute)}`,
        "path": `${metersToMiles(shortestRoute)} mi from ${currentCustomer} to ${nextCustomer}`
    };
}

function logFormattedOutput(currentCustomer, destinationCustomer, routeDistance) {
    console.log(getFormattedOutput(currentCustomer, destinationCustomer, routeDistance))
}

function batchExceededNotification(coveredDistance, maxRouteLength){
    console.log("DELIVERED ACROSS ", metersToMiles(coveredDistance), " miles. Next delivery will exceed route limit.")
    console.log("DELIVERY BATCH EXCEEDED MAX DELIVERY ROUTE: ", metersToMiles(maxRouteLength), " miles");
    console.log("RETURNING............");
    console.log(".\n.\n.\n.\n.\n")
    console.log("STARTING NEW DELIVERY BATCH--------------------------");

}
function getFormattedData(data){
    let testObj = {};
    let keys = ["Store", ...data.customers];

    let distanceData = data.rows;

    for(let i = 0; i<keys.length; i++){
        testObj[keys[i]] = {};
        let tempObj = testObj[keys[i]];

        for(let j=0; j<keys.length-1; j++){
            if(keys[i]!==keys[j+1]){
                tempObj[keys[j+1]]= distanceData[i].elements[j].distance.value;
            }


        }
    }

    return testObj;
}
//-----------------------------------GIVEN
const maxRouteLength = 8046 + (8046 * 0.3);

/**
 * Format final output
 * @param currentOutput
 * @param coveredDistance
 * @param output
 */
function setTotalOut(currentOutput, coveredDistance, output) {
    currentOutput["totalLength"] = `${metersToMiles(coveredDistance)} miles from Store.`;
    output.push({...currentOutput});
}

module.exports = {
    logFormattedOutput,
    calculateCharges,
    metersToMiles,
    showBatchExceededNotification: batchExceededNotification,
    maxRouteLength,
    getFormattedData,
    getFormattedOutput,
    setTotalOut
}


let paths1 = {
    S: {
        A: 7374,
        B: 8021,
        C: 3147,
        D: 7374
    },
    A: {
        B: 2908,
        C: 5446,
        D: 0
    },
    B: {
        A: 2938,
        C: 7165,
        D: 2938
    },
    C: {
        A: 5734,
        B: 7919,
        D: 5734
    },
    D: {
        A: 0,
        B: 2908,
        C: 5446,
    }
}