# Task: Sprint 3 Kick-off Activities

## Purpose of the Meeting

This meeting is the starting point for Sprint 3.

Sprint 3 focuses on:

* connecting the frontend and backend;
* implementing real authentication;
* integrating the application;
* testing the backend and integrated functionality;
* preparing the application for deployment;
* implementing AI functionality if your group has selected AI as a feature;
* improving the application based on Sprint 2 feedback and Scrum metrics.

By the end of the meeting, each group should have:

* completed a Sprint 2 retrospective;
* identified concrete improvements for Sprint 3;
* reviewed the Scrum metrics activity;
* established a Sprint 3 Goal;
* reviewed the Sprint 3 scope;
* reviewed and updated the Product Backlog;
* created an initial Sprint 3 Backlog;
* identified frontend and backend work;
* identified the integration tasks;
* agreed on a realistic Sprint 3 timeline;
* assigned initial responsibilities;
* identified what needs to be completed first.

The activities below are suggested time allocations. Groups may adjust the time spent on each activity according to their needs.

## 1. Sprint 2 Retrospective

Begin by reflecting on your experience during Sprint 2.

Discuss:

* What worked well?
* What did not work well?
* What did we learn?
* What should we continue doing?
* What should we change in Sprint 3?
* What problems should we avoid repeating?
* How well did the frontend and backend teams communicate?
* How well did the team maintain the agreed interface?
* What should improve before integration?

Use the retrospective format agreed upon by your group.

### Outcome

Identify a small number of specific and actionable improvements for Sprint 3.

For example:

* communicate API changes earlier;
* review pull requests more regularly;
* divide integration work more clearly;
* test features before merging;
* improve task estimation;
* coordinate authentication responsibilities.

## 2. Review Scrum Metrics and Sprint Capacity

Suggested time: 15 minutes

Use the Scrum metrics activity completed in class.

Review the information available from previous sprints, such as:

* team velocity;
* team capacity;
* workload distribution;
* Sprint Goal completion;
* team satisfaction;
* completed and unfinished work.

Discuss:

* How much work did the team complete?
* How much work can the team realistically complete in Sprint 3?
* Are there any changes in team availability?
* Are some team members carrying too much or too little work?
* What risks could affect Sprint 3?
* Should the team leave some capacity for unexpected problems?

Use the metrics to support your planning.

> Metrics are useful information for planning and reflection. They should not be treated as a complete measure of individual performance or team quality.

### Outcome

A realistic understanding of the team's capacity and possible risks for Sprint 3.

## 3. Sprint 3 Goal and Scope

Establish a clear Sprint 3 Goal for your project.

The general purpose of Sprint 3 is:

> Connect the frontend and backend, implement authentication, test the integrated application, and prepare the application for deployment.

Adapt this goal to your specific application.

### Sprint 3 includes

* connecting the React frontend to the backend API;
* replacing relevant frontend mock data with API data;
* integrating frontend and backend functionality;
* implementing real user registration and login;
* implementing JWT authentication;
* implementing role-based access control if needed;
* protecting appropriate routes or features;
* testing API endpoints when covered in class;
* using Supertest when covered in class;
* API documentation when covered in class;
* deployment when covered in class;

* AI functionality if your group has selected AI as a feature.

### Sprint 3 does not automatically require

* adding AI if it is not part of your application;
* adding unnecessary technologies;
* implementing features that are not connected to your product goal;
* using advanced state management without a clear reason;
* completing optional bonus activities before the required work.

Do not introduce technologies that have not been covered in class unless your whole group agrees and the choice is appropriate for the project.

### Outcome

A shared Sprint 3 Goal and a clear understanding of the sprint scope.

## 4. Review and Refine the Product Backlog

The Product Owner leads the Product Backlog work, while the rest of the team participates and works in parallel.

Review the existing Product Backlog from Sprint 2.

As a group:

* review unfinished Sprint 2 work;
* identify stories required for Sprint 3;
* update stories that have changed;
* clarify integration requirements;
* identify AI work if applicable;
* prioritize the backlog;
* identify dependencies and risks.

### While the Product Owner reviews the backlog

Other team members should:

* identify frontend integration tasks;
* identify backend integration tasks;
* identify database and authentication tasks;
* identify possible technical risks;
* check whether the existing interface is still suitable.

The Product Owner remains responsible for the Product Backlog, but the team develops the Sprint Backlog collaboratively.

### Outcome

An updated and prioritized Product Backlog.

## 5. Create the Initial Sprint 3 Backlog

Select the user stories that the team plans to complete during Sprint 3.

Consider the work required for all relevant areas.

### Frontend

Possible work includes:

* connecting React pages to backend endpoints;
* replacing mock data with API data;
* handling loading and error states;
* integrating login and registration;
* storing and using authentication information;
* protecting frontend routes;
* displaying user-specific content;
* improving state management;
* updating forms and validation.

