import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Login } from "../component/Login";
import { Home } from "../component/Homepage";
import React from "react";
import { Product } from "../component/Product";
import { CreateProduct } from "../component/CreateProduct";
import { Category } from "../component/Category";
import { Customer } from "../component/Customer";
import { Cart } from "../component/Cart";
import { Bills } from "../component/Bills";


class Body extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route Route path="/login" element={<Login/>}></Route>
                    <Route path="/manage/:maSp" element={<Product/>}></Route>
                    <Route path="/createproduct" element={<CreateProduct/>}></Route>
                    <Route path="/category" element={<Category/>}></Route>
                    <Route path="/customer" element={<Customer/>}></Route>
                    <Route path="/giohang/:maKh" element={<Cart/>}></Route>
                    <Route path="/bill/:maKh" element={<Bills/>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Body