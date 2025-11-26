import AssignmentModel from "./model.js";

export const findAssignmentsForCourse = (courseId) => {
  return AssignmentModel.find({ course: courseId });
};

export const createAssignment = (assignment) => {
  delete assignment._id;
  return AssignmentModel.create(assignment);
};

export const deleteAssignment = (assignmentId) => {
  return AssignmentModel.deleteOne({ _id: assignmentId });
};

export const updateAssignment = (assignmentId, assignmentUpdates) => {
  return AssignmentModel.updateOne(
    { _id: assignmentId },
    { $set: assignmentUpdates }
  );
};

export const findAssignmentById = (assignmentId) => {
  return AssignmentModel.findById(assignmentId);
};