import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@rglair/common-blogapp";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const result = signupInput.safeParse(await c.req.json());
  if (!result.success) {
    console.log(result.error);
    c.status(400);
    return c.json({ msg: "invalid inputs" });
  }

  const { email, password, name } = await c.req.json();
  try {
    const newUser = await prisma.user.create({
      data: { email, password, name },
    });
    const token = await sign(
      { id: newUser.id, email: newUser.email },
      c.env.JWT_SECRET
    );
    return c.json({ msg: "user created", token: token });
  } catch (error) {
    console.log(error);
    return c.status(403);
  }
});

userRoute.post("/signin", async (c) => {
  const result = signinInput.safeParse(await c.req.json());
  if (!result.success) {
    console.log(result.error);
    c.status(400);
    return c.json({ msg: "invalid inputs" });
  }

  const { email, password } = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const fetchedUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (fetchedUser) {
      if (fetchedUser.password === password) {
        const token = await sign(
          { id: fetchedUser.id, email: fetchedUser.email },
          c.env.JWT_SECRET
        );
        return c.json({ msg: "logged in successfully", token: token });
      } else {
        return c.json({ msg: "invalid creds" });
      }
    }
  } catch (error) {
    console.log(error);
    return c.json("internal error");
  }
});
