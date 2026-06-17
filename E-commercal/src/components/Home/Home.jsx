import React from "react";
import "./Home.css";
import Image from "../../image/image-Home.png";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import NowItems from "../NowItems/NowItems";
import OurProducts from "../OurProduct/OurProduct";
import About from "../About/About";
import Advertisement from "../Advertisement/Advertisement";
const Home = () => {
  const text = "The Little Innovator";

  const colors = ["red", "blue", "green", "gold"];
  return (
    <>
      <div className="home">
        <div className="home-content">
          <h1>
            {text.split("").map((char, index) => (
              <span
                key={index}
                style={{ color: colors[index % colors.length] }}
              >
                {char}
              </span>
            ))}
          </h1>{" "}
          <p>Learning elevates</p>
        </div>
        <img src={Image} alt="home" />
        <div
          className="home-btn"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <FaArrowDown className="home-icon" />
        </div>
      </div>
      <NowItems />
      <About />
      <OurProducts />
      <Advertisement />
    </>
  );
};

export default Home;
