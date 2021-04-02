import Head from "next/head";
import { useState, useCallback, useContext } from "react";
import { Container, Input, Text, Button } from "@chakra-ui/react";
import { authService } from "services";
import GuestOnly, { getGuestServerSideProps } from "hocs/GuestOnly";
import moment from "moment";
import { GlobalContext } from "context";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>(moment().format("yyyy-MM-DD"));
  const [mode, setMode] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const { setCurrentUser } = useContext(GlobalContext);

  const submit = useCallback(async () => {
    if (mode === "LOGIN") {
      await authService.login({ email, password });
    } else {
      await authService.signup({ email, password, name, dob: moment(dob).toISOString() });
    }
  }, [mode, email, password, name, dob]);

  return (
    <Container>
      <Head>
        <title>{mode}</title>
      </Head>
      <Text as="h3">{mode}</Text>
      <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {mode === "SIGNUP" && (
        <>
          <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="DoB"
            type="date"
            value={dob}
            onChange={(e) => setDob(moment(e.target.value).format("yyyy-MM-dd"))}
          />
        </>
      )}
      <Button onClick={submit}>{mode}</Button>
      <Button onClick={() => setMode(mode === "LOGIN" ? "SIGNUP" : "LOGIN")}>Switch</Button>
    </Container>
  );
};

export const getServerSideProps = getGuestServerSideProps;

export default GuestOnly(LoginPage);
// export default LoginPage;
