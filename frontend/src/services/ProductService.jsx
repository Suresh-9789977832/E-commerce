import { api } from "./axiosInstance"

export const getallproducts = (category) =>{
    return api.get(`/${category}`)
}