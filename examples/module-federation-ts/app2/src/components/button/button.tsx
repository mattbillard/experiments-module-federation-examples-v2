import * as React from "react";
import { useEffect } from "react";
import "./button.css";

const Button = () => {
  useEffect(() => {
    console.log("....Hooks are working, proving React is shared between micro apps: button2");
  }, []);
  
  return <button className="app2-button">App 2 Button</button>;
};

export default Button;
