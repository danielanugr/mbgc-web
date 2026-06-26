export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  _key?: string;
}

export interface SanityEvent {
  _id: string;
  _updatedAt?: string;
  title: string;
  date: string;
  location: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
  excerpt?: string;
  description?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface SanityGallery {
  _id: string;
  _updatedAt?: string;
  title: string;
  date: string;
  slug: {
    current: string;
  };
  coverImage?: SanityImage;
  images?: SanityImage[];
}

export interface SanityBoardGame {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
  shortDescription?: string;
  minPlayers?: number;
  maxPlayers?: number;
  playTime?: number;
  bggId?: number;
}

export interface BlogPostListItem {
  _id: string;
  title?: string;
  slug?: string;
  contentType?: string;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  tags?: string[];
  readingTime?: number;
}

export interface BlogPostDetail {
  _id: string;
  title?: string;
  slug?: string;
  contentType?: string;
  excerpt?: string;
  authorName?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
  tags?: string[];
  body?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  readingTime?: number;
}
