/** Command-line tool to generate Markov text. */
// http://www.gutenberg.org/files/11/11-0.txt // Alice
// https://www.gutenberg.org/cache/epub/1524/pg1524.txt // Hamlet
// https://www.gutenberg.org/files/2701/2701-0.txt // Moby Dick

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");

function makeTextFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("There was an error. Did you include a correct file name or URL? Please try again. Error message is: ", err)
            process.kill(1)
        } else {
            let mm = new markov.MarkovMachine(data)
            console.log(mm.makeText())
        }
    })
}

async function makeTextFromURL(url) {
    try {
        let r = await axios.get(url)
        let mm = new markov.MarkovMachine(r.data.slice(999))
        console.log(mm.makeText())
    }
    catch (e) {
        console.log(`There was an error. Did you include a correct file name or URL? Please try again. Error message is: Error fetching ${url}: ${e}`);
        process.exit(1);
    }
}

try {
    if (process.argv[2].startsWith("http")) {
        makeTextFromURL(process.argv[2]);
    } else {    
        makeTextFromFile(process.argv[2]);
    }    
}
catch(e) {
    console.log("There was an error. Did you include a correct file name or URL? Please try again. Error message is: ", e.message)
  }
