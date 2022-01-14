import { createMachine } from "xstate";

/**
 * The goal is to create a number input that you can
 * adjust by clicking on the + and - buttons.
 *
 * Clicking on the + button will fire the INCREMENT
 * event at the state machine.
 *
 * Clicking on the - button will fire the DECREMENT
 * event.
 *
 * Use the 'Intro' button above to see a video explaining
 * the problem, and the 'Solution' button for a video
 * with a solution.
 */
export const machine = createMachine({
  context: {
    num: 0,
  },
});

/**
 * Helpful docs:
 *
 * Transitions:
 * https://xstate.js.org/docs/guides/transitions.html
 *
 * Actions on transitions:
 * https://xstate.js.org/docs/guides/actions.html#api
 *
 * Context:
 * https://xstate.js.org/docs/guides/context.html#context
 *
 * Assign action:
 * https://xstate.js.org/docs/guides/context.html#assign-action
 */
