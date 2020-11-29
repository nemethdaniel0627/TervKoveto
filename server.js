const express = require('express');

const app = express();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


app.get('/api/customers', async (req, res) => {
  // await sleep(4000);
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.get("/file/:fileID", (req,res) =>{
  console.log(req.params.fileID);
});

const port = 5000;

app.listen(process.env.PORT || port, () => `Server running on port ${port}`);