import React, { useEffect, useState } from 'react'
import { IoNotifications } from "react-icons/io5";
import './css/Navbar.css';

const Navbar = () => {
    const [authUser, setAuthUser] = useState()

    useEffect(() => {
        const obj = JSON.parse(sessionStorage.getItem("authUser"))
        if (obj) {
            setAuthUser(obj.data)
        }
    }, [])

    return (
        <nav className="navbar d-flex justify-content-end px-3">
            <ul>
                <li><IoNotifications className='me-5 fs-4 mt-1 text-dark' /></li>
                <li><div
                    className="rounded-circle bg-primary d-flex justify-content-center align-items-center"
                    style={{
                        width: '35px',
                        height: '35px',
                        color: 'white',
                        fontSize: '14px',
                    }}
                >
                    {authUser && authUser.firstName.charAt(0)}
                </div></li>
            </ul>
        </nav>

    )
}

export default Navbar