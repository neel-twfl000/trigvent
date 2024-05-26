import {createContext} from "react";
import { toast } from 'react-toastify';
import { BASE_URL, HEADERS, LIMIT } from "./config";
import axios from "axios";

export const loginApiContext = createContext(async (payload) =>{
    let data = {status:false, data:{}, error:{}}
    const url = `${BASE_URL}/login/`

    await axios.post(url, payload).then(resp=>{
        data.data = resp.data
        data.status = true
        localStorage.setItem("user_data", JSON.stringify(resp.data))
        window.location.reload()
        return data
    })
    .catch(err=>{
        toast.error(err.response.data.detail)
        return data
    })

    return data

})

export const registerApiContext = createContext(async (payload)=>{
    let data = {status:false, data:{}, error:{}}
    const url = `${BASE_URL}/register/`

    await axios.post(url, payload).then(resp=>{
        data.data = resp.data
        data.status = true
        toast.success("Accouint is created.")
        return data
    })
    .catch(err=>{
        data.status = false
        data.error = err.response.data.detail
        return data
    })

    return data
})

// Project All API
export const projectApiContext = createContext(async (fullPath=null, allData=null) =>{
    let url = `${BASE_URL}/project/?limit=${LIMIT}`
    let data = {status:false, data:{}, error:{}}

    if (fullPath){
        url = fullPath
    }

    if (allData){
        url = `${BASE_URL}/project/`
    }

    await axios.get(url, HEADERS()).then(resp=>{
        data.status = true
        data.data = resp.data
        return data
    })
    .catch(err=>{
        toast.error(err.message)
        return data
    })
    return data
})

export const projectRetriveApiContext = createContext(async (id) =>{
    let url = `${BASE_URL}/project/${id}/`
    let data = {status:false, data:{}, error:{}}

    await axios.get(url, HEADERS()).then(resp=>{
        data.status = true
        data.data = resp.data
        return data
    })
    .catch(err=>{
        toast.error(err.message)
        return data
    })
    return data
})

export const addUpdateProjectApiContext = createContext(async (args={method:"post", payload:{}, id:null})=>{
    const {method, payload, id} = args
    let url = `${BASE_URL}/project/`
    let data = {status:true, data:{}}
    
    if (method == "post"){
        await axios.post(url,  payload, HEADERS()).then(resp=>{
            data.status = true
            data.data = resp.data
            toast.success("Project has been added")
            return data
        })
        .catch(err=>{
            toast.error(err.message)
        })
    }
    else if(method == "patch"){
        url = `${url}${id}/`
        await axios.patch(url,  payload, HEADERS()).then(resp=>{
            data.status = true
            data.data = resp.data
            toast.success("Project has been updated")
            return data
        })
        .catch(err=>{
            toast.error(err.message)
        })

    }



    return data
})

export const projectDeleteApiContext = createContext(async (id) =>{
    let url = `${BASE_URL}/project/${id}/`
    let data = {status:false, data:{}, error:{}}

    await axios.delete(url, HEADERS()).then(resp=>{
        data.status = true
        data.data = resp.data
        toast.success("Project has been deleted")
        return data
    })
    .catch(err=>{
        toast.error(err.message)
        return data
    })
    return data
})



//Task All API
export const taskApiContext = createContext(async (fullPath) =>{
    let url = `${BASE_URL}/task/?limit=${LIMIT}`
    let data = {status:false, data:{}, error:{}}

    if (fullPath){
        url = fullPath
    }

    await axios.get(url, HEADERS()).then(resp=>{
        data.status = true
        data.data = resp.data
        return data
    })
    .catch(err=>{
        toast.error(err.message)
        return data
    })
    return data
})

export const taskRetriveApiContext = createContext(async (id) =>{
    let url = `${BASE_URL}/task/${id}/`
    let data = {status:false, data:{}, error:{}}

    await axios.get(url, HEADERS()).then(resp=>{
        data.status = true
        data.data = resp.data
        return data
    })
    .catch(err=>{
        toast.error(err.message)
        return data
    })
    return data
})

export const addUpdateTaskApiContext = createContext(async (args={method:"post", payload:{}, id:null})=>{
    const {method, payload, id} = args
    let url = `${BASE_URL}/task/`
    let data = {status:true, data:{}}
    
    if (method == "post"){
        await axios.post(url,  payload, HEADERS()).then(resp=>{
            data.status = true
            data.data = resp.data
            toast.success("Task has been added")
            return data
        })
        .catch(err=>{
            toast.error(err.message)
        })
    }
    else if(method == "patch"){
        url = `${url}${id}/`
        await axios.patch(url,  payload, HEADERS()).then(resp=>{
            data.status = true
            data.data = resp.data
            toast.success("Task has been updated")
            return data
        })
        .catch(err=>{
            toast.error(err.message)
        })

    }



    return data
})

export const taskDeleteApiContext = createContext(async (id) =>{
    let url = `${BASE_URL}/task/${id}/`
    let data = {status:false, data:{}, error:{}}

    await axios.delete(url, HEADERS()).then(resp=>{
        data.status = true
        data.data = resp.data
        toast.success("Project has been deleted")
        return data
    })
    .catch(err=>{
        toast.error(err.message)
        return data
    })
    return data
})