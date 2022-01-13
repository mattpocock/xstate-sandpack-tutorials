import type { GetStaticProps, NextPage } from "next";
import { Tutorial, tutorialDb } from "../lib/tutorialDb";
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
