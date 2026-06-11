import { getLocalStorage, setLocalStorage } from "./utils.mts";
const BASE_URL = process.env.PUBLIC_SERVER_URL;

interface UserStore {
  isLoggedIn: boolean;
  user?: {
    name: string;
    email: string;
    _id: string;
  };
  token: string;
}
export const userStore = $state({
  isLoggedIn: false,
  user: {},
  token: "",
} as UserStore);

export async function login(email: string, password: string) {
  const loginRes = await fetch(BASE_URL + "users/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!loginRes.ok) {
    throw new Error("Invalid email or password");
  }
  const data = await loginRes.json();
  console.log("loginData", data);
}

export function logout() {
  userStore.user = undefined;
  userStore.token = "";
  userStore.isLoggedIn = false;
  setLocalStorage("so-user", null);
}

export function checkAuth() {
  const userData = getLocalStorage("so-user");
  if (userData) {
    userStore.user = userData.user;
    userStore.token = userData.token;
    userStore.isLoggedIn = true;
  } else {
    userStore.user = {};
    userStore.token = "";
    userStore.isLoggedIn = false;
  }
  return userData;
}
