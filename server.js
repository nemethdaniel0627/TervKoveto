const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


app.get('/api/customers', async (req, res) => {
  // await sleep(4000);
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' },
  ];

  res.json(customers);
});

app.get("/files/:fileID", (req, res) => {
  // console.log(req.params.fileID);
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tervekdb"
  });
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM tervek", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      let notfound = true;
      result.map(record => {
        if (record.id.toString() == req.params.fileID.toString()) {
          res.json({ name: record.name, id: record.id });
          con.destroy();
          notfound = false;
        }
      })
      if (notfound) {
        res.json({ name: "Not found", id: "Not found" });
        con.destroy();
      }
    });
  });
});

app.post("/file", (req,res) =>{
  const name = req.body.name;
  const id = req.body.id;
  console.log(name + " " + id);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tervekdb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = 'INSERT INTO tervek VALUES ("' + id +'","' + name +'")';
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      con.destroy();
      res.json({msg: true})
    });
  });
  
});

const port = 5000;

app.listen(process.env.PORT || port, () => `Server running on port ${port}`);