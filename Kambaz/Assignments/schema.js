import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    points: { type: Number, default: 100 },
    dueDate: String,
    availableFrom: String,
    availableUntil: String,
    course: { type: String, required: true },
  },
  { collection: "assignments" }
);

export default assignmentSchema;