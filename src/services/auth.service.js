import https from "../http-common"

class AuthService {
    login(username,password) {
        return https.post("api/auth/login",{
            "username" : username,
            "password" : password
        })
        .then(response => {
            if(response.data.accessToken || response.data.token) {
                localStorage.setItem("user",JSON.stringify(response.data))
            }
            return response.data;
        })
    }

    logout() {
        localStorage.removeItem("user")
    }

    register(firstName,lastName,username,password) {
        return https.post("api/auth/signup",{
            "firstName" : firstName,
            "lastName" : lastName,
            "username" : username,
            "password" : password
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
}

export default new AuthService();
