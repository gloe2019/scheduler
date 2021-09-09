# Interview Scheduler

## About the Project
- Scheduler is a slick single page application built with React. 
- It allows users to schedule interviews by selecting an available spot and their preferred interviewer. Interviews can be edited to change the student name or select a new interviewer. Interviews can also be deleted. 
- When interviews are created, updated or deleted, the spots for the selected day automatically update with the correct number of remaining spots.
- Scheduler project was a great way to learn and practice React concepts including useEffect, useState, useReducer, creating custom hooks. 
- This project was developed in a test-driven way. From the onset, components were developed and tested in visually with Storybook. Once components were visually completed, unit tests were written for each component and tests were run with frequently during development until each test passed. After Unit testing, I got to practice Integration testing with Jest and render functions from the react-testing-library to increase code covereage for key components. Once that was completed, E2E testing was done with Cypress to confirm the apps core functionality. 

## Screenshots
### [Empty Dashboard]()
![schedule_empty](https://user-images.githubusercontent.com/46451257/132634997-0727d212-fe0c-4b77-bb1b-2b956581b415.png)
### [Full Dashboard]()
![schedule_full](https://user-images.githubusercontent.com/46451257/132634796-e059b2a3-f48d-4e2c-a114-9af57d682ec2.png)

### Create a New Interview
[Creating a new interview](https://user-images.githubusercontent.com/46451257/132633241-67e4552f-1e7a-4cb4-b125-d0acb30c0101.mp4)

### Edit an Interview
[Editing an existing interview](https://user-images.githubusercontent.com/46451257/132633673-6b53a9f8-312d-4157-af76-a678eb36e311.mp4)


### Delete an Interview
[Deleting an interview](https://user-images.githubusercontent.com/46451257/132634721-d12b1da0-3269-460f-a27f-b5e8624dfe87.mp4)






## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
