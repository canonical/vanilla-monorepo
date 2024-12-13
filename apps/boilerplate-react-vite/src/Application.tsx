import { useState } from "react";
import canonicalLogo from "/canonical.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { Button } from "@canonical/ds-react-core";

import React, { useEffect } from "react";
const DemoComponent = ({ timeout = 2000 }) => {
  const LazyButton = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, timeout));

    return {
      default: () => <button>Click me</button>,
    };
  });

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <div>
      <React.Suspense fallback={<>Waitttt</>}>
        <LazyButton onClick={() => alert("clicked")} />
      </React.Suspense>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a
          href="https://canonical.com"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noreferrer"
        >
          <img src={canonicalLogo} className="logo" alt="Canonical logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Canonical Design System</h1>
      <h2>React Vite template</h2>
      <DemoComponent />
      <div className="card">
        <Button
          label={`Count: ${count}`}
          onClick={() => setCount((count) => count + 1)}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
