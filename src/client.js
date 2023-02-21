import React, { Component } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

class ClientJS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            notifications: []
        };
        this.stompClient = null;
    }

    componentDidMount() {
        this.connect();
    }

    componentWillUnmount() {
        this.stompClient.disconnect();
    }

    connect() {

        const username = this.props.username;
        console.log(username);
        var socket = new SockJS('http://localhost:9002/gs-guide-websocket');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/topic/greetings', (greeting) => {
                const message = JSON.parse(greeting.body).message;
                this.setState({
                    notifications: [...this.state.notifications, message]
                });
            });
        });
    }

    render() {
        let notification;
        if (this.state.notifications.length > 0 && this.state.notifications[this.state.notifications.length - 1] === "Notify " + this.props.username + "!") {
            notification = this.state.notifications.map((notification, index) => (
                <div key={index}>
                    {notification}
                </div>
            ));
        } else {
            notification = null;
        }
        return (
            <div>
                <div>Client</div>
                {notification}
            </div>
        );
    }
}

export default ClientJS;