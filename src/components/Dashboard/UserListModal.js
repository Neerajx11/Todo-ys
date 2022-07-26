import React from "react";
import { X } from "react-feather";
import { v4 } from "uuid";
import { getUserLocalList } from "../../helper/localStorageHelper";

const UserListModal = ({ userArr, setShowModal }) => {
  const user = getUserLocalList();

  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="fixed top-0 left-0 z-40 w-screen h-screen bg-black bg-opacity-20 "
      ></div>
      <div className="rounded-2xl bg-white px-12 py-10 fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2  z-50">
        {/* modal header */}
        <div className="flex justify-between w-[450px] items-center">
          <div>
            <span className="text-lg text-#212121 font-medium tracking-wide ">
              Project Members
            </span>
            <div className="w-8 h-1 mt-1 rounded-lg bg-primary"></div>
          </div>
          <X
            onClick={() => setShowModal(false)}
            className="w-4 h-4 text-gray-400 cursor-pointer"
          />
        </div>
        {/* user list */}
        <div className="mt-12 space-y-10 max-h-[400px] overflow-auto">
          {user.map((el) => (
            <div className="flex" key={v4()}>
              <img
                className="object-contain w-12 h-12 mr-4 rounded-full"
                src={userArr[Math.floor(Math.random() * userArr.length)]}
                alt=""
              />
              <div>
                <p className="text-sm font-medium tracking-wide">
                  {el.fullName}
                </p>
                <p className="text-xs tracking-wide text-gray-400">
                  {el.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserListModal;
