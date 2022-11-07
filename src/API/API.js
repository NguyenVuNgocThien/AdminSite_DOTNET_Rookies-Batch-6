import axios from "axios"



export let endpoint={
    'SanPhams':'/api/SanPhams',
    'KhachHangs':'/api/KhachHangs',
    'KhachHang':(id)=>`api/KhachHangs/${id}`,
    'NhanVien':(maNv)=>`api/NhanViens/${maNv}`,
    'HoaDon':(maHd)=>`api/HoaDons/${maHd}`,
    'Login':'api/Login/Authenticate',
    'TaiKhoanDangNhaps':'api/TaiKhoanDangNhaps',
    'SanPham':(maSp)=>`api/SanPhams/${maSp}`,
    'LoaiSPs':'api/LoaiSPs',
    'LoaiSP':(maLoaiSp)=>`api/LoaiSPs/${maLoaiSp}`,
    'XoaSP':(maSp)=>`api/SanPhams/del/${maSp}`,
    'CategoryProduct':(maLoaiSp)=>`api/Sanphams/LoaiSP/${maLoaiSp}`,
    'CreateCategory':'api/LoaiSPs',
    'XoaLoaiSP':(maLoaiSp)=>`api/LoaiSPs/${maLoaiSp}`,
    'ListCustomerOrder':'api/KhachHangs/DanhSachKhachHangDangOrder',
    'CustomerCart':(maKh)=>`api/GioHangs/${maKh}`,
    'DelCart':(maKh)=>`api/GioHangs/del/${maKh}`,
    'CreateBill':'api/HoaDons',
    'CreateBillProfile':'api/CTHDs',
    'RefreshToken':'api/Login/Refresh',
    'CTHDs':(maKh)=>`api/CTHDs/${maKh}`
}
export default axios.create({
    baseURL:'https://localhost:44348'
})