import mongoose from "mongoose";
import moduleSchema from "./schema.js";

const ModuleModel = mongoose.model("ModuleModel", moduleSchema);

export default ModuleModel;