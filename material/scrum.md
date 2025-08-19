# Theory: Scrum ...

- DEEP principle
- INVEST principle
- DEEP vs INVEST
- Misc.
  - Story points
  - Examples

---
## DEEP principle

A good product backlog has four characteristics:
- **D**etailed appropriately
- **E**stimated
- **E**mergent
- **P**rioritized

1. **Detailed Appropriately**  As backlog items approach sprint readiness, they should contain enough information for the development team to proceed. Items lower in priority, however, should remain less detailed to save time and avoid rework, given the backlog’s evolving nature.

2. **Emergent:** The details of user stories and items should emerge over time, meaning they can evolve and be refined as the team gains a better understanding. It's not necessary for all details to be known upfront.

3. **Estimated:** The product backlog items should have some level of estimation associated with them, typically in terms of effort (e.g., time). This helps the team in planning and prioritization.

4. **Prioritized:** The product backlog should be ordered by priority, with the most valuable and important items at the top. This helps the team focus on what's most critical for the product.

In Scrum, "DEEP" is an acronym that stands for *Detailed appropriately*, *Estimated*, *Emergent*, and *Prioritized*. The DEEP principle helps ensure that the product backlog remains a dynamic and well-organized list of items that can be effectively taken into sprints for development. It emphasizes that backlog items should not be overly detailed upfront, as they can evolve and be refined as the project progresses and more information becomes available.

---
## INVEST

In the context of Scrum and Agile software development, "INVEST" is an acronym that represents a set of criteria for writing good user stories or product backlog items. These criteria help ensure that the stories are well-structured, understandable, and valuable for the development team. Each letter in "INVEST" stands for a specific characteristic:

1. **Independent:** User stories should be independent of each other, meaning they can be developed, tested, and delivered without relying on the completion of other stories. This promotes flexibility and efficient development.

2. **Negotiable:** User stories should not be overly detailed or rigid. They should be open to negotiation and discussion between the development team and the product owner to refine and adapt them as needed.

3. **Valuable:** Each user story should deliver value to the end-users or stakeholders of the product. It should address a specific need or provide a benefit that contributes to the overall goals of the project.

4. **Estimable:** User stories should be clear enough that the development team can estimate the effort required to complete them. This helps with sprint planning and prioritization.

5. **Small:** User stories should be small enough to fit within a single sprint, typically ranging from a few days to a couple of weeks in duration. Smaller stories are easier to manage and track progress on.

6. **Testable:** Each user story should have clear acceptance criteria that define when the story is complete and meets the intended requirements. This ensures that the story can be tested and validated.

By following the INVEST criteria, teams can create user stories that are well-structured, manageable, and focused on delivering value to the product. These criteria are a valuable part of Agile development practices and help maintain a healthy product backlog.

---
## DEEP vs INVEST

