/*eslint-env node, es6*/
/*eslint no-console:1*/

const path = require('path');
const chalk = require('chalk');
const fws = require('fixed-width-string');
const moment = require('moment');

module.exports = class Course {
    constructor(courseData) {
        this.settings = courseData.settings;
        this.info = {
            // 'domain': courseData.courseInfo.domain,
            // 'D2LOU': courseData.courseInfo.D2LOU,
            'originalZipPath': path.resolve('factory', 'originalZip', courseData.courseInfo.path),
            'unzippedPath': path.resolve('factory', 'unzipped'),
            'processedPath': path.resolve('factory', 'processed'),
            'uploadZipPath': path.resolve('factory', 'uploadZip'),
            'fileName': courseData.courseInfo.path.split(path.sep)[courseData.courseInfo.path.split(path.sep).length - 1],
            'linkCounter': 0,
            // 'childModules': courseData.settings.childModules,
            // 'canvasOU': courseData.courseInfo.canvasOU,
            get counter() {
                this.linkCounter = this.linkCounter++;
                return this.linkCounter;
            }
        };
        this.logs = [];
        this.content = [];

        if ((/\d{3}\w?/i).test(this.info.fileName)) {
            this.info.courseName = this.info.fileName.split(/\d{3}\w?/i)[0].trim();
            this.info.courseCode = `${this.info.fileName.split(/\d{3}\w?/i)[0].trim()} ${this.info.fileName.match(/\d{3}\w?/i)[0]}`;
        } else {
            this.info.courseName = this.info.fileName.split('.zip')[0];
            this.info.courseCode = this.info.fileName.split('.zip')[0];
        }
    }

    /* Stack Overflow credit: https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function/29581862#29581862 */
    getCallingModule() {
        var callingModule, filePaths, x, callingPath, err, currentFile,
            originalPrepareStackTrace = Error.prepareStackTrace; /* So we don't lose the prepareStackTrace */
        try {
            err = new Error();
            currentFile;
            Error.prepareStackTrace = function (err, stack) {
                return stack;
            };

            filePaths = err.stack.map(item => item.getFileName());

            currentFile = path.basename(filePaths[0]);

            for (x = 0; x < filePaths.length; x++) {
                if (path.basename(filePaths[x]) != currentFile) {
                    callingPath = path.dirname(filePaths[x]).split(path.sep);
                    callingModule = callingPath[callingPath.length - 1];
                    break;
                }
            }
            /* reset prepareStackTrace */
            Error.prepareStackTrace = originalPrepareStackTrace;
        } catch (e) {
            console.log('Call Location Error:', e);
        }
        return callingModule;
    }

    /* Used to log items */
    log(title, obj) {
        var logObj;

        if (obj == undefined || typeof title != 'string') {
            console.log(this.getCallingModule(), 'Incorrect inputs into course.log: ', title);
            return;
        }

        logObj = {
            title: title,
            location: this.getCallingModule(),
            timestamp: moment().format(),
            data: obj
        };

        this.logs.push(logObj);
        this.console(logObj);
    }

    /* Used to throw errors */
    error(err) {
        this.log('error', {
            message: err.message,
            stack: err.stack
        });
    }

    /* Used to throw warnings */
    warning(message) {
        // if (typeof message == 'string')
        this.log('warning', {
            message: message
        });
    }

    /* Used to throw fatal errors */
    fatalError(err) {
        this.log('fatalError', {
            message: err.message,
            stack: err.stack
        });
    }

    /* Takes a string - used for logging one-time actions or displaying things to the console */
    message(message) {
        this.log('message', {
            message: message
        });
    }

    console(logObj) {
        var color1, color2;

        function formatMessage(data) {
            var properties = [];
            Object.keys(data).forEach(key => {
                properties.push(`${chalk.gray(key + ':')} ${data[key]}`);
            });
            return properties.join(' ');
        }


        color1 = chalk.blueBright;
        color2 = chalk.whiteBright;
        if (logObj.title == 'error') {
            color1 = chalk.red;
            color2 = chalk.redBright;
        } else if (logObj.title == 'fatalError') {
            color1 = chalk.bgRed;
            color2 = chalk.redBright;
        } else if (logObj.title == 'message') {
            color1 = chalk.greenBright;
        } else if (logObj.title == 'warning') {
            color1 = chalk.yellow;
            color2 = chalk.yellowBright;
        }

        if (logObj.title == 'error') {
            console.log(
                fws(chalk.cyan(logObj.location), 15),
                color1(`${fws(logObj.title, 25, { align: 'left' })}`),
                color2(formatMessage(logObj.data))
            );
            return;
        }

        console.log(
            fws(chalk.cyan(logObj.location), 15),
            color1(`${fws(logObj.title, 15, { align: 'left' })}`),
            color2(formatMessage(logObj.data))
        );
    }

    /* Adds new "junk drawer" item to info */
    newInfo(propertyName, value) {
        this.info[propertyName] = value;
    }

    /* Retrieves the current count on linkCounter */
    getCount() {
        this.info.linkCounter += 1;
        return this.info.linkCounter;
    }

    /* THESE WILL BE REMOVED - just for development */
    success(module, message) {
        this.log(module, {
            message: '% ' + message,
        });
    }

    throwWarning(module, message) {
        this.warning('% ' + message);
    }

    throwErr(module, err) {
        this.error('% ' + err);
    }

    throwFatalErr(module, err) {
        this.fatalError('% ' + err);
    }

    addModuleReport(title) {
        // do nothing
        console.log(title, '- attempted to create module report');
    }

};