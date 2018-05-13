import React from 'react';
import ReactDOM from 'react-dom';
import StockEntry from './components/stockEntry';

class AppComponent extends React.Component {
  render(){
    return (
      <div>
        <h1>Stockish</h1>
        <StockEntry />
      </div>
    )
  }
}

ReactDOM.render(<AppComponent />, document.getElementById("app"));