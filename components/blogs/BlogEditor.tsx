import { useCallback, useContext, useMemo, useState } from "react";
import { EditorState } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import { Input, Button, Box } from "@chakra-ui/react";
import { BlogContext } from ".";
import dynamic from "next/dynamic";
import { blogService } from "services";

const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

type PropsType = {
  onClose: () => void;
};

export const BlogEditor = ({ onClose }: PropsType) => {
  const { blog } = useContext(BlogContext);
  const [title, setTitle] = useState(() => blog.title);
  const [imageUrl, setImageUrl] = useState(() => blog.imageUrl);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(stateFromHTML(blog.content)));

  const content = useMemo(() => stateToHTML(editorState.getCurrentContent()), [editorState]);

  const save = useCallback(async () => {
    await blogService.update(blog.id, { title, content });
  }, [title, content]);

  return (
    <Box borderRadius="8px" boxShadow="2px 1px 10px #888888" backgroundColor="white">
      <Input color="primary" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Input color="primary" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image url" />
      <Box>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </Box>
      <Button onClick={save}>Save</Button>
      <Button onClick={onClose}>Cancel</Button>
    </Box>
  );
};
