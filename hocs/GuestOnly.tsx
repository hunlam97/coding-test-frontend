import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";

import { GlobalContext } from "context";
import { restConnector } from "connector/RestConnector";
import { authService } from "services";
import { User } from "types/user.type";

const guestOnly = (Page: NextPage) => () => {
  const { currentUser } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.replace("/");
    }
  }, [currentUser]);

  return !currentUser ? <Page /> : null;
};

export const getGuestServerSideProps: GetServerSideProps<{ currentUser: User | null }> = async (ctx) => {
  try {
    const { token } = ctx.req.cookies;
    restConnector.defaults.headers["Cookie"] = `token=${token}`;
    restConnector.defaults.headers["authorization"] = `Bearer ${token}`;
    const currentUser = await authService.getById("me");
    if (currentUser) {
      ctx.res.writeHead(302, { Location: "/" }).end();
      return { props: { currentUser } };
    }
    return { props: { currentUser: null } };
  } catch (e) {
    return { props: { currentUser: null } };
  }
};

export default guestOnly;
