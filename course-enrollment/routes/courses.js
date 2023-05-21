const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getAllCourses);

// Add a course
router.post(
  '/',
  [
    // Validate course name and instructor
    body('name').notEmpty().withMessage('Course name cannot be empty'),
    body('instructor')
      .notEmpty()
      .withMessage('Instructor name cannot be empty'),
  ],
  courseController.addCourse
);

// Edit a course
router.put(
  '/:id',
  [
    // Validate course ID, name, and instructor
    param('id').notEmpty().withMessage('Course ID cannot be empty'),
    body('name').notEmpty().withMessage('Course name cannot be empty'),
    body('instructor')
      .notEmpty()
      .withMessage('Instructor name cannot be empty'),
  ],
  courseController.editCourse
);

// Delete a course
router.delete(
  '/:id',
  [
    // Validate course ID
    param('id').notEmpty().withMessage('Course ID cannot be empty'),
  ],
  courseController.deleteCourse
);

module.exports = router;
