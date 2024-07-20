import { users as defaultUsers } from "@/data/users/users";
import { Users } from "@/interfaces/users.interface";
import Cookies from 'js-cookie'; // Make sure to install js-cookie

const COOKIE_NAME = "users";

export const getUsers = () => {
  let currentUsers = Cookies.get(COOKIE_NAME);

  if (currentUsers) {
    return JSON.parse(currentUsers);
  } 
  
  Cookies.set(COOKIE_NAME, JSON.stringify(defaultUsers));
  

  return defaultUsers;
};

export const getUserByName = (name: string) => {
  const users = getUsers();
  const user = users.find((user: Users) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );
  return user;
};

export const getUserById = (id: string) => {
  const users = getUsers();
  const user = users.find((user: Users) => user.id === id);
  return user;
};

export const getCurrentUser = () => {
    const localCurrentUser = Cookies.get("sessionUser");
    return localCurrentUser ? JSON.parse(localCurrentUser) : null;
};