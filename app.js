/*Mongo CLient*/

const express = require("express");
const app = express();
const port = 4000;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url ="mongodb+srv://James:OWJc3Ob92B9hZVft@cluster0.rt55j.mongodb.net/COVID-DATA";

// DB Name
// const dbName = 'COVID_CASES';
const dbName = "COVID-DATA";

// Creating new MongoClient
const client = new MongoClient(url);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  // Stating the constants needed
  const db = client.db(dbName);
  const collection = db.collection("covid-19");

  // Finding all the cases
  collection.find({}).toArray(async function (err, cases_list) {
    assert.equal(err, null);
    let cases = await cases_list;
    res.render("index.ejs", { "corona_virus": cases });
  });
});

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// Connecting to server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("====================================");
  console.log("Connected successfully to DB😐 ");
  console.log("====================================");

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
