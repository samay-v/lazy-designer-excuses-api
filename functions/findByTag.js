const between = require("./between"),
    excuses = require("../data/Excuses.json");

module.exports = function(tag) {
    tag = tag.toLowerCase();
    let i;
    let excusesInTag = [];

    for (i = 0; excuses.length > i; i += 1) {
        if (excuses[i].Tag == tag) {
            excusesInTag.push(excuses[i]);
        }
    }
    return excusesInTag[Math.floor(Math.random() * excusesInTag.length)];
}