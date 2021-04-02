import { createContext } from "react";
import { Blog } from "types";

export const BlogContext = createContext<{ blog: Blog; allowEditting: boolean }>({
  allowEditting: false,
  blog: null,
});

export * from "./BlogEditor";
export * from "./BlogThumbnail";
export * from "./BlogViewer";
