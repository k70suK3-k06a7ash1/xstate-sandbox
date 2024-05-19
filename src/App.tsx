import "./App.css";
import { Audio } from "@/components/Audio";
import { useActor } from "@xstate/react";
import { toggleActor, toggleMachine } from "./stateActors/toggleActor";
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

const Counter = () => {
  const [count, setCount] = useActor(countMachine, {
    inspect: (inspectionEvent) => {
      // type: '@xstate.actor' or
      // type: '@xstate.snapshot' or
      // type: '@xstate.event'
      console.log({ inspectionEvent });
    },
  });
  return (
    <button onClick={() => setCount({ type: "INC" })}>
      count is {count.context.count}
    </button>
  );
};
function App() {
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
        <div>{actor.value.toString()}</div>
        <button onClick={() => set({ type: "TOGGLE" })}>local toggle</button>
        <button onClick={() => toggleActor.send({ type: "TOGGLE" })}>
          global toggle
        </button>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter />
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
