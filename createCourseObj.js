/*eslint-env node, es6*/

/* Put dependencies here */
var Course = require('./Course.js');

module.exports = (data = {}, stepCallback) => {
    /* Create the course object, give it the original filepath, and settings */
    var course;

    /* Check if the filePath contains .ZIP */
    if (data.name && !(/\.zip/i).test(data.name)) {
        data.name += '.zip';
    }

    course = new Course(data);
    course.message('Course Object Created');

    /* Have the course meet with the missionaries so it can be converted */
    stepCallback(null, course);
};