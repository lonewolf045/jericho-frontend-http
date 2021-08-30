export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && (user.accessToken || user.token)) {
        return {
            Authorization: 'Bearer' + user.accessToken || user.token 
        }
    } else {
        return {};
    }
}