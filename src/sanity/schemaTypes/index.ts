import { type SchemaTypeDefinition } from "sanity";

import { eventType } from "./eventType";
import { galleryType } from "./galleryType";
import { boardGameType } from "./boardGameType";
import { postType } from "./postType";
import { aboutType } from "./aboutType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, galleryType, boardGameType, postType, aboutType],
};
