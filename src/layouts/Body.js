import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Login } from "../component/Login";
import { Home } from "../component/Homepage";
import React from "react";
import { SP } from "../component/SP";


class Body extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route Route path="/login" element={<Login/>}></Route>
                    <Route path="/manage/:maSp" element={<SP/>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Body