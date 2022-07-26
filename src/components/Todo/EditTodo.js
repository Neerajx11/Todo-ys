import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import User4 from "../../assets/user4.png";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../features/todoSlice";

const EditTodo = ({ todoObj, setIsEditTodo, isEditTodo }) => {
  const [inp, setInp] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setInp(todoObj.description);
  }, [todoObj]);

  const saveHandler = () => {
    const payloadObj = { ...todoObj };
    payloadObj.description = inp;
    delete payloadObj.todoType;
    console.log(payloadObj);
    dispatch(
      editTodo({
        todoType: todoObj.todoType,
        todoObj: payloadObj,
      })
    );

    setIsEditTodo(false);
  };

  const deleteHandler = () => {
    dispatch(deleteTodo({ todoType: todoObj.todoType, id: todoObj.id }));
    setIsEditTodo(false);
  };

  return (
    <>
      {/* <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-50"></div> */}
      <div
        className={`${
          !isEditTodo && "translate-x-full"
        } transition-all duration-200 ease-linear px-9 py-8 rounded-lg fixed z-20 right-0 top-[140px] w-[600px] bg-white h-[calc(100vh_-_140px)] shadow-xl`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium tracking-wide text-icon">
              {todoObj.title}
            </p>
            <p className="w-6 h-1 mt-0.5 rounded-lg bg-primary"></p>
          </div>
          <X
            onClick={() => setIsEditTodo(false)}
            className="w-6 h-6 text-black cursor-pointer"
          />
        </div>
        <div className="flex items-center mt-12 text-sm">
          <span className="mr-12 text-[#6B6B6B] =">Created By</span>
          <div className="flex items-center">
            <img src={User4} className="w-6 h-6" alt="default user" />
            <span className="ml-4">{todoObj.madeBy.name}</span>
          </div>
        </div>
        <div className="flex mt-12 text-sm">
          <span className="mr-12 text-[#6B6B6B] pt-1">Description</span>
          <div>
            <textarea
              className="focus:outline-none h-24 text-sm placeholder:text-sm w-[400px] p-2  border-2 border-solid rounded-md border-gray-100 shadow-sm"
              type="text"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
            />
          </div>
        </div>
        {/* button to save and delete */}
        <div className="flex space-x-10 text-sm mt-28">
          <button
            onClick={saveHandler}
            className="py-2 text-white rounded-md shadow-md px-9 bg-primary"
          >
            Save
          </button>
          <button
            onClick={deleteHandler}
            className="py-2 text-white rounded-md shadow-md px-9 bg-err "
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
