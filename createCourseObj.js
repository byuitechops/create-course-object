/*eslint-env node, es6*/

/* Put dependencies here */
var Course = require('./Course.js');

module.exports = (data, stepCallback) => {
    /* Create the course object, give it the original filepath, and settings */
    var course;

    /* Check if the filePath contains .ZIP */
    if (!(/\.zip/i).test(data.name)) {
        data.name += '.zip';
    }

    if (!data.name) {
        stepCallback(new Error('Filepath is empty'));
        return;
    }

    course = new Course(data);
    course.message('Course Object Created');

    /* Have the course meet with the missionaries so it can be converted */
    stepCallback(null, course);
};