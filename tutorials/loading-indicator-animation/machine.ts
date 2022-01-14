import { createMachine } from "xstate";

/**
 * The goal is to create a loading indicator
 * which gets larger and larger over time, starting
 * from extra-small, and ending at extra-large. You
 * have five states available:
 *
 * xsmall
 * small
 * medium
 * large
 * xlarge
 *
 * The loading indicator should get bigger every 2 seconds!
 */
export const machine = createMachine({
  initial: "xsmall",
  states: {
    xsmall: {},
  },
});

/**
 * Helpful docs:
 *
 * Delayed Transitions:
 * https://xstate.js.org/docs/guides/delays.html#delayed-transitions
 *
 * States:
 * https://xstate.js.org/docs/guides/states.html#api
 */
