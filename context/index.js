import { createContext,useReducer } from "react";

//reducer
// a function to update state,it will take action (a type of object and payload) and update state
const reducer=(state,action)=>{

    switch(action.type){
       
        case 'TOGGLE_SIDEBAR':
            return {...state,showSidebar:!state.showSidebar}
        case 'DASHBOARD_SHOW_PRODUCTS':
            console.log('DASHBOARD_SHOW_PRODUCTS ===> ',action.payload)
            return {...state,dashboardShowProductsDetails:action.payload}

        case 'SET_CURRENT_SELECTED_SHOP':
            return {...state,currentSelectedShop:action.payload}
        default:
            return state;
    }

};

const initialState={
   
    showSidebar: false,
    dashboardShowProductsDetails:false,

    currentSelectedShop:''
}


const Context=createContext({});
//provide this context for entire app. 
const Provider=({children})=>{
    //children is everything u give to this provider, which means the entire app as you wrap Provider in the _app.js
    //dispatch we use to update state. useReducer will take the reducer function, and the initial state. 
    //unlike useState, we just write "dispatch" instead of a function to update state.
    const [state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch}; //value has to be a type of OBJECT. we want to get the state and update the state. 
    //make the state and dispatch available
    return <Context.Provider value={value}>{children}</Context.Provider>
};

export {Context,Provider}; //we need to export each of them individually hence, not default export. 