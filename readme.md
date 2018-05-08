# Create Course Object
### *Package Name*: create-course-object
### *Child Type*: Shell
### *Platform*: All
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose
This shell module creates the course object that is passed through the rest of the conversion tool.

## How to Install

```
npm install create-course-object
```

## Run Requirements
This module requires an courseData object, which must contain a settings object and a courseInfo object.

This module uses a courseData object to populate the course object. The courseData doesn't have any required fields. Optional fields are listed below with their default values and location on the Course object:

| Name          | Type      | Course Location | Description | Default |
| ------------- |-----------| ----------------|-------------|---------|
| author        | String    | `Course.info.username`| Used to name test gauntlets | `'Unspecified'` |
| canvasOU      | String    | `Course.info`   | Unique ID of the Canvas Course to use | `''` |
| cleanUpModules | Array    | `Course.settings`| Used to determine which CleanUp modules to run |  |
| cookies       | Array     | `Course.settings`| Authentication cookies for D2L | `[]` |
| D2LOU         | String    | `Course.info`   | OU of the Brightspace course being converted | `''` |
| name          | String    | `Course.info`   | Name of the course | `'Unspecified'` |
| platform      | String    | `Course.settings`| Which platform the course is in | `'online'` |
| postImportModules | Array | `Course.info`  | Used to determine which postImport modules to run |  |
| preImportModules | Array  | `Course.info`  | Used to determine which preImport modules to run |  |
| options       | Array     | `Course.info`  | Used to determine which options to run |  |
| username      | String    | `Course.info`  | Used to name test gauntlets | `'Unspecified'` |



## Options
None

## Outputs
The entire Course Object. For specific details of the course object please look at the following documents:
* [Course Object Template](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/Course%20object%20template.md)
* [Course Functions](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/classFunctions.md)

## Process
1. Verify the given filepath
2. build a Course object using courseData

## Log Categories
This module does not use course.log anywhere.


## Requirements
Create an object which can be passed through the entire conversion tool. The object must contain information on the D2L export files, reports from each child module, and all other information vital to the conversion tool. It must be organized and easily accessible.