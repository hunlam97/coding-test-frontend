import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { GlobalContext } from "context";
import { useRouter } from "next/router";
import { useContext } from "react";
import { authService } from "services";

export const FloatingUser = () => {
  const { currentUser } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <Menu>
      <MenuButton position="fixed" zIndex={100} right={10} bottom={10}>
        <Avatar name={currentUser?.name} size="md" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => authService.ping()}>Ping</MenuItem>
        <MenuItem onClick={() => router.push("/blog")}>Blog</MenuItem>
        {currentUser?.isAdmin && <MenuItem onClick={() => router.push("/dashboard")}>dashboard</MenuItem>}
        {currentUser ? (
          <>
            <MenuItem onClick={() => router.push("/test")}>Test 1</MenuItem>
            <MenuItem onClick={() => authService.logout()}>Logout</MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => router.push("/login")}>Login</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
