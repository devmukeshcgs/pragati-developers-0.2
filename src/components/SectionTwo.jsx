import React from "react";

export default function SectionTwo() {
  return (
    <section className="sec-2">
      <div className="container">
        <h2 className="sec-title">
          Designed for High-Volume Real Estate Operations
        </h2>
        <div className="f-container">
          <div className="f1 f1-bg ">
            {/* <div>
              <img src="./images/interactive-floorplans.png" alt="" srcSet="" />
            </div> */}
            <div className="f1-content p-24">
              <h5 className="text-white">Excel-Powered Backend</h5>
              <p className="text-white">
                Sync your existing Google Sheets or Excel files. No complex
                databases required—update your sheet, update your app instantly.
              </p>
              <button className="btn-red">
                20% OFF Containers & Organizers{" "}
                <span>
                  <img src="./images/arrow-right.svg" alt="" />
                </span>
              </button>
            </div>
          </div>
          <div className="f2">
            <div className="f2-1 p-24 f2-1-bg">
              <div className="f2-content">
                <div>
                  <img
                    src="./images/interactive-floorplans.png"
                    alt=""
                    srcSet=""
                  />
                </div>
                <h5 className="text-white">Interactive Floorplans</h5>
                <p className="text-white">
                  Agents can select buildings and floors to view real-time
                  availability, area specs, and unit configurations (1BHK, 2BHK,
                  etc.).
                </p>
              </div>
              <div className="f2-content-vid">
                <img src="./images/video.svg" alt="" />
              </div>
            </div>
            <div className="f2-2">
              <div className="p-24">
                <div>
                  <img
                    src="./images/instant-mobile-access.png"
                    alt=""
                    srcSet=""
                  />
                </div>
                <h5>Instant Mobile Access</h5>
                <p>
                  A seamless web-app experience that works on any smartphone.
                  Zero friction for your sales team on the field.
                </p>
              </div>
              <div className="p-24">
                <img src="./images/3d-visualizations.png" alt="" srcSet="" />
                <h5>3D Visualizations</h5>
                <p>
                  Coming Soon: Fully interactive 3D building structures to give
                  buyers a premium, immersive walkthrough experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
