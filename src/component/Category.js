import { useState } from "react";
import { useEffect } from "react";
import { Button,  Form,  FormControl,  Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import API, { endpoint } from "../API/API";
import { ListProduct} from "./ListProduct";

export function Category(){
    const [sanpham,setSanpham]=useState([])
    const [listLoaiSP,setListLoaiSP]=useState([])
    const [loaiSP,setLoaiSP]=useState()
    const [tenLoaiSP,setTenLoaiSP]=useState()
    const user=useSelector(state=>state.user.taikhoan);
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
const handleChooseCategory=()=>{
    const loadSanpham=async()=>{
        try{
                let res=await API.get(endpoint['CategoryProduct'](loaiSP))
                setSanpham(res.data)
        }
        catch(err){
                console.error(err);
        }
}
loadSanpham()
}
const handleCreateCategory=()=>{
    const newCategory={
        tenLoaiSp:tenLoaiSP
    }
    const create=async()=>{
        try{
            let res=await API.post(endpoint['CreateCategory'],newCategory)
            
            window.location.reload(false)
        }
        catch(err){

        }
    }
    create()
}
const handleDel=()=>{
    const del=async()=>{
        let res=await API.delete(endpoint['XoaLoaiSP'](loaiSP))
        try{
            if(res.status==204){
                alert('Xóa Thành Công')
                window.location.reload(false)
            }
            else if(res.status==200){
                alert('Loại Sản Phẩm Đã có mặt hàng tương ứng')
            }
        }
        catch(err){

        }
    }
    del()
}
    return(
        <>
            <>{(user == null && user==undefined)?<h1>Bạn Chưa Đăng Nhập</h1>:
                <>
                            <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Tên Loại Sản Phẩm</Form.Label>
        <Form.Control value={tenLoaiSP} onChange={(event)=>setTenLoaiSP(event.target.value)} type="text" placeholder="Ex:Rau" />
      </Form.Group>
    </Form>
                            <Button onClick={handleCreateCategory}>
                                Thêm loại sản phẩm mới 
                            </Button>
                        <h1>Danh Sách Sản Phẩm</h1>
                        <h1></h1>
                            <Row>
                            <div >
                            <select className="col-md-3" onChange={(event)=>setLoaiSP(event.target.value)}>
                            <option>Chọn</option>
                            {listLoaiSP.map(l=>{
                                 return <option key={l.maLoaiSp} value={l.maLoaiSp} >{l.tenLoaiSp}</option>
                            })}
                            </select>
                                <Button size="sm" onClick={handleChooseCategory}>Chọn</Button>
                                <Button variant="danger" onClick={handleDel}>Xóa</Button>
                            </div>
                                {sanpham.map(s=><ListProduct obj={s}/>)}
                        </Row>
                        </>
                }
                </>
        </>
    )
}