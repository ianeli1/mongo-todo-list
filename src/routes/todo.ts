import { TodoRequest } from "app";
import { RequestHandler, Router } from "express";
import { standardError } from "../error";
import { todoModel } from "../models/todo";

export const todoRouter = Router();

const getTodo: RequestHandler = async (req: TodoRequest, res, next) => {
  try {
    const sub = await todoModel.findById(req.params.id);
    if (!sub) {
      return res.status(404).json(
        standardError({
          message: `Todo entry id(${req.params.id}) was not found`,
        })
      );
    }
    req.todo = sub;
  } catch (e) {
    return res
      .status(500)
      .json(standardError({ message: "An unhandled error ocurred" }));
  }
  next();
  return;
};

//getting one
todoRouter.get("/:id", getTodo, (req: TodoRequest, res) => {
  res.json(req.todo);
});

//getting all
todoRouter.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (e) {
    console.error(e);
    res.status(500).json(standardError({ message: "An error ocurred!" }));
  }
});

//creating one
todoRouter.post("/", async (req, res) => {
  const { content } = req.body;

  const newSub = new todoModel({
    content,
  });

  try {
    res.status(201).json(await newSub.save());
  } catch (e) {
    console.error(e);
    res.status(500).json(standardError({ message: "Error creating todo" }));
  }
});

//updating one
todoRouter.patch("/:id", getTodo, async (req: TodoRequest, res) => {
  try {
    const { content } = req.body;
    if (content) {
      //@ts-expect-error
      req.todo?.content = content;
    }
    res.json(await req.todo?.save());
  } catch (e) {
    console.error(e);
    res.status(500).json(standardError({ message: "Unhandled error" }));
  }
});

//deleting one
todoRouter.delete("/:id", getTodo, async (req: TodoRequest, res) => {
  try {
    await req.todo?.remove();
    res.json({ id: req.params.id, status: "removed" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json(standardError({ message: "An unhandled error ocurred" }));
  }
});
