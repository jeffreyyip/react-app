import React from 'react';

const HistorySelect = props => {

 
    return (
        <div className="form-group">
          <label>Phone history : </label>
            <div>
            <select className="form-Control" value={props.value} onChange={props.onChange} name={props.name}>
              {props.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.displayValue}
                </option>
              ))}
            </select>
            </div>
            <p>(you could select the phone here and click validate to verify it again)</p>
        </div>
    );
}

export default HistorySelect;