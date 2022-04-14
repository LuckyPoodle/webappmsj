import {
    useEffect,
    createContext,
    useReducer
    
} from 'react';

import  { useRouter} from "next/router";

import firebase from './initFirebase';
import {removeTokenCookie,setTokenCookie} from "./tokenCookies";




const reducer=(state,action)=>{

    switch(action.type){
        case 'LOGIN':
       
            return {...state,user:action.payload,authenticated:true}
        case 'LOGOUT':
            
            return {...state,user:null,authenticated:false};
        case 'SETUSER':
            return {...state,user:action.payload,authenticated:action.payload?true:false}
        default:
            return state;
    }

};



const initialState={
    user:null,
    authenticated:false
}



const AuthContext=createContext({});

const AuthProvider=({children})=>{
    //children is everything u give to this provider, which means the entire app as you wrap Provider in the _app.js
    //dispatch we use to update state. useReducer will take the reducer function, and the initial state. 
    //unlike useState, we just write "dispatch" instead of a function to update state.
    const [state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch}; //value has to be a type of OBJECT. we want to get the state and update the state. 
    //make the state and dispatch available

    useEffect(()=>{
        console.log('hi in useEffect authprovider, firebase is ',firebase);
        const cancelAuthListener=firebase.auth().onIdTokenChanged(async (user)=>{

            if(user){
                const token=await user.getIdToken();
                setTokenCookie(token);
                dispatch({type:"SETUSER",payload:user});
            }else{
                removeTokenCookie();
                dispatch({type:"SETUSER"});
            }
        });

        return()=>{
            cancelAuthListener();
        }
    },[]);




    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};



export {AuthContext,AuthProvider};