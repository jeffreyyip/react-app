import React from 'react'


const PhoneTextInput = props => {
    return (

        <div className="form-group">
            <label>Phone to be validated: </label>
            <input type="text" className="form-control" {...props} />
        </div>
    );
}

export default PhoneTextInput;