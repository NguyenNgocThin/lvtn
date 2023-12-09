import axios from "../setup/axios";
const registerNewParking=(name,address, price, soluong, userid, status)=>{
    return axios.post('/api/v1/parking/create',{
        name,address,price,soluong, userid, status
    })
}
const fetchAllParking = ()=>{
    return axios.get(`/api/v1/parking/read`)
}

const fetchParkingConfirm = ()=>{
    return axios.get(`/api/v1/parking/readConfirm`)
}
const updateConfirmParking = (parkingData) =>{
    return axios.put("/api/v1/parking/updateConfirm",{...parkingData})
}
const updateUnConfirmParking = (parkingData) =>{
    return axios.put("/api/v1/parking/updateUnConfirm",{...parkingData})
}
const updateOn = (parkingData) =>{
    return axios.put("/api/v1/parking/updateOn",{...parkingData})
}
const updateOff = (parkingData) =>{
    return axios.put("/api/v1/parking/updateOff",{...parkingData})
}

export {registerNewParking, fetchAllParking, fetchParkingConfirm, updateConfirmParking, updateUnConfirmParking,updateOn,updateOff};