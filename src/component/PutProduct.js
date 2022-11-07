import { useEffect } from "react";
import { useState } from "react";
import { Button,  Col, Form, Image} from "react-bootstrap";
import { useNavigate } from "react-router";
import API, { endpoint } from "../API/API";
import './ListProduct.scss'

export  function PutProduct(props){
    const linkimg=props.obj.hinhSp
    const [listLoaiSP,setListLoaiSP]=useState([])
    const [productName,setProductName]=useState()
    const [price,setPrice]=useState()
    const [unit,setUnit]=useState()
    const [loaiSP,setLoaiSP]=useState()
    const today=new Date()
    const num=today.getMonth()
    const month=num+1
    const negative=useNavigate()
    
    useEffect(()=>{
        const loadLoaiSP=async()=>{
            try{
                let res= await API.get(endpoint['LoaiSPs'])
                setListLoaiSP(res.data)
            }
            catch(err){
                console.error(err)
            }
        }
        loadLoaiSP()
    },[])
    const handelPatch=(event)=>{
        console.info(loaiSP)
        const putProduct={
            maSp:props.obj.maSp,
            tenSp:productName,
            donvitinh:unit,
            dongia:price,
            maLoaiSp:loaiSP,
            hinhSp:props.obj.hinhSp,
            ngayTao:props.obj.ngayTao,
            ngayCapNhat:today.getFullYear()+'/'+month+'/'+today.getDate(),
            maLoaiSpNavigation:API.get(endpoint['LoaiSP'](loaiSP)).data
        }
        API.put(endpoint['SanPhams'],putProduct).then(res=>{
            try{
                negative('/')
            }
            catch(err){
                console.error(err)
            }
        })
    }

    let path=`/manage/${props.obj.maSp}`
    return(
      <>
      <Image variant="top" src={linkimg} className="card-img-top" width={100} height={200}></Image>
        <Col md={6} xs={12}>
            <Form className="col-10">
                <Form.Group>
                    <Form.Label>Tên Sản Phẩm:</Form.Label>
                    <Form.Control type="text" placeholder="Enter new product name" value={productName} onChange={(event)=>setProductName(event.target.value)} ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Đơn Vị Tính:</Form.Label>
                    <Form.Control type="text" placeholder="Enter new product name" value={unit} onChange={(event)=>setUnit(event.target.value)}></Form.Control>
                </Form.Group>
            </Form> 
        </Col>
        <Col md={6} xs={12}>
        <Form className="col-10">
                <Form.Group>
                    <Form.Label>Đơn Giá</Form.Label>
                    <Form.Control type="text" placeholder="Enter new product name" value={price} onChange={(event)=>setPrice(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Loại Sản Phẩm</Form.Label>
                    <Form.Select onChange={(event)=>setLoaiSP(event.target.value)}>
                        <option>Chọn</option>
                        {listLoaiSP.map(l=>{
                            return <option key={l.maLoaiSp} value={l.maLoaiSp} >{l.tenLoaiSp}</option>
                        })}
                    </Form.Select>
                </Form.Group>
            </Form>
        </Col>
        <Button onClick={handelPatch}  className=" patch"  variant="primary" type="submit">
        Sửa
      </Button>
    </>
                                
    )
}