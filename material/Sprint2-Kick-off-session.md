# Task: Sprint 2 Kick-off Activities

**Duration: 2 hours 30 minutes**

## Purpose of the Meeting

This meeting is the starting point for Sprint 2.

By the end of the meeting, each group should have:

* reflected on Sprint 1 and identified improvements for Sprint 2;
* established a Sprint 2 Goal;
* assigned Scrum roles and responsibilities;
* reviewed and updated the Product Backlog;
* created an initial Sprint 2 Backlog;
* created the Sprint 2 Git repository and added the instructor as a collaborator;
* identified the main frontend and backend work;
* agreed on the interface between the frontend and backend;
* converted selected user stories into actionable tickets;
* created a timeline for the remainder of Week 3 and the first three days of Week 4.

The activities below are **suggested time allocations**. Groups may adjust the time spent on each activity according to their needs.

---

## 1. Sprint 1 Retrospective

**Suggested time: 20 minutes**

Reflect on your experience during Sprint 1.

Discuss:

* What worked well?
* What did not work well?
* What did you learn?
* What should you continue doing?
* What should you change in Sprint 2?
* What problems from Sprint 1 should be avoided?

Use the retrospective format agreed upon by your group.

### Outcome

Identify a small number of **concrete improvements** that the team will apply during Sprint 2.

---

## 2. Scrum Roles and Sprint 2 Git Repository

**Suggested time: 15 minutes**

### Scrum Roles

After completing the retrospective, decide whether your Scrum roles will remain the same or change for Sprint 2.

The **Product Owner remains the same**.

The group may choose a different Scrum Master for Sprint 2 if appropriate.

Confirm the responsibilities of each role and make sure the workload associated with Scrum responsibilities is considered when distributing development work.

### Git Repository

Create the Git repository for Sprint 2.

Make sure that:

* all team members have access;
* the instructor has been added as a collaborator;
* the repository is ready for Sprint 2 development;
* the project structure is ready for the team to begin working.

### Outcome

Confirmed Scrum roles and a working Sprint 2 Git repository.

---

## 3. Sprint 2 Goal and Scope

**Suggested time: 15 minutes**

Establish a clear Sprint 2 Goal for your project.

Your Sprint Goal should reflect the main purpose of Sprint 2:

> **Develop the frontend and backend independently.**

Adapt this goal to your specific application.

Also review the Sprint 2 scope and make sure the team understands what is and is not expected during this sprint.

### Sprint 2 includes

* React frontend development;
* components and pages;
* navigation and routing;
* responsive design;
* mock/static frontend data;
* backend development using MVC;
* CRUD functionality;
* mock/array data;
* MongoDB/Mongoose when covered in class;
* Postman API testing;
* agreement on the frontend/backend interface.

### Sprint 2 does not include

* connecting the frontend to the backend;
* real authentication;
* Swagger/OpenAPI documentation;
* Supertest;
* other Sprint 3 functionality.

---

## 4. Product Backlog Refinement

**Suggested time: 25 minutes**

Review your existing Product Backlog from Sprint 1.

The **Product Owner leads the Product Backlog work**, while the rest of the team participates and works in parallel.

As a group:

* review and improve the user stories;
* check whether the important stories are sufficiently clear;
* apply **INVEST** where appropriate;
* make sure the backlog is **DEEP**;
* prioritize the backlog;
* identify stories that are relevant to Sprint 2;
* identify stories that may need to be split into smaller pieces.

### While the Product Owner is reviewing the backlog

Other team members should not wait for the Product Owner to finish.

Use the time to:

* review the stories from the perspective of the frontend;
* review the stories from the perspective of the backend;
* identify frontend and backend work required by each story;
* identify dependencies or questions;
* identify stories that may require coordination;
* consider which stories are realistic for Sprint 2.

The team should discuss any issues or decisions together as they arise.

### Outcome

An updated and prioritized Product Backlog, with a clear understanding of the stories that may be selected for Sprint 2.

---

## 5. Create the Initial Sprint 2 Backlog

**Suggested time: 20 minutes**

The **Product Owner and the development team create the Sprint 2 Backlog together**.

Select the user stories that the team plans to work on during Sprint 2.

Consider the work required for both the frontend and backend.

Organize the selected work into appropriate areas, for example:

### Frontend

* React components;
* pages;
* navigation;
* routing;
* responsive design;
* lists;
* mock/static data;
* other frontend functionality required by the selected stories.

### Backend

* server setup;
* models/data structures;
* controllers;
* routes;
* middleware;
* CRUD operations;
* mock/array data;
* API endpoints.

### Coordination

* frontend/backend data structures;
* API endpoints;
* responsibilities between frontend and backend teams.

The **Product Owner is responsible for the Product Backlog**, but the Sprint Backlog is developed **with the team**. The team should discuss feasibility, workload, dependencies, and the amount of work that can realistically be completed.

Do not select more work than the team can reasonably complete during the sprint.

> Note: **Story Points** are an abstract unit of measure used to estimate the relative effort, complexity, and risk associated with completing a Product Backlog Item. 

### Outcome

An initial **Sprint 2 Backlog** containing the work selected for the sprint.

---

## 6. Frontend and Backend Responsibilities

**Suggested time: 15 minutes**

Identify how the work will be divided between the frontend and backend members of the team.

For the selected Sprint 2 stories, identify:

* which work belongs to the frontend;
* which work belongs to the backend;
* which work requires coordination between both sides.

Remember that the frontend and backend teams will work **in parallel**.

The teams should communicate regularly even though the applications will not be connected during Sprint 2.

### Outcome

A clear understanding of frontend and backend responsibilities.

---

## 7. UI Layout and Design Approach

**Suggested time: 10 minutes**

Before continuing with frontend development, discuss the main UI layout patterns that your application will use.

Consider which layout or combination of layouts best supports your application's purpose and users.

Examples include:

1. **Z-pattern layout**
2. **F-pattern layout**
3. **Fullscreen image layout**
4. **Split-screen layout**
5. https://www.wix.com/blog/website-layouts 

You may use **AI assistance** to research and compare these layout patterns and to discuss which approach may be appropriate for your application.

Consider:

* Who are your users?
* What is the main purpose of each page?
* What information should users notice first?
* What actions should users take?
* Which layout makes the content easiest to understand?
* Does the layout fit the type of application you are building?
* Does it support responsive design?
* Does it match the visual direction of your Sprint 1 prototype?

### Outcome

Agree on the main UI layout approach for your application and briefly record:

> **Which layout(s) are you using, and why?**

For example:

> **Our application primarily uses a card-based layout for displaying services because users need to compare multiple services quickly. We combine this with a single-column layout for the registration form because it provides a simple and focused form experience.**

**Important:** The goal is not to choose the "best" layout in general. Choose a layout that is appropriate for **your users, content, functionality, and application**.

---

## 8. Agree on the Frontend/Backend Interface

**Suggested time: 20 minutes**

Before development continues, the frontend and backend teams should agree on the interface that will be used.

Discuss and agree on:

* API endpoint names;
* HTTP methods;
* required data;
* JSON request structures;
* JSON response structures;
* required fields and their data types.

For example:

```text
GET /api/products
```

could return:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 1200
  }
]
```

The frontend team can then use mock data with the agreed structure while developing the React application.

The backend team can independently implement the corresponding API endpoints.

> **Important:** The frontend and backend should agree on the interface, but **do not connect them during Sprint 2**.

<!-- API documentation will be covered in Sprint 3. -->

### Outcome

A shared, agreed-upon interface that both frontend and backend teams can follow during Sprint 2.

---

## 9. Convert User Stories into Tickets

**Suggested time: 15 minutes**

Select some of the Sprint 2 user stories and break them into smaller, actionable development tickets.

For example:

### User Story

> As a customer, I want to see available services so that I can choose a service.

Possible tickets:

**Frontend**

* Create `ServiceList` component.
* Create `ServiceCard` component.
* Add mock service data.
* Display services.
* Make the service list responsive.

**Backend**

* Create Service model/data structure.
* Create service controller.
* Create `GET /api/services` endpoint.
* Add service route.
* Test the endpoint with Postman.

Tickets should be sufficiently clear that a team member can understand what needs to be done.

You do not necessarily need to convert every Sprint 2 user story into detailed tickets during this meeting. Focus on the work that needs to start first.

### Outcome

A set of actionable tickets connected to the Sprint 2 user stories.

---

## 10. Create a Timeline for the Current Week and the First Three Days of Week 4

**Suggested time: 15 minutes**

Create a realistic timeline for the **remainder of Week 3 and the first three days of Week 4**.

Use the recommended Sprint 2 workflow as a guide.

### Frontend

Plan work such as:

* main React components;
* application pages;
* navbar and navigation;
* responsive layouts;
* lists of products/services or other application data;
* mock/static data;
* conversion of an existing HTML template to React components, if applicable.

### Backend

Plan work such as:

* Express server;
* MVC structure;
* mock/array data;
* models/data structures;
* controllers;
* routes;
* middleware;
* CRUD functionality;
* API endpoints;
* Postman testing.

### Coordination

Include time for:

* frontend/backend communication;
* checking the agreed interface;
* resolving questions or inconsistencies;
* reviewing progress.

Login, registration, and other forms will be addressed later in the Sprint 2 workflow when appropriate.

### Outcome

A realistic timeline for the work to be completed during the remainder of Week 3 and the first three days of Week 4.

---

# Final Check

**Suggested time: 5 minutes**

Before finishing the meeting, confirm that your group has completed the following:

* [ ] Sprint 1 retrospective completed.
* [ ] Sprint 2 improvements identified.
* [ ] Scrum roles confirmed.
* [ ] Sprint 2 Git repository created.
* [ ] Instructor added as collaborator.
* [ ] Sprint 2 Goal defined.
* [ ] Sprint 2 scope understood.
* [ ] Product Backlog reviewed and updated.
* [ ] Product Backlog prioritized.
* [ ] Initial Sprint 2 Backlog created.
* [ ] Frontend responsibilities identified.
* [ ] Backend responsibilities identified.
* [ ] Frontend/backend interface agreed upon.
* [ ] Main UI layout approach identified and justified.
* [ ] Selected user stories converted into tickets.
* [ ] Timeline created for the remainder of Week 3 and the first three days of Week 4.
* [ ] Each team member knows what they are expected to work on next.


---

# After the Meeting

Begin Sprint 2 development according to your Sprint Backlog and timeline.

Remember:

- Work independently on the frontend and backend, communicate frequently, and keep the interface between the two sides consistent.
- The frontend and backend will be connected in Sprint 3.

<!-- 
---




# Task: Sprint 2 Kick-off Activities (version 1)



## Purpose of the Meeting

This meeting is the starting point for Sprint 2.

By the end of the meeting, each group should have:

* reflected on Sprint 1 and identified improvements for Sprint 2;
* established a Sprint 2 Goal;
* reviewed and updated the Product Backlog;
* created an initial Sprint 2 Backlog;
* assigned Scrum roles and responsibilities;
* created the Sprint 2 Git repository and added the instructor as a collaborator;
* identified the main frontend and backend work;
* agreed on the interface between the frontend and backend;
* converted selected user stories into actionable tickets;
* created a timeline for the remainder of Week 3 and the first three days of Week 4.

The activities below are **suggested time allocations**. Groups may adjust the time spent on each activity according to their needs.

---

## 1. Sprint 1 Retrospective

**Suggested time: 20 minutes**

Reflect on your experience during Sprint 1.

Discuss:

* What worked well?
* What did not work well?
* What did you learn?
* What should you continue doing?
* What should you change in Sprint 2?
* What problems from Sprint 1 should be avoided?

Use the retrospective format agreed upon by your group.

### Outcome

Identify a small number of **concrete improvements** that the team will apply during Sprint 2.

---

## 2. Sprint 2 Goal and Scope

**Suggested time: 15 minutes**

Establish a clear Sprint 2 Goal for your project.

Your Sprint Goal should reflect the main purpose of Sprint 2:

> **Develop the frontend and backend independently.**

Adapt this goal to your specific application.

Also review the Sprint 2 scope and make sure the team understands what is and is not expected during this sprint.

### Sprint 2 includes

* React frontend development;
* components and pages;
* navigation and routing;
* responsive design;
* mock/static frontend data;
* backend development using MVC;
* CRUD functionality;
* mock/array data;
* MongoDB/Mongoose when covered in class;
* Postman API testing;
* agreement on the frontend/backend interface.

### Sprint 2 does not include

* connecting the frontend to the backend;
* real authentication;
* API documentation;
* Supertest;
* other Sprint 3 functionality.

---

## 3. Product Backlog Refinement

**Suggested time: 25 minutes**

Review your existing Product Backlog from Sprint 1.

As a group:

* review and improve the user stories;
* check whether the important stories are sufficiently clear;
* apply **INVEST** where appropriate;
* make sure the backlog is **DEEP**;
* prioritize the backlog;
* identify stories that are relevant to Sprint 2.

The purpose is not necessarily to rewrite the entire backlog. Focus on the items that need attention and on the items that may be selected for Sprint 2.

### Outcome

An updated and prioritized Product Backlog.

---

## 4. Create the Initial Sprint 2 Backlog

**Suggested time: 20 minutes**

Select the user stories that the team plans to work on during Sprint 2.

Consider the work required for both the frontend and backend.

Organize the selected work into appropriate areas, for example:

### Frontend

* React components;
* pages;
* navigation;
* routing;
* responsive design;
* lists;
* mock/static data;
* other frontend functionality required by the selected stories.

### Backend

* server setup;
* models/data structures;
* controllers;
* routes;
* middleware;
* CRUD operations;
* mock/array data;
* API endpoints.

### Coordination

* frontend/backend data structures;
* API endpoints;
* responsibilities between frontend and backend teams.

Do not select more work than the team can reasonably complete during the sprint.

### Outcome

An initial **Sprint 2 Backlog** containing the work selected for the sprint.

---

## 5. Scrum Roles and Sprint 2 Git Repository

**Suggested time: 15 minutes**

### Scrum Roles

After completing the retrospective, decide whether your Scrum roles will remain the same or change for Sprint 2.

The **Product Owner remains the same**.

The group may choose a different Scrum Master for Sprint 2 if appropriate.

Confirm the responsibilities of each role and make sure the workload associated with Scrum responsibilities is considered when distributing development work.

### Git Repository

Create the Git repository for Sprint 2.

Make sure that:

* all team members have access;
* the instructor has been added as a collaborator;
* the repository is ready for Sprint 2 development;
* the project structure is ready for the team to begin working.

### Outcome

Confirmed Scrum roles and a working Sprint 2 Git repository.

---

## 6. Frontend and Backend Responsibilities

**Suggested time: 15 minutes**

Identify how the work will be divided between the frontend and backend members of the team.

For the selected Sprint 2 stories, identify:

* which work belongs to the frontend;
* which work belongs to the backend;
* which work requires coordination between both sides.

Remember that the frontend and backend teams will work **in parallel**.

The teams should communicate regularly even though the applications will not be connected during Sprint 2.

### Outcome

A clear understanding of frontend and backend responsibilities.

---

## 7. Agree on the Frontend/Backend Interface

**Suggested time: 20 minutes**

Before development continues, the frontend and backend teams should agree on the interface that will be used **later**.

Discuss and agree on:

* API endpoint names;
* HTTP methods;
* required data;
* JSON request structures;
* JSON response structures;
* required fields and their data types.

For example:

```text
GET /api/products
```

could return:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 1200
  }
]
```

