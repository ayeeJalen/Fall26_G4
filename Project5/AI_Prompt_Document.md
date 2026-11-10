# Project 5: AI Application Development Prompt
## Final Grade Calculator

**Course:** CSCI 4221  
**Group:** 4  
**Team Members:** Jalen Davis and Malachi Johnson  
**Application:** Final Grade Calculator  
**Project:** Project 5 – React Native Expo Development

---

# Section 1: Brief Statement of the Application

The Final Grade Calculator is a software application designed to help college students calculate and understand their grades in a course.

Students can enter their assignment grades, quiz grades, test grades, examination scores, and course grading information to calculate their current academic standing.

The application will also help students determine what score they need on a final examination to achieve a desired overall course grade. Students will be able to enter possible examination scores and compare how different scores could affect their final course grade.

The main goal of the application is to simplify weighted grade calculations, reduce manual work, and help students make informed decisions about their academic goals.

The application should provide a simple, accessible, and user-friendly experience.

# Section 2: Product Vision Statement (Project 1)

Our vision is to create a simple, accessible, and user-friendly Final Grade Calculator that helps students understand their academic performance and plan for upcoming assignments and exams.

The application aims to provide clear, accurate results while keeping the process of entering information and calculating grades straightforward.

The primary users are college students who want to:

- Calculate their current course grade.
- Track their academic performance.
- Understand how assignment grades and category weights affect their overall grade.
- Determine what score they need on a future assignment or final exam.
- Estimate their final course grade based on possible scores.

# Section 3: Prototypes (Project 2)

Our team developed a prototype of the Final Grade Calculator using Figma.

The prototype demonstrates the planned user interface and the basic user flow of the application.

The prototype contains three primary screens.

## 3.1 Main Screen

**Image:** `MainScreen.png.png`

The main screen provides the starting point for the Final Grade Calculator.

It introduces the application and provides the starting point for students to begin using the grade calculation features.

## 3.2 Grade Input Screen

**Image:** `gradeinputsreen.png`

The grade input screen allows students to enter their grades and course information.

Students use this screen to provide the information needed for grade calculations.

## 3.3 Results Screen

**Image:** `Results.png`

The results screen displays the calculated grade.

It allows students to understand the results of their entered grade information.

## 3.4 Prototype User Flow

The intended user flow is:

1. The student opens the Final Grade Calculator.
2. The student begins a grade calculation.
3. The student enters the required course and grade information.
4. The calculator processes the information.
5. The calculated result is displayed.
6. The student can change the information and calculate again if necessary.

## 3.5 Prototype Images

The following prototype images will be provided to the AI along with this document:

- MainScreen.png.png
- gradeinputsreen.png
- Results.png

The AI must use these images as visual references when generating the React Native application.

The generated application should closely follow the original prototype's layout, organization, and intended user experience.

# Section 4: Features, Personas, Scenarios, and User Stories (Project 3)

This section contains the application requirements developed during Project 3.

## 4.1 Features

### Feature 1: Calculate Current Grade

The application allows students to enter their assignment, quiz, test, and exam grades to calculate their current overall grade in a course.

### Feature 2: Calculate Required Grade on Final Exam

The application allows students to determine what score they need on their final exam to reach a desired overall course grade.

### Feature 3: Grade Goal Planning

The application allows students to enter a target letter grade and see how different possible final exam scores could affect their final course grade.

## 4.2 Personas

### Persona 1: College Student

**Name:** Alex Johnson

**Description:** Alex is a college student who wants to track academic performance throughout the semester. Alex uses the calculator to understand current grades and identify areas that need improvement.

### Persona 2: Student Preparing for Final Exams

**Name:** Taylor Smith

**Description:** Taylor is preparing for final exams and wants to determine the score needed on each final exam to earn a desired course grade.

### Persona 3: Student Focused on Academic Improvement

**Name:** Morgan Lee

**Description:** Morgan wants to improve academic performance and compare possible exam scores to understand how each outcome could affect the final course grade.

## 4.3 Scenarios

### Scenario 1: Calculating a Current Grade

A student enters their grades for assignments, quizzes, and exams into the application. The calculator processes the information and displays the student's current grade based on the information entered.

### Scenario 2: Determining a Required Final Exam Score

A student wants to earn at least a B in a course. The student enters their current grade, the final exam's course-weight percentage, and their desired overall grade. The application calculates the score needed on the final exam.

### Scenario 3: Comparing Possible Final Grades

A student is unsure how different final exam scores will affect their overall course grade. The student enters several possible exam scores and uses the calculator to compare the resulting final grades.

## 4.4 User Stories and Acceptance Criteria

### User Story 1: Calculate Current Grade

As a college student, I want to enter my course grades so that I can see my current overall grade.

**Acceptance Criteria:**

- The user can enter their grades.
- The application calculates the grade using the entered information.
- The application displays the calculated result.

### User Story 2: Calculate Required Final Exam Score

As a student preparing for final exams, I want to calculate the score I need on my final exam so that I can work toward my desired course grade.

**Acceptance Criteria:**

- The user can enter their current grade.
- The user can enter the final exam weight and target course grade.
- The application calculates and displays the required final exam score.

### User Story 3: Compare Possible Final Grades

As a student focused on academic improvement, I want to compare different possible final exam scores so that I can understand how each score affects my final course grade.

**Acceptance Criteria:**

- The user can enter a possible final exam score.
- The application calculates the resulting overall course grade.
- The user can compare results for different possible exam scores.

# Section 5: Architecture Design (Project 4)

This section describes the proposed software architecture developed during Project 4.

## 5.1 Overall System Architecture

The Final Grade Calculator was designed using a three-tier architecture consisting of:

1. Presentation Layer
2. Application Layer
3. Data Layer

**Presentation Layer:**

Provides the user interface where students enter grades and view calculated results.

**Application Layer:**

Processes application requests, validates information, and performs grade calculations.

**Data Layer:**

Stores and retrieves course information, assignment records, and grade information.

The proposed application architecture uses Java, Spring Boot, HTML, CSS, JavaScript, MySQL, and Docker.

## 5.2 Container and Cloud Architecture

Our team proposes developing the original Final Grade Calculator as cloud-based software.

Docker will be used to package the backend application and its required dependencies into a portable environment.

The proposed Docker container will contain:

- Java Runtime Environment.
- Spring Boot backend application.
- Application source code.
- Required Java libraries and dependencies.
- Maven-built application JAR file.
- Application configuration files.
- Database connection configuration.

The MySQL database will operate separately from the application container.

The proposed cloud deployment contains two primary services.

**Application Service:**

- Runs the Spring Boot backend inside a Docker container.
- Processes requests from the frontend.
- Performs grade calculations.
- Communicates with the database.

**Database Service:**

- Runs MySQL separately from the application container.
- Stores course and assignment information.
- Provides data to the backend application when requested.

## 5.3 Application Components

The Final Grade Calculator consists of four major components.

### Component 1: User Interface Component

**Purpose:**

Allows students to interact with the application.

**Subcomponents:**

- Course information input.
- Assignment grade input.
- Current course grade display.
- Required final examination score display.
- Estimated final grade display.

**Proposed Files:**

- index.html
- style.css
- script.js

The User Interface Component communicates with the backend application through application requests. It does not connect directly to the MySQL database.

### Component 2: Grade Calculation Component

**Assigned Team Member:** Jalen Davis

**Purpose:**

Performs the mathematical calculations required by the Final Grade Calculator.

**Subcomponents:**

- Current grade calculator.
- Weighted grade calculator.
- Required final examination score calculator.
- Estimated final course grade calculator.
- Grade validation.

**Proposed Files:**

- GradeCalculator.java
- GradeCalculationService.java
- GradeCalculationController.java
- GradeRepository.java

This component retrieves assignment scores and grading information to calculate current course averages and determine the scores required on final examinations.

### Component 3: Course Management Component

**Assigned Team Member:** Malachi Johnson

**Purpose:**

Manages course information and assignment details entered into the application.

**Subcomponents:**

- Course creation.
- Course information management.
- Assignment management.
- Grading category management.
- Course information validation.

**Proposed Files:**

- Course.java
- Assignment.java
- CourseService.java
- CourseController.java
- CourseRepository.java

This component stores and retrieves course information and maintains relationships between courses and their associated assignments.

### Component 4: Database Component

**Purpose:**

Stores, organizes, and retrieves information used by the Final Grade Calculator.

**Database Technology:** MySQL

**Subcomponents:**

- Course records.
- Assignment records.
- Grade records.
- Database connection management.
- Data retrieval and storage.

**Proposed Files:**

- DatabaseConfig.java
- CourseRepository.java
- AssignmentRepository.java
- application.properties

The database is shared across the application. The frontend and application components access information through the backend and its data access layer.

## 5.4 Proposed Database Structure

The application will use a shared MySQL relational database.

### Courses Table

The Courses table stores information about courses entered into the application.

| Column Name | Data Type | Key | Description |
|---|---|---|---|
| course_id | INT | Primary Key | Unique identifier for each course |
| course_name | VARCHAR(100) | | Name of the course |
| course_code | VARCHAR(20) | | Course identification code |
| credit_hours | INT | | Number of course credit hours |

### Assignments Table

The Assignments table stores assignment information and associated grades.

| Column Name | Data Type | Key | Description |
|---|---|---|---|
| assignment_id | INT | Primary Key | Unique assignment identifier |
| course_id | INT | Foreign Key | References the associated course |
| assignment_name | VARCHAR(100) | | Name of the assignment |
| category | VARCHAR(50) | | Assignment category |
| weight | DECIMAL(5,2) | | Percentage weight used in calculations |
| score | DECIMAL(5,2) | | Points earned by the student |
| max_score | DECIMAL(5,2) | | Maximum possible points |

### Database Relationships

The Courses and Assignments tables have a one-to-many relationship.

One course can contain multiple assignments, but each assignment belongs to one course.

The `course_id` column in the Assignments table acts as a foreign key referencing the `course_id` primary key in the Courses table.

## 5.5 Technologies and Tools

The proposed Project 4 architecture uses:

- Java
- Spring Boot
- HTML
- CSS
- JavaScript
- MySQL
- Docker
- Maven
- GitHub

Project 5 introduces React Native Expo as the required mobile application development environment.

# Section 6: Instructions for AI Application Generation

Using all five sections of this document and the attached prototype images, generate a working React Native Expo application for the Final Grade Calculator.

The application must follow the original product vision, prototype design, features, personas, user stories, and architecture requirements.

## 6.1 Development Requirements

- Use React Native.
- Use Expo.
- Use JavaScript or TypeScript.
- Generate a project that can run locally using Node.js LTS.
- Follow the React Native Expo project structure.
- Organize application code into appropriate files and folders.
- Write clean, readable, and maintainable code.

## 6.2 User Interface Requirements

The generated application must closely follow the three prototype screens provided:

1. Main Screen.
2. Grade Input Screen.
3. Results Screen.

Use the attached prototype images as the primary visual reference.

Do not replace the original application concept with a different design.

Maintain a consistent appearance, layout, and user experience across all screens.

## 6.3 Functional Requirements

The application must implement the three main features:

1. Calculate Current Grade.
2. Calculate Required Grade on Final Exam.
3. Grade Goal Planning.

Users must be able to enter grade information, perform calculations, and view results.

The calculations must use the grading information and weights entered by the user.

The application should validate user inputs and handle invalid or incomplete information appropriately.

## 6.4 Required Working Interactions

The home screen must contain at least two functional clicks or interactions.

Examples include:

- A button that navigates to the grade input screen.
- A button that navigates to the required final exam calculation.
- A button that displays calculated results.

The interactions must actually work when the application runs. They should not be decorative buttons.

The application must also support calculating grades and resetting or changing entered information.

## 6.5 Implementation of Project 4 Architecture

Use Project 4 as the architectural reference for the application's components and responsibilities.

Organize the React Native application into logical components, including:

- User Interface.
- Grade Calculation.
- Course Management.
- Data Management.

For this Project 5 deliverable, prioritize a working local React Native Expo application.

The application does not need to implement the proposed Java/Spring Boot backend, MySQL database, or Docker deployment unless separately required. Do not claim those services have been implemented if they are not present.

The grade calculations should work locally within the Expo application.

## 6.6 Final Expected Output

Generate a complete React Native Expo project that:

- Runs locally on the computer.
- Uses the provided prototype images as design references.
- Contains the Main Screen, Grade Input Screen, and Results Screen.
- Implements the required grade calculation features.
- Has at least two working interactions on the home screen.
- Includes organized and understandable source code.
- Can be started using the appropriate Expo command.

Provide the complete code for every required file.

Do not provide only examples, pseudocode, or incomplete components. The final output must be a functional application that can be tested locally.

---

# End of Project 5 AI Prompt Document

**CSCI 4221 | Fall 2026 | Group 4**
