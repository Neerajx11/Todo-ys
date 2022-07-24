import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { AlertCircle, Eye, EyeOff } from "react-feather";
import {
  addUserToLocalList,
  isUserAvailable,
  saveUserToLocalStorage,
} from "../../helper/localStorageHelper";
import { useDispatch } from "react-redux";
import { singin } from "../../features/authSlice";

const Error = (msg) => (
  <div className="absolute text-xs left-1 text-err -bottom-2">{msg}</div>
);

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .max(40, "Can have maximum of 40 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password should be atleast 6 character long")
    .required("Required"),
});

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [signUpErr, setSignUpErr] = useState(false);
  const dispatch = useDispatch();

  const showErr = () => {
    setSignUpErr(true);
    setTimeout(() => setSignUpErr(false), 3000);
  };
  const onSubmit = (values) => {
    // check if user is already available
    if (isUserAvailable(values).length) {
      // if user available tell them to login
      showErr();
      return;
    }
    // save user to local if user want to presist login
    if (values.rememberMe) saveUserToLocalStorage(values);

    // add user to localStorage for further logins
    addUserToLocalList(values);

    // save user to our global state
    dispatch(singin(values));
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(values) => (
            <Form>
              <div className="relative">
                <Field
                  name="fullName"
                  className={`text-sm placeholder:text-sm px-2 py-3 focus:outline-none w-full border-gray-300 border-solid rounded-lg border-[1px] mt-8 mb-4 ${
                    values.errors.fullName &&
                    values.touched.fullName &&
                    "border-err"
                  }`}
                  type="fullName"
                  placeholder="Full Name"
                />
                <ErrorMessage name="fullName" render={Error} />
              </div>
              <div className="relative">
                <Field
                  name="email"
                  className={`text-sm placeholder:text-sm px-2 py-3 focus:outline-none w-full border-gray-300 border-solid rounded-lg border-[1px] mt-6 mb-4 ${
                    values.errors.email && values.touched.email && "border-err"
                  }`}
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" render={Error} />
              </div>
              <div className="relative">
                <Field
                  name="password"
                  className={`text-sm placeholder:text-sm px-2 py-3 focus:outline-none w-full border-gray-300 border-solid rounded-lg border-[1px] mt-6 mb-4 ${
                    values.errors.password &&
                    values.touched.password &&
                    "border-err"
                  }`}
                  type={`${isPasswordVisible ? "text" : "password"}`}
                  placeholder="Password"
                />
                <div className="absolute cursor-pointer top-9 right-3">
                  {isPasswordVisible ? (
                    <Eye
                      onClick={() => setIsPasswordVisible(false)}
                      className="w-4 h-4 text-gray-400"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setIsPasswordVisible(true)}
                      className="w-4 h-4 text-gray-400"
                    />
                  )}
                </div>
                <ErrorMessage name="password" render={Error} />
              </div>
              {signUpErr && (
                <div className="flex items-center justify-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-1 text-err" />
                  <span className="text-sm text-err">
                    User already exists. Please login.
                  </span>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 mt-8 font-semibold tracking-wide text-white rounded-lg text-md bg-primary"
              >
                Sign Up
              </button>
              <div className="mt-8 ml-[1px]">
                <label className="text-sm text-gray-400 cursor-pointer select-none">
                  <Field type="checkbox" name="rememberMe" className="mr-2" />
                  Remember Me
                </label>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
