import {api} from "@/lib/axios"

export const loginUser = async (payload)=>{
    const res = await api.post("/user/login", payload)
    return res.data
}

