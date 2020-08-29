const express = require("express"),
    app = express(),
    serverless = require("serverless-http"),
    excuses = require("../data/Excuses.json"),
    rateLimit = require("express-rate-limit"),
    allTags = require("../data/tags.json");

//////////////////////////////////////////funuctions//////////////////////////////////////////

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 5, // start blocking after 5 requests
    message: "Too many requests from this IP, you'll pay my server cost?!"
});

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

app.set("view engine", "ejs");


//f*&# CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

app.use(limiter);

//Don't add a route under this. add it above the id route, dumbo

// app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))

// app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);