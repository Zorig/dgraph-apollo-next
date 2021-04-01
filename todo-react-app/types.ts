export type User = {
  username: string;
};

export type Task = {
  id?: string;
  title: string;
  completed: boolean;
  user: User;
};
