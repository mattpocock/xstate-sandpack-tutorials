import * as fs from "fs";
import * as path from "path";
import { z } from "zod";

export interface Tutorial {
  files: Record<
    string,
    {
      code: string;
      hidden: boolean;
      active: boolean;
    }
  >;
  title: string;
  id: string;
  looms: {
    intro: string;
    solution: string;
  };
  score: number;
}

const infoSchema = z.object({
  title: z.string(),
  active: z.string(),
  hidden: z.array(z.string()),
  looms: z.object({
    intro: z.string(),
    solution: z.string(),
  }),
  score: z.number(),
});

const getAllTutorials = (): Tutorial[] => {
  const tutorialsFolder = path.resolve(process.cwd(), "tutorials");

  const tutorials = fs.readdirSync(tutorialsFolder);

  /**
   * Get all the files in the tutorials folder
   */
  return tutorials
    .map((tutorialDir) => {
      const fullDir = path.resolve(tutorialsFolder, tutorialDir);
      const files = fs.readdirSync(fullDir);

      /**
       * Fail if files doesn't contain
       * info.json
       */
      if (!files.includes("info.json")) {
        throw new Error(`Tutorial ${tutorialDir} does not contain info.json`);
      }

      const infoJsonFileContents = fs
        .readFileSync(path.resolve(fullDir, "info.json"), "utf8")
        .toString();

      const parseResult = infoSchema.safeParse(
        JSON.parse(infoJsonFileContents),
      );

      if (!parseResult.success) {
        throw new Error(
          `Error in ${tutorialDir}/info.json: ${parseResult.error.message}`,
        );
      }

      const filesExceptInfoJson = files.filter((file) => file !== "info.json");

      /**
       * Parse files and their contents to a keyed object
       */
      const filesContents = filesExceptInfoJson.reduce(
        (acc, file) => {
          const filePath = path.resolve(fullDir, file);
          let fileContents = fs.readFileSync(filePath, "utf8").toString();

          if (file === "App.tsx") {
            fileContents += `\nexport const yes = 'yes';`;
          }
          return {
            ...acc,
            [`/${file}`]: {
              code: fileContents,
              hidden: parseResult.data.hidden.includes(file),
              active: parseResult.data.active === file,
            },
          };
        },
        {} as Record<
          string,
          {
            code: string;
            hidden: boolean;
            active: boolean;
          }
        >,
      );

      return { ...parseResult.data, files: filesContents, id: tutorialDir };
    })
    .sort((a, b) => b.score - a.score);
};

export const tutorialDb = {
  getAllTutorials,
};
