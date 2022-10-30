import axios from "axios"



export let endpoint={
    'SanPhams':'/api/SanPhams',
    'KhachHangs':'/api/KhachHangs',
    'Login':'api/Login/Authenticate',
    'TaiKhoanDangNhaps':'api/TaiKhoanDangNhaps',
    'SanPham':(maSp)=>`api/SanPhams/${maSp}`,
    'LoaiSPs':'api/LoaiSPs',
    'LoaiSP':(maLoaiSp)=>`api/LoaiSPs/${maLoaiSp}`,
    'XoaSP':(maSp)=>`api/SanPhams/del/${maSp}`
}
export default axios.create({
    baseURL:'https://localhost:44348'
})