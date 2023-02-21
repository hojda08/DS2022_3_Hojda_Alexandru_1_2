import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as API_USERS from "./person/api/user-api";
import ClientJS from "./client"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = {
            username: username,
            password: password,
            role: role,
        };

        API_USERS.loginUser(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                setIsAuthenticated(true);
            } else {
                console.log(status);
                console.log(error);
            }
        });
    };

    return (
        <Router>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Role:
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
                {isAuthenticated && role === 'admin' && (
                    <Link to="/user">
                        <button>Go to Admin page</button>
                    </Link>
                )}
                {/*{isAuthenticated && role === 'client' && (*/}
                {/*    <Link to={{*/}
                {/*        pathname: "/client",*/}
                {/*        state: {username}*/}
                {/*    }}>*/}
                {/*        <button>Go to Client page</button>*/}
                {/*    </Link>*/}
                {/*)}*/}
                {isAuthenticated && role === 'client' && (
                    <ClientJS username={username} />
                )}
            </form>
        </Router>
    );
}

export default Login;
