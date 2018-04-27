/*eslint-env node, es6*/
/*eslint no-console:1*/

const path = require('path');
const Logger = require('logger');

module.exports = class Course {
    constructor(data) {

        this.settings = {
            'domain': 'byui',
            'platform': data.platform || 'online',
            'accountID': '19',
            'cookies': data.cookies,
            'deleteCourse': data.cleanUpModules ? data.cleanUpModules.includes('delete-course') : false,
            'removeFiles': data.cleanUpModules ? !data.cleanUpModules.includes('remove-files') : true,
            'reorganizeFiles': false,
            'lessonFolders': false,
            'blockCourse': /block/i.test(data.name),
            'targetAttributes': false,
            'disableLogOutput': false,
        };

        /* Take the options and add them to settings */
        if (data.options) {
            data.options.forEach(option => {
                this.settings[option] = true;
            });
        }

        this.info = {
            'username': data.username || data.author || 'Unspecified',
            'domain': 'byui',
            'D2LOU': data.D2LOU || '',
            'originalZipPath': path.resolve('factory', 'originalZip', data.name) || 'Unspecified',
            'unzippedPath': path.resolve('factory', 'unzipped') || 'Unspecified',
            'processedPath': path.resolve('factory', 'processed') || 'Unspecified',
            'uploadZipPath': path.resolve('factory', 'uploadZip') || 'Unspecified',
            'fileName': data.name.split(path.sep)[data.name.split(path.sep).length - 1].replace('\\', '-').replace('/', '-') || 'Unspecified',
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

        /* Set up the logger */
        this.logger = new Logger('Conversion Report');
        this.logs = this.logger.logs;
        this.content = [];
        this.log = this.logger.log;
        this.warning = this.logger.warning;
        this.error = this.logger.error;
        this.fatalError = this.logger.fatalError;
        this.message = this.logger.message;
        this.getCallingModule = this.logger.getCallingModule;
        this.console = this.logger.console;

        if ((/\d{3}\w?/i).test(this.info.fileName)) {
            this.info.courseName = this.info.fileName.split(/\d{3}\w?/i)[0].trim();
            this.info.courseCode = `${this.info.fileName.split(/\d{3}\w?/i)[0].trim()} ${this.info.fileName.match(/\d{3}\w?/i)[0]}`;
        } else {
            this.info.courseName = this.info.fileName.split('.zip')[0];
            this.info.courseCode = this.info.fileName.split('.zip')[0];
        }

        /* Disable output if set */
        if (this.settings.disableLogOutput === true) {
            this.logger.disableOutput(true);
            console.log('LOGGER OUTPUT DISABLED');
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
        this.logger.consoleReport();
    }
    jsonReport(path) {
        this.logger.jsonReport(path);
    }
    htmlReport(location, title) {
        this.logger.htmlReport(location, title);
    }
    setReportHeader(html) {
        this.logger.setHtmlHeader(html);
    }
};