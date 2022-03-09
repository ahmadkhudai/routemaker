const express = require('express')
const app = express()
const port = 3000
const data = require("./distances/distance.json");
const {routeMaker} = require("./modules/app");

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json(routeMaker(data));
})

app.post('/', (req, res)=>{
    let tempData = req.body;
    res.status(201).json(routeMaker(tempData));
})

app.listen(port, () => {
    console.log(`PathFinder live on port: ${port}`)
})