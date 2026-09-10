# Task: Progress-and-development session

## Purpose of the Session

You should now have completed the [main activities planned for the **Week 3–4**]( https://github.com/tx00-web-en/Project/blob/main/material/sprint2.md#suggested-workflow) part of Sprint 2.

Today's session is focused on:

* checking your progress from Week 3–4;
* completing any unfinished Week 3–4 work;
* continuing with the Week 4–5 development activities;
* ensuring that frontend and backend development remain aligned;
* preparing the material needed for your Sprint 2 presentation next week.

Work autonomously as a group. You may use AI assistance when useful, but your team is responsible for evaluating and deciding how to use any AI-generated suggestions.

<!-- The time allocations below are **suggested**. Adjust them according to your group's progress and needs. -->

---

# 1. Check Your Week 3–4 Progress

Start by reviewing the work you planned for the **remainder of Week 3 and the first three days of Week 4**.

Use your Sprint 2 Backlog and timeline.

### Frontend

Check whether you have completed the planned work such as:

* main React components;
* application pages;
* responsive layouts;
* lists of products/services or other application data;
* individual product/service/item pages;
* hero section or other main UI sections;
* mock/static data;
* HTML-to-JSX conversion, if applicable.

### Backend

Check whether you have completed the planned work such as:

* Express server;
* MVC structure;
* models/data structures;
* controllers;
* routes;
* middleware;
* CRUD functionality;
* product/service endpoints;
* user endpoints;
* Postman testing;
* agreed frontend/backend interface.

### If something is unfinished

Do not immediately move to new work.

First decide:

* What is unfinished?
* Why is it unfinished?
* Does it need to be completed before continuing?
* Should the task be moved to the current Sprint Backlog?
* Does the team need to adjust its timeline?

### Outcome

A clear understanding of what has been completed, what remains, and what should be done next.

---

# 2. Continue with Week 4–5 Frontend Development

If the Week 3–4 frontend work is complete, continue developing and refining the frontend.

Focus on completing the main user-facing functionality of your application.

### Frontend work may include

* React Router and routing;
* navigation bar;
* login page;
* registration page;
* pages that display lists of products/services/items;
* pages that display a single product/service/item;
* navigation between pages;
* forms;
* responsive design;
* mock data;
* appropriate UI interactions;
* refining the visual design;
* checking consistency with your Sprint 1 prototype.

### Login and Registration

Login and registration are **simulations only during Sprint 2**.

For example, submitting a form may produce:

```text
Login successful
```

or

```text
Registration successful
```

through the console or an appropriate UI message.

**Do not implement real authentication during Sprint 2.**

Real authentication will be implemented in **Sprint 3**.

### UI Layout

Review the UI layout approach you selected during your Sprint 2 planning.

Consider:

* Is the layout appropriate for your users?
* Does it support the purpose of the page?
* Does it work well on different screen sizes?
* Does it remain consistent with your application's visual direction?
* Does it align with or appropriately improve your Sprint 1 prototype?

You may use AI assistance to review your UI design and suggest improvements.

> Website Layouts: https://www.wix.com/blog/website-layouts

---

# 3. Continue with Week 4–5 Backend Development

Now that MongoDB/Mongoose has been introduced, continue developing the backend.

### Backend work may include

* refactoring appropriate mock/array data operations to MongoDB/Mongoose;
* creating and refining Mongoose models;
* connecting the backend to MongoDB;
* updating controllers to work with the database;
* updating routes where necessary;
* implementing CRUD operations;
* developing product/service endpoints;
* developing user endpoints;
* handling appropriate errors;
* testing endpoints with Postman.

Your backend should continue to follow the **MVC structure** introduced in class.

### User and Product/Service Data

Your backend should provide the data structures and endpoints required by your application.

At minimum, make sure that the backend supports the main entities needed by your project, including:

* **User**
* **Product/Service or another main application entity**

The exact fields and functionality should reflect your application's requirements.

---

# 4. Check Frontend/Backend Alignment

Although the frontend and backend are **not connected during Sprint 2**, they should continue to follow the interface that your team agreed upon.

Review the interface together.

Check:

* endpoint names;
* HTTP methods;
* required fields;
* field names;
* data types;
* JSON response structures;
* product/service data;
* user data.

For example, if the frontend expects:

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200
}
```

the backend should use the same agreed structure.

The frontend can continue using mock data.

The backend can continue testing the real endpoints independently with Postman.

> **Remember:** Do not connect the frontend and backend during Sprint 2.

Integration will take place in **Sprint 3**.

---

# 5. AI Feature — Postponed to Sprint 3

The AI demonstration that was planned for this week has been postponed because the class session was cancelled due to the university-wide sports event.

Therefore:

> **AI functionality is now postponed to Sprint 3.**

If your application includes AI as a feature, **do not implement the AI functionality during Sprint 2**.

The AI implementation will be covered in Sprint 3, including the relevant frontend and backend work.

You may still plan where AI will fit into your application and make sure your Sprint 1/Sprint 2 design can accommodate the feature later.

---

# 6. Sprint 2 Presentation Preparation

Your Sprint 2 presentation will take place **next week**.

Start collecting the information, screenshots, code examples, and other evidence you will need.

Your presentation should tell the story of your progress from **Sprint 1 → Sprint 2**.

> Suggested A 10–12-minute [template is available](https://github.com/tx00-web-en/Project/blob/main/material/ppt-template2.md) to help you structure your presentation.

---

# 7. Review Your Sprint 2 Backlog and Timeline

Before finishing the session, review your current Sprint 2 Backlog.

Check:

* completed tickets;
* tickets currently in progress;
* remaining tickets;
* responsibilities;
* upcoming deadlines;
* whether the timeline needs adjustment.

Make sure the remaining work is realistic.

Do not add unnecessary functionality simply because you have time.

Remember the Sprint 2 scope.

---

# Final Check

Before finishing the session, make sure your group has:

* [ ] Reviewed the Week 3–4 work.
* [ ] Completed or rescheduled unfinished work.
* [ ] Continued with the Week 4–5 frontend work.
* [ ] Continued with the Week 4–5 backend work.
* [ ] Implemented/updated MongoDB/Mongoose functionality where appropriate.
* [ ] Developed the required product/service endpoints.
* [ ] Developed the required user endpoints.
* [ ] Checked that frontend and backend use the agreed interface.
* [ ] Tested backend endpoints with Postman.
* [ ] Implemented login/registration as simulations only.
* [ ] Reviewed the UI layout and design.
* [ ] Confirmed that the frontend remains aligned with the Sprint 1 prototype.
* [ ] Updated the Sprint 2 Backlog.
* [ ] Reviewed the timeline.
* [ ] Started preparing the Sprint 2 presentation.
* [ ] Identified what remains for Sprint 2.
* [ ] Identified functionality that will be postponed to Sprint 3.

---

# Important Reminder

Sprint 2 is about developing the **frontend and backend independently** and preparing them for integration.

> **Do not connect the frontend and backend yet.**

The following are **Sprint 3 activities**:

* frontend/backend integration;
* real authentication;
* Swagger/OpenAPI;
* Supertest;
* AI implementation.

If your project includes AI, you should now plan for that feature in Sprint 3 rather than implementing it during Sprint 2.

<!-- Continue working according to your **Sprint Backlog**, communicate with the other side of the team, and keep your agreed interface consistent. -->
