import axios from "axios";
import React from "react";
const API = "https://localhost:7005/api/cart";
export const GetCart=async()=>{
    const respons= await axios.get(API);
    return respons.data;
}
export const AddToCart=async(item)=>{
    const respons=await axios.post(API,item);
    return respons.data
}
export const UpdatCart=async(id,item)=>{
    const respons=await axios.put(`${API}/${id}`,item);
    return respons.data;
}
export const DeletetCart=async(id)=>{
    const respons=await axios.delete(`${API}/${id}`);
    return respons.data;
}
