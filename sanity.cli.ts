import { defineCliConfig } from "sanity/cli";
import { config } from "dotenv";

// Ensure we load the proper fallback .env variables when running Sanity CLI
config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: {
    projectId: projectId || "",
    dataset: dataset || "",
  },
});
