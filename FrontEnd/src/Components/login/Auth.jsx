import axios from 'axios';
import { useState,createContext } from 'react';
 
export function getToken(){
    return JSON.parse(localStorage.getItem("token")).token;
}
export function logout(){
    localStorage.removeItem("token");
}

const AuthContext = createContext(null);

export const AuthProvider=()=>{
    const [user, setUser] = useState(null);

    const login =(user)=>{
     
    }
}
