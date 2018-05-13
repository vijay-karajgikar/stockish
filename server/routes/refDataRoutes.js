const express = require("express");
const refDataRouter = express.Router();
const request = require("request");


refDataRouter.get('/listSymbols', (req, res) => {

  request.get("https://api.iextrading.com/1.0/ref-data/symbols", (error, refData) => {
      if (error) {
        console.log(error);
        res.json({success: false, status: 500, message: "Unknown error"});
        return;
      }
      res.json({success: true, status: refData.statusCode, data: JSON.parse(refData.body)});
  });

});

module.exports = refDataRouter;