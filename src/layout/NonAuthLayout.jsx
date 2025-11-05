import React from "react";

const NonAuthLayout = ({ children }) => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center", // horizontal center
                alignItems: "center",      // vertical center
                backgroundColor: "#69a7e5",
            }}
        >
            <div
                style={{
                    width: "400px",
                    // backgroundColor: "#ffffffff",
                    borderRadius: "12px",
                    padding: "40px",
                    // boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default NonAuthLayout;
