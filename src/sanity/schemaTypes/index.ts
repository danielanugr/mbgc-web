import { type SchemaTypeDefinition } from "sanity";

import { eventType } from "./eventType";
import { galleryType } from "./galleryType";
import { boardGameType } from "./boardGameType";
import { aboutType } from "./aboutType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, galleryType, boardGameType, aboutType],
};
