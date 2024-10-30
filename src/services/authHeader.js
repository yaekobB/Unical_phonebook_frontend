export const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('signInUser'));
    if (user && user.token) {
        return { 'token': user.token, 'Authorization': user.token }
        // return {}
    } else {
        // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzMwNzQwNTE4LCJleHAiOjE3MzEzNDUzMTh9._c_5FASNL3tEJWqCxIZc4J3O_5FmxdltquUu0AvS4kHzIcrbfAEBJs4-20fWMp1shqLrnjqBBm26yfhx4GSDpA"
    //    'token': token, 'Authorization': 'Bearer ' + token
        return {};
    }
}