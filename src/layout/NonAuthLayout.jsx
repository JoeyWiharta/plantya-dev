import React from "react";

const NonAuthLayout = ({ children }) => {
    return (
        <div
            className="bg-dark w-100 vh-100 d-flex justify-content-center align-items-center"
        >
            <div
                className="d-flex flex-column justify-content-center align-items-center p-4 rounded-4"
                style={{
                    minHeight: "75%",
                    width: "35%",
                    // backgroundColor: "#a11d1dff",
                    // boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default NonAuthLayout;
