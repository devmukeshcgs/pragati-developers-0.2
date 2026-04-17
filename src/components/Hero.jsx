import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section hero-section-bg ">
      <span className="hero-section-bg-overlay">
        <img src="/images/hero-bg.png" alt="Hero Background" />
      </span>

      <div className="container">
        <div className="hero-content">
          <h1>
            <span>Transform Your Inventory into an </span>
            <span className="h1-hilight">
              <b className="bold">Interactive Sales Experience</b>.
            </span>
          </h1>
          <br></br>
          <h5>
            The ultimate mobile-first solution for Big Builders and Developers
            to <span className="p-hilight"> manage, visualize, and sell</span>{" "}
            apartments directly from your existing data.
          </h5>
          <div className="cta">
            <button className="btn-primary">
              3D DEMO
              <span>
                <img src="./images/arrow-right.svg" alt="" />
              </span>
            </button>
            <Link className="link" to="/demo">
              DEMO
            </Link>
          </div>
        </div>
        {/* <div className="hero-image">
          <img src="./images/logo-outline.png" alt="Hero Image" />
        </div> */}
      </div>
    </section>
  );
}
