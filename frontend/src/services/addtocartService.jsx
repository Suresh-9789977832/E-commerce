import { addtocartapi } from "./axiosInstance"


export const addtocart_products = (data,token) => {
    return addtocartapi.post('/addtoproduct/addtocart',data,
        { headers: { Authorization: `Bearer ${token}`,},})
}


export const getall_cartproducts = (token) => {
    return addtocartapi.get('/addtoproduct/',{  headers: {
      Authorization: `Bearer ${token}`,
    },})
} 


export const edit_cartproducts = (updatedData,token,id) => {
    return addtocartapi.put(`/addtoproduct/${id}`,
      updatedData,
      {headers: {
      Authorization: `Bearer ${token}`,
    },})
}

  

export const delete_cartproducts = (id,token) => {
    return addtocartapi.delete(`/addtoproduct/${id}`,{headers: {
      Authorization: `Bearer ${token}`,
    },})
}



