import React from 'react';
import NavHeader from '../../public/Navigation/NavHeader'
import './User.scss'
import {useHistory} from "react-router-dom"; 


function UserParking(props) {
    let history = useHistory();
    const handleCreateNewParking = () =>{
        history.push("/dkbaixe");
    }

    return (
    <div className='bg'>
        <NavHeader />
        <div className='container mt-4'>
            <div className='row  mb-4'>
                <div className='col-6'> 
                    <div className='mt-5'>
                        <h1>Bạn có bãi đỗ xe? <br/></h1>
                    </div>  
                    <h5>Bạn muốn trở thành đối tác của chúng tôi?</h5> <hr/>
                    &emsp; - Tăng tỉ lệ tiếp cận <br/>
                    &emsp; - Doanh thu chia tỉ lệ hợp lí <br/>
                    &emsp; - Quản lí chuyên nghiệp <br/>
                    &emsp; - Thao tác đơn giản <br/>
                    <div className='text-center'>
                        <button className='btn btn-success' onClick={()=>handleCreateNewParking()}> Đăng kí ngay</button>
                    </div>
                    
                </div>
            <div className='col-6'>
                <img src="https://c8.alamy.com/comp/G6G7KN/parking-lot-design-park-icon-yellow-background-vector-graphic-G6G7KN.jpg" className="img-fluid" alt="..."></img>
            </div>
           
            
        </div>
         <hr/>
        
        </div>
    </div>
);}

export default UserParking;