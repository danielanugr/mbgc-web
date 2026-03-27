import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const galleryType = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Misal: Playday #24 - Kopi Koccoc",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "event",
      title: "Related Event",
      type: "reference",
      to: [{ type: "event" }],
      description: "Album foto ini untuk event mana?",
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Gallery Image",
          fields: [
            {
              name: "url",
              title: "Image URL (R2 CDN)",
              type: "url",
              validation: (rule) => rule.required(),
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
      description:
        "Upload gambar melalui /api/upload atau tools admin, lalu masukkan URL CDN-nya di sini.",
    }),
  ],
});
