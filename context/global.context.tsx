import { createContext, PropsWithChildren, useEffect, useState } from "react";
import firebaseClient from "providers/firebaseClient";
import nookies from "nookies";

import { FloatingUser, Navigator } from "components";
import { User } from "types";
import { authService } from "services";
import { restConnector } from "connector/RestConnector";
import { useRouter } from "next/router";

export const GlobalContext = createContext<{
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const GlobalContextWrapper = (
  props: PropsWithChildren<{
    currentUser: User | null;
  }>
) => {
  const [currentUser, setCurrentUser] = useState<User | null>(props.currentUser);
  const router = useRouter();

  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        nookies.destroy(undefined, "token");
        nookies.destroy(undefined, "refreshToken");
        restConnector.defaults.headers["authorization"] = undefined;
        router.push("/login");
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
        nookies.set(undefined, "refreshToken", user.refreshToken, { path: "/" });
        restConnector.defaults.headers["authorization"] = `Bearer ${token}`;
        setCurrentUser(await authService.getById("me"));
        router.push("/test");
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      <Navigator />
      <FloatingUser />
      {props.children}
    </GlobalContext.Provider>
  );
};
