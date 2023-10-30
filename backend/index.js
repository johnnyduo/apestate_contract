const express = require("express")
const { ethers } = require("ethers")
const app = express()
const port = 3556

app.get('/data/:landId', (req, res) => {
  let price;

  switch (parseInt(req.params.landId)) {
    case 1: price = 150000; break;
    case 2: price = 462500; break;
    case 3: price = 45000; break;
    case 4: price = 74000; break;
  }

  if (!price) {
    return res.sendStatus(400)
  }

  res.send({
    price: price,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
