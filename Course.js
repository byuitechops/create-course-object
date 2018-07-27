/*eslint-env node, es6*/
/*eslint no-console:1*/

const path = require('path');
const Logger = require('logger');
var logger = new Logger('Conversion Report');

module.exports = class Course {
    constructor(data) {
        this.settings = {
            'domain': data.domain || 'byui',
            'platform': data.platform || 'online',
            'accountID': '19',
            'cookies': data.cookies || [],
            'deleteCourse': data.cleanUpModules ? data.cleanUpModules.includes('delete-course') : false,
            'removeFiles': data.cleanUpModules ? !data.cleanUpModules.includes('remove-files') : true,
            'reorganizeFiles': false,
            'lessonFolders': false,
            'pinDiscussionBoards': false,
            'blockCourse': /block/i.test(data.name),
            'targetAttributes': false,
            'disableLogOutput': false,
            'blueprintLockItems': false,
            'moveUnusedIntoArchive': false,
            'renameFiles': false,
            'moveFiles': false,
            'moduleItemNamingConventions': false,
        };

        /* Identify the selected options and add them to settings */
        if (data.options) {
            data.options.forEach(option => {
                this.settings[option.name] = option.value;
            });
        }

        this.info = {
            'data': data,
            'username': data.username || data.author || 'Unspecified',
            'password': data.password || null,
            'instructorName': data.instructorName || '',
            'instructorEmail': data.instructorEmail || '',
            'D2LOU': data.D2LOU || '',
            'originalZipPath': data.name ? path.resolve('factory', 'originalZip', data.name) : 'Unspecified',
            'unzippedPath': path.resolve('factory', 'unzipped') || 'Unspecified',
            'processedPath': path.resolve('factory', 'processed') || 'Unspecified',
            'uploadZipPath': path.resolve('factory', 'uploadZip') || 'Unspecified',
            'fileName': data.name ? data.name.split(path.sep)[data.name.split(path.sep).length - 1].replace('\\', '-').replace('/', '-') : 'Unspecified',
            'childModules': data.preImportModules && data.postImportModules ? [...data.preImportModules, ...data.postImportModules] : [],
            'canvasOU': data.canvasOU || '',
            'checkStandards:': false,
            'linkCounter': 0,
            'canvasFolders': {
                media: -1,
                documents: -1,
                template: -1,
                archive: -1
            },
            get counter() {
                this.linkCounter = this.linkCounter++;
                return this.linkCounter;
            }
        };

        this.info.courseName = this.info.fileName.split('.zip')[0];
        this.info.courseCode = (this.info.fileName.split(' ')[0] + ' ' + this.info.fileName.split(' ')[1]).replace(':', '');
        this.info.courseCode = this.info.courseCode.replace('.zip', '');
        console.log('COURSE NAME:', this.info.courseName);
        console.log('COURSE CODE:', this.info.courseCode);

        /* Set up the logger */
        this.logger = logger;
        this.logs = logger.logs;
        this.content = [];
        this.log = logger.log;
        this.warning = logger.warning;
        this.error = logger.error;
        this.fatalError = logger.fatalError;
        this.message = logger.message;
        this.getCallingModule = logger.getCallingModule;
        this.console = logger.console;

        /* Disable output if set */
        if (this.settings.disableLogOutput === true) {
            logger.disableOutput(true);
            console.log('LOGGER OUTPUT DISABLED');
        }

        /* Removes new lines in the logs */
        logger.removeNewLines(true);
    }

    /* Adds new "junk drawer" item to info */
    newInfo(propertyName, value) {
        if (this.info[propertyName]) {
            // eslint-disable-next-line
            console.log(`This item already exists on the course.info object. Cannot add: ${propertyName}`);
        } else {
            this.info[propertyName] = value;
        }
    }

    /* Retrieves the current count on linkCounter */
    getCount() {
        this.info.linkCounter += 1;
        return this.info.linkCounter;
    }

    consoleReport() {
        logger.consoleReport();
    }
    jsonReport(path) {
        logger.jsonReport(path);
    }
    htmlReport(location, title) {
        logger.htmlReport(location, title);
    }
    setReportHeader(html) {
        logger.setHtmlHeader(html);
    }
};
