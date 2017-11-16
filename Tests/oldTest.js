// /* Dependencies */
const tap = require('tap');
const createCourseObj = require('../createCourseObj.js');
//
var mockFilepath = 'Potato/Tomato/Lomato';

var mockSettings = {
    'debug': true,
    'readAll': true,
    'online': true,
    'keepFiles': true,
    'deleteCourse': true
};

var mockCb = (err, resultCourse) => {
    if (err) throw err;
};

var resultCourseObj;
createCourseObj(mockFilepath, mockSettings, (err, resultCourse) => {
    resultCourseObj = resultCourse;
});

function doesNotThrow(f) {
    try {
        f;
        return true;
    } catch (e) {
        return false;
    }
}

function throws(f) {
    try {
        f;
        return false;
    } catch (e) {
        return true;
    }
}

function hasProperty(property) {
    return  resultCourseObj[property] != null &&
            resultCourseObj[property] != undefined &&
            resultCourseObj[property] != '';
}

function hasDeepProperty(property) {
    var higherProp = property.split('.')[0];
    var deeperProp = property.split('.')[1];
    return  resultCourseObj[higherProp][deeperProp] != null &&
            resultCourseObj[higherProp][deeperProp] != undefined &&
            resultCourseObj[higherProp][deeperProp] != '';
}

throws(createCourseObj(null, {}, mockCb));

module.exports = [
    tap.pass(doesNotThrow(createCourseObj(mockFilepath, mockSettings, mockCb))),
    tap.pass(throws(createCourseObj(mockFilepath, mockSettings, mockCb))),
    tap.pass(throws(createCourseObj(mockFilepath, {}, mockCb))),
    tap.type(resultCourseObj, 'object'),
    tap.equal(hasProperty('info'), true),
    tap.equal(hasProperty('settings'), true),
    tap.equal(hasProperty('report'), true),
    tap.equal(hasProperty('content'), true),
    tap.equal(hasDeepProperty('info.fileName'), true),
    tap.equal(hasDeepProperty('settings.debug'), true),
    tap.equal(hasDeepProperty('settings.readAll'), true),
    tap.equal(hasDeepProperty('settings.keepFiles'), true),
    tap.equal(hasDeepProperty('settings.deleteCourse'), true),
    tap.equal(hasDeepProperty('settings.online'), true),
];
