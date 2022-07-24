import React, { useEffect, useState } from "react";
import authImage from "../../assets/login.png";
import Login from "./Login";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const { auth } = useSelector((state) => state);
  let navigate = useNavigate();

  useEffect(() => {
    if (auth?.email) {
      navigate("/", { replace: true });
    }
  }, [navigate, auth]);

  const beforeClass =
    "text-textClr before:rounded-lg before:absolute before:-bottom-2 before:left-0 before:w-3/12 before:h-[3px] before:bg-textClr";
  const [loginSelect, setLoginSelect] = useState(true);

  return (
    <div className="flex items-center h-screen">
      {/* left section */}
      <div className="hidden lg:block md:4/12 lg:w-6/12">
        <img src={authImage} className="w-7/12 mx-auto" alt="todo board" />
      </div>
      {/* right section */}
      <div className="flex flex-col justify-center w-full px-4 md:px-12 md:8/12 lg:w-6/12 ">
        {/* switch tabs */}
        <div className="pt-12 pb-2 w-9/12 mx-auto border-2 border-gray-300 min-w-[440px] max-w-[500px] border-solid px-14 rounded-[65px]">
          {" "}
          <div className="text-[26px] font-medium">
            <span
              className={`relative mr-8 cursor-pointer  ${
                loginSelect ? beforeClass : "text-gray-400"
              }`}
              onClick={() => setLoginSelect(true)}
            >
              Log In
            </span>
            <span
              className={`relative cursor-pointer ${
                !loginSelect ? beforeClass : "text-gray-400"
              }`}
              onClick={() => setLoginSelect(false)}
            >
              Sign Up
            </span>
          </div>
          {/* login & signup form */}
          <div className="mx-6 my-12">
            <hr className="h-[2px] rounded-md bg-gray-100" />
            <div className="mt-6">{loginSelect ? <Login /> : <SignUp />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
