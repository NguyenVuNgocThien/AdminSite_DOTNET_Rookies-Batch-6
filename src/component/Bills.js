import { useEffect } from "react";
import { useState } from "react"
import { Image, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router"
import API, { endpoint } from "../API/API"

export function Bills(){
    const [hoadon,setHoadon]=useState([])
    const user=useSelector(state=>state.user);
    const {maKh}=useParams()
    var [sum,setSum]=useState()
    useEffect(()=>{
        const loadHoadon=async()=>{
            let res=await API.get(endpoint['CTHDs'](maKh))
            try{
                sum=0
                for(let i=0;i<res.data.length;i++){
                    sum=sum+res.data[i].dongiaBan
                    setSum(sum)
                }
                setHoadon(res.data)
            }
            catch(err){
                console.error(err)
            }
        }
        loadHoadon()
        },[])
        
    return(
        <>{(user.taikhoan == null && user.taikhoan==undefined)?<h1>Bạn Chưa Đăng Nhập</h1>:
                <>
                        <h1></h1>
                        <Table striped bordered hover>
      <thead>
        <tr>
            <th></th>
           <th>Product Image</th> 
          <th>Product Name</th>
          <th>Amount</th>
          <th>Into Money</th>
          <th>Discount</th>
        </tr>
      </thead>
      <tbody>
        {hoadon.map(h=>{
            return <tr>
                <td></td>
                <td><Image className="card-img-top" variant="top" width={50} height={70} src={h.maSpNavigation.hinhSp}></Image></td>
                <td>{h.maSpNavigation.tenSp}</td>
                <td>{h.soluong}</td>
                <td>{h.dongiaBan}</td>
                <td>{h.giamgia}</td>
            </tr>
        })}
      </tbody>
      <tfoot>
            <tr>
                <th className="col-md-1">Tổng Cộng:</th>
                <th></th>
                <th></th>
                <th></th>
                <th>{sum}</th>
                <th></th>
            </tr>
      </tfoot>
    </Table>
                        </>
                }
                </>
    )
}