import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Audio } from "@/components/Audio";
import { useActor } from "@xstate/react";
import { toggleMachine } from "./stateActors/toggleActor";
import { fromPromise } from "xstate";
import { countMachine } from "./stateActors/countActor";

const promiseLogic = fromPromise(async () => {
  const data = await fetch("https://syntax.fm/api/shows/latest");
  const json = await data.json();
  return json;
});

const ActorComponent = () => {
  const [state, _send] = useActor(promiseLogic);

  if (state.status === "done") {
    return <div>{JSON.stringify(state.output.id)}</div>;
  }

  if (state.status === "active") {
    return <div>Loading...</div>;
  }

  return <></>;
};
function App() {
  const [count, setCount] = useActor(countMachine, {
    inspect: (inspectionEvent) => {
      // type: '@xstate.actor' or
      // type: '@xstate.snapshot' or
      // type: '@xstate.event'
      console.log({ inspectionEvent });
    },
  });

  const [actor, set] = useActor(toggleMachine, {
    inspect: (inspectionEvent) => {
      // type: '@xstate.actor' or
      // type: '@xstate.snapshot' or
      // type: '@xstate.event'
      console.log({ inspectionEvent });
    },
  });

  return (
    <>
      <div>
        <ActorComponent />
        <>{actor.value}</>
        <button onClick={() => set({ type: "TOGGLE" })}>toggle</button>
        {/* <button onClick={() => toggleActor.send({ type: "TOGGLE" })}>
          toggle
        </button> */}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount({ type: "INC" })}>
          count is {count.context.count}
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
