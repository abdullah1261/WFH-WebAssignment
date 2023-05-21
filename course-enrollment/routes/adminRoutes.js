const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Add course form
router.get('/courses/add', adminController.getAddCourseForm);

// Handle add course form submission
router.post('/courses/add', adminController.addCourse);

// Edit course form
router.get('/courses/:id/edit', adminController.getEditCourseForm);

// Handle edit course form submission
router.post('/courses/:id/edit', adminController.updateCourse);

// Delete course
router.post('/courses/:id/delete', adminController.deleteCourse);

// Course list
router.get('/courses', adminController.getCourseList);

module.exports = router;
