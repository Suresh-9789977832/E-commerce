import axios from 'axios'

export const api = axios.create({
    baseURL:"https://ecommerce-api3.p.rapidapi.com",
    headers:{
        "x-rapidapi-key": 'b0405ceac9mshbea9be68b532069p1d76f9jsnffd2432ae5be',
        "x-rapidapi-host": "ecommerce-api3.p.rapidapi.com",
    }
})

export const backendapi = axios.create({
    baseURL:"https://e-commerce-q89k.onrender.com"
})
    
export const addtocartapi = axios.create({
    baseURL:"https://e-commerce-q89k.onrender.com"
})