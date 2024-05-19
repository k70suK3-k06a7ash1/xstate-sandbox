/**
 * Creates a new Interpreter instance for the given machine with the provided options, if any.
 *
 * @description Use `createActor` instead
 */
import { createMachine, createActor } from "xstate";

// State machine definition
const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: { on: { TOGGLE: "active" } },
    active: { on: { TOGGLE: "inactive" } },
  },
});

// Machine instance with internal state
export const toggleActor = createActor(toggleMachine);
toggleActor.subscribe((state) => {
  console.log(state.value);
});
toggleActor.start();

// toggleActor.send({ type: "TOGGLE" });
// // => logs 'active'

// toggleActor.send({ type: "TOGGLE" });
