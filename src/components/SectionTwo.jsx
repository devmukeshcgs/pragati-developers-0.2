import React from "react";

export default function SectionTwo() {
  return (
    <section class="sec-2">
      <div class="container">
        <h2 class="sec-title">
          Designed for High-Volume Real Estate Operations
        </h2>
        <div class="f-container">
          <div class="f1 f1-bg ">
            <div class="f1-content p-24">
              <h5 class="text-white">Excel-Powered Backend</h5>
              <p className="text-white">
                Sync your existing Google Sheets or Excel files. No complex
                databases required—update your sheet, update your app instantly.
              </p>
              <button class="btn-red">
                20% OFF Containers & Organizers{" "}
                <span>
                  <img src="./images/arrow-right.svg" alt="" />
                </span>
              </button>
            </div>
          </div>
          <div class="f2">
            <div class="f2-1 p-24 f2-1-bg">
              <div class="f2-content">
                <h5 class="text-white">Interactive Floorplans</h5>
                <p class="text-white">
                  Agents can select buildings and floors to view real-time
                  availability, area specs, and unit configurations (1BHK, 2BHK,
                  etc.).
                </p>
              </div>
              <div class="f2-content-vid">
                <img src="./images/video.svg" alt="" />
              </div>
            </div>
            <div class="f2-2">
              <div class="p-24">
                <div>
                  <img
                    src="./images/storage/counter_height_storage_cabinets-upd1.png"
                    alt=""
                    srcset=""
                  />
                </div>
                <h5>Instant Mobile Access</h5>
                <p>
                  A seamless web-app experience that works on any smartphone.
                  Zero friction for your sales team on the field.
                </p>
              </div>
              <div class="p-24">
                <img
                  src="./images/shelving/bin-shelving.png"
                  alt=""
                  srcset=""
                />
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
