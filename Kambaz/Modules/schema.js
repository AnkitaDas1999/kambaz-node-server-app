import mongoose from "mongoose";

const modulesSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    course: { type: String, ref: "CourseModel" },
    lessons: [{ _id: String, name: String, description: String }],
  },
  { collection: "modules" }
);
export default modulesSchema;