const fs = require("fs");

function createJsonDb(Datajson) {
  fs.writeFileSync("db.json", JSON.stringify(Datajson, null, 4), error => {
    if (error) throw error;
    console.error("Deu ruim", error);
  });
}

module.exports = { createJsonDb };
