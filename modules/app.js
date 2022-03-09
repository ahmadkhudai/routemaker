
const {
   getFormattedData, maxRouteLength, getFormattedOutput, setTotalOut,
} = require("./libs");


/**
 * Get starting node (here it will be store)
 * @param paths
 * @returns {string}
 */
function getStartingNode(paths) {
    return Object.keys(paths)[0];
}


/**
 * Get next customer closest to the current customer
 * @param currentCustomer
 * @param visitedCustomers
 * @param paths
 * @param coveredDistance
 * @param maxRouteLength
 * @param output
 * @param currentOutput
 * @returns {(string|*)[]}
 */
function getNextCustomer
(currentCustomer, visitedCustomers, paths, coveredDistance, maxRouteLength, output, currentOutput)
{

    let shallowPath;
    if (!currentCustomer) {
        currentOutput["route"] = [];
        //handle first customer
        currentCustomer = getStartingNode(paths);
        shallowPath = paths[Object.keys(paths)[0]];
    } else {
        //unvisited customers
        let customers = Object
            .keys(paths[currentCustomer])
            .filter(customer => !(visitedCustomers.includes(customer)))
        //visited customers
        let toRemovePaths = Object
            .keys(paths[currentCustomer])
            .filter(customer => (visitedCustomers.includes(customer)))

        //no unvisted customer exists
        if (customers.length === 0) {

            setTotalOut(currentOutput, coveredDistance, output);
            // console.log(metersToMiles(coveredDistance));
            return undefined;
        }


        //creating shallow path so we can modify it without
        //changing the original path
        shallowPath = {...paths[currentCustomer]};
        if (toRemovePaths.length > 0) {
            toRemovePaths.forEach(customer => {
                //remove visited customer
                delete shallowPath[customer];
            })
        }
    }


    let [nextCustomer, shortestRoute] = getNearestDestination(shallowPath);

    if ((coveredDistance + shortestRoute) >= maxRouteLength) {

        setTotalOut({...currentOutput}, coveredDistance, output);
        currentCustomer = getStartingNode(paths);

        //recursively call self
        return getNextCustomer(currentCustomer, visitedCustomers, paths, 0, maxRouteLength, output, {"route": []});
    }

    coveredDistance = coveredDistance + shortestRoute;
    currentOutput["route"].push(getFormattedOutput(currentCustomer, nextCustomer, shortestRoute));

    return [nextCustomer, coveredDistance, currentOutput];
}



/**
 * Get the nearest destination from given origin
 * @param origin
 * @returns {[string, unknown]}
 */
function getNearestDestination(origin) {
    let minDistance = Math.min(...Object.values(origin));
    let entries = Object.entries(origin);
    for (let i = 0; i < entries.length; i++) {
        if (entries[i][1] === minDistance) {
            return entries[i];
        }
    }
}


/**
 * main function
 * @param pathData
 */
function routeMaker(pathData) {
    let paths;
    try{
        paths = getFormattedData(pathData);
    }catch (err){
        console.log("ERROR, BAD DATA ", err);
        console.log("\n-------------------------------------\nEXITING.........")
        return;
    }

    let output = [];
    let currentOutput = {"route": []};
    let currentCustomer = undefined;
    let visitedCustomers = [];
    let coveredDistance = 0;
    while (true) {
        let temp = getNextCustomer
        (currentCustomer, visitedCustomers , paths, coveredDistance, maxRouteLength, output, currentOutput);
        if (!temp) break;
        currentCustomer = temp[0];
        coveredDistance = temp[1];
        currentOutput = temp[2];

        visitedCustomers.push(currentCustomer);
    }

    return output;

}

module.exports = {routeMaker};