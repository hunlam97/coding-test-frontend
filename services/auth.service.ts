import { AuthGateway } from "gateways/auth.gateway";
import firebaseClient from "providers/firebaseClient";
import { CreateUser, User } from "types/user.type";

export class AuthService {
  constructor(private authGateway: AuthGateway) {}

  ping = async () => {
    return this.authGateway.ping();
  };

  login = async (body: { email: string; password: string }): Promise<void> => {
    await firebaseClient.auth().signInWithEmailAndPassword(body.email, body.password);
  };

  signup = async (body: CreateUser): Promise<void> => {
    await this.authGateway.signup(body);
    await this.login({ email: body.email, password: body.password });
  };

  logout = async () => {
    return firebaseClient.auth().signOut();
  };

  edit = async (firebaseId: User["firebaseId"], body: Partial<User>): Promise<User> => {
    return this.authGateway.edit(firebaseId, body);
  };

  getById = async (firebaseId: User["firebaseId"]): Promise<User> => {
    return this.authGateway.getById(firebaseId);
  };
}
