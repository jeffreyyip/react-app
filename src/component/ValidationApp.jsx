import React, { Component } from 'react';
import PhoneValidationService from '../service/PhoneValidationService';
import PhoneTextInput from './PhoneTextInput';
import HistorySelect from './HistorySelect';
import ResultTable from './ResultTable';

class ValidationApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formControls: {
                phone: {
                    value: '',
                    placeholder: 'input phone'
                },
                phoneHistory: {
                    value: '',
                    options: [
                        { value: '', displayValue: ''}
                    ]
                }
            },
            message: null,
            results: []
        }

            
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls={
            ...this.state.formControls
        };
        const updatedFormElement={
            ...updatedControls[name]
        };
        updatedFormElement.value = value;

        updatedControls[name] = updatedFormElement;

        if (name === 'phoneHistory'){

            updatedControls['phone'].value = updatedControls['phoneHistory'].value;

        }

        this.setState({
            formControls: updatedControls
        }



        );

    }


    onSubmit = () => {

        const phoneValue = this.state.formControls['phone'].value;
        console.log(`validate ${phoneValue}`);

        const updatedControls={
            ...this.state.formControls
        };
        const updatedFormElement={
            ...updatedControls['phoneHistory']
        };

        const updatedHistory = updatedFormElement.options.concat({value: phoneValue, displayValue: phoneValue });
        updatedFormElement.options = updatedHistory;

        updatedControls['phoneHistory'] = updatedFormElement;


        PhoneValidationService.validate(phoneValue)
            .then( rtn =>  {
                    console.log(rtn);
                    const updatedResults = this.state.results.concat({phone: phoneValue, message: '' + rtn.data.valid});

                    this.setState({
                        formControls : updatedControls,
                        message : `Response Status: ${rtn.status}, Data: ${JSON.stringify(rtn.data)}  `,
                        results: updatedResults
                    });
                }
            )
            .catch( err => {
                this.setState({
                    message : `Error in validation : ${err.message}`
                });
                console.error( err );
            })

 
    };


    render() {
        return (
            <div className="container">
                <h3>Validation Application</h3>
                
                <fieldset className="form-group">
                <PhoneTextInput name="phone"
                            value={this.state.formControls.phone.value}
                            onChange={this.changeHandler}
                            placeholder={this.state.formControls.phone.placeholder}
                />
                <button className="btn btn-success" type="submit" onClick={this.onSubmit}>validate</button>
                <br/><br/>
                <HistorySelect name="phoneHistory"
                            value={this.state.formControls.phoneHistory.value}
                            onChange={this.changeHandler}
                            options={this.state.formControls.phoneHistory.options}
                />
                </fieldset>
                
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}

                <ResultTable results={this.state.results} />


            </div>
        )
    }
}

export default ValidationApp
