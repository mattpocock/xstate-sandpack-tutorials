import { machine } from "./machine";
import { useMachine } from "@xstate/react";
import { Box, Spinner } from "@chakra-ui/react";

const App = () => {
  const [state] = useMachine(machine);
  return (
    <Box p="6">
      {state.matches("xsmall") && <Spinner size="xs"></Spinner>}
      {state.matches("small") && <Spinner size="sm"></Spinner>}
      {state.matches("medium") && <Spinner size="md"></Spinner>}
      {state.matches("large") && <Spinner size="lg"></Spinner>}
      {state.matches("xlarge") && <Spinner size="xl"></Spinner>}
    </Box>
  );
};

export default App;
