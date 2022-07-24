export const addUserToLocalList = (userObj) => {
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");

  userList.push(userObj);
  console.log(userList);
  localStorage.setItem("userList", JSON.stringify(userList));
};

export const isUserAvailable = (userObj) => {
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");

  let user = userList.filter((el) => el.email === userObj.email);

  return user;
};

// use to get user details if login state was persisted
export const saveUserToLocalStorage = (userObj) => {
  localStorage.setItem("user", JSON.stringify(userObj));
};
export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};
