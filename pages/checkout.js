import React,{useEffect, useState} from "react";
import { Context } from '../context'
import { axiosAuth } from "../actions/axios";

const Checkout=({history})=>{
    const [products,setProducts]=useState([]);
    const [total,setTotal]=useState(0);
    const [address,setAddress]=useState("");
    const [addressSaved,setAddressSaved]=useState(false);
    
    const { state: { user }, dispatch } = useContext(Context);

    useEffect(()=>{
        axiosAuth.get(`/user/cart`).then((res)=>{
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        })



    },[]);

    const createCashOrder=()=>{
        axiosAuth.post(`/user/cash-order`).then((res)=>{
            if (res.data.ok){
                dispatch({
                    type:'CLEARCART',
                })
            }

            
        })

    }



}