import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-20 px-8 text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Scale Your Sales?</h2>
      <p className="text-slate-400 mb-10">
        Get a custom demo for your latest project today.
      </p>
      <a
        href="mailto:thedotwebstudio@gmail.com"
        className="text-2xl font-semibold hover:text-blue-400 transition underline underline-offset-8">
        thedotwebstudio@gmail.com
      </a>
      <div className="mt-20 pt-8 border-t border-slate-800 text-slate-500 text-sm">
        © {new Date().getFullYear()} TheDotWebStudio. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
