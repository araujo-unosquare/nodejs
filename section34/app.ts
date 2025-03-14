import * as oak from "@oak/oak";
import { Application, Router } from "@oak/oak";

/* const text = "Test text";

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile("message.txt", data).then(() => {
  console.log("success");
});
 */

/* const server = Deno.serve({ port: 3000 }, (req) => {
  return new Response("Hello world");
});
 */

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>Hello oak!</h1>
      </body>
    </html>
  `;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8081 });
