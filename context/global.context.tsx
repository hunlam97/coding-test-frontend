import { createContext, PropsWithChildren, useEffect, useState } from "react";
import firebaseClient from "providers/firebaseClient";
import nookies from "nookies";

import { FloatingUser } from "components";
import { User } from "types";
import { authService } from "services";

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

  // useEffect(() => {
  //   const requestHandler = restConnector.interceptors.request.use(
  //     undefined,
  //     (error) => {

  //     }
  //   );

  //   const responseHandler = restConnector.interceptors.response.use();

  //   return () => {
  //     restConnector.interceptors.request.eject(requestHandler);
  //     restConnector.interceptors.response.eject(responseHandler);
  //   }
  // }, [])

  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        nookies.destroy(undefined, "token");
        nookies.destroy(undefined, "refreshToken");
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
        nookies.set(undefined, "refreshToken", user.refreshToken, { path: "/" });
        setCurrentUser(await authService.getById(user.uid));
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
      <FloatingUser />
      {props.children}
    </GlobalContext.Provider>
  );
};
