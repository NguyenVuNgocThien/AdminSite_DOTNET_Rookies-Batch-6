import React from "react";
import API, { endpoint } from "../API/API";
import { useDispatch, useSelector } from "react-redux";
import cookie from 'react-cookies';
import { logoutUser } from "../actioncreators/UserCreator";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Header(){
    
      const user=useSelector(state=>state.user.taikhoan);
      const dispatch=useDispatch();
      const signout=()=>{
          cookie.remove('user');
          cookie.remove('accessToken');
          cookie.remove('refreshToken')
          dispatch(logoutUser())
      }
      let path =<a className="nav-link" href="http://localhost:3000/login"><i className="fa-solid fa-user"></i>Sign in<span className="sr-only"></span></a>
      if(user!==null && user!== undefined){
        path=
        <a className="nav-link" href="http://localhost:3000"><i className="fa-solid fa-user"></i>{user.taiKhoan}<span className="sr-only"></span></a>
      }

        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/"><Image src="../images/logo.jpg"></Image></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarNav" >
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="http://localhost:3000/category">Category Management </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="http://localhost:3000/customer">Customers Management</a>
      </li>
      <li>
        {path}
      </li>
      <li>
      <a className="nav-link" onClick={signout} href="http://localhost:3000/"><i className="fa-solid fa-user"></i>Sign out<span className="sr-only"></span></a>
      </li>
    </ul>
  </div>
</nav>
            </>
        )
    }