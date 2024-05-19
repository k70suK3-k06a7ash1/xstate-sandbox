import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Audio } from "@/components/Audio";
import { audioActor } from "./stateActors/audioActor";
import { useActor } from "@xstate/react";
function App() {
  const [count, setCount] = useState(0);
  // const [a] = useActor(audioActor)

  // audioActor.subscribe((snapshot) => {
  //   console.log(snapshot);
  // });
  // const audioRef = useRef(new Audio("https://audio.transistor.fm/m/shows/40155/2658917e74139f25a86a88d346d71324.mp3"));
  // audioActor.send({type: "loading",params: })

  return (
    <>
      <div>
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
