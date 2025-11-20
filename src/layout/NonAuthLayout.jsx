import React from "react";
import { Col, Container, Row } from "reactstrap";

const NonAuthLayout = ({ children }) => {
    return (
        <Container fluid className="p-0 m-0" style={{ minHeight: "100vh" }}>
            <Row
                className="p-0 m-0 d-flex"
                style={{
                    minHeight: "100vh", // minimal 100vh
                    alignItems: "stretch", // <— KUNCI UTAMA
                    // backgroundColor: "#0F1624",
                }}
            >
                {/* LEFT */}
                <Col
                    lg="6" md="6" sm="6"
                    className="d-flex flex-column justify-content-center align-items-center p-4"
                    style={{
                        padding: 32,
                    }}
                >
                    {children}
                </Col>

                {/* RIGHT */}
                <Col
                    lg="6"
                    md="6"
                    sm="6"
                    className="p-0 position-relative"
                    style={{
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* WRAPPER → inilah yang mengontrol height, BUKAN gambar */}
                    <div
                        style={{
                            flex: 1,          // <— INI KUNCI
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <img
                            src="/NonAuthBackground.png"
                            alt="Background"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    <img
                        src="/BaseLogo.png"
                        alt="Logo"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            maxWidth: "50%",
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};


export default NonAuthLayout;
