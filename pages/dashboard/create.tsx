import AdminOnly, { getAdminServerSideProps } from "hocs/AdminOnly";
import { Container, Input, Box, Button } from "@chakra-ui/react";
import { Navigator } from "components";
import { useCallback, useMemo, useState } from "react";
import { EditorState } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import dynamic from "next/dynamic";
import { blogService } from "services";
import { useRouter } from "next/router";

const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

const BlogCreationPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const content = useMemo(() => stateToHTML(editorState.getCurrentContent()), [editorState]);

  const save = useCallback(async () => {
    await blogService.add({ title, content, imageUrl });
    router.push("/dashboard");
  }, [title, content, imageUrl]);

  return (
    <Container maxW="container.lg">
      <Input
        margin="8px"
        color="primary"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        margin="8px"
        color="primary"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image Url"
      />
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
      <Button color="primary" margin="8px" onClick={save}>
        Save
      </Button>
    </Container>
  );
};

export const getServerSideProps = getAdminServerSideProps;

export default AdminOnly(BlogCreationPage);
