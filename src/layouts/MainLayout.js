import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

const MainLayout = (props) => {
    return (
        <div style={{ backgroundColor: "#e7e7e3", minHeight: "100vh" }}>
            <Navbar />
            <Sidebar />
            <div className="content" style={{ paddingLeft: "270px", paddingTop: "20px", flex: 1 }}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout