import {
    Button,
    Container,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate =
        useNavigate();

    return (
        <Container className="error-page">
            <h1>
                👻 404
            </h1>
            <h2>
                This page has passed into the afterlife.
            </h2>
            <p>
                Even our ghosts cannot find it.
            </p>
            <Button
                className="login-button error-button"
                onClick={() =>
                    navigate("/login")
                }
            >
                Return to Login
            </Button>
        </Container>
    );
}

export default ErrorPage;