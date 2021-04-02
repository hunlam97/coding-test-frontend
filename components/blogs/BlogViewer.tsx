import { Box, Image, Text, Button } from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { blogService } from "services";
import { BlogContext, BlogEditor } from ".";

type PropsType = {
  onClose?: () => void;
};

const BASE_Z_INDEX = 10;

export const BlogViewer = ({ onClose }: PropsType) => {
  const { blog, allowEditting } = useContext(BlogContext);
  const { imageUrl, title, content } = blog;
  const [editting, setEditting] = useState(false);

  const deleteBlog = useCallback(async () => {
    await blogService.delete(blog.id);
    onClose();
  }, [blog]);

  return (
    <Box zIndex={BASE_Z_INDEX} position="fixed" overflowY="scroll" top={0} left={0} width="100vw" height="100vh">
      <Box
        zIndex={BASE_Z_INDEX + 1}
        position="fixed"
        cursor="pointer"
        width="100%"
        height="100%"
        backgroundColor="rgba(232, 236, 241, 0.7)"
        onClick={onClose}
      />
      <Box
        zIndex={BASE_Z_INDEX + 2}
        position="absolute"
        boxSizing="border-box"
        width={[280, 420, 560, 764]}
        paddingTop={[18, 20, 22, 24]}
        paddingBottom={[18, 20, 22, 24]}
        left="50%"
        transform="translateX(-50%)">
        {!editting || !allowEditting ? (
          <Box
            width="100%"
            height="100%"
            borderRadius="8px"
            backgroundColor="#fff"
            boxShadow="2px 1px 10px #888888"
            padding={12}>
            <Text>{title}</Text>
            <Image objectFit="cover" width="100%" src={imageUrl} />
            <Text>{ReactHtmlParser(content)}</Text>
            {allowEditting && <Button onClick={() => setEditting(true)}>Edit</Button>}
            {allowEditting && <Button onClick={deleteBlog}>Delete</Button>}
          </Box>
        ) : (
          <BlogEditor onClose={() => setEditting(false)} />
        )}
      </Box>
    </Box>
  );
};
