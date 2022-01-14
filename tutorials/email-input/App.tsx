import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useMachine } from "@xstate/react";
import { machine } from "./machine";

const App = () => {
  const [state, send] = useMachine(machine);
  return (
    <Box p="6" maxW="xs">
      <InputGroup>
        <Input
          value={state.context.value}
          onChange={(e) => {
            send({
              type: "CHANGE",
              value: e.target.value,
            });
          }}
          placeholder="Enter your email address"
        />
        <InputRightElement pointerEvents="none">
          {state.matches("invalid") ? (
            <WarningTwoIcon color="red.500" />
          ) : (
            <CheckIcon color="gray.300" />
          )}
        </InputRightElement>
      </InputGroup>
      {state.matches("invalid") && (
        <Text fontSize="sm" color="red.500" mt="1">
          Please enter a valid email address
        </Text>
      )}
    </Box>
  );
};

export default App;
