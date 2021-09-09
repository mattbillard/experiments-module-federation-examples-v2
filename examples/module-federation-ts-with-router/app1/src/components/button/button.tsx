import * as React from "react";
import { useEffect } from "react";
import "./button.css";

const Button = () => {
  useEffect(() => {
    console.log("....Hooks are working, proving React is shared between micro apps: button1");
  }, []);
  
  return <button className="app1-button">App 1 Button</button>;
};

export default Button;
