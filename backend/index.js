const express = require("express")
const { ethers } = require("ethers")
const app = express()
const port = 3556

app.get('/data/:landId', (req, res) => {
  let price;

  switch (parseInt(req.params.landId)) {
    case 1: price = ethers.parseEther("100"); break;
    case 2: price = ethers.parseEther("200"); break;
    case 3: price = ethers.parseEther("300"); break;
    case 4: price = ethers.parseEther("400"); break;
  }

  if (!price) {
    return res.sendStatus(400)
  }

  res.send({
    price: price.toString(),
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
