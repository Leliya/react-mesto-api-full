import React from "react";

function Menu({ isOpen }) {
  return <div className={`menu ${isOpen ? "menu_opened" : ""}`}></div>;
}

export default Menu;
