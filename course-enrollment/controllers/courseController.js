const { validationResult } = require('express-validator');
const Course = require('../models/course');

exports.getAllCourses = (req, res) => {
  Course.find({}, (err, courses) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json(courses);
  });
};

exports.addCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, instructor } = req.body;
  const course = new Course({ name, instructor });

  course.save((err) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(201).json({ message: 'Course added successfully' });
  });
};

exports.editCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const courseId = req.params.id;
  const { name, instructor } = req.body;

  Course.findByIdAndUpdate(
    courseId,
    { name, instructor },
    { new: true },
    (err, updatedCourse) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json({ message: 'Course edited successfully' });
    }
  );
};

exports.deleteCourse = (req, res) => {
  const courseId = req.params.id;

  Course.findByIdAndDelete(courseId, (err, deletedCourse) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(200).json({ message: 'Course deleted successfully' });
  });
};
