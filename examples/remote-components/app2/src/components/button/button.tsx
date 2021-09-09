import * as React from "react";
import "./button.css";
import { exportRemoteComponent } from "../remote-component-provider/remote-component-provider";

const Button = () => {
  return <button className="app2-button">App 2 Button</button>;
};

exportRemoteComponent(Button);
export default Button;
