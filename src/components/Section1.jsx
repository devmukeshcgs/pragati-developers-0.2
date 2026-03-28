import React from "react";

export default function Section1() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-16">
          Designed for High-Volume Real Estate Operations
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-blue-600 mb-4 text-3xl">📊</div>
            <h3 className="font-bold text-xl mb-2">Excel-Powered Backend</h3>
            <p className="text-slate-600">
              Sync your existing Google Sheets or Excel files. No complex
              databases required—update your sheet, update your app instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-blue-600 mb-4 text-3xl">🗺️</div>
            <h3 className="font-bold text-xl mb-2">Interactive Floorplans</h3>
            <p className="text-slate-600">
              Agents can select buildings and floors to view real-time
              availability, area specs, and unit configurations (1BHK, 2BHK,
              etc.).
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-blue-600 mb-4 text-3xl">📱</div>
            <h3 className="font-bold text-xl mb-2">2Instant Mobile Access</h3>
            <p className="text-slate-600">
              A seamless web-app experience that works on any smartphone. Zero
              friction for your sales team on the field.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-blue-600 mb-4 text-3xl">🏗️</div>
            <h3 className="font-bold text-xl mb-2">3D Visualizations</h3>
            <p className="text-slate-600">
              Coming Soon: Fully interactive 3D building structures to give
              buyers a premium, immersive walkthrough experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
