import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import ModulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();
  const modulesDao = ModulesDao();

  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error finding courses:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    try {
      let { userId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        userId = currentUser._id;
      }
      const courses = await enrollmentsDao.findCoursesForUser(userId);
      res.json(courses);
    } catch (error) {
      console.error("Error finding courses for user:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
      const status = await dao.deleteCourse(courseId);
      res.send(status);
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      const status = await dao.updateCourse(courseId, courseUpdates);
      res.send(status);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const createCourse = async (req, res) => {
    try {
      const newCourse = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      }
      res.json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const enrollUserInCourse = async (req, res) => {
    try {
      let { uid, cid } = req.params;
      if (uid === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        uid = currentUser._id;
      }
      const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
      res.json(status);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    try {
      let { uid, cid } = req.params;
      if (uid === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        uid = currentUser._id;
      }
      const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
      res.json(status);
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const findUsersForCourse = async (req, res) => {
    try {
      const { cid } = req.params;
      const users = await enrollmentsDao.findUsersForCourse(cid);
      res.json(users);
    } catch (error) {
      console.error("Error finding users for course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Assignment routes
  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { cid } = req.params;
      const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
      res.json(assignments);
    } catch (error) {
      console.error("Error finding assignments:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const findAssignmentById = async (req, res) => {
    try {
      const { aid } = req.params;
      const assignment = await assignmentsDao.findAssignmentById(aid);
      res.json(assignment);
    } catch (error) {
      console.error("Error finding assignment:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const createAssignment = async (req, res) => {
    try {
      const { cid } = req.params;
      const newAssignment = await assignmentsDao.createAssignment({
        ...req.body,
        course: cid,
      });
      res.json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteAssignment = async (req, res) => {
    try {
      const { aid } = req.params;
      const status = await assignmentsDao.deleteAssignment(aid);
      res.json(status);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const updateAssignment = async (req, res) => {
    try {
      const { aid } = req.params;
      const status = await assignmentsDao.updateAssignment(aid, req.body);
      res.json(status);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Module routes
  const findModulesForCourse = async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await modulesDao.findModulesForCourse(cid);
      res.json(modules);
    } catch (error) {
      console.error("Error finding modules:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const createModule = async (req, res) => {
    try {
      const { cid } = req.params;
      const newModule = await modulesDao.createModule({
        ...req.body,
        course: cid,
      });
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteModule = async (req, res) => {
    try {
      const { mid } = req.params;
      const status = await modulesDao.deleteModule(mid);
      res.json(status);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const updateModule = async (req, res) => {
    try {
      const { mid } = req.params;
      const status = await modulesDao.updateModule(mid, req.body);
      res.json(status);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Course routes
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.post("/api/courses", createCourse);
  
  // Enrollment routes
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  
  // People route
  app.get("/api/courses/:cid/users", findUsersForCourse);
  
  // Assignment routes
  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/courses/:cid/assignments/:aid", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.delete("/api/courses/:cid/assignments/:aid", deleteAssignment);
  app.put("/api/courses/:cid/assignments/:aid", updateAssignment);

  // Module routes
  app.get("/api/courses/:cid/modules", findModulesForCourse);
  app.post("/api/courses/:cid/modules", createModule);
  app.delete("/api/courses/:cid/modules/:mid", deleteModule);
  app.put("/api/courses/:cid/modules/:mid", updateModule);
}