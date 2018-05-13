import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import CompanyNews from './companyNews';
import CompanyChart from './companyChart';

class StockEntry extends React.Component {

  state = {
    symbol: undefined,
    success: false,
    companyName: undefined,
    industry: undefined,
    description: undefined,
    ceo: undefined,
    sector: undefined,
    selectedOption: undefined,
    params: []
  };

  getCompanyChart = (symbol) => {

    axios.get(`http://localhost:8908/stocks/chart/${symbol}/1m`)
          .then((res) => {
            var chartValues = res.data.data.map((item) => {
              return { 
                date: item.date, 
                close: item.close, 
              }
            });

            this.setState((prevState) => {
              return {
                symbol: res.data.data.symbol,
                success: true,
                params: chartValues
              }
            });

          })
          .catch((error) => {

          });
  }

  getCompanyNews = (symbol) => {

    axios.get(`http://localhost:8908/stocks/company/${symbol}`)
         .then((res) => {

            const paramsArray = [];
              paramsArray.push({paramName: "symbol", paramValue: res.data.data.symbol});
              paramsArray.push({paramName: "companyName", paramValue: res.data.data.companyName});
              paramsArray.push({paramName: "industry", paramValue: res.data.data.industry});
              paramsArray.push({paramName: "description", paramValue: res.data.data.description});
              paramsArray.push({paramName: "ceo", paramValue: res.data.data.CEO});
              paramsArray.push({paramName: "sector", paramValue: res.data.data.sector});
              paramsArray.push({paramName: "website", paramValue: res.data.data.website});

              this.setState((prevState) => {
                return {
                  symbol: res.data.data.symbol,
                  success: true,                  
                  params: paramsArray
                }
              });
            })
         .catch((error) => {

         });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const inputValue = e.target.stockInput.value;
    console.log(`inputvalue ${inputValue}`);

    this.setState((prevState) => {
      return {
        symbol: undefined, success: false, companyName: undefined, industry: undefined,
        description: undefined, ceo: undefined, sector: undefined, params: []
      }
    });

    if (this.state.selectedOption === "company_news") {
      console.log("Getting Company News");
      this.getCompanyNews(inputValue);
    }
    
    if (this.state.selectedOption === "stock_chart") {
      console.log("Getting company chart");
      this.getCompanyChart(inputValue);
    }
  }

  handleOptionChange = (e) => {
    console.log(e.target.value);
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            <input type="radio" name="viewType" value="company_news" 
                    onChange={this.handleOptionChange} checked={this.state.selectedOption === "company_news"} />
                    Company News 
          </label>
          <label>
            <input type="radio" name="viewType" value="stock_chart"
                    onChange={this.handleOptionChange} checked={this.state.selectedOption === "stock_chart"} />
                    Stock Chart  <br />
          </label>          
          <input type="text" name="stockInput" />
          <button>Submit</button>
        </form>
        <div>
        {
          this.state.success && this.state.selectedOption === "company_news" &&
             <CompanyNews values={this.state.params} />
        }
        </div>
        <div>
        {
          this.state.success && this.state.selectedOption === "stock_chart" &&
            <CompanyChart values={this.state.params} />
        }
        </div>
      </div>
    )
  }
}

export default StockEntry;