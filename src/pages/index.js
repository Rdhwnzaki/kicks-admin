import React from 'react'
import MainLayout from "../layouts/MainLayout"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { BsCalendarWeek } from "react-icons/bs";
import moment from 'moment';

const Dashboard = () => {
    const today = new Date();
    const dateStrings = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() - i);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        dateStrings.push(formattedDate);
    }
    const formatDate = (date) => {
        return moment(date).format("MMMM Do, YYYY");
    }
    document.title = "Dashboard | Kicks Admin";
    return (
        <MainLayout>
            <p className='fs-3 fw-bold'>Dashboard</p>
            <div className='d-flex justify-content-between pe-4'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        Home
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Dashboard
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className='d-flex flex-row'>
                    <BsCalendarWeek className='me-2 fs-5 mt-0' />
                    <p>{`${formatDate(dateStrings[dateStrings.length - 1])} - ${formatDate(dateStrings[0])}`}</p>
                </div>
            </div>
        </MainLayout>
    )
}

export default Dashboard