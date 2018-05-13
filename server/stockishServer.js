const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.port || 8908;
const request = require("request");

const refDataRouter = require("./routes/refDataRoutes");
const stockDataRouter = require("./routes/stockDataRoutes");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '../client/public/'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/refData', refDataRouter);
app.use('/stocks', stockDataRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

app.listen(port, () => {  
  console.log("***********************************************************************");
  console.log("*                                                                     *");
  console.log(`*        Stockish server is available at http://localhost:${port}        *`);
  console.log("*                                                                     *");
  console.log("***********************************************************************");
  console.log(`http://localhost:${port}/stocks/company/aapl - serves company data for aapl`);
  console.log(`http://localhost:${port}/stocks/chart/aapl/1m - serves 1 months chart data for appl`);
});
