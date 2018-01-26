/*eslint-env node, es6*/

/* Put dependencies here */
var Course = require('./Course.js');

module.exports = (courseData, stepCallback) => {
    /* Create the course object, give it the original filepath, and settings */
    var course;

    /* Check if the filePath contains .ZIP */
    if (!(/\.zip/i).test(courseData.courseInfo.path)){
        courseData.courseInfo.path += '.zip';
    }

    if (!courseData.courseInfo.path) {
        stepCallback(new Error('Filepath is empty'));
        return;
    }

    course = new Course(courseData);
    course.message('Course Object Created');
    
    /* Have the course meet with the missionaries so it can be converted */
    stepCallback(null, course);
};
