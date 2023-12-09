
import NavHeader from '../../public/Navigation/NavHeader'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext, useState } from 'react';
import {toast} from "react-toastify"
import {registerNewParking} from "../../../services/parkingService";
import {UserContext} from '../../../context/UserContext'

const RegPaking=(props)=> {
    const {user} = useContext(UserContext)
    const history = useHistory();
    const HandlePushHome = ()=> history.push('/')
   
    const [name,setName] =useState("");
    const [address,setAddress] =useState("");
    const [price,setPrice] =useState("");
    const [soluong,setSoluong] =useState("");
    
    const HandleRedParking= async()=>{
        const userid = user.account.userid;
        const status = 1; 
        let response = await registerNewParking(name,address,price,soluong, userid, status);
           if(response.EC === 0){
            toast.success(response.EM);
            history.push("/");
           } else{
            toast.error(response.EM)
        }
    }

    return (
        <div className='bg'>
        <NavHeader />
        <div className='mt-5'>
            <div className='container'> 
                <div className=' row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                           kjgdhjkhfdgfdjkjk
                        </div>
                    </div>

                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            Đăng kí bãi đỗ xe
                        </div>
                        <h1>Đăng kí bãi đỗ xe</h1>
                        <hr/>
                        <div className='form-group'>
                            <label>Tên bãi đỗ </label>
                            <input type='text' className= 'form-control'  placeholder='abc...'
                                value={name} onChange={(event) =>setName(event.target.value)}
                            
                            />
                        </div>
                        <div className='form-group'>
                            <label>Địa chỉ:  </label>
                            <input type='text' className='form-control' placeholder='Hãy nhập địa chỉ chính xác'
                                value={address} onChange={(event) =>setAddress(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Giá: </label>
                            <input type='text' className='form-control' placeholder='tính trên mỗi giờ'
                                value={price} onChange={(event) =>setPrice(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Số lượng chỗ đậu xe: </label>
                            <input type='text' className='form-control'
                                value={soluong} onChange={(event) =>setSoluong(event.target.value)}
                            />
                        </div>                        
                        <button className='btn btn-primary' type="button"  onClick={()=>HandleRedParking()}> Gửi</button>
                        <hr/>

                        <div className='text-center'>
                            <button className='btn btn-success' onClick={()=>HandlePushHome()}>
                                Trang chủ
                            </button>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default RegPaking;