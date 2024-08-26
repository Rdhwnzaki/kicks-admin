import React, { useState, useEffect, useCallback } from 'react'
import MainLayout from "../../layouts/MainLayout"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
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
import DeleteModal from '../../components/DeleteModal';
import { isEmpty } from 'lodash';

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

    const toggle = useCallback(() => {
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
        toggle()
    }, [toggle])

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
            toggle();
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
        </MainLayout>
    )
}

export default Product