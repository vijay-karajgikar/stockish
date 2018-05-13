const express = require("express");
const request = require("request");
const stockDataRouter = express.Router();
const bodyParser = require("body-parser");


stockDataRouter.get("/company/:symbol", (req, res) => {
  
  request.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/company`, (error, stockData) => {
    if (error) {
      console.log(error);
      res.json({success: false, status: 500, message: "Unknown error"});
      return;
    }
    res.json({success: true, status: stockData.statusCode, data: JSON.parse(stockData.body)});
  });

});

stockDataRouter.get("/chart/:symbol/:range", (req, res) => {
  console.log(req.params.range);
  console.log(req.params.symbol);

  request.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/${req.params.range}`, 
    (err, chartData) => {

      if (err) {
        console.log(err);
        res.json({success: false, status: error.statusCode, message: "Unknown Error"});
        return;
      }

      res.json({success: true, status: chartData.statusCode, data: JSON.parse(chartData.body)});
  });
});



module.exports = stockDataRouter;