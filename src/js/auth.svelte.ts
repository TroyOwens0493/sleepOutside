const BASE_URL = process.env.PUBLIC_SERVER_URL;

interface UserStore {
    isLoggedIn: boolean,
    user?: {
        name: string,
        email: string,
        _id: string
    },
    token: string
}
export const userStore = $state({ isLoggedIn: false, user: {}, token: '' } as UserStore);

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

export function logout() { }

export function checkAuth() {

}

