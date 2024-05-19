import { fromPromise, setup } from "xstate";

interface Input {
  readonly source: string;
}
const authActor = setup({
  types: {
    input: {} as Input,
  },
  actions: {
    auth: () =>
      fromPromise(() => {
        return fetch("https://syntax.fm/api/shows/latest").then((data) =>
          data.json()
        );
      }),
  },
}).createMachine({
  id: "auth-actor",
});
