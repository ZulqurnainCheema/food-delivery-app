import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="Footer" id="Footer">
      <div className="FooterContent">
        <div className="FooterContentLeft">
          <img className="FooterContentLeftLogo" src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            magnam harum similique modi, sapiente unde dolore officia velit esse
            iste, in deserunt tempora voluptates itaque rem molestias
            perferendis debitis eum.
          </p>
          <div className="FooterSocialIcons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="FooterContentCenter">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="FooterContentRight">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>0300 6737777</li>
            <li>example@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="FooterCopyright">
        Copyright 2024 &copy; Cheezio.com - All Right Reserved{" "}
      </p>
    </div>
  );
};

export default Footer;
