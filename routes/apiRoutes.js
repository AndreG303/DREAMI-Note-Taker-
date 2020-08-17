// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const notesData = require("../db/db.json");
const fs = require("fs");
const { uuid } = require("uuidv4");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });

    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {
        let noteID = uuid();
        let newNote = {
            id: noteID,
            title: req.body.title,
            text: req.body.test
        };


        fs.readFile("../db/db.json", "utf-8", (err, data) => {
            if (err) {console.log (err)}
            console.log(data);


            const notesInput = JSON.parse(data);
            notesInput.push(newNote);

            fs.writeFile("../db/db.json", JSON.stringify(notesInput, null, 2), err => {
                if (err) {console.log (err)}
                res.send(db);
                console.log('Your Note has been saved!');

            });
        });
    });


    app.delete("/api/notes/:id", (req, res) => {
        let noteID = req.params.id;

        fs.readFile("../db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const notesInput = JSON.parse(data);
            const notesData = notesData.filter((e, i) => i != noteID);

            fs.writeFile("../db/db.json", JSON.stringify(notesData, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("Your note has been deleted!")
            });
        });
    });
};
