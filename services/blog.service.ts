import { Blog } from "types";
import firebase from "firebase";
import { BlogGateway } from "gateways/blog.gateway";
import firebaseClient from "providers/firebaseClient";

type SubscriptionHandler = (docs: Blog[]) => void;

export class BlogService {
  constructor(private blogGateway: BlogGateway) {}

  private getDocs = (snapshot: firebase.firestore.QuerySnapshot<Blog>): Blog[] => {
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };
  add = async (body: { title: string; imageUrl: string; content: string }) => {
    return this.blogGateway.add(body);
  };

  update = async (id: Blog["id"], body: Partial<Blog>) => {
    return this.blogGateway.edit(id, body);
  };

  delete = async (id: Blog["id"]) => {
    return this.blogGateway.delete(id);
  };

  subscribe = (handler: SubscriptionHandler, page: number) => {
    const start = page * 10;
    if (typeof window !== "undefined" && firebaseClient.apps.length) {
      return (firebaseClient.firestore().collection("blogs") as firebase.firestore.CollectionReference<Blog>)
        .orderBy("createdAt")
        .startAt(start)
        .limit(10)
        .onSnapshot((snapshot) => handler(this.getDocs(snapshot)));
    }
  };

  get = async (page: number) => {
    const start = page * 10;
    const query = (firebaseClient.firestore().collection("blogs") as firebase.firestore.CollectionReference<Blog>)
      .orderBy("createdAt")
      .startAt(start)
      .limit(10);

    return this.getDocs(await query.get());
  };
}
