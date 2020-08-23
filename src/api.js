const express = require("express"),
    app = express(),
    router = express.Router(),
    serverless = require("serverless-http"),
    excuses = require("../data/Excuses.json"),
    allTags = require("../data/tags.json");

//////////////////////////////////////////funuctions//////////////////////////////////////////
const between = function(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const findById = function(id) {
    let i;
    for (i = 0; excuses.length > i; i += 1) {
        if (excuses[i].id === id) {
            return excuses[i];
        }
    }
}

const findByTag = function(tag) {
    tag = tag.toLowerCase();
    let i;
    let excusesInTag = [];

    for (i = 0; excuses.length > i; i += 1) {
        if (excuses[i].Tag == tag) {
            excusesInTag.push(excuses[i]);
        }
    }
    return excusesInTag;
};
//////////////////////////////////////////end of funuctions//////////////////////////////////////////


//////////////////////////////////////////Routes//////////////////////////////////////////

// Get a random excuse
app.get('/random', (req, res) => {
    let excuse = findById(between(1, 100));
    res.send(excuse)
})

//Get a random excuse from a specific tag
app.get('/random/:tag', (req, res) => {
    let excusesInTag = findByTag(String(req.params.tag))
    excuseInTag = excusesInTag[Math.floor(Math.random() * excusesInTag.length)];
    if (excuseInTag) {
        res.send(excuseInTag);
    } else {
        res.sendStatus(404)
    }
})

//Get all excuses
app.get('/all', (req, res) => {
    res.send(excuses);
})

//Get all tags
app.get("/tags", (req, res) => {
    res.send(allTags);
})

//get the number of total excuses
app.get("/total", (req, res) => {
    res.send({ 'length': excuses.length });
})

//Get all excuses by in a spesific tag

app.get("/all/:tag", (req, res) => {
    let excusesInTag = findByTag(String(req.params.tag))
    if (excusesInTag) {
        res.send(excusesInTag);
    } else {
        res.sendStatus(404)
    }
})

//Get an excuse by id
app.get('/:id', (req, res) => {
    if (req.params.id <= excuses.length && req.params.id > 0) {
        res.send(findById(parseInt(req.params.id)))
    } else {
        res.sendStatus(404);
    }
})

//Don't add a route under this. add it above the id route, dumbo

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);