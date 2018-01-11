/*eslint-env node, es6*/

/* Put dependencies here */
var Course = require('./Course.js');

module.exports = (courseData, stepCallback) => {
    /* Create the course object, give it the original filepath, and settings */

    /* Check if the filePath contains .ZIP */
    if (!(/\.zip/i).test(courseData.courseInfo.path)){
        courseData.courseInfo.path += '.zip';
    }

    if (!courseData.courseInfo.path) {
        stepCallback(new Error('Filepath is empty'));
        return;
    }

    var course = new Course(courseData);
    /* Create report module for indexer main since course object didn't exist until now */
    course.addModuleReport('createCourseObj');
    /* We did it! */
    course.success('createCourseObj', 'Course object creation successful.');
    /* Have the course meet with the missionaries so it can be converted */
    stepCallback(null, course);
};
