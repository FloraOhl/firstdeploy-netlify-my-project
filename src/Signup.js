import React from 'react';
 import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const validate = Yup.object({
        fullName: Yup.string().min(3, 'Must be 15 characters or less').max(15, 'Must be 15 characters or less')
            .required('Required'),
        username: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 charaters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm password is required'),
    })

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                console.log(values)
            }}
        >
            {formik => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                    <Form>

                        <input
                            id="full-name"
                            class="form-field"
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                        />
                        <input
                            id="user-name"
                            class="form-field"
                            type="text"
                            placeholder="User Name"
                            name="userName"
                        />
                        <input
                            id="email"
                            class="form-field"
                            type="text"
                            placeholder="Email"
                            name="email"
                        />
                        <input
                            id="password"
                            class="form-field"
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        <input
                            id="confirm-password"
                            class="form-field"
                            type="password"
                            placeholder="Confirm Password"
                            name="password"
                        />
                        <button className="btn btn-dark mt-3" type="submit">Register</button>

                        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>


                    </Form>
                </div>
            )}
        </Formik>
    )
}


export default Signup  
