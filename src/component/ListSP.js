import {  Button, Card, Col} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API, { endpoint } from "../API/API";
import './ListSP.scss'

export  function ListSP(props){
    const linkimg="../"+props.obj.hinhSp
    let path=`/manage/${props.obj.maSp}`
    const negative=useNavigate()
    const handleDel=()=>{
       API.delete(endpoint['XoaSP'](props.obj.maSp)).then(res=>{
        console.info(props.obj.maSp)
            try{
              if(res.data==null){
                alert('Xóa Thành Công')
                negative('/')
              }
              else
              {
                alert('Sản Phẩm có trong giỏ hàng hoặc hóa đơn đã lập')
              }
            }
            catch(err){
              console.error(err)
            }
       })
    }
    return(
      <>
        <Col md={4} xs={12}>
                                <Card >
      <Card.Img variant="top" src={linkimg} className="card-img-top" width={100} height={200}  />
      <Card.Body>
        <Card.Title>{props.obj.tenSp}</Card.Title>
        <Card.Title>Đơn vị tính: {props.obj.donvitinh}</Card.Title>
        <Card.Title>Đơn giá: {props.obj.dongia}</Card.Title>
        <Card.Title>Ngày tạo:{props.obj.ngayTao}</Card.Title>
        <Card.Title>Ngày cập nhật:{props.obj.ngayTao}</Card.Title>
        <Link to={path}><Button>Chỉnh sửa</Button></Link>
        <Button variant="danger" onClick={handleDel}>Xóa SP</Button>
      </Card.Body>
    </Card>
                                </Col>
                                </>
                                
    )
}