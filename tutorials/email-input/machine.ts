import { createMachine } from "xstate";
import { isValidEmailAddress } from "./isValidEmailAddress";

/**
 * Create an email address input which shows
 * an error if the user types an invalid email
 *
 * 1. The value of the text input is controlled
 * by context.value
 *
 * 2. The error message will be shown when you
 * enter the 'invalid' state
 *
 * 3. When the input changes, you'll receive a
 * CHANGE event with this shape:
 *
 * {
 *   type: 'CHANGE',
 *   value: 'new value'
 * }
 *
 * 4. There's a file above called isValidEmailAddress,
 * which you can pass a string to return a boolean
 */
export const machine = createMachine({
  context: {
    value: "",
  },
  initial: "invalid",
  states: {
    invalid: {},
  },
});

/**
 * Helpful docs:
 *
 * Guarded transitions:
 * https://xstate.js.org/docs/guides/guards.html#guarded-transitions
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
