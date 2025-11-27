import ModuleModel from "./model.js";

export default function ModulesDao() {
  function findModulesForCourse(courseId) {
    return ModuleModel.find({ course: courseId });
  }

  function createModule(module) {
    if (!module._id) {
      module._id = new Date().getTime().toString();
    }
    return ModuleModel.create(module);
  }

  function deleteModule(moduleId) {
    return ModuleModel.deleteOne({ _id: moduleId });
  }

  function updateModule(moduleId, moduleUpdates) {
    return ModuleModel.updateOne({ _id: moduleId }, { $set: moduleUpdates });
  }

  function findModuleById(moduleId) {
    return ModuleModel.findById(moduleId);
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
    findModuleById,
  };
}
