import { defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
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
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "Review Board Game", value: "review" },
          { title: "Artikel Komunitas", value: "artikel" },
          { title: "Tips & Guide", value: "guide" },
          { title: "News & Update", value: "news" },
        ],
        layout: "radio",
      },
      initialValue: "artikel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(40).max(220),
      description: "Ringkasan singkat untuk kartu blog dan metadata SEO.",
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      initialValue: "Tim MBGC",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      publishedAt: "publishedAt",
      contentType: "contentType",
    },
    prepare({ title, media, publishedAt, contentType }) {
      const formatDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString("id-ID")
        : "No date";

      return {
        title,
        subtitle: `${contentType || "artikel"} • ${formatDate}`,
        media,
      };
    },
  },
});
