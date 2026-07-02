import { getLocalStorage, setLocalStorage } from "./utils.mts";
const BASE_URL = import.meta.env.PUBLIC_SERVER_URL;

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

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const data = await response.json();
    return data?.error?.message || data?.message || fallback;
  } catch {
    return fallback;
  }
}

export async function login(email: string, password: string) {
  const loginRes = await fetch(BASE_URL + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!loginRes.ok) {
    throw new Error(await getErrorMessage(loginRes, "Invalid email or password"));
  }
  const data = await loginRes.json();
  userStore.isLoggedIn = true;
  userStore.token = data.token;
  userStore.user = {
    _id: data.user._id,
    name: data.user.name,
    email: data.user.email,
  };
  setLocalStorage("so-user", {
    user: userStore.user,
    token: userStore.token,
  });
}

export async function register(name: string, email: string, password: string) {
  const registerRes = await fetch(BASE_URL + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!registerRes.ok) {
    throw new Error(await getErrorMessage(registerRes, "Unable to create account"));
  }

  return registerRes.json();
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const changeRes = await fetch(BASE_URL + "users/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStore.token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  if (!changeRes.ok) {
    throw new Error(await getErrorMessage(changeRes, "Unable to change password"));
  }

  return changeRes.json();
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
    userStore.user = undefined;
    userStore.token = "";
    userStore.isLoggedIn = false;
  }
  return userData;
}
