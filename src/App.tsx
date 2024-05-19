import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { audioActor } from "@/stateActors/audioActor";
import { useMachine } from "@xstate/react";

function App() {
  const [count, setCount] = useState(0);
  const [snapshot, send] = useMachine(audioActor);

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
      <pre>{JSON.stringify(snapshot.value, null, 2)}</pre>
      <audio
        crossOrigin="anonymous"
        src="https://audio.transistor.fm/m/shows/40155/2658917e74139f25a86a88d346d71324.mp3"
        onTimeUpdate={({ currentTarget: audioRef }) =>
          send({ type: "time", params: { updatedTime: audioRef.currentTime } })
        }
        onError={({ type }) =>
          send({ type: "init-error", params: { message: type } })
        }
        onLoadedData={({ currentTarget: audioRef }) =>
          send({ type: "loading", params: { audioRef } })
        }
        onEnded={() => send({ type: "end" })}
      />
      <p>{`Current time: ${snapshot.context.currentTime}`}</p>
      <div>
        {snapshot.matches({ Active: "Paused" }) && (
          <button onClick={() => send({ type: "play" })}>Play</button>
        )}

        {snapshot.matches({ Active: "Playing" }) && (
          <button onClick={() => send({ type: "pause" })}>Pause</button>
        )}

        {snapshot.matches("Active") && (
          <button onClick={() => send({ type: "restart" })}>Restart</button>
        )}
      </div>{" "}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
