import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Tutorial, tutorialDb } from "../../lib/tutorialDb";
import { TutorialMainPage } from "../../lib/TutorialMainPage";

const Home: NextPage<{ tutorials: Tutorial[]; tutorial: Tutorial }> = (
  props,
) => {
  return (
    <TutorialMainPage
      allTutorials={props.tutorials}
      tutorial={props.tutorial}
    />
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const tutorials = tutorialDb.getAllTutorials();

  return {
    paths: tutorials.map((tutorial) => ({
      params: {
        id: tutorial.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = (ctx) => {
  const tutorials = tutorialDb.getAllTutorials();

  const tutorialId = ctx.params?.id as string;

  const tutorial = tutorials.find((tutorial) => tutorial.id === tutorialId);

  if (!tutorial) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tutorials,
      tutorial,
    },
  };
};

export default Home;
