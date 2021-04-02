import { Button, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { BlogThumbnail, Navigator } from "components";
import AdminOnly, { getAdminServerSideProps } from "hocs/AdminOnly";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { blogService } from "services";
import { Blog } from "types";

const DashboardPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const subscription = blogService.subscribe(setBlogs, page);
    return subscription;
  }, []);

  return (
    <Container maxW="container.lg">
      <Navigator />
      <Text>BLOGS</Text>
      <Button onClick={() => router.push("/dashboard/create")}>Create</Button>
      <SimpleGrid minChildWidth="280px" spacing="24px">
        {blogs.map((blog, index) => (
          <BlogThumbnail allowEditting key={`blog_${blog.id}_${index}`} blog={blog} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const getServerSideProps = getAdminServerSideProps;

export default AdminOnly(DashboardPage);
