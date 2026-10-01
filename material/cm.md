
# Coding Marathon 3

Welcome to the **Third Coding Marathon**! 

In this challenge, you'll build a fullstack application, including backend testing and deployment to the cloud.

The data models are quite similar to the apps we worked on during *coding marathon 2* and the *pair programming*. Likewise, *backend testing* will closely mirror what we've done before. The only `new` task is deploying the frontend.


> [!IMPORTANT]
> ### Note on AI Use During Coding Marathons
>
> This coding marathon is designed not only to help you complete your group project but also to prepare you for the exam. Therefore, **AI tools may only be used at the end of the day to assess the quality of your code and to resolve issues related to Git/GitHub.**
>
> **During the coding marathon, do not use AI to write, modify, debug, or otherwise solve coding problems.**


---

- [Part 1](https://github.com/tx00-resources-en/cm3-starter/blob/main/cm-part1.md)
- [Part 2](https://github.com/tx00-resources-en/cm3-starter/blob/main/cm-part2.md): Available 13:00
- [Part 3 (Optional)](https://github.com/tx00-resources-en/cm3-starter/blob/main/cm-part3.md)


---

## Project Structure & Branching Strategy

### Branching Strategy

- Create **one branch per feature** (minimum 1 branch per team member).  
- **Do NOT delete any branches** after merging—preserve all history.  
- Use clear branch naming (e.g., `feature/auth`, etc.).  
- Keep branches intact for grading and evaluation purposes.  

### Project Structure

```
project-root/
  backend/
  frontend/
  evaluation/
    contributions/
      member1.md
      member2.md
      ...
    self-assessment/
      member1.md
      member2.md
      ...
    self-grading/
      member1.md
      member2.md
      ...
```

- Each file must be named after the contributor (e.g., `Matti.md`).  


---

## Development Workflow

**Phase 1: API V1 & Frontend V1 (No Authentication)**
1. Build backend API V1 with all CRUD endpoints
2. Write comprehensive backend tests for API V1 using Vitest/Supertest
3. Build frontend V1 to consume API V1 endpoints
4. Deploy API V1 and Frontend V1 to Render using the first database
5. **Only proceed to Phase 2 after V1 is complete and working**

**Phase 2: API V2 & Frontend V2 (With Authentication)**
1. Create a new branch for API V2 based on API V1 code
2. Add authentication (signup/login) to API V2
3. Protect POST, PUT, DELETE endpoints requiring authentication tokens
4. Write comprehensive backend tests for API V2 including auth tests
5. Update frontend V2 to handle authentication flow
6. Deploy API V2 and Frontend V2 to Render using the second database



## Deliverables

You need to submit **separate links** in OMA for each of the following items:

1. **API V1 code:** The initial backend version without authentication, together with **backend tests for API V1** (using Vitest/Supertest).  
2. **Frontend V1 code:** The frontend version that works with **API V1** (no authentication required).  
3. **API V2 code:** Updated backend version with authentication and protected routes, together with **backend tests for API V2** (using Vitest/Supertest).  
4. **Frontend V2 code:** The frontend version compatible with **API V2** (with authentication integration).  
5. **Deployment URLs:** Links to the deployed APPs on Render.  


---

## Evaluation & Grading

**Scoring:**
- Group grade: 60 points  
- Individual grade: 60 points  

**Individual Evaluation Requirements:**
Each team member must create separate documentation files under the `evaluation/` folder:

1. **Contributions** (`evaluation/contributions/YourName.md`)
   - Describe the features/branches you created
   - List the commits and pull requests you authored
   - Explain your role in the group project

2. **Self-Assessment** (`evaluation/self-assessment/YourName.md`)
   - Evaluate the quality and functionality of your code
   - Discuss challenges faced and how you overcame them
   - Reflect on what you learned

3. **Self-Grading** (`evaluation/self-grading/YourName.md`)
   - Grade yourself out of 60 points
   - Justify your grade based on:
     - Code quality and organization
     - Completion of assigned features

---

## Submission Checklist

Use this checklist to track your progress:

**Version 1 (API V1: No Authentication)**
- [ ] API V1 code repository with all CRUD endpoints
- [ ] Backend tests for API V1 (Vitest/Supertest) for all endpoints
- [ ] Frontend V1 code (working with API V1)
- [ ] Deployed APP V1 URL to Render: (backend+frontend).
- [ ] Links to OMA 

**Version 2 (API V2: With Authentication)**
- [ ] API V2 code repository with protected endpoints
- [ ] Backend tests for API V2 (Vitest/Supertest), including authentication tests
- [ ] Frontend V2 code (with authentication integration)
- [ ] Deployed APP V2 URL to Render: (backend+frontend).
- [ ] Links to OMA 

**Documentation & Evaluation**
- [ ] Feature branches created and preserved (minimum 1 per team member, none deleted)
- [ ] `evaluation/contributions/YourName.md` for each member
- [ ] `evaluation/self-assessment/YourName.md` for each member
- [ ] `evaluation/self-grading/YourName.md` for each member (max 80 points each)

---

## Success Criteria

This session will be evaluated based on the following criteria:

1. **Clean, readable, and well-organized code**: Consistent style, clear naming, proper structure  
2. **Complete CRUD functionality**: All endpoints working for V1 and V2  
3. **Comprehensive backend testing**: Vitest/Supertest for all endpoints (V1 and V2), including authentication tests for protected routes  
4. **Successful cloud deployment**: Both APIs and frontends deployed on Render with separate databases  
5. **Proper Git workflow**: Feature branches preserved, clear commit messages  
6. **Individual contributions**: Clear evaluation of each member

---

## Submission

Submit the required deliverables to **OMA before the deadline: 23:45**. Ensure all OMA links are submitted before the deadline.
