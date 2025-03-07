import { Router } from "express";
import { Todo } from "../models/todos";

type RequestBody = { text: string };

let todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = { id: new Date().toISOString(), text: body.text };

  todos.push(newTodo);

  res.status(201).json({ message: "Added", todo: newTodo, todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    res.status(200).json({ message: "updated", todos });
  }
  res.status(404).json({ message: "Could not find" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todoitem) => todoitem.id !== req.params.todoId);
  res.status(200).json({ message: "deleted", todos });
});

export default router;
