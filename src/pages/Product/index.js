import React, { useState, useEffect, useCallback } from 'react'
import MainLayout from "../../layouts/MainLayout"
import {
    Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    getProduct as onGetProducts,
    addNewProduct as onAddNewProduct,
    updateProduct as onUpdateProduct,
    deleteProduct as onDeleteProduct,
    getProductLoading,
    resetProductState,
} from "../../store/product/action";
import { isEmpty } from 'lodash';
import Image from "../../assets/Rectangle 5.png"
import { BsThreeDots } from "react-icons/bs";

const Product = () => {
    const dispatch = useDispatch()
    const [isLoad, setIsLoad] = useState(false)
    const [productList, setProductList] = useState([])
    const [product, setProduct] = useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const {
        products,
        isProductCreated,
        loading,
    } = useSelector((state) => ({
        products: state.Product.products,
        isProductCreated: state.Product.isProductCreated,
        isProductSuccess: state.Product.isProductSuccess,
        loading: state.Product.loading,
        error: state.Product.error,
    }));

    const Droptown = useCallback(() => {
        if (modal) {
            setModal(false);
            setProduct(null);
            setIsEdit(false)
        } else {
            setModal(true);
        }
    }, [modal]);

    const handleDeleteProduct = () => {
        if (product) {
            dispatch(onDeleteProduct(product));
            setDeleteModal(false);
        }
    };

    const onClickDelete = useCallback((product) => {
        setProduct(product);
        setDeleteModal(true);
    }, []);

    const handleProductClick = useCallback((data) => {
        setProduct({
            id: data.id,
            name: data.name,
            city: data.city
        })
        Droptown()
    }, [Droptown])

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (product && product.name) || "",
            city: (product && product.city) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            city: Yup.string().required("Please Enter City"),
        }),
        onSubmit: (values) => {
            dispatch(getProductLoading());
            if (isEdit) {
                const editProduct = {
                    id: product ? product.id : 0,
                    name: values.name,
                    city: values.city,
                };
                dispatch(onUpdateProduct(editProduct));
                validation.resetForm();
            } else {
                const newProduct = {
                    name: values.name,
                    city: values.city,
                };
                dispatch(onAddNewProduct(newProduct));
                validation.resetForm();
            }
            Droptown();
        },
    });

    useEffect(() => {
        if (!isLoad) {
            dispatch(resetProductState())
            dispatch(onGetProducts())
            setIsLoad(true)
        }
    }, [isLoad, dispatch])

    useEffect(() => {
        if (isProductCreated) {
            dispatch(resetProductState())
            dispatch(onGetProducts())
        }
    }, [isProductCreated, dispatch])

    useEffect(() => {
        if (!isEmpty(products)) {
            setProductList(products)
        }
    }, [products])

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDroptown = () => setDropdownOpen((prevState) => !prevState);


    document.title = "Products | Kicks Admin";
    return (
        <MainLayout>
            <p className='fs-3 fw-bold'>Product</p>
            <div className='d-flex justify-content-between pe-4'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        Home
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Product
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className='d-flex flex-row'>
                    <button className='btn btn-dark'>ADD NEW PRODUCT</button>
                </div>
            </div>
            <div className='mt-3'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='card border-0 rounded-4'>
                            <div className='card-body'>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <img src={Image} width={100} />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p className='fw-medium fs-6'>Adidas Ultra boost</p>
                                        <p className='text-secondary fs-6'>Sneaker</p>
                                        <p className='fs-6 fw-bold'>Rp.200.000</p>
                                    </div>
                                    <div>
                                        <Dropdown isOpen={dropdownOpen} toggle={toggleDroptown} direction="down">
                                            <DropdownToggle color='light'><BsThreeDots /></DropdownToggle>
                                            <DropdownMenu >
                                                <DropdownItem>Edit Product</DropdownItem>
                                                <DropdownItem>Delete Product</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className='d-flex flex-column mt-2'>
                                    <span className='fs-6 fw-medium'>Summary</span>
                                    <p className='fs-6 text-secondary'>Long distance running requires a lot from athletes.</p>
                                    <ListGroup>
                                        <ListGroupItem className='d-flex justify-content-between m-0'>
                                            <span>Terjual</span>
                                            <span>100</span>
                                        </ListGroupItem>
                                        <ListGroupItem className='d-flex justify-content-between m-0'>
                                            <span>Stock</span>
                                            <span>211</span>
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </MainLayout>
    )
}

export default Product