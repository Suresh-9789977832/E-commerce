import { backendapi } from "./axiosInstance"

export const reguser = (data) =>{
    return backendapi.post('/users/register',data)
}

export const loginuser = (data) => {
    return backendapi.post('/users/login',data)
}

export const getprofile = (id,token) => {
    return backendapi.get(`/users/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}