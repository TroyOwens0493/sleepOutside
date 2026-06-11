const BASE_URL = process.env.PUBLIC_SERVER_URL;

interface UserStore {
    isLoggedIn:boolean,
    user:?{
        name: string,
        email: string,
        _id: string
    },
    token: string
},
export const userStore = $state( {isLoggedIn: false, user: {}, token: ''} as UserStore);

export async function login(email: string, password: string) {
  const loginRes = await fetch(BASE_URL + "users/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await loginRes.json();
  console.log("loginData", data);
}

export function logout() {}

export function checkAuth() {
    const userData = localStorage();
    if (userData) {
        userStore.user = userData.user;
        userStore.token = userData.token;
        userStore.isLoggedIn = true;    
    } else {
        userStore.user = {};
        userStore.token = '';
        userStore.isLoggedIn = false;    
    }
    return userData;
}

