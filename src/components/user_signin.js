import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useNavigate } from "react-router-dom";

export const UserSignin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleup = async (event) => {
    navigate("/usersignup");
  };

  const handlein = async () => {
    try {
      await axios.post({
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
    navigate("/userpage");
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">SIGN-IN</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
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
          <button onClick={handleup} className="submit">
            Sign-up
          </button>
          <button onClick={handlein} className="submit">
            Sign-in
          </button>
        </div>
      </div>
    </>
  );
};
