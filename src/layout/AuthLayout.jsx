import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AuthLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false); // State untuk collapse sidebar

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev); // Toggle state
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            {!isCollapsed && ( // Sidebar hanya ditampilkan jika tidak di-collapse
                <aside
                    style={{
                        width: "240px", // Lebar sidebar tetap
                        minHeight: "100vh",
                        boxSizing: "border-box",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 1200,
                        backgroundColor: "#ffffff",
                        borderRight: "1px solid #e0e0e0",
                        transition: "transform 0.3s ease", // Animasi saat buka/tutup
                    }}
                >
                    <Sidebar />
                </aside>
            )}

            {/* Area utama */}
            <div
                style={{
                    marginLeft: isCollapsed ? "0" : "240px", // Sesuaikan margin dengan lebar sidebar
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    transition: "margin-left 0.3s ease", // Animasi saat buka/tutup
                }}
            >
                {/* Header */}
                <header
                    style={{
                        height: "64px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        zIndex: 1100,
                        position: "sticky",
                        top: 0,
                    }}
                >
                    <Header toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
                </header>

                {/* Konten utama */}
                <main
                    style={{
                        flex: 1,
                        padding: "24px",
                        backgroundColor: "#f8f9fa",
                        boxSizing: "border-box",
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthLayout;