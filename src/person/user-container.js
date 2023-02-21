import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import UserForm from "./components/user-form";
import UserFormPut from "./components/user-form-put";
import UserFormDelete from "./components/user-form-delete";
import DeviceFormPost from "./components/device-form-post";

import * as API_USERS from "./api/user-api"
import UserTable from "./components/user-table";
import DeviceTable from "./components/device-table";



class UserContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleFormPut = this.toggleFormPut.bind(this);
        this.toggleFormDelete = this.toggleFormDelete.bind(this);
        this.toggleDeviceFormPost = this.toggleDeviceFormPost.bind(this);
        this.reload = this.reload.bind(this);
        this.reloadUpdate = this.reloadUpdate.bind(this);
        this.reloadDelete = this.reloadDelete.bind(this);
        this.reloadDevicePost = this.reloadDevicePost.bind(this);
        this.state = {
            addFormOpen: false,
            updateFormOpen: false,
            deleteFormOpen: false,
            addFormDeviceOpen: false,
            selected: false,
            collapseForm: false,
            tableData: [],
            tableDataDevices: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchDevices();
    }

    fetchUsers() {
        return API_USERS.getUsers((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchDevices() {
        return API_USERS.getDevices((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableDataDevices: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({addFormOpen: !this.state.addFormOpen});
    }

    toggleFormPut() {
        this.setState({updateFormOpen: !this.state.updateFormOpen});
    }

    toggleFormDelete() {
        this.setState({deleteFormOpen: !this.state.deleteFormOpen});
    }

    toggleDeviceFormPost() {
        this.setState({addFormDeviceOpen: !this.state.addFormDeviceOpen});
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchUsers();
        this.fetchDevices();
    }

    reloadUpdate() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormPut();
        this.fetchUsers();
        this.fetchDevices();
    }

    reloadDelete() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormDelete();
        this.fetchUsers();
        this.fetchDevices();
    }

    reloadDevicePost() {
        this.setState({
            isLoaded: false
        });
        this.toggleDeviceFormPost();
        this.fetchUsers();
        this.fetchDevices();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> User Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add User </Button>
                            <Button color="primary" onClick={this.toggleFormPut}>Update User </Button>
                            <Button color="primary" onClick={this.toggleFormDelete}>Delete User </Button>
                            <Button color="primary" onClick={this.toggleDeviceFormPost}>Associate Device </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <UserTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <DeviceTable tableData = {this.state.tableDataDevices}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.addFormOpen} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add User: </ModalHeader>
                    <ModalBody>
                        <UserForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.updateFormOpen} toggle={this.toggleFormPut}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormPut}> Update User: </ModalHeader>
                    <ModalBody>
                        <UserFormPut reloadHandler={this.reloadUpdate}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.deleteFormOpen} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}> Delete User: </ModalHeader>
                    <ModalBody>
                        <UserFormDelete reloadHandler={this.reloadDelete}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.addFormDeviceOpen} toggle={this.toggleDeviceFormPost}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleDeviceFormPost}> Associate Device: </ModalHeader>
                    <ModalBody>
                        <DeviceFormPost reloadHandler={this.reloadDevicePost}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default UserContainer;




