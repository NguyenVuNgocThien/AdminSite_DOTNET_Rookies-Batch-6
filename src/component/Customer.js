import React, { useEffect, useState } from "react";
import {  Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import API, { endpoint } from "../API/API";
export function Customer(){
    const [khachhang,setKhachhang]=useState([])
    const user=useSelector(state=>state.user.taikhoan);
    let path=``
    useEffect(()=>{
            const loadKhachHang=async()=>{
                            let res=await API.get(endpoint['KhachHangs'])
                            try{
                            setKhachhang(res.data)
                    }
                    catch(err){
                            console.error(err);
                    }
            }
            loadKhachHang()
    },[])
    const handleListCustomer=()=>{
        const loadKhachHang=async()=>{
                let res=await API.get(endpoint['KhachHangs'])
                try{
                setKhachhang(res.data)
        }
        catch(err){
                console.error(err);
        }
}
loadKhachHang()
    }
    const handleListCustomerOrder=()=>{
        const loadKhachHang=async()=>{
                let res=await API.get(endpoint['ListCustomerOrder'])
                console.info(res.data)
                try{
                        setKhachhang(res.data)
                }
                catch(err){
                        console.error(err)
                }
        }
        loadKhachHang()
    }
    return(
        <>{(user == null && user==undefined)?<h1>Bạn Chưa Đăng Nhập</h1>:
                <>
                        <h1>Danh Sách Khách Hàng</h1>
                        <h1></h1>
                        <Button onClick={handleListCustomerOrder}>Đang Order</Button>

                        <Button onClick={handleListCustomer}>Tất Cả</Button>
                        <h1></h1>
                        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {khachhang.map(k=>{
                {path=`/giohang/`+k.maKh}
            return <tr >
                <td>{k.tenKh}</td>
                <td>{k.diaChi}</td>
                <td>{k.dienThoai}</td>
                <td>{k.email}</td>
                <td><Link to={path}><Button variant="success">Xem Đơn Hàng</Button></Link></td>
                <td><Link to={`/bill/`+k.maKh}><Button variant="success">Xem Hóa Đơn</Button></Link></td>
                </tr>
        })}
      </tbody>
    </Table>
                        </>
                }
                </>
    )
}