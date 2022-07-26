import React, { useState } from "react";
import User1 from "../../assets/user1.png";
import User2 from "../../assets/user2.png";
import User3 from "../../assets/user3.png";
import User4 from "../../assets/user4.png";
import User5 from "../../assets/user5.png";
import DefaultUser from "../../assets/default.png";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { Search } from "react-feather";
import UserListModal from "./UserListModal";

const Header = () => {
  const { auth } = useSelector((state) => state);
  const getName = () => {
    if (auth?.fullName) {
      let [name] = auth.fullName.split(" ");
      return name;
    }
    return "User";
  };

  const profArr = [User1, User2, User3, User4, User5];
  const profList = profArr.map((el, idx) => (
    <img
      src={el}
      key={v4()}
      style={{
        transform: `translateX(${(5 - idx) * 6}px)`,
        zIndex: `${5 - idx}`,
      }}
      className="w-8 h-8 border-2 border-white border-solid rounded-full shadow-sm"
      alt={`user${idx}`}
    />
  ));

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <UserListModal userArr={profArr} setShowModal={setShowModal} />
      )}
      <section className="flex justify-between py-5 ">
        <div className="flex items-center text-gray-400">
          <Search className="w-4 h-4 mr-4" />
          <span>Search</span>
        </div>
        <div
          className="flex -translate-x-5 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          {profList}
        </div>
        <div className="flex items-center">
          <span className="mr-2 tracking-wide">Hi, {getName()}</span>
          <img src={DefaultUser} className="w-7 h-7" alt="default user" />
        </div>
      </section>
    </>
  );
};

export default Header;
