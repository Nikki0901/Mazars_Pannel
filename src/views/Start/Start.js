import React from "react";
import "../../assets/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import CategorySelect from "../../components/CategorySelect/CategorySelect";


function Start() {
  return (
    <>
      <Header noSign="noSign" />

      <CategorySelect startbtn="startbtn"/>
      <Footer />
    </>
  );
}

export default Start;