The frontend team can then use mock data with the agreed structure while developing the React application.

The backend team can independently implement the corresponding API endpoints.

> **Important:** The frontend and backend should agree on the interface, but **do not connect them during Sprint 2**.


---

## 8. Convert User Stories into Tickets

**Suggested time: 15 minutes**

Select some of the Sprint 2 user stories and break them into smaller, actionable development tickets.

For example:

### User Story

> As a customer, I want to see available services so that I can choose a service.

Possible tickets:

**Frontend**

* Create `ServiceList` component.
* Create `ServiceCard` component.
* Add mock service data.
* Display services.
* Make the service list responsive.

**Backend**

* Create Service model/data structure.
* Create service controller.
* Create `GET /api/services` endpoint.
* Add service route.
* Test the endpoint with Postman.

Tickets should be sufficiently clear that a team member can understand what needs to be done.

### Outcome

A set of actionable tickets connected to the Sprint 2 user stories.

---

## 9. Create a Timeline for the Current Week and the First Three Days of Week 4

**Suggested time: 15 minutes**

Create a realistic timeline for the **remainder of Week 3 and the first three days of Week 4**.

Use the recommended Sprint 2 workflow as a guide.

### Frontend

Plan work such as:

* main React components;
* application pages;
* navbar and navigation;
* responsive layouts;
* lists of products/services or other application data;
* mock/static data;
* conversion of an existing HTML template to React components, if applicable.

### Backend

Plan work such as:

* Express server;
* MVC structure;
* mock/array data;
* models/data structures;
* controllers;
* routes;
* middleware;
* CRUD functionality;
* API endpoints;
* Postman testing.

### Coordination

Include time for:

* frontend/backend communication;
* checking the agreed interface;
* resolving questions or inconsistencies;
* reviewing progress.

Login, registration, and other forms will be addressed later in the Sprint 2 workflow when appropriate.

### Outcome

A realistic timeline for the work to be completed during the remainder of Week 3 and the first three days of Week 4.

---

# Final Check

**Suggested time: 5 minutes**

Before finishing the meeting, confirm that your group has completed the following:

* [ ] Sprint 1 retrospective completed.
* [ ] Sprint 2 improvements identified.
* [ ] Sprint 2 Goal defined.
* [ ] Sprint 2 scope understood.
* [ ] Product Backlog reviewed and updated.
* [ ] Product Backlog prioritized.
* [ ] Sprint 2 Backlog created.
* [ ] Scrum roles confirmed.
* [ ] Sprint 2 Git repository created.
* [ ] Instructor added as collaborator.
* [ ] Frontend responsibilities identified.
* [ ] Backend responsibilities identified.
* [ ] Frontend/backend interface agreed upon.
* [ ] Selected user stories converted into tickets.
* [ ] Timeline created for the remainder of Week 3 and the first three days of Week 4.
* [ ] Each team member knows what they are expected to work on next.

---

## After the Meeting

Begin Sprint 2 development according to your Sprint Backlog and timeline.

Remember:

- Work independently on the frontend and backend, communicate frequently, and keep the interface between the two sides consistent. 
- The frontend and backend will be connected in Sprint 3.**

 -->
