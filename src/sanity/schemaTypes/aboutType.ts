import { defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

export const aboutType = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "About Mataram Board Game",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