- The *DEEP* acronym is used specifically to guide the management of the **product backlog** in Scrum. Each part of *DEEP* (Detailed Appropriately, Estimated, Emergent, Prioritized) describes key qualities that help keep the product backlog organized and effective:
  - **Detailed Appropriately**: Items near the top are refined with more detail, so they’re ready for development.
  - **Estimated**: Items have estimates for effort, usually in [story points](#story-points).
  - **Emergent**: The backlog is a "living" document, constantly evolving as more information becomes available.
  - **Prioritized**: Items are ordered by priority, ensuring the most valuable work is done first.
- The *INVEST* criteria, on the other hand, apply to **individual user stories** or **product backlog items (PBIs)** to ensure they are well-defined and ready for development. *INVEST* helps ensure that each item in the product backlog is actionable and valuable for the team to work on:
  - **Independent**: Each story should be self-contained so it can be developed and delivered independently.
  - **Negotiable**: Stories are not contracts; details can evolve based on discussion.
  - **Valuable**: Each story should deliver value to the customer.
  - **Estimable**: Stories must be clear enough to estimate effort.
  - **Small**: Stories should be small enough to be completed in a single sprint.
  - **Testable**: There should be clear acceptance criteria to confirm when the story is done.

In short:
- *DEEP* is for structuring the **whole product backlog**.
- *INVEST* is for creating **individual backlog items** that are clear and ready for work. 

Both together help Scrum teams maintain a high-quality backlog that aligns well with agile values and Scrum principles.

----
## Misc.

### Story Points

**Story points** are a unit of measure used in agile methodologies to estimate the effort and complexity of a particular task, feature, or user story. Instead of measuring time (like hours or days), story points assess **relative complexity** based on factors like:

1. **Effort Required**: How much work will it take to complete?
2. **Complexity**: How challenging or intricate is the task?
3. **Risk and Uncertainty**: Are there unknowns or potential challenges?

- Why Story Points Instead of Time?
Story points allow teams to estimate without the pressure of setting exact deadlines. Since teams differ in skills and experience, story points provide a **relative measure** that can be more consistent and flexible across sprints.

- How Do Teams Assign Story Points?
Teams typically use a **scale** for story points, with the **Fibonacci sequence** (1, 2, 3, 5, 8, 13...) being popular. Smaller numbers represent simpler tasks, while higher numbers represent tasks with greater complexity and uncertainty.

For example:
- **1 Story Point**: Very simple, straightforward task.
- **3 Story Points**: Slightly more complex, requires moderate effort.
- **8 Story Points**: Complex, significant effort needed.
- **13 Story Points**: Very complex, high uncertainty, and risk.

- How Are Story Points Useful?
- They help teams understand and compare the difficulty of tasks relative to each other.
- They allow the team to **plan sprints and velocity** (the average number of story points completed in a sprint).
- They support a focus on **value and progress** rather than exact time estimates, helping the team adapt and improve over time. 

In essence, story points provide a flexible, team-centered approach to estimating work.

### Example User stories that meet the INVEST criteria:

1. As a new user, I want to easily sign up for an account using my email and password, so that I can start shopping online.
   - **Reasons:**
     - Independent: This user story focuses on a specific action (user registration) and is not dependent on other stories.
     - Negotiable: Details about how the signup process will work can be discussed and refined.
     - Valuable: Creating accounts is a fundamental feature of the system that adds value for users.
     - Estimable: The scope and effort required to implement user registration can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – successful registration enables user access.

2. As a registered user, I want to log in quickly using my email and password, ensuring a secure and personalized shopping experience.
   - **Reasons:**
     - Independent: This user story focuses on a specific action (user login) and is not dependent on other stories.
     - Negotiable: Details about how the login process will work can be discussed and refined.
     - Valuable: Quick and secure login enhances the user experience.
     - Estimable: The scope and effort required to implement user login can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – successful login grants user access.

3. As a user, I expect clear error messages if I enter incorrect login credentials or try to register with an existing email.
   - **Reasons:**
     - Independent: This user story focuses on handling specific error cases and is not dependent on other stories.
     - Negotiable: Specific error messages and handling can be discussed and refined.
     - Valuable: Clear error messages improve user understanding and reduce frustration.
     - Estimable: The effort required to implement error handling can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – incorrect credentials trigger appropriate error messages.

4. As a registered user, I want the option to stay logged in, so that I don't have to enter my credentials every time I visit the website.
   - **Reasons:**
     - Independent: This user story focuses on session management and is not dependent on other stories.
     - Negotiable: Details about session management and staying logged in can be discussed and refined.
     - Valuable: Persistent login enhances user convenience.
     - Estimable: The effort required to implement persistent login can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – users remain logged in across visits.

5. As a user, I want to see a "Forgot Password" option that allows me to reset my password by receiving a link via email.
   - **Reasons:**
     - Independent: This user story focuses on password recovery and is not dependent on other stories.
     - Negotiable: Details about the password recovery process can be discussed and refined.
     - Valuable: Password recovery provides a way for users to regain access to their accounts.
     - Estimable: The effort required to implement password recovery can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – users receive a password reset link.

For the rest of the user stories, let's continue the evaluation:

6. As a logged-in user, I want to browse products, view detailed product pages, and easily add items to my shopping cart.
   - **Reasons:**
     - Independent: This user story focuses on browsing and adding products to the cart without dependency.
     - Negotiable: Details about browsing, viewing, and adding can be discussed and refined.
     - Valuable: Core shopping functionality that adds value for users.
     - Estimable: The effort required for browsing and adding products can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – products can be added to the cart.

7. As a shopper, I want to see a summary of my cart with product names, quantities, and total cost before proceeding to checkout.
   - **Reasons:**
     - Independent: This user story involves displaying a cart summary and is not dependent on other stories.
     - Negotiable: Details about the cart summary and layout can be discussed and refined.
     - Valuable: Cart summary provides a clear overview of selected items.
     - Estimable: The effort required to display the cart summary can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – cart summary is displayed accurately.

8. As a user, I want to have the option to adjust the quantity of products in my cart or remove items entirely before finalizing my purchase.
   - **Reasons:**
     - Independent: This user story involves cart manipulation and is not dependent on other stories.
     - Negotiable: Details about adjusting quantities and removing items can be discussed and refined.
     - Valuable: Cart manipulation options enhance user control.
     - Estimable: The effort required for cart adjustments can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – users can change quantities and remove items.

9. As a customer, I expect a clear indication of products that are out of stock or unavailable for purchase.
   - **Reasons:**
     - Independent: This user story involves indicating product availability and is not dependent on other stories.
     - Negotiable: Details about how out-of-stock products are displayed can be discussed and refined.
     - Valuable: Clear product availability information prevents frustration for customers.
     - Estimable: The effort required to indicate availability can be estimated.
     - Small: The user story has a clear and limited scope.
     - Testable: Success criteria are evident – out-of-stock products are appropriately indicated.

10. As a shopper, I need the option to continue shopping after adding items to my cart, without losing the contents of my cart.
    - **Reasons:**
      - Independent: This user story focuses on session management and continuity of shopping.
      - Negotiable: Details about session management and cart continuity can be discussed and refined.
      - Valuable: Continuous shopping without cart loss enhances user experience.
      - Estimable: The effort required to manage sessions and cart continuity can be estimated.
      - Small: The user story has a clear and limited scope.
      - Testable: Success criteria are evident – users can continue shopping without cart loss.

11. As a user, I want to see real-time updates to my cart total and available discounts as I add or remove products.
    - **Reasons:**
      - Independent: This user story involves real-time updates to the cart summary.
      - Negotiable: Details about updating totals and discounts can be discussed and refined.
      - Valuable: Real-time updates provide instant feedback during cart manipulation.
      - Estimable: The effort required for real-time updates can be estimated.
      - Small: The user story has a clear and limited scope.
      - Testable: Success criteria are evident – cart totals and discounts

### Links

- [What is Scrum?](https://www.scrum.org/learning-series/what-is-scrum/what-is-scrum)
- [Writing meaningful user stories with the INVEST principle](https://blog.logrocket.com/product-management/writing-meaningful-user-stories-invest-principle/)
- [DEEP: The 4 Characteristics of a Good Product Backlog](https://www.easyagile.com/blog/product-backlog/)
