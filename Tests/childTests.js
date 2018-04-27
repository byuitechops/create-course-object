/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');

module.exports = (course, callback) => {

    tap.ok(course);
    tap.ok(course.settings);
    tap.ok(course.info);
    tap.ok(course.content);
    tap.ok(course.logger);
    tap.ok(course.log);
    tap.ok(course.warning);
    tap.ok(course.error);
    tap.ok(course.message);
    tap.ok(course.fatalError);
    tap.ok(course.console);
    tap.ok(course.info.originalZipPath);
    tap.ok(course.info.unzippedPath);
    tap.ok(course.info.processedPath);
    tap.ok(course.info.uploadZipPath);
    tap.ok(course.info.fileName);
    tap.ok(course.info.canvasOU);
    tap.ok(course.info.courseName);
    tap.ok(course.info.courseCode);

    callback(null, course);
};