const Enrollment = require('../models/enrollment');

exports.enrollInCourse = (req, res) => {
  const { courseId, studentId } = req.body;

  // Check if the student is already enrolled in the course
  Enrollment.findOne({ courseId, studentId }, (err, existingEnrollment) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Student is already enrolled in the course' });
    }

    // Create a new enrollment
    const enrollment = new Enrollment({ courseId, studentId });
    enrollment.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      return res.status(201).json({ message: 'Enrollment successful' });
    });
  });
};

exports.withdrawFromCourse = (req, res) => {
  const { courseId, studentId } = req.body;

  // Find and delete the enrollment
  Enrollment.findOneAndDelete({ courseId, studentId }, (err, deletedEnrollment) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!deletedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    return res.status(200).json({ message: 'Withdrawal successful' });
  });
};
