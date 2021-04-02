export type User = {
  firebaseId: string;
  email: string;
  name: string;
  dob: string;
  isAdmin: boolean;
  isActive: boolean;
};

export type CreateUser = Omit<User, "isAdmin" | "isActive" | "firebaseId"> & { password: string };
