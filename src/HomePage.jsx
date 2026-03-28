import React from "react";
import Hero from "./components/Hero";
import Section1 from "./components/Section1";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import SectionFour from "./components/SectionFour";
import SectionFive from "./components/SectionFive";
import SectionSix from "./components/SectionSix";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <Hero />
      {/* Feature Section */}
      {/* <Section1 /> */}
      {/* Feature Section 2*/}
      <SectionTwo />
      {/* Feature Section 3*/}
      <SectionThree />
      {/* Feature Section 3*/}
      <SectionFour />
      {/* Feature Section 3*/}
      <SectionFive />
      {/* <SectionSix /> */}

      {/* SEO/Content Section */}
 
    </div> 
  );
};

export default HomePage;
