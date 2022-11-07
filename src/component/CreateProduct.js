
import { useEffect, useState } from "react"
import { Button, Col, Form, Image, Row } from "react-bootstrap"
import { useNavigate } from "react-router"
import API, { endpoint } from "../API/API"

export function CreateProduct() {
    const [listLoaiSP, setListLoaiSP] = useState([])
    const [productName, setProductName] = useState()
    const [price, setPrice] = useState()
    const [unit, setUnit] = useState()
    const [loaiSP, setLoaiSP] = useState()
    const [hinhSp, setHinhSp] = useState()
    const negative = useNavigate()
    const today = new Date()
    const num = today.getMonth()
    const month = num + 1
    useEffect(() => {
        const loadLoaiSP = async () => {
            try {
                let res = await API.get(endpoint['LoaiSPs'])
                setListLoaiSP(res.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        loadLoaiSP()
    }, [])
    const handelPost = (event) => {
        const putProduct = {
            tenSp: productName,
            donvitinh: unit,
            dongia: price,
            maLoaiSp: loaiSP,
            hinhSp: hinhSp,
            ngayTao: today.getFullYear() + '/' + month + '/' + today.getDate(),
            ngayCapNhat: ''
        }
        API.post(endpoint['SanPhams'], putProduct).then(res => {
            try {
                negative('/')
            }
            catch (err) {
                console.error(err)
            }
        })
    }
    const handleChooseFile =async (e) => {
        const file = e.target.files[0]
        const base64=await convertBase64(file)
        // const chooseImage = 'images/' + file.name
        setHinhSp(base64)
    }
    const convertBase64=(file)=>{
        return new Promise((resolve,reject)=>{
            const fileReader=new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })
    }
    return (
        <Row>
            <input type="file" onChange={handleChooseFile} />
            {hinhSp && (
                <Image variant="top" src={hinhSp} className="card-img-top" width={100} height={200}></Image>
            )}
            <Col md={6} xs={12}>
                <Form className="col-10">
                    <Form.Group>
                        <Form.Label>Tên Sản Phẩm:</Form.Label>
                        <Form.Control type="text" placeholder="Enter new product name" value={productName} onChange={(event) => setProductName(event.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Đơn Vị Tính:</Form.Label>
                        <Form.Control type="text" placeholder="Enter a unit" value={unit} onChange={(event) => setUnit(event.target.value)}></Form.Control>
                    </Form.Group>
                </Form>
            </Col>
            <Col md={6} xs={12}>
                <Form className="col-10">
                    <Form.Group>
                        <Form.Label>Đơn Giá</Form.Label>
                        <Form.Control type="text" placeholder="Enter a price" value={price} onChange={(event) => setPrice(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Loại Sản Phẩm</Form.Label>
                        <Form.Select onChange={(event) => setLoaiSP(event.target.value)}>
                            <option>Chọn</option>
                            {listLoaiSP.map(l => {
                                return <option key={l.maLoaiSp} value={l.maLoaiSp} >{l.tenLoaiSp}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Col>
            <Button onClick={handelPost} className=" patch" variant="primary" type="submit">
                Tạo Sản Phẩm
            </Button>
        </Row>
    )
}