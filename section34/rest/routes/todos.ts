import { Application, Router } from "@oak/oak";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", (ctx) => {
  ctx.response.body = { todos };
});

router.post("/todos", async (ctx) => {
  console.log("data");
  const data = await ctx.request.body.json();
  console.log(data);
  const newTodo: Todo = { id: new Date().toISOString(), text: data.text };
  todos.push(newTodo);
  ctx.response.body = { message: "success", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body.json();
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
    ctx.response.body = { message: "success", todos };
  }
});

router.delete("/todos/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todoitem) => todoitem.id !== tid);
  ctx.response.body = { message: "deleted", todos };
});

export default router;
