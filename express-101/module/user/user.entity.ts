export type User = {
  name: string;
  id: string;
  email: string;
  avatar: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  postCounts: number;
};
