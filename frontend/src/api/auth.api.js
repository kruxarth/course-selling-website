import {api} from "@/lib/axios"

export const signinUser = async (payload)=>{
    const res = await api.post("/user/signin", payload)
    return res.data
}

export const signupUser = async (payload)=>{
    const res = await api.post("/user/signup", payload)
    return res.data
}

export const signupAdmin = async (payload) => {
    const res = await api.post("/admin/signup", payload)
    return res.data
}

export const signinAdmin = async (payload)=>{
    const res = await api.post("/admin/signin", payload)
    return res.data
}

export const getMe = async () => {
    const res = await api.get("/user/me")
    return res.data
}

export const getPurchases = async () => {
    const res = await api.get("/user/purchases")
    return res.data
}

