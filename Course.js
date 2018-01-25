/*eslint-env node, es6*/
/*eslint no-console:1*/
/*global courseObj*/

const path = require('path');
const chalk = require('chalk');
const fws = require('fixed-width-string');

module.exports = class Course {
    constructor(courseData) {
        this.settings = {
            'debug': courseData.settings.debug,
            'readAll': courseData.settings.readAll,
            'online': courseData.settings.online,
            'keepFiles': courseData.settings.keepFiles,
            'deleteCourse': courseData.settings.deleteCourse
        };
        this.info = {
            'D2LOU': courseData.courseInfo.D2LOU,
            'originalFilepath': path.resolve('D2LOriginal', courseData.courseInfo.path),
            'unzippedFilepath': path.resolve('D2LProcessing'),
            'altUnzippedFilepath': path.resolve('D2LProcessed'),
            'zippedFilepath': path.resolve('D2LReady'),
            'fileName': courseData.courseInfo.path.split(path.sep)[courseData.courseInfo.path.split(path.sep).length - 1],
            'linkCounter': 0,
            'childModules': courseData.courseInfo.childModules,
            'lessonFolders': courseData.courseInfo.lessonFolders ? courseData.courseInfo.lessonFolders : false,
            get counter() {
                this.linkCounter = this.linkCounter++;
                return this.linkCounter;
            }
        };
        this.logs = [];
        this.content = [];

        this.error(new Error('Test error! Ignore!'));
    }

    /* Stack Overflow credit: https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function/29581862#29581862 */
    getCallingModule() {

        var callingModule;
        try {
            var err = new Error();
            var currentFile;
            Error.prepareStackTrace = function (err, stack) {
                return stack;
            };
            var filePaths = err.stack.map(item => item.getFileName());
            currentFile = path.basename(filePaths[0]);
            for (var x = 0; x < filePaths.length; x++) {
                if (path.basename(filePaths[x]) != currentFile) {
                    var callingPath = path.dirname(filePaths[x]).split(path.sep);
                    callingModule = callingPath[callingPath.length - 1];
                    break;
                }
            }
        } catch (e) {}
        return callingModule;
    }

    /* Used to log items */
    log(title, obj) {
        if (obj == undefined || typeof title != 'string') {
            console.log(this.getCallingModule(), 'Incorrect inputs into course.log: ', title);
            return;
        }
        var logObj = {
            title: title,
            location: this.getCallingModule(),
            data: obj
        }
        this.logs.push(logObj);
        this.console(logObj);
    }

    /* Used to throw errors */
    error(err) {
        console.log(err);
        this.log('error', {
            error: err
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
            error: err
        });
    }

    /* Takes a string - used for logging one-time actions or displaying things to the console */
    message(message) {
        this.log('message', {
            message: message
        });
    }

    console(logObj) {

        function shortenString(str) {
            if (str.length > 130) {
                /* Get left 20 */
                var strLeft = str.substr(0, 20);
                /* Get right 20 */
                var strRight = str.substr(str.length - 21, 20);
                /* Put it together and what have you got - bipideebopideeboo */
                return strLeft + '...' + strRight;
            } else {
                return str;
            }
        }

        function formatMessage(data) {
            var properties = [];
            Object.keys(data).forEach(key => {
                properties.push(`${chalk.gray(key + ':')} ${shortenString(data[key])}`);
            });
            return properties.join(` `);
        }


        var color1 = chalk.blueBright;
        var color2 = chalk.whiteBright;
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
            // console.log(logObj);
            // console.log(
            //     fws(chalk.cyan(logObj.location), 15),
            //     color1(`${fws(logObj.title, 15, { align: 'left' })}`),
            //     color2(formatMessage(logObj.data))
            // );
            return;
        }

        console.log(
            fws(chalk.cyan(logObj.location), 15),
            color1(`${fws(logObj.title, 15, { align: 'left' })}`),
            color2(formatMessage(logObj.data))
        );
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

    /* Adds new "junk drawer" item to info */
    newInfo(propertyName, value) {
        this.info[propertyName] = value;
    }

    /* Retrieves the current count on linkCounter */
    getCount() {
        this.info.linkCounter += 1;
        return this.info.linkCounter;
    }

};