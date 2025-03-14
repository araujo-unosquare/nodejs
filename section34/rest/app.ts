import { Application, Router } from "@oak/oak";
import todosRoutes from "./routes/todos.ts";

const app = new Application();

app.use(async (ctx, next) => {
  console.log("Middleware");
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8081 });
