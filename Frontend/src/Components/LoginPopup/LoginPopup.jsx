import React, { useContext, useEffect } from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"
import { toast } from "react-toastify";
function LoginPopup({ setShowLogin }) {
  const {url,setToken} = useContext(StoreContext)
  const [CurrState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }
  const onLogin = async(event)=>{
    event.preventDefault()
    let newUrl = url
    if(CurrState==="Login"){
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }

    const responce =await axios.post(newUrl,data)

    if(responce.data.success){
      setToken(responce.data.token);
      localStorage.setItem("token",responce.data.token)
      setShowLogin(false)
    }else{
      toast.error(responce.data.message)
    }
  }
  return (
    <div className="LoginPopup">
      <form onSubmit={onLogin} action="" className="LoginPopupContainer">
        <div className="LoginPopupTitle">
          <h2>{CurrState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="LoginPopupInput">
          {CurrState === "Login" ? (
            <></>
          ) : (
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="your name" required />
          )}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" />
          <input name="password" onChange={onChangeHandler} vlaue={data.password} type="password" placeholder="Your password" />
        </div>
        <button type="submit">{CurrState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="LoginPopupCondition">
          <input type="checkbox" required />
          <p>By continuing , I agree to the terms and conditions</p>
        </div>
        {CurrState === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have and account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
