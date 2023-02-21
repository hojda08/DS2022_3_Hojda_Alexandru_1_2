import React from 'react';
import validate from "./validators/person-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/user-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class DeviceFormPost extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                name: {
                    value: '',
                    placeholder: 'Name of device...',
                    //valid: false,
                    touched: false,
                },
                capacity: {
                    value: '',
                    placeholder: 'Capacity...',
                    //valid: false,
                    touched: false,
                },
                owner: {
                    value: '',
                    placeholder: 'Owner...',
                    //valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        //updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        //let formIsValid = true;
        //for (let updatedFormElementName in updatedControls) {
        //    formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        //}

        this.setState({
            formControls: updatedControls,
            //formIsValid: formIsValid
        });

    };

    addDevice(device) {
        return API_USERS.postDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let device = {
            name: this.state.formControls.name.value,
            capacity: this.state.formControls.capacity.value,
            owner: this.state.formControls.owner.value,
        };

        console.log(device);
        this.addDevice(device);
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                        //valid={this.state.formControls.username.valid}
                           required
                    />
                </FormGroup>



                <FormGroup id='capacity'>
                    <Label for='capacityField'> Capacity: </Label>
                    <Input name='capacity' id='capacityField' placeholder={this.state.formControls.capacity.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.capacity.value}
                           touched={this.state.formControls.capacity.touched? 1 : 0}
                        //valid={this.state.formControls.email.valid}
                           required
                    />
                </FormGroup>



                <FormGroup id='owner'>
                    <Label for='ownerField'> Owner: </Label>
                    <Input name='owner' id='ownerField' placeholder={this.state.formControls.owner.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.owner.value}
                           touched={this.state.formControls.owner.touched? 1 : 0}
                        //valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} /*disabled={!this.state.formIsValid}*/ onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default DeviceFormPost;
