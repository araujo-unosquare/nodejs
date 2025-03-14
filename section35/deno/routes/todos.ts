import { Application, Router } from "@oak/oak";
import { getDb } from "../helpers/db.ts";
import { ObjectId } from "@db/mongo";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", async (ctx) => {
  const todos = await getDb().collection("todos").find().toArray();
  console.log(todos);
  const transformedTodos = todos.map((todo) => {
    return { id: todo._id.$oid, text: todo.text };
  });
  ctx.response.body = { todos: transformedTodos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body.json();

  let newTodo: Todo = { text: data.text };

  const id = await getDb().collection("todos").insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = { message: "success", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body.json();
  await getDb()
    .collection("todos")
    .updateOne({ _id: ObjectId(tid) }, { $set: { text: data.text } });
  ctx.response.body = { message: "success" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body.json();
  await getDb()
    .collection("todos")
    .deleteOne({ _id: ObjectId(tid) });
  ctx.response.body = { message: "deleted" };
});

export default router;
