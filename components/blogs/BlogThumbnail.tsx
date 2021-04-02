import { Blog } from "types";
import { Box, Image, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BlogViewer, BlogContext } from ".";
import { GlobalContext } from "context";

type PropsType = {
  blog: Blog;
  allowEditting?: boolean;
};

export const BlogThumbnail = (props: PropsType) => {
  const { blog, allowEditting = false } = props;
  const { imageUrl, title } = blog;

  const [hover, setHover] = useState(false);
  const [view, setView] = useState(false);

  return (
    <BlogContext.Provider value={{ blog, allowEditting }}>
      <Box
        cursor="pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setView(true)}
        position="relative"
        width="280px"
        height="180px">
        <Image objectFit="cover" width="100%" height="100%" src={imageUrl} />
        <Box
          transition="background-color linear 0.2s"
          zIndex={1}
          position="absolute"
          overflowY="hidden"
          width="100%"
          height="100%"
          top={0}
          left={0}
          backgroundColor={`rgba(255,255,255,${hover ? 0.5 : 0})`}>
          <Box
            transition="transform linear 0.2s"
            position="absolute"
            bottom="0"
            transform={`translateY(${hover ? "-100%" : "100%"})`}>
            <Text>{title}</Text>
          </Box>
        </Box>
      </Box>
      {view && <BlogViewer onClose={() => setView(false)} />}
    </BlogContext.Provider>
  );
};
