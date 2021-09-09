import * as React from "react";
import LocalButton from "../button/button";
import { RemoteComponentReceiver } from '../remote-component-receiver/remote-component-receiver';

const remoteComponentReceiverDefintion = {
  urlJs: ['http://localhost:3002/button.js'],
  urlCss: []
};

const App = () => (
  <div>
    <h1>remote-components</h1>
    <h2>App 1</h2>
    <LocalButton />
    <RemoteComponentReceiver {...remoteComponentReceiverDefintion} />
  </div>
);

export default App;
