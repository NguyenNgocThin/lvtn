import React from 'react';
import './Login.scss';
import {useHistory} from "react-router-dom"; 
import {  useState, useContext } from 'react';
import {toast} from 'react-toastify';
import {loginUser} from '../../../services/userService'
import {UserContext} from '../../../context/UserContext'
import NavHeader from "../Navigation/NavHeader";

const Login= (props) => {
  const { loginContext }= useContext(UserContext);


  let history = useHistory();

  const[valueLogin,setValueLogin]= useState("");
  const[password,setPassword]=useState("");

  const defaultObjValidInput={
    isValidValueLogin: true,
    isValidPassword: true,
  }
  const[objValidInput,setObjValidInput] = useState(defaultObjValidInput);


  const handleCreateNewAccout = () =>{
    history.push("/register");
  }

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);

    if(!valueLogin){
      setObjValidInput({...defaultObjValidInput, isValidValueLogin:false})
      toast.error("hay nhap duung thong tin");
      return;
    }
    if(!password){
      setObjValidInput({...defaultObjValidInput,isValidPassword:false})
      toast.error("hay nhap mat khau");
      return;
    }

    let response = await loginUser(valueLogin, password);

    if(response && +response.EC === 0){
      let roleWithGroups = response.DT.roleWithGroups;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: { roleWithGroups, email, username }
      }

      localStorage.setItem('jwt',token)
      loginContext(data);
      if(roleWithGroups.id===1){
        history.push('/admin/users');
      }else{
        history.push('/');
      }
    }

    if(response && +response.EC !==0){
      toast.error(response.EM)
    }

    // const handlePressEnter =(event) =>{
    //   if(event.charCode ===13 && event.code === "Enter"){
    //     handleLogin();
    //   }
    // }
  }

  return(
    <>
    <NavHeader />
  <div className='login-container'>
    <div className='container'>
      <div className='row px-3 px-sm-0'>
        <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
          <div className='brand '>
            Ung dung tim bai do xe
          </div>
          <div className='detail'>
            Ung dung tim bai do xefdsf gfdgfd gfdgfdgdf gdfgfd
          </div>

        </div>
        <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
          <div className='brand d-sm-none'>
            Login
          </div>
          <h1>Login</h1>
          <input type='text' 
            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
            placeholder='Nhap email'
            value={valueLogin}
            onChange={(event)=>{setValueLogin(event.target.value)}}
            />

          <input 
            type='password' 
            className={ objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
            placeholder='Nhap password' 
            value={password}
            onChange={(event)=>{setPassword(event.target.value)}}
            // onKeyPress={(event)=>handlePressEnter(event)}
            />
          <button className='btn btn-primary' onClick={()=>handleLogin()}> Login</button>
          <span className='text-center'>
            Quên mật khẩu?</span>
          <hr />
          <div className='text-center'>
            <button className='btn btn-success' onClick={()=>handleCreateNewAccout()}> đăng kí</button>
          </div>
        </div>
      </div>
    </div>

  </div>
    </>
)}

export default Login;