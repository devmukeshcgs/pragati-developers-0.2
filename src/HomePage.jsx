import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="px-8 py-20 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Transform Your Inventory into an{" "}
          <span className="text-blue-600">Interactive Sales Experience</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
          The ultimate mobile-first solution for Big Builders and Developers to
          manage, visualize, and sell apartments directly from your existing
          data.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#features"
            className="bg-slate-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-slate-800 transition">
            Explore Features
          </a>
          <a
            href="mailto:thedotwebstudio@gmail.com"
            className="border-2 border-slate-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-slate-100 transition">
            Contact Sales
          </a>
        </div>
      </header>

      {/* Feature Section */}
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
              <h3 className="font-bold text-xl mb-2">Instant Mobile Access</h3>
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

      {/* SEO/Content Section */}
      <section className="py-20 px-8 max-w-4xl mx-auto">
        <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
          <h2 className="text-3xl font-bold mb-6 italic text-blue-900">
            Why Top Developers Choose Our Platform?
          </h2>
          <p className="text-lg leading-relaxed text-blue-800 mb-4">
            In the competitive world of real estate, speed is everything. Our
            platform bridges the gap between static spreadsheets and dynamic
            sales presentations. Whether you are managing a single luxury block
            or a massive multi-tower township, our tool gives your agents the
            data they need to close deals on the spot.
          </p>
          <ul className="list-disc ml-6 text-blue-800 space-y-2">
            <li>Reduce manual errors in inventory tracking</li>
            <li>Eliminate the need for expensive custom app development</li>
            <li>Present floorplans professionally on any device</li>
            <li>Future-proof your sales with 3D interactivity</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