### Backend

Possible work includes:

* connecting controllers to MongoDB/Mongoose;
* implementing user registration;
* implementing login;
* hashing and securely handling passwords;
* generating and validating JWTs;
* implementing authorization or role-based access control if needed;
* protecting API routes;
* updating product/service endpoints;
* handling errors;
* implementing AI endpoints if applicable.


### AI

If AI is part of your application:

* identify the AI user story;
* identify the backend AI endpoint;
* identify the frontend interaction;
* identify required data;
* identify testing and error-handling tasks.

If AI is not part of your application, do not add it only because it is available as an option.

### Outcome

An initial Sprint 3 Backlog containing realistic, prioritized work.

## 6. Identify Integration and Authentication Responsibilities

Suggested time: 15 minutes

Identify how the team will coordinate the transition from separate frontend and backend applications to one integrated application.

Discuss:

* which frontend pages will connect first;
* which backend endpoints will be connected first;
* who is responsible for each integration task;
* who will handle authentication on the backend;
* who will handle authentication on the frontend;
* how login and registration will be tested;
* which routes or features need protection;
* how frontend and backend errors will be handled.

Make sure the team understands that integration is a shared responsibility.

### Outcome

Clear responsibilities for integration and authentication work.

## 7. Review the API Interface Before Integration

Suggested time: 15 minutes

Review the interface agreed upon during Sprint 2.

Check that the frontend and backend still agree on:

* endpoint names;
* HTTP methods;
* request structures;
* response structures;
* field names;
* field types;
* user data;
* product/service data;
* authentication-related responses;
* error responses.

Identify any differences before connecting the applications.

If changes are necessary:

* discuss them with the whole team;
* update the relevant frontend and backend code;
* record the agreed change;
* make sure both sides use the same structure.

### Outcome

An updated and consistent interface ready for integration.

## 8. Convert Sprint 3 User Stories into Tickets

Suggested time: 15 minutes

Break selected Sprint 3 user stories into smaller, actionable tickets.

For example:

### User Story

> As a registered user, I want to log in so that I can access protected features.

Possible tickets:

Backend

* Create login controller.
* Check user credentials.
* Hash and compare passwords.
* Generate JWT.
* Return the required response.
* Add authentication middleware.
* Test the login endpoint.

Frontend

* Connect the login form to the API.
* Display validation errors.
* Display login errors.
* Store authentication information appropriately.
* Redirect the user after successful login.
* Protect the relevant frontend route.

Testing

* Test successful login.
* Test invalid credentials.
* Test missing fields.
* Test access to protected routes.

Tickets should be clear enough that a team member can understand what needs to be done.

### Outcome

A set of actionable tickets connected to the Sprint 3 user stories.

## 9. Create a Sprint 3 Timeline

Suggested time: 15 minutes

Create a realistic timeline for the Sprint 3 work.

Use the provided Sprint 3 workflow as a guide.

Consider planning for:

### Week 5

* Sprint planning;
* frontend/backend integration;
* connecting the first important API endpoints;
* identifying and fixing interface problems.

### Week 6

* real registration and login;
* JWT authentication;
* protected routes;
* role-based access control if needed;
* deployment preparation.

### Week 7

* backend testing;
* Supertest when covered;
* API documentation if required;
* frontend improvements;
* state management improvements when appropriate;
* deployment of frontend and backend.

### Week 8

* final improvements;
* testing;
* bug fixing;
* presentation preparation;
* optional bonus activities if the required work is complete.

Your timeline should identify:

* the responsible team members;
* the order of important tasks;
* dependencies;
* testing time;
* time for fixing problems;
* presentation preparation time.

Do not plan only development work. Integration and debugging may require additional time.

### Outcome

A realistic Sprint 3 timeline.

# Final Check

Suggested time: 5 minutes

Before finishing the meeting, confirm that your group has completed the following:

* Sprint 2 retrospective completed.
* Sprint 3 improvements identified.
* Scrum metrics reviewed.
* Team capacity discussed.
* Sprint 3 Goal defined.
* Sprint 3 scope understood.
* Product Backlog reviewed and updated.
* Product Backlog prioritized.
* Initial Sprint 3 Backlog created.
* Frontend integration work identified.
* Backend integration work identified.
* Authentication work identified.
* Testing work identified.
* Deployment work identified.
* AI work identified if applicable.
* API interface reviewed.
* Selected user stories converted into tickets.
* Responsibilities assigned.
* Sprint 3 timeline created.
* Each team member knows what they should work on next.

# After the Meeting

Begin Sprint 3 development according to your Sprint Backlog and timeline.

Remember:

> Sprint 3 is the sprint in which the frontend and backend become one integrated application. Communicate frequently, test continuously, and coordinate authentication and API changes carefully.
