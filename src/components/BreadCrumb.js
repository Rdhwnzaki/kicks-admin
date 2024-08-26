import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

const BreadCrumb = ({ text }) => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                Home
            </BreadcrumbItem>
            <BreadcrumbItem active>
                {text}
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export default BreadCrumb