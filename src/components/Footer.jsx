import React from "react";

const Footer = () => {
  return (
    <footer className="">
      <div className="container">
        <p className="text-center">
          Get a custom demo for your latest project today. &nbsp;
          <a href="mailto:thedotwebstudio@gmail.com" className="text-blue">
            thedotwebstudio@gmail.com
          </a>
        </p>
        <p className="text-center">
          <small>
            © {new Date().getFullYear()} TheDotWebStudio. All Rights Reserved.
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
