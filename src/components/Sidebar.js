import React from 'react';
import './css/Sidebar.css';
import Image from "../assets/Group.png"
import { MdDashboard } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className='d-flex justify-content-center mb-5 mt-2'>
                <img src={Image} style={{ width: "170px" }} />
            </div>
            <ul>
                <li>
                    <Link to="/dashboard" className='text-decoration-none'>
                        <div className='d-flex flex-row align-items-center mb-3'>
                            <MdDashboard className='me-2 fs-3' />
                            <span className='fw-bold'>DASHBOARD</span>
                        </div>
                    </Link>
                    <Link to="/product" className='text-decoration-none'>
                        <div className='d-flex flex-row align-items-center mb-3'>
                            <FaListAlt className='me-2 fs-4' />
                            <span className='fw-bold'>PRODUCTS</span>
                        </div>
                    </Link>
                    <Link to="/order" className='text-decoration-none'>
                        <div className='d-flex flex-row align-items-center'>
                            <FaClipboardList className='me-2 fs-4' />
                            <span className='fw-bold'>ORDERS</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;