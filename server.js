const express = require("express"),
    app = express(),
    port = 3000,
    between = require("./functions/between.js"),
    findById = require("./functions/findById"),
    findByTag = require("./functions/findByTag"),
    excuses = require("./data/Excuses.json"),
    allTags = require("./data/tags.json");

// Get a random excuse
app.get('/random', (req, res) => {
    let excuse = findById(between(1, 100));
    res.send(excuse)
})

//Get a random excuse from a specific tag
app.get('/random/:tag', (req, res) => {
    let excusesInTag = findByTag(String(req.params.tag));
    if (excusesInTag) {
        res.send(excusesInTag);
    } else {
        res.sendStatus(404)
    }
})

//Get all tags
app.get("/tags", (req, res) => {
    res.send(allTags);
})

//Get all excuses
app.get('/excuse/all', (req, res) => {
    res.send(excuses);
})

//get the number of total excuses
app.get('/excuse/total', (req, res) => {
    let length = { 'length': excuses.length }
    res.send(length);
})

//Get an excuse by id
app.get('/excuse/:id', (req, res) => {
    if (req.params.id <= excuses.length && req.params.id > 0) {
        res.send(findById(parseInt(req.params.id)))
    } else {
        res.sendStatus(404);
    }
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))