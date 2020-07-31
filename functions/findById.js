const between = require("./between"),
    excuses = require("../data/Excuses.json");

module.exports = function(id) {
    let i;
    for (i = 0; excuses.length > i; i += 1) {
        if (excuses[i].id === id) {
            return excuses[i];
        }
    }
}