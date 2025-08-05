const chuni = require("./lib");
const fs = require("fs");
(async () => {
    const data = await fs.readFileSync("./testdata.c2s")
    //  console.log(data.toString())
    chuni.parse(data.toString())
})()