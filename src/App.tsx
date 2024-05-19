import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Audio } from "@/components/Audio";
// import { useActor } from "@xstate/react";
import { toggleActor } from "./stateActors/toggleActor";
function App() {
  const [count, setCount] = useState(0);
  // const [actor, set] = useActor(toggleActor);

  return (
    <>
      <div>
        <button onClick={() => toggleActor.send({ type: "TOGGLE" })}>
          toggle
        </button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Audio />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
