import React, { useState } from "react";
import { Check } from "react-feather";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../features/todoSlice";

const AddTodo = ({ todoType }) => {
  const [inp, setInp] = useState({ title: "", description: "" });

  const inpHandler = (e) => {
    setInp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [showInput, setShowInput] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const clickHandler = () => {
    const paylaodObj = {
      todoType,
      todoObj: {
        id: v4(),
        title: inp.title,
        description: inp.description,
        madeBy: {
          name: auth.fullName,
          email: auth.email,
        },
      },
    };
    dispatch(addTodo(paylaodObj));
    setShowInput(false);
  };

  return (
    <>
      <div
        onClick={() => setShowInput((prev) => !prev)}
        className="text-primary cursor-pointer bg-bgprimary text-center text-xl py-1 rounded-lg my-4 hover:bg-[#DEF0F0]"
      >
        +
      </div>
      {showInput && (
        <div className="mb-3 bg-white rounded-md shadow-md">
          <input
            value={inp.title}
            onChange={inpHandler}
            name="title"
            type="text"
            className="w-full px-2 py-3 text-md focus:outline-none"
            placeholder="Give your task a title"
          />
          <textarea
            value={inp.description}
            onChange={inpHandler}
            name="description"
            className="w-full h-[60px] text-sm text-[#6B6B6B] focus:outline-none px-2 py3"
            placeholder="Description:"
          ></textarea>
          <div
            className="flex justify-center pb-2 m-2 bg-white rounded-full text-primary"
            onClick={clickHandler}
          >
            <Check className="h-8 p-2 rounded-full cursor-pointer w-14 bg-bgsecondary" />
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodo;
