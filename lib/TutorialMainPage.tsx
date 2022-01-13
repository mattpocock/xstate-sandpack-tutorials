import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useMachine } from "@xstate/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { createMachine } from "xstate";
import { Tutorial, tutorialDb } from "../lib/tutorialDb";
import { ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
import Link from "next/link";

const PACKAGE_JSON_CODE = JSON.stringify(
  {
    name: "react-typescript",
    version: "1.0.0",
    description: "React and TypeScript example starter project",
    main: "src/index.tsx",
    dependencies: {
      react: "17.0.2",
      "react-dom": "17.0.2",
      "react-scripts": "4.0.3",
      xstate: "4.27.0",
      "@xstate/react": "1.6.3",
      "@emotion/react": "^11",
      "@emotion/styled": "^11",
      "@chakra-ui/react": "^1.7.4",
      "framer-motion": "^5",
    },
    devDependencies: {
      "@types/react": "17.0.20",
      "@types/react-dom": "17.0.9",
      typescript: "4.4.2",
    },
    scripts: {
      start: "REACT_APP_DISABLE_LIVE_RELOAD=true react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test --env=jsdom",
      eject: "react-scripts eject",
    },
    browserslist: [">0.2%", "not dead", "not ie <= 11", "not op_mini all"],
  },
  null,
  2,
);

const INDEX_PAGE_CODE = `import { render } from "react-dom";
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App";

const rootElement = document.getElementById("root");

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  rootElement,
);
`;

const machine = createMachine<
  {},
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "CLICK_INTRO";
    }
  | {
      type: "CLICK_SOLUTION";
    }
>({
  initial: "idle",
  states: {
    idle: {
      on: {
        CLICK_INTRO: "introModalOpen",
        CLICK_SOLUTION: "solutionModalOpen",
      },
    },
    introModalOpen: {
      on: {
        CLOSE_MODAL: "idle",
      },
    },
    solutionModalOpen: {
      on: {
        CLOSE_MODAL: "idle",
      },
    },
  },
});

export const TutorialMainPage = ({
  tutorial,
  allTutorials,
}: {
  tutorial: Tutorial;
  allTutorials: Tutorial[];
}) => {
  const [state, send] = useMachine(machine);
  return (
    <>
      <Head>
        <title>XState Tutorials | {tutorial.title}</title>
        <meta
          name="description"
          content={`An XState tutorial on how to build a ${tutorial.title}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        h="4rem"
        display="flex"
        alignItems="center"
        px="4"
        justifyContent="space-between"
      >
        <HStack flex="1" spacing="6">
          <Text
            color="gray.800"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="tight"
          >
            XState Tutorials
          </Text>
        </HStack>
        <HStack spacing="10">
          <HStack spacing="4" bgColor="gray.100" rounded="full" pr="5">
            <Text
              bgColor="gray.800"
              rounded="full"
              h="9"
              w="9"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              #1
            </Text>
            <Text
              color="gray.800"
              letterSpacing="tight"
              fontWeight="bold"
              fontSize="lg"
            >
              {tutorial.title}
            </Text>
          </HStack>
          <ButtonGroup>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => send("CLICK_INTRO")}
            >
              Intro
            </Button>
            <Button
              size="sm"
              colorScheme="green"
              onClick={() => send("CLICK_SOLUTION")}
            >
              Solution
            </Button>
          </ButtonGroup>
        </HStack>
        <HStack flex="1" justifyContent="flex-end" spacing="6">
          <Menu>
            <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
              Tutorials
            </MenuButton>
            <MenuList>
              {allTutorials.map((tutorial, index) => {
                return (
                  <Link
                    key={tutorial.id}
                    href={`/tutorial/${tutorial.id}`}
                    passHref
                  >
                    <MenuItem as="a">
                      <HStack spacing="3">
                        <Text fontSize="sm" letterSpacing="tight">
                          #{index + 1} - <Text as="span">{tutorial.title}</Text>
                        </Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                );
              })}
            </MenuList>
          </Menu>
        </HStack>
      </Box>
      <Box
        h="calc(100vh - 4rem)"
        display="flex"
        flexDir="column"
        alignItems="stretch"
        justifyContent="stretch"
        w="full"
      >
        <Sandpack
          template="react-ts"
          files={{
            ...tutorial.files,
            "/package.json": {
              code: PACKAGE_JSON_CODE,
              hidden: true,
            },
            "/index.tsx": {
              code: INDEX_PAGE_CODE,
              hidden: true,
            },
          }}
          theme="github-light"
          options={{
            editorHeight: "calc(100vh - 4rem)",
          }}
        />
      </Box>
      <Modal
        isOpen={state.matches("introModalOpen")}
        onClose={() => {
          send("CLOSE_MODAL");
        }}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Intro</ModalHeader>
          <ModalCloseButton />
          <iframe
            src={`https://www.loom.com/embed/${tutorial.looms.intro}`}
            frameBorder="0"
            allowFullScreen
            width="100%"
            height="360px"
          ></iframe>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={state.matches("solutionModalOpen")}
        onClose={() => {
          send("CLOSE_MODAL");
        }}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Solution</ModalHeader>
          <ModalCloseButton />
          <iframe
            src={`https://www.loom.com/embed/${tutorial.looms.solution}`}
            frameBorder="0"
            allowFullScreen
            width="100%"
            height="360px"
          ></iframe>
        </ModalContent>
      </Modal>
    </>
  );
};
