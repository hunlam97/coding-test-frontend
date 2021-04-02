import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const PATH_MAP: {
  [key: string]: { name: string; path: string };
} = {
  "": { name: "Home", path: "/" },
  blog: { name: "Blog", path: "/blog" },
  test: { name: "Test 1", path: "/test" },
  dashboard: { name: "Dashboard", path: "/dashboard" },
  login: { name: "Login", path: "/login" },
  create: { name: "Blog creator", path: "/dashboard/create" },
};

export const Navigator = () => {
  const { pathname } = useRouter();
  const crumbs = useMemo<JSX.Element[]>(() => {
    return pathname
      .split("/")
      .filter((path, index) => path !== "" || index === 0)
      .map((path) => (
        <BreadcrumbItem key={`navigator_${path}`}>
          <BreadcrumbLink href={PATH_MAP[path].path}>{PATH_MAP[path].name}</BreadcrumbLink>
        </BreadcrumbItem>
      ));
  }, [pathname]);
  return (
    <Breadcrumb margin="14px" spacing="8px" separator="/">
      {crumbs}
    </Breadcrumb>
  );
};
