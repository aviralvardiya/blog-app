import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@rglair/common-blogapp";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("blog middleware fired");
  const authHeader = await c.req.header("authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const info = await verify(token, c.env.JWT_SECRET);
    const fetchedUser = await prisma.user.findUnique({
      where: {
        email: info.email,
      },
    });
    if (fetchedUser) {
      c.set("userId", info.id);
      await next();
    } else {
      return c.notFound();
    }
  } else {
    return c.notFound();
  }
});

blogRoute.post("/", async (c) => {
  const result = createBlogInput.safeParse(await c.req.json());
  if (!result.success) {
    console.log(result.error);
    c.status(400);
    return c.json({ msg: "invalid inputs" });
  }

  const { title, content } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: c.get("userId"),
      },
    });

    return c.json(newPost);
  } catch (error) {
    console.log(error);
    c.status(500);
  }
});

blogRoute.put("/", async (c) => {
  const result = updateBlogInput.safeParse(await c.req.json());
  if (!result.success) {
    console.log(result.error);
    c.status(400);
    return c.json({ msg: "invalid inputs" });
  }
  const userId = c.get("userId");
  const { postId, title, content } = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        title: title,
        content: content,
      },
    });
    return c.json({ msg: "post updated", updatedPost });
  } catch (error) {
    console.log(error);
    return c.status(500);
  }
});

blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const fetchedPosts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ fetchedPosts });
  } catch (error) {
    console.log(error);
    return c.status(500);
  }
});

blogRoute.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const fetchedPost = await prisma.post.findUnique({
      where: {
        id: c.req.param("id"),
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (fetchedPost) {
      return c.json(fetchedPost);
    } else {
      return c.json({ msg: "invalid post id" });
    }
  } catch (error) {
    console.log(error);
    return c.status(500);
  }
});
