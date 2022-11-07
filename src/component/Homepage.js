import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import API, { endpoint } from "../API/API";
import {ListProduct} from "./ListProduct";

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
                        <Link to="/createproduct"><Button variant="success" >Thêm SP mới</Button></Link>
                        <h1></h1>
                        <Row>
                                {sanpham.map(s=><ListProduct obj={s}/>)}
                        </Row>
                        </>
                }
                </>
        )
    }
