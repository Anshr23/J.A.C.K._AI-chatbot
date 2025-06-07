import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Built by &nbsp;
          <span>
            <Link
              style={{ color: "white" }}
              
              to={"https://www.linkedin.com/in/ansh-rai-98a30233b/"}
            >
              Ansh Rai 
            </Link>
          </span>
          &nbsp; 
        </p>
      </div>
    </footer>
  );
};

export default Footer;