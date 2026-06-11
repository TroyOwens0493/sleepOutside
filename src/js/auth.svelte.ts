export function login(email, password) {
}

export function logout() {
}

export function checkAuth() {
    
}

interface UserStore {
    isLoggedIn:boolean,
    user:?{
        name: string,
        email: string,
        _id: string
    },
    token: string
},
export const userStore = $State( {isLoggedIn: false, user: {}, token: ''} as UserStore);