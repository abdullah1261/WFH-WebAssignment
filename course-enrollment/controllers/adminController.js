const Course = require('../models/course');

// Controller actions
exports.getAddCourseForm = (req, res) => {
  res.render('add-course'); // Render the add course form view
};

exports.addCourse = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Perform data validation and create a new course in the database
    const course = await Course.create({ title, description });

    res.redirect('/admin/courses'); // Redirect to the course list view
  } catch (err) {
    console.error(err);
    // Handle error and show appropriate message
  }
};

exports.getEditCourseForm = async (req, res) => {
  const courseId = req.params.id;

  try {
    // Retrieve course data from the database based on the courseId
    const course = await Course.findById(courseId);

    res.render('edit-course', { course }); // Render the edit course form view with the course data
  } catch (err) {
    console.error(err);
    // Handle error and show appropriate message
  }
};

exports.updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const { title, description } = req.body;

  try {
    // Update the course in the database based on the courseId
    await Course.findByIdAndUpdate(courseId, { title, description });

    res.redirect('/admin/courses'); // Redirect to the course list view
  } catch (err) {
    console.error(err);
    // Handle error and show appropriate message
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    // Delete the course from the database based on the courseId
    await Course.findByIdAndDelete(courseId);

    res.redirect('/admin/courses'); // Redirect to the course list view
  } catch (err) {
    console.error(err);
    // Handle error and show appropriate message
  }
};

exports.getCourseList = async (req, res) => {
  try {
    // Retrieve all courses from the database
    const courses = await Course.find();

    res.render('course-list', { courses }); // Render the course list view with the courses data
  } catch (err) {
    console.error(err);
    // Handle error and show appropriate message
  }
};
