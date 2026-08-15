import { Elysia } from "elysia";
import { usersRoute } from "./routes/users-route";

const app = new Elysia()
  .get("/", () => ({
    status: "ok",
    message: "Server is running smoothly with ElysiaJS + Bun + Drizzle + MySQL!",
    timestamp: new Date().toISOString(),
  }))
  .use(usersRoute)
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
