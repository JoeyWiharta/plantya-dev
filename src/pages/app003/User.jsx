import { Paper, Container } from "@mui/material";
import React from "react";
import { Button, Alert, Row, Col, Form } from "reactstrap";

const User = () => {
    return (
        <React.Fragment>
            <Container
                className="bg-secondary p-0"
                maxWidth={false} // Menghilangkan batasan lebar
            >
                <Row style={{ height: '120vh' }}>
                    <Col>
                        {/* <Alert color="primary">Tab 🎉</Alert> */}
                        <Alert color="primary">Create User Page</Alert>
                        <Button color="success">User Page</Button>
                    </Col>
                </Row>


            </Container>
        </React.Fragment>
    );
}
export default User;
