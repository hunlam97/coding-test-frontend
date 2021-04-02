import { restConnector } from "connector/RestConnector";
import { Blog } from "types";

export class BlogGateway {
  add = async (body: Pick<Blog, "title" | "content" | "imageUrl">) => {
    const resp = await restConnector.post("/blogs", body);
    return resp.data;
  };
  delete = async (id: Blog["id"]) => {
    const resp = await restConnector.delete(`/blogs/${id}`);
    return resp.data;
  };
  edit = async (id: Blog["id"], body: Partial<Blog>) => {
    const resp = await restConnector.patch(`/blogs/${id}`, body);
    return resp.data;
  };
}
