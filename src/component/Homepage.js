import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import API, { endpoint } from "../API/API";
import Header from "../layouts/Header"
import {ListSP} from "./ListSP";

export function Home(){
        const [sanpham,setSanpham]=useState([])
        const user=useSelector(state=>state.user.taikhoan);
        useEffect(()=>{
                const loadSanpham=async()=>{
                        try{
                                let res=await API.get(endpoint['SanPhams'])
                                setSanpham(res.data)
                        }
                        catch(err){
                                console.error(err);
                        }
                }
                loadSanpham()
        },[])
        return(
                <>{(user == null && user==undefined)?<h1>Bạn Chưa Đăng Nhập</h1>:
                <>
                        <h1>Danh Sách Sản Phẩm</h1>
                        <Row>
                                {sanpham.map(s=><ListSP obj={s}/>)}
                        </Row>
                        </>
                }
                </>
        )
    }
