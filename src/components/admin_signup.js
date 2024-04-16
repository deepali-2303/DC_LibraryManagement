import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useNavigate } from "react-router-dom";

export const AdminSignup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleup = async (event) => {
    try {
      await axios.post({
        name,
        email,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
    navigate("/adminsignin");
  };

  const handlein= async()=>{
    navigate("/")
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">SIGN-UP</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              value={name}
              onChange={(event) => setname(event.target.value)}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              value={email}
              onChange={(event) => setemail(event.target.value)}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              value={password}
              onChange={(event) => setpassword(event.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="submit-container">
          <button onClick={handlein} className="submit">Sign-in</button>
          <button onClick={handleup} className="submit">
            Sign-up
          </button>
        </div>
      </div>
    </>
  );
};
