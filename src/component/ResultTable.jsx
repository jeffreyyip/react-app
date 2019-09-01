import React from 'react';

const ResultTable = props => {

    return (
        <div className="container">
            <h3>Validation Results</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>phone number</th>
                        <th>validation result</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.results.map( (result, index) =>
                            <tr key={index}> 
                                <td>{result.phone}</td>
                                <td>{result.message}</td>
                            </tr>
                        
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;