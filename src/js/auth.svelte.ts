const BASE_URL = process.env.PUBLIC_SERVER_URL;

export async function login(email: string, password: string) {
    const loginRes = await fetch(BASE_URL + 'users/login',
        {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });
    const data = await loginRes.json();
    console.log('loginData', data);
}

export function logout() {
}

export function checkAuth() {
}
