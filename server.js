const express = require('express');
const mysql = require('mysql');

const app = express();

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

  // const msg = {
  //   msg: "Msg received, " + req.params.fileID
  // }

});

const port = 5000;

app.listen(process.env.PORT || port, () => `Server running on port ${port}`);