import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";

import { GlobalContext } from "context";
import { restConnector } from "connector/RestConnector";
import { authService } from "services";
import { User } from "types/user.type";

const userOnly = (Page: NextPage) => () => {
  const { currentUser } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser]);

  return currentUser ? <Page /> : null;
};

export const getUserServerSideProps: GetServerSideProps<{ currentUser: User | null }> = async (ctx) => {
  try {
    const { token } = ctx.req.cookies;
    restConnector.defaults.headers["Cookie"] = `token=${token}`;
    const currentUser = await authService.getById("me");
    if (!currentUser) {
      console.log("no user");
      ctx.res.writeHead(302, { Location: "/login" }).end();
      return { props: { currentUser: null } };
    }
    return { props: { currentUser } };
  } catch (e) {
    console.log("no user");
    ctx.res.writeHead(302, { Location: "/login" }).end();
    return { props: { currentUser: null } };
  }
};

export default userOnly;
