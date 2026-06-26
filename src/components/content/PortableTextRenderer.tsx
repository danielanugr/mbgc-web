import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/types/sanity";

type PortableTextValue = PortableTextProps["value"];

interface PortableTextImageValue extends SanityImage {
  caption?: string;
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as PortableTextImageValue | undefined;

      if (!image?.asset?._ref) {
        return null;
      }

      return (
        <figure className='my-8 overflow-hidden rounded-2xl border-2 border-primary/15 bg-primary/5 p-3'>
          <Image
            src={urlForImage(image).width(1400).height(900).url()}
            alt={image.alt || image.caption || "MBGC content image"}
            width={1400}
            height={900}
            sizes='(max-width: 768px) 100vw, 900px'
            className='h-auto w-full rounded-xl object-cover'
          />
          {(image.caption || image.alt) && (
            <figcaption className='px-1 pt-3 text-sm font-bold text-primary/60'>
              {image.caption || image.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" && value.href.length > 0
          ? value.href
          : "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextValue }) {
  if (!value) {
    return null;
  }

  return <PortableText value={value} components={portableTextComponents} />;
}
