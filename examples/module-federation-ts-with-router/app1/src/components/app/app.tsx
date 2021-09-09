import * as React from "react";
import LocalButton from "../button/button";
const RemoteButton = React.lazy(() => import("app2/button"));

const App = () => (
  <div>
    <h1>module-federation-ts-with-router</h1>
    <h2>App 1</h2>
    <LocalButton />
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
