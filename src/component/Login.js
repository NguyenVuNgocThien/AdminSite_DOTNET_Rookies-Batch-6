import React from "react"
import './Login.scss'
import API, { endpoint } from "../API/API";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {useNavigate} from "react-router";
import { loginUser } from "../actioncreators/UserCreator";
import cookie from 'react-cookies';
  


export  function Login(){
   const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const[success,setSuccess]=useState()
    const[permissionCode,setPermissonCode]=useState()
    const dispatch=useDispatch()
    const history=useNavigate()
   const handleLogin=(event)=>{
        const login={
            taiKhoan:username,
            matKhau:password
        }
        API.post(endpoint['Login'],login).then(res=>{
            console.info(res.data.accessToken)
            cookie.save("accessToken",res.data.accessToken)
            cookie.save("refreshToken",res.data.refreshToken)
            setSuccess(res.data.success);
                API.get(endpoint['TaiKhoanDangNhaps']+`/${username}`).then(response=>{
                    setPermissonCode(response.data.maQuyen);
                let user=response.data;
                cookie.save('user',user);
                dispatch(loginUser(user))
                history('/');
        })
        })
    }
        return(
            <>
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className=" col-12 form-group login-input" >
                            <label>Username:</label>
                            <input value={username} onChange={(event)=>setUsername(event.target.value)}
                             type="text" className="form-control" placeholder="enter your username"></input>
                        </div>
                        <div className=" col-12 form-group login-input">
                            <label>Password:</label>
                            <input value={password} onChange={(event)=>setPassword(event.target.value)}
                            type="password" className="form-control" placeholder="enter your password"></input>
                        </div>
                        <div className="col-12" >
                            <button  className="btn-login" onClick={handleLogin} >Login</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
