import React from 'react';

const CompanyNews = (props) => (
  <div>
    <table>
      <tbody>
        {
          props.values.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.paramName}</td>
                <td>{item.paramValue}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  </div>
);

export default CompanyNews;