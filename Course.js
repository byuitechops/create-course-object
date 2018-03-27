/*eslint-env node, es6*/
/*eslint no-console:1*/

const path = require('path');
const Logger = require('logger');
const logger = new Logger();

module.exports = class Course {
    constructor(data) {
        this.settings = {
            'domain': data.domain || 'byui',
            'platform': data.platform || 'online',
            'accountID': '19',
            'deleteCourse': data.cleanUpModules ? data.cleanUpModules.includes('delete-course') : false,
            'removeFiles': data.cleanUpModules ? !data.cleanUpModules.includes('remove-files') : true,
            'lessonFolders': data.lessonFolders || 'Unspecified'
        };
        this.info = {
            'username': data.username || 'Unspecified',
            'domain': data.domain || 'byui',
            'D2LOU': data.D2LOU || '',
            'originalZipPath': path.resolve('factory', 'originalZip', data.name) || 'Unspecified',
            'unzippedPath': path.resolve('factory', 'unzipped') || 'Unspecified',
            'processedPath': path.resolve('factory', 'processed') || 'Unspecified',
            'uploadZipPath': path.resolve('factory', 'uploadZip') || 'Unspecified',
            'fileName': data.name.split(path.sep)[data.name.split(path.sep).length - 1] || 'Unspecified',
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
        this.logs = logger.logs;
        this.content = [];
        this.log = logger.log;
        this.warning = logger.warning;
        this.error = logger.error;
        this.fatalError = logger.fatalError;
        this.message = logger.message;
        this.getCallingModule = logger.getCallingModule;
        this.console = logger.console;

        if ((/\d{3}\w?/i).test(this.info.fileName)) {
            this.info.courseName = this.info.fileName.split(/\d{3}\w?/i)[0].trim();
            this.info.courseCode = `${this.info.fileName.split(/\d{3}\w?/i)[0].trim()} ${this.info.fileName.match(/\d{3}\w?/i)[0]}`;
        } else {
            this.info.courseName = this.info.fileName.split('.zip')[0];
            this.info.courseCode = this.info.fileName.split('.zip')[0];
        }
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