# Employee-Manager-Express

A node CLI application for managing the employees in your organization using a MySQL database.

## Features

- add employees, roles, and departments
- assign salaries to roles
- identify managers for each employee
- update and view your employees' data
- run unique queries (e.g., total budget by department)

## Dependencies

- `mysql2`
- `inquirer`
- `console.table`
- `figlet`

## Installation

1. Download <a href="https://dev.mysql.com/doc/refman/8.0/en/installing.html" target="_blank">MySQL</a>
2. Clone this repository
3. `npm install`
4. Enter your MySQL Username and Password in the `connection.js` file 

## Usage

1. In app folder, type `npm start`
2. Use arrow keys to select menu option
3. Enter information / select a query
4. Select Quit close database

*NOTE:* The app automatically seeds 8 employee records into an `organization` database upon initial usage; use `Delete` option(s) in main menu to adjust to your needs.

## Screenshot

![screenshot of Employee-Manager-Express](/screenshot.png)

## Video Demonstration

<a href="https://www.dropbox.com/s/pqkkrct2wip16op/Employeemanagerexpress_captioned.mp4?dl=0" target="_blank">Video Demonstration of Installation and Usage</a>