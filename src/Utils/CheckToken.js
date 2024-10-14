import axios from "axios";
import { serverAPI } from "./Server";

export const CheckToken = async(token)=>{
    await axios.get(`${serverAPI}/checkToken`,{
     headers:{
       Authorization:`${token}`
     }
    }).then((res)=>{
        // console.log(res);
     if(res.data.statusCode==200 && res.data.responseData){
        return true;
     }
    }).catch((err)=>{
     console.log(err);
     return false;
    })
    return false; 
 }