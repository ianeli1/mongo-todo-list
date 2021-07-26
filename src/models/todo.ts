import { Schema, model } from "mongoose";

export const todoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

export const todoModel = model("Todo", todoSchema);
