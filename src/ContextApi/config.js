export const BASE_URL = "http://127.0.0.1:8000/api"
export const LIMIT = 10
export const HEADERS = () =>{
    let user = JSON.parse(localStorage.getItem('user_data'))
    if (user == null){
        return {headers:{}}
    }
    const header = {
        'Authorization': `Bearer ${user.token[0]}`,
        'Content-Type': 'application/json',
    }

    return {
        headers:header
    }
}