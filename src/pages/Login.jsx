import {
    useContext,
    useState,
} from "react";

import {
    Button,
    Container,
    Form,
} from "react-bootstrap";

import {
    Navigate,
    useNavigate,
} from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

function Login() {
    const [email, setEmail] =
        useState("");
    const [password, setPassword] =
        useState("");
    const [error, setError] =
        useState("");
    const {
        isLoggedIn,
        login,
    } = useContext(AuthContext);
    const navigate =
        useNavigate();
    if (isLoggedIn) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const success =
            login(email, password);
        if (success) {
            setError("");

            navigate(
                "/dashboard"
            );
        } else {
            setError(
                "Wrong email or password. The ghosts reject you 👻"
            );
        }
    };

    return (
        <Container className="login-page">
            <div className="login-box">
                <div className="login-ghost">
                    👻
                </div>
                <h1>
                    HANTUPEDIA
                </h1>
                <p className="login-subtitle">
                    Ghost Booking System
                </p>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Form.Group
                        className="mb-3"
                        controlId="email"
                    >
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="password"
                    >
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </Form.Group>
                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </Button>
                </Form>
                <div className="demo-login">
                    <strong>
                        ⚠️ WARNING ⚠️
                    </strong>
                    <p>
                        Enter at own risk.
                    </p>
                    <p>
                        Beware.
                    </p>
                </div>
            </div>
        </Container>
    );
}

export default Login;