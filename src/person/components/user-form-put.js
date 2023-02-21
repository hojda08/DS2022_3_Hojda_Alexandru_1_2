import React from 'react';
import validate from "./validators/person-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/user-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class UserFormPut extends React.Component {

    constructor(props) {
        super(props);
        this.toggleFormPut = this.toggleFormPut.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                oldusername: {
                    value: '',
                    placeholder: 'What is old username?...',
                    //valid: false,
                    touched: false,
                },
                username: {
                    value: '',
                    placeholder: 'What is username?...',
                    //valid: false,
                    touched: false,
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
                    //valid: false,
                    touched: false,
                },
                role: {
                    value: '',
                    placeholder: 'Role...',
                    //valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleFormPut() {
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

    updateUser(oldusername,user) {
        return API_USERS.putUser(oldusername, user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated user with id: " + result);
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
        let oldusername = this.state.formControls.oldusername.value

        let user = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            role: this.state.formControls.role.value,
        };

        console.log(user);
        this.updateUser(oldusername,user);
    }

    render() {
        return (
            <div>
                <FormGroup id='oldusername'>
                    <Label for='oldusernameField'> Old Username: </Label>
                    <Input name='oldusername' id='oldusernameField' placeholder={this.state.formControls.oldusername.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.oldusername.value}
                           touched={this.state.formControls.oldusername.touched? 1 : 0}
                           //valid={this.state.formControls.username.valid}
                           required
                    />
                </FormGroup>


                <FormGroup id='username'>
                    <Label for='nameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           //valid={this.state.formControls.username.valid}
                           required
                    />
                </FormGroup>



                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           //valid={this.state.formControls.email.valid}
                           required
                    />
                </FormGroup>



                <FormGroup id='role'>
                    <Label for='roleField'> Role: </Label>
                    <Input name='role' id='roleField' placeholder={this.state.formControls.role.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.role.value}
                           touched={this.state.formControls.role.touched? 1 : 0}
                           //valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} /*disabled={!this.state.formIsValid}*/ onClick={this.handleSubmit}>  Submit Update </Button>
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

export default UserFormPut;
