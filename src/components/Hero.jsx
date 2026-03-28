import React from "react";

export default function Hero() {
  return (
    <div className="hero-section hero-section-bg ">
      <div className="container">
        <div className="hero-content">
          <h1>
            <span className="h1-hilight">Transform Your Inventory into an</span>
            <span>Interactive Sales Experience</span>
          </h1>
          <p>
            The ultimate mobile-first solution for Big Builders and Developers
            to <span className="p-hilight"> manage, visualize, and sell</span>{" "}
            apartments directly from your existing data.
          </p>
          <div className="cta">
            <button className="btn-red">
              20% OFF{" "}
              <span>
                <img src="./images/arrow-right.svg" alt="" />
              </span>
            </button>
            <button>
              Demo
              <span>
                <img src="./images/arrow-right.svg" alt="" />
              </span>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="./images/logo-outline.png" alt="Hero Image" />
        </div>
      </div>
    </div>
  );
}
