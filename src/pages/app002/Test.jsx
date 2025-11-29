import { Paper, Container } from "@mui/material";
import React from "react";
import { Button, Alert, Row, Col, Form } from "reactstrap";

const Test = () => {
    return (
        <React.Fragment>
            <Container
                className="bg-secondary p-0"
                maxWidth={false} // Menghilangkan batasan lebar
            >
                <Row style={{ height: 'auto' }}>
                    <Col>
                        {/* <Alert color="primary">Tab 🎉</Alert> */}
                        <Alert color="primary">GTest Page</Alert>
                        <Button color="success">Test Page</Button>
                    </Col>
                </Row>


            </Container>
        </React.Fragment>
    );
}
export default Test;
