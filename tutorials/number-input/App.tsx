import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useMachine } from "@xstate/react";
import { machine } from "./machine";

const App = () => {
  const [state, send] = useMachine(machine);
  return (
    <Box p="6">
      <HStack>
        <IconButton
          aria-label="Remove"
          icon={<MinusIcon />}
          onClick={() => send("DECREMENT")}
        ></IconButton>
        <Text>{state.context.num}</Text>
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          onClick={() => send("INCREMENT")}
        ></IconButton>
      </HStack>
    </Box>
  );
};

export default App;
