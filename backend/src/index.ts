import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { userRoute } from "./routes/user";
import { blogRoute } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.route("/api/v1/user",userRoute)

// app.post("/api/v1/user/signup", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const { email, password, name } = await c.req.json();
//   try {
//     const newUser = await prisma.user.create({
//       data: { email, password, name },
//     });
//     const token = await sign(
//       { id: newUser.id, email: newUser.email },
//       c.env.JWT_SECRET
//     );
//     return c.json({ msg: "user created", token: token });
//   } catch (error) {
//     return c.status(403);
//   }
// });

// app.post("/api/v1/user/signin", async (c) => {
//   const { email, password } = await c.req.json();

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   try {
//     const fetchedUser = await prisma.user.findUnique({
//       where: { email: email },
//     });
//     if (fetchedUser) {
//       if (fetchedUser.password === password) {
//         const token = await sign(
//           { id: fetchedUser.id, email: fetchedUser.email },
//           c.env.JWT_SECRET
//         );
//         return c.json({ msg: "logged in successfully", token: token });
//       } else {
//         return c.json({ msg: "invalid creds" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return c.json("internal error");
//   }
// });

app.route("/api/v1/blog",blogRoute)

// app.use("/api/v1/blog/*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   console.log("blog middleware fired");
//   const authHeader = await c.req.header("authorization");
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     const info = await verify(token, c.env.JWT_SECRET);
//     const fetchedUser = await prisma.user.findUnique({
//       where: {
//         email: info.email,
//       },
//     });
//     if (fetchedUser) {
//       c.set("userId", info.id);
//       await next();
//     } else {
//       return c.notFound();
//     }
//   } else {
//     return c.notFound();
//   }
// });

// app.post("/api/v1/blog", (c) => {
//   return c.text("Hello Hono!");
// });

// app.put("/api/v1/blog", (c) => {
//   return c.text("Hello Hono!");
// });

// app.get("/api/v1/blog/:id", (c) => {
// // console.log(c.get("userId"));

//   return c.text("Hello Hono!");
// });

// app.get("/api/v1/blog/bulk", (c) => {
//   return c.text("Hello Hono!");
// });

export default app;
