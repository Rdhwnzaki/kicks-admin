import React, { Fragment, useEffect, useState } from 'react';
import { GrLinkNext } from "react-icons/gr";
import { Input, Form, FormFeedback, FormGroup } from 'reactstrap';
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from '../../store/auth/login/actions';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Image from "../../assets/image 14.png"
import Image2 from "../../assets/Group.png"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            const newLogin = {
                email: values.email,
                password: values.password,
            };
            console.log(newLogin);

            dispatch(loginUser(newLogin));
        }
    });


    const { isLogin, error, success } = useSelector((state) => ({
        isLogin: state.Login.isLogin,
        error: state.Login.error,
        success: state.Login.success
    }));

    useEffect(() => {
        console.log(success);

        if (success) {
            setTimeout(() => navigate("/dashboard"), 3000);
        }
    }, [success, navigate]);

    document.title = "Login | Kicks Admin";
    return (
        <Fragment>
            <div className='row'>
                <div className='col-6'>
                    <img src={Image} className='position-relative' style={{ height: windowHeight, width: "700px" }} />
                    <img src={Image2} className='position-absolute' style={{ top: 70, left: 250, width: "200px" }} />
                </div>
                <div className='col-4  gap-2 d-flex align-items-center'>
                    <Form onSubmit={validation.handleSubmit}>
                        <p className='fs-2 fw-bold mb-3'>Login</p>
                        <div className='mb-3'>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                className='bg-transparent border-black w-100'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={validation.touched.email && validation.errors.email ? true : false}
                            />
                            {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                        </div>

                        <div className='mb-3'>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                className='bg-transparent border-black w-100'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.password || ""}
                                invalid={validation.touched.password && validation.errors.password ? true : false}
                            />
                            {validation.touched.password && validation.errors.password ? (
                                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                        </div>
                        <div className='d-flex flex-row'>
                            <input className="form-check-input bg-black mb-3 me-3" type="checkbox" value="" id="flexCheckDefault" />
                            <p>Keep me logged in - applies to all log in options below. More info</p>
                        </div>
                        <button className='btn btn-dark w-100 mb-3' type='submit'>
                            <div className='d-flex justify-content-between pt-2'>
                                <h6 className='fw-bold'>LOGIN</h6>
                                <GrLinkNext className='fs-4' />
                            </div>
                        </button>
                        <p>By clicking 'Log In' you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.</p>

                    </Form>
                </div>
            </div>
            <ToastContainer closeButton={false} />
        </Fragment>
    )
}

export default Login