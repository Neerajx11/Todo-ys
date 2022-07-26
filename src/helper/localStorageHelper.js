//help in auth
export const addUserToLocalList = (userObj) => {
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");
  userList.push(userObj);
  localStorage.setItem("userList", JSON.stringify(userList));
};
export const isUserAvailable = (userObj) => {
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");
  let user = userList.filter((el) => el.email === userObj.email);
  return user;
};
export const getUserLocalList = () => {
  return JSON.parse(localStorage.getItem("userList") || "[]");
};

// function to manage persistance of user
export const saveUserToLocalStorage = (userObj) => {
  localStorage.setItem("user", JSON.stringify(userObj));
};
export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const clearUserFromLocalStorage = () => {
  return localStorage.removeItem("user");
};

// todoList helpers
export const saveTodoListToLocal = (todoList) => {
  localStorage.setItem("todo", JSON.stringify(todoList));
};
export const getTodoFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todo"));
};
