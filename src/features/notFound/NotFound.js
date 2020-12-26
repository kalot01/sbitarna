import React, { useState } from "react";
import Loader from 'react-loader-spinner';
import "./NotFound.css";
import pagenotfound from "./pagenotfound.png";

export default function NotFound() {
  return (
    <div className="notFoundContainer">
      <img src={pagenotfound}></img>
    </div>
  );
}
