import { useEffect } from "react"
import { useState } from "react"
import { Row } from "react-bootstrap"
import { useParams } from "react-router"
import API, { endpoint } from "../API/API"
import { ManageProduct } from "./ManageProduct"

export function SP(){
    const [sanpham,setsanpham]=useState([])
    const {maSp}=useParams()
    useEffect(()=>{
        let loadSP=async()=>{
            try{
                let res=await API.get(endpoint['SanPham'](maSp))
                 setsanpham(res.data)
            }
            catch(err){
                console.error(err)
            }
            
        }
        loadSP()
    },[])
    return(
        <>
            <h1>Chi Tiet SP</h1>
            <Row>
                                <ManageProduct obj={sanpham}/>
                        </Row>
        </>
    )
}