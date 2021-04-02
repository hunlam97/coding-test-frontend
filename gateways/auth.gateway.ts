import { restConnector } from "connector/RestConnector";
import { CreateUser, User } from "types/user.type";

export class AuthGateway {
  signup = async (body: CreateUser) => {
    const resp = await restConnector.post("/users/signup", body);
    return resp.data;
  };

  login = async (body: Pick<User & { password: string }, "email" | "password">) => {
    const resp = await restConnector.post("/users/login", body);
    return resp.data;
  };

  getById = async (firebaseId: User["firebaseId"]) => {
    const resp = await restConnector.get(`/users/${firebaseId}`);
    return resp.data;
  };

  edit = async (firebaseId: User["firebaseId"], body: Partial<User>) => {
    const resp = await restConnector.patch(`/users/${firebaseId}`, body);
    return resp.data;
  };

  ping = async () => {
    console.log(process.env.API_BASE_URL);
    const resp = await restConnector.get(`/users/ping`);
    return resp.data;
  };
}
