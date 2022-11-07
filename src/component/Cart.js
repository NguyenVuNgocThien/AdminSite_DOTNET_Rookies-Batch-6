import { useEffect } from "react";
import { useState } from "react";
import { Button, Image, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import API, { endpoint } from "../API/API";
import './ListProduct.scss'
import cookie from 'react-cookies'

export function Cart() {
    const negative = useNavigate()
    const [giohang, setGiohang] = useState([])
    const user = useSelector(state => state.user);
    const { maKh } = useParams()
    const today = new Date()
    const num = today.getMonth()
    const month = num + 1
    var [sum, setSum] = useState()
    useEffect(() => {
        const loadGioHang = async () => {
            try {
                let res = await API.get(endpoint['CustomerCart'](maKh), {
                    headers: {
                        'Authorization': `Bearer ${cookie.load("accessToken")}`
                    }
                })
                sum = 0
                for (let i = 0; i < res.data.length; i++) {
                    sum = sum + res.data[i].thanhTien
                    setSum(sum)
                }
                setGiohang(res.data)
            }
            catch (err) {
                if (err.response.status == 401) {
                    const ref = {
                        accessToken: cookie.load("accessToken"),
                        refreshToken: cookie.load("refreshToken")
                    }
                    let refresh = await API.post(endpoint['RefreshToken'], ref)
                    cookie.remove("accessToken")
                    cookie.remove("refreshToken")
                    cookie.save("accessToken", refresh.data.accessToken)
                    cookie.save("refreshToken", refresh.data.refreshToken)
                    loadGioHang()
                }
            }
        }
        loadGioHang()
    }, [])
    const handleCreate = () => {
        const hoadon = {
            maKh: maKh,
            maNv: user.taikhoan.maNv,
            ngayLapHd: today.getFullYear() + '/' + month + '/' + today.getDate(),
            ngayGiaoHang: '',
        }
        API.post(endpoint['CreateBill'], hoadon).then(res1 => {
            try {
                API.get(endpoint['CustomerCart'](maKh), {
                    headers: {
                        'Authorization': `Bearer ${cookie.load("accessToken")}`
                    }
                }).then(res2 => {
                    try {
                        for (let i = 0; i < res2.data.length; i++) {
                            const billprofile = {
                                maHd: res1.data.maHd,
                                maSp: res2.data[i].maSp,
                                soluong: res2.data[i].soLuong,
                                dongiaBan: res2.data[i].thanhTien,
                                giamgia: 0
                            }
                            console.info(billprofile)
                            API.post(endpoint['CreateBillProfile'], billprofile).then(res3 => {
                                try {
                                    API.delete(endpoint['DelCart'](maKh), {
                                        headers: {
                                            'Authorization': `Bearer ${cookie.load("accessToken")}`
                                        }
                                    }).then(res4 => {
                                        try {
                                            if (res4.status == 200) {
                                                alert('Tạo hóa đơn thành công')
                                                negative('/')
                                            }
                                            else if (res4.status == 204) {
                                                alert('Tạo hóa đơn thất bại')
                                            }
                                        }
                                        catch (err) {
                                            console.error(err)
                                        }
                                    })
                                }
                                catch (err) {
                                    console.error(err)
                                }
                            })
                        }
                    }
                    catch (err) {
                        console.error(err)
                    }
                })
            }
            catch (err) {
                console.error(err)
            }
        })
    }
    return (
        <>{(user.taikhoan == null && user.taikhoan == undefined) ? <h1>Bạn Chưa Đăng Nhập</h1> :
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
                        </tr>
                    </thead>
                    <tbody>
                        {giohang.map(g => {
                            const hinhSp = `${g.maSpNavigation.hinhSp}`
                            return <tr>
                                <td></td>
                                <td><Image className="card-img-top" variant="top" src={hinhSp} width={50} height={70}></Image></td>
                                <td>{g.maSpNavigation.tenSp}</td>
                                <td>{g.soLuong}</td>
                                <td>{g.thanhTien}</td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="col-md-1">Tổng Cộng:</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <td>{sum}</td>
                        </tr>
                    </tfoot>
                </Table>
                <Button onClick={handleCreate}>Lập Hóa Đơn</Button>
            </>
        }
        </>
    )
}
