import model from "./model.js";
import CourseModel from "../Courses/model.js";
import UserModel from "../Users/model.js";

export default function EnrollmentsDao() {
  // Find all courses a user is enrolled in
  async function findCoursesForUser(userId) {
    console.log("DAO: Finding enrollments for user:", userId);
    const enrollments = await model.find({ user: userId });
    console.log("DAO: Found enrollments:", enrollments);
    
    const courseIds = enrollments.map((enrollment) => enrollment.course);
    console.log("DAO: Course IDs:", courseIds);
    
    const courses = await CourseModel.find({ _id: { $in: courseIds } });
    console.log("DAO: Found courses:", courses);
    
    return courses;
  }

  // Find all users enrolled in a course
  async function findUsersForCourse(courseId) {
    console.log("DAO: Finding users for course:", courseId);
    const enrollments = await model.find({ course: courseId });
    console.log("DAO: Found enrollments:", enrollments);
    
    const userIds = enrollments.map((enrollment) => enrollment.user);
    console.log("DAO: User IDs:", userIds);
    
    const users = await UserModel.find({ _id: { $in: userIds } });
    console.log("DAO: Found users:", users);
    
    return users;
  }

  // Enroll a user in a course
  async function enrollUserInCourse(userId, courseId) {
    // Check if already enrolled
    const existingEnrollment = await model.findOne({
      user: userId,
      course: courseId,
    });
    
    if (existingEnrollment) {
      return existingEnrollment;
    }

    // Create new enrollment with composite ID
    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
    });
  }

  // Unenroll a user from a course
  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  // Unenroll all users from a course (when deleting a course)
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  // Find all enrollments for a specific user
  function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }

  // Find all enrollments for a specific course
  function findEnrollmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
  };
}