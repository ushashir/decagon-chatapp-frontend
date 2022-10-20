import React from 'react'
import {useState,useEffect} from 'react'
import styled from "styled-components"
import {Link,useNavigate} from 'react-router-dom'
import Logo from "../assets/logo.svg";
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes'

function Login() {
    const navigate = useNavigate()
    const [values,setValues]=useState({
        
        username:"",
        password:"",
        
    })
    const toastOptions = {
    
            position:"bottom",
            autClose:8000,
            pauseOnHover:true,
            draggable:true,
            theme:'dark'
    
    }
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate("/")
        }
    },[])
    const handleSubmit = async (e)=>{
      try{

             e.preventDefault();
       
        if(handleValidation()){
            const {password,confirmPassword,username,email} = values;
            
            const {data} = await axios.post(loginRoute,{
                username,
                password
            })
            console.log(data)
            // console.log(data.user)
            
            if(data.status === "true"){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate('/');
            }
        }
    } catch(err){
        console.log(err)
    }
    }
    const handleChange =(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
    }
    const handleValidation =()=>{
        const {password,confirmPassword,username,email} = values;
        if(password===""){
            toast.error('password and username must not be empty',toastOptions)
            return false
        }
        if(username===""){
            toast.error('password and username must not be empty',toastOptions)
            return false
        }
        return true
    }
  return (
    <>
        <FormContainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Decagon</h1>
          </div>
                
                    <input
                    type='text'
                    placeholder="Username"
                    name = "username"
                   onChange ={(e)=> handleChange(e)}
                    />
                
                
                    <input
                    type='password'
                    placeholder="password"
                    name = "password"
                    onChange ={(e)=> handleChange(e)}
                    />
                
                
                <button type='submit'>Login</button>
                <span>Don't have an account ? <Link to="/register">Register</Link></span>

            </form>
            <ToastContainer />
        </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login
