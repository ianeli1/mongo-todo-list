import type { Request as ExpressReq } from "express";
import type { Document } from "mongoose";
import type { todoModel } from "./src/models/todo";

interface TodoRequest extends ExpressReq {
  todo?: Document<todoModel>;
}
