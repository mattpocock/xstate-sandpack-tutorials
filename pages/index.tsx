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
import { TutorialMainPage } from "../lib/TutorialMainPage";

const Home: NextPage<{ tutorials: Tutorial[] }> = (props) => {
  const tutorial = props.tutorials[0];

  return (
    <TutorialMainPage allTutorials={props.tutorials} tutorial={tutorial} />
  );
};

export const getStaticProps: GetStaticProps = () => {
  const tutorials = tutorialDb.getAllTutorials();

  return {
    props: {
      tutorials,
    },
  };
};

export default Home;
