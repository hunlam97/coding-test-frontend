import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Container, SimpleGrid, Text } from "@chakra-ui/react";
import { Blog } from "types";
import { BlogThumbnail, Navigator } from "components";
import { blogService } from "services";

const SAMPLE_BLOG: Blog = {
  id: "1",
  title: "title",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  imageUrl: "https://picsum.photos/240/180",
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

const BlogPage: NextPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const subscription = blogService.subscribe(setBlogs, page);
    return subscription;
  }, []);

  return (
    <Container maxW="container.lg">
      <Text>BLOGS</Text>
      <SimpleGrid minChildWidth="280px" spacing="24px">
        {blogs.map((blog, index) => (
          <BlogThumbnail key={`blog_${blog.id}_${index}`} blog={blog} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BlogPage;
