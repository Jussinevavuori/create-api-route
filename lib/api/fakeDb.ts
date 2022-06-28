export type Todo = {
  message: string;
  done: boolean;
  user: string;
};

const _db: Todo[] = [
  {
    user: "1",
    done: false,
    message: "Do the dishes",
  },
  {
    user: "1",
    done: true,
    message: "Write a blog post",
  },
];

export const fakeDb = {
  getTodosForUser(id: string) {
    return new Promise<Todo[]>((resolve) =>
      resolve(_db.filter((_) => _.user === id))
    );
  },

  createTodo(message: string, user: string) {
    return new Promise<Todo>((resolve) => {
      const todo: Todo = { message, done: false, user };
      _db.push(todo);
      resolve(todo);
    });
  },
};
