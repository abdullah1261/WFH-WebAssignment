const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// Enroll in a course
router.post('/enroll', enrollmentController.enrollInCourse);

// Withdraw from a course
router.post('/withdraw', enrollmentController.withdrawFromCourse);

// Route for handling course enrollment
router.post('/api/enrollments', async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { courseId, studentId } = req.body;
  
      // Create a new enrollment document
      const enrollment = new Enrollment({
        courseId,
        studentId,
      });
  
      // Save the enrollment to the database
      await enrollment.save();
  
      // Return a success message in the API response
      res.json({ message: 'Enrollment successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
