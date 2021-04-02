import { AuthGateway } from "gateways/auth.gateway";
import firebaseClient from "providers/firebaseClient";
import { CreateUser, User } from "types/user.type";

export class AuthService {
  constructor(private authGateway: AuthGateway) {}

  ping = async () => {
    const document = await firebaseClient.firestore().collection("blogs").doc("mqrUxWP5Ym9jjeJ5gFxI").get();
    console.log({ ...document.data(), id: document.id });
    return this.authGateway.ping();
  };

  login = async (body: { email: string; password: string }): Promise<User> => {
    const { user } = await firebaseClient.auth().signInWithEmailAndPassword(body.email, body.password);
    return this.getById(user.uid);
  };

  signup = async (body: CreateUser): Promise<User> => {
    await this.authGateway.signup(body);
    return this.login({ email: body.email, password: body.password });
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
