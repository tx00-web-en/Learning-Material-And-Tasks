# Theory: Product Backlog Management (DEEP & INVEST)

## Overview

In Scrum, managing requirements is an iterative process. The Product Backlog is not an exhaustive, static specification; it evolves as the team and stakeholders gain knowledge through development and user feedback. 

To maintain an effective backlog and prepare items for development, Scrum teams rely on two complementary quality frameworks:
- **DEEP**: Evaluates the health and structure of the **overall Product Backlog** (Macro level).
- **INVEST**: Evaluates the quality and readiness of **individual Product Backlog Items** (Micro level).

---

## 1. The DEEP Principle (Product Backlog Level)

The DEEP framework defines four foundational characteristics of a well-maintained Product Backlog:

* **D — Detailed appropriately**
* **E — Estimated**
* **E — Emergent**
* **P — Prioritized**

<!-- 
```
+-------------------------------------------------------------------+
|                        PRODUCT BACKLOG                            |
|                                                                   |
|   [Top Priority]    High Detail  |  Estimated  | Ready for Sprint |
|         |                                                         |
|         v           Medium Detail|  Estimated  | Needs Refinement |
|                                                                   |
|   [Low Priority]    Low Detail   |  Unestimated| Long-term Vision |
+-------------------------------------------------------------------+
``` 
-->


### 1.1 Detailed Appropriately
A Product Backlog should not have uniform detail across all items. Instead, detail is applied **just-in-time**:
* **Near-term items (Top of Backlog):** Items selected for upcoming Sprints require precise descriptions, acceptance criteria, and clear scope so the team can commit to them.
* **Long-term items (Bottom of Backlog):** Items scheduled far in the future should remain high-level concepts or epics. Over-specifying low-priority items leads to wasted effort, as requirements frequently change before development begins.

### 1.2 Estimated
Product Backlog Items must include relative estimates of effort and complexity (typically expressed in **Story Points**). 
* Top-of-backlog items require reliable estimates to facilitate Sprint Planning and capacity forecasting.
* Bottom-of-backlog items may have coarse, high-level estimates or remain unestimated until they move upward.
* An inability to estimate an item indicates ambiguity or excessive size, requiring further backlog refinement.

### 1.3 Emergent
The Product Backlog is a living artifact. It is continuously updated based on:
* Empirical feedback from Sprint Reviews.
* Newly discovered technical constraints.
* Changing market conditions and user research.

Items are added, removed, split, rewritten, or re-evaluated throughout the entire product lifecycle.

### 1.4 Prioritized
The Product Backlog must be sequentially ordered based on value, risk, urgency, and dependencies.
* **The "All High Priority" Anti-Pattern:** Designating every item as "High Priority" provides no actionable guidance. The backlog must represent a single, ordered list to clearly signal what the team should build next.

### DEEP Inspection Matrix

| Attribute | Inspection Question | Anti-Pattern |
| :--- | :--- | :--- |
| **Detailed appropriately** | Do high-priority items have clear acceptance criteria while low-priority items remain concise? | Writing comprehensive technical specifications for items scheduled months away. |
| **Estimated** | Are near-term items sized using a relative estimation model? | Committing to vague stories with unknown scope. |
| **Emergent** | Does the backlog change based on Sprint learnings and user feedback? | Treating the backlog as a fixed scope contract. |
| **Prioritized** | Is there a distinct, sequential ordering of work? | Labeling all backlog items with the same priority tier. |

---

## 2. The INVEST Criteria (Individual Story Level)

While DEEP inspects the backlog as an aggregate entity, the **INVEST** criteria evaluate whether an individual User Story or Product Backlog Item (PBI) is sufficiently defined to be taken into a Sprint.

* **I — Independent**
* **N — Negotiable**
* **V — Valuable**
* **E — Estimable**
* **S — Small**
* **T — Testable**

### 2.1 Independent
Stories should be as self-contained as reasonably possible to avoid tight coupling.
* **Nuance:** Absolute zero dependency across complex systems is rare. The goal is to **minimize unnecessary dependencies** so stories can be reordered, developed, and deployed with maximum scheduling flexibility.

### 2.2 Negotiable
A user story is **not a rigid contract or a detailed specification**. It represents a statement of intent and business value.
* The specific implementation details, technical architecture, and interface design remain open to collaboration between the Product Owner and the Developers during refinement and planning.

### 2.3 Valuable
Every story must deliver tangible value to a user, customer, or internal stakeholder.
* Focus on the **user outcome** rather than low-level technical or cosmetic tasks.
* *Example of Low Value:* "Add a database column." (Purely technical task).
* *Example of High Value:* "Persist order notes so the restaurant receives custom instructions." (Delivers functional value).

### 2.4 Estimable
The development team must understand the work well enough to gauge its relative size, complexity, and risk. A story is difficult to estimate if it:
* Lacks clear acceptance criteria.
* Is too large or vaguely defined.
* Contains significant unresolved technical unknowns (which may require an exploratory Spike first).

### 2.5 Small (Vertical Slicing)
Stories must be small enough to be fully designed, implemented, and tested within a single Sprint.
* **Vertical Slicing Rule:** Split stories by **user value**, not by architectural layers (e.g., do not split into separate "Frontend", "Backend", and "Database" stories). Each split story should ideally deliver a thin, end-to-end slice of working software.

### 2.6 Testable
A story must have clear, objective **Acceptance Criteria** that define what constitutes completion.
* Subjective requirements (e.g., *"The checkout must be fast and easy"*) are not testable.
* Objective criteria (e.g., *"Checkout must complete in under 3 seconds on standard mobile connections"*) allow automated and manual validation.

### INVEST Inspection Matrix

| Criterion | Inspection Question | Anti-Pattern |
| :--- | :--- | :--- |
| **Independent** | Can this item be prioritized and delivered without blocking or being blocked? | Chaining stories together in a strict, multi-sprint dependency sequence. |
| **Negotiable** | Is the story focused on the problem to solve rather than prescriptive implementation? | Treating the story description as an unchangeable technical specification. |
| **Valuable** | Does the item deliver a clear functional outcome to the user/business? | Creating stories that only produce architectural artifacts without visible user value. |
| **Estimable** | Do developers have sufficient clarity to assign a relative effort score? | Accepting ambiguous or open-ended requirements into a sprint. |
| **Small** | Can the story be completed comfortably within a single sprint? | Pulling multi-week epics directly into a sprint backlog. |
| **Testable** | Are there verifiable conditions to determine when the story is "Done"? | Using subjective phrases like "the UI should look good." |

---

## 3. DEEP vs. INVEST: Comparison and Interaction

```
       MACRO VIEW (DEEP)                     MICRO VIEW (INVEST)
+-------------------------------+       +-------------------------------+
|  Evaluates: Entire Backlog    |  -->  |  Evaluates: Single PBI        |
|  Focus: Organization & Flow   |       |  Focus: Readiness for Work    |
|  Scope: Living Artifact       |       |  Scope: Single Sprint Context |
+-------------------------------+       +-------------------------------+
```

### 3.1 Structural Comparison

| Dimension | DEEP | INVEST |
| :--- | :--- | :--- |
| **Primary Scope** | The entire Product Backlog (Macro). | Individual Product Backlog Items (Micro). |
| **Focus** | Structural health, prioritization, and lifecycle management. | Definition quality, scope boundaries, and delivery feasibility. |
| **Primary Owner** | Product Owner (curated collaboratively with the team). | Product Owner and Developers during refinement. |
| **Target Outcome** | An organized, adaptable, and prioritized roadmap of work. | Actionable, well-scoped stories ready for Sprint Planning. |

### 3.2 Operational Interaction
DEEP and INVEST work together during the Backlog Refinement process:
1. **Apply DEEP:** The Product Owner ensures the overall backlog is ordered and that upcoming items reflect current priorities.
2. **Apply INVEST:** The team inspects individual high-priority items. If an item fails INVEST (e.g., it is too large or ambiguously defined), the team splits and clarifies it.
3. **Sprint Planning Decision:** Only items that satisfy both strategic priority (DEEP) and operational readiness (INVEST) are moved into the Sprint Backlog.

---

## 4. Estimation and Story Points

### 4.1 Definition
**Story Points** are an abstract unit of measure used to estimate the relative effort, complexity, and risk associated with completing a Product Backlog Item. 

Unlike time-based estimates (e.g., developer hours), story points capture three combined factors:
1. **Effort Required:** The volume of work involved.
2. **Complexity:** The technical difficulty or intricacy of the solution.
3. **Risk and Uncertainty:** Unknown architectural factors, external dependencies, or ambiguous edge cases.

### 4.2 Relative Sizing and the Fibonacci Scale
Agile teams use non-linear scales—most commonly the **Fibonacci sequence** (1, 2, 3, 5, 8, 13, 21...)—to size stories. This reflects the principle that as work becomes larger, uncertainty increases non-linearly:

* **1–3 Points:** Small, well-understood tasks with low complexity.
* **5–8 Points:** Moderate effort and complexity requiring clear coordination.
* **13+ Points:** Large epics with high uncertainty. Items of this size should be split into smaller vertical stories before sprint commitment.

### 4.3 Practical Utility
* **Decoupled from Individual Speeds:** Relative sizing remains stable regardless of whether a senior or junior developer implements the item.
* **Velocity Tracking:** Sizing stories enables teams to calculate their historical **Velocity** (average story points completed per sprint), facilitating realistic long-term planning.

---

## 5. Practical User Story Examples (INVEST Evaluation)

Below are reference user stories evaluated against the INVEST criteria:

### Story 1: User Registration
> *As a new user, I want to sign up for an account using my email and password, so that I can access personalized shopping features.*
* **Independent:** Focuses entirely on account creation without requiring external feature completion.
* **Negotiable:** Password security rules and verification workflows can be discussed during refinement.
* **Valuable:** Enables user identification and persistent customer profiles.
* **Estimable:** Common architectural pattern with well-understood effort requirements.
* **Small:** Scope is constrained to basic account creation.
* **Testable:** Validated by testing successful account storage and credential authorization.

### Story 2: User Login
> *As a registered user, I want to log in using my email and password, so that I can access my saved preferences.*
* **Independent:** Can be developed and verified separately from the registration UI.
* **Negotiable:** Implementation of session storage mechanisms remains flexible.
* **Valuable:** Secures user access and protects customer data.
* **Estimable:** Scope and technical requirements are clearly bounded.
* **Small:** Represents a compact, verifiable unit of work.
* **Testable:** Validated by confirming successful authentication and rejection of invalid credentials.

### Story 3: Authentication Error Feedback
> *As a user, I want to receive clear error messages during failed login attempts, so that I can correct my credentials.*
* **Independent:** Bounded to error handling flows.
* **Negotiable:** Visual design and copy tone can be adjusted collaboratively.
* **Valuable:** Prevents user frustration and reduces abandonment.
* **Estimable:** Standard validation logic with predictable implementation effort.
* **Small:** Focused exclusively on validation responses.
* **Testable:** Validated by supplying incorrect inputs and asserting expected error states.

### Story 4: Persistent Sessions
> *As a registered user, I want the option to remain logged in across visits, so that I do not need to re-enter credentials repeatedly.*
* **Independent:** Extends session management without blocking base authentication.
* **Negotiable:** Token expiration lengths and storage mechanisms can be refined.
* **Valuable:** Streamlines returning user workflows.
* **Estimable:** Technical requirements (e.g., secure cookies/JWT) are standard.
* **Small:** Distinct, isolated functional scope.
* **Testable:** Validated by testing session persistence across browser restarts.

### Story 5: Password Recovery
> *As a user, I want to request a password reset link via email, so that I can regain access if I forget my credentials.*
* **Independent:** Self-contained recovery flow.
* **Negotiable:** Token timeout thresholds and email layouts can be negotiated.
* **Valuable:** Reduces account lockouts and customer support load.
* **Estimable:** Standard reset flow involving email dispatch and token validation.
* **Small:** Bounded to the reset request and token verification mechanism.
* **Testable:** Validated by generating, delivering, and redeeming a reset token.

### Story 6: Product Catalog Exploration
> *As a customer, I want to view detailed product information pages, so that I can make informed purchasing decisions.*
* **Independent:** Focuses on product data display without depending on payment systems.
* **Negotiable:** Layout, imagery sizes, and field ordering are open to design review.
* **Valuable:** Fundamental capability required for e-commerce conversion.
* **Estimable:** Scope of attributes and data structures can be determined clearly.
* **Small:** Can be isolated to catalog rendering logic.
* **Testable:** Validated by confirming product data is accurately rendered from the database.

### Story 7: Shopping Cart Summary
> *As a shopper, I want to review item quantities and total costs in my cart, so that I can verify my selections before checkout.*
* **Independent:** Operates on local/stored cart state independently of external payment gateways.
* **Negotiable:** Formatting and summary presentation can be refined.
* **Valuable:** Provides essential price transparency before transaction commitment.
* **Estimable:** Math calculations and UI summary are straightforward to size.
* **Small:** Self-contained aggregation view.
* **Testable:** Validated by ensuring line item calculations and grand totals are mathematically correct.

### Story 8: Cart Modification
> *As a shopper, I want to modify item quantities or remove items from my cart, so that I can update my order before payment.*
* **Independent:** Self-contained cart mutation behavior.
* **Negotiable:** UI controls (e.g., dropdowns vs. increment counters) can be discussed.
* **Valuable:** Gives customers full control over their selection.
* **Estimable:** Basic data-mutation logic with predictable complexity.
* **Small:** Limited scope focused strictly on cart mutations.
* **Testable:** Validated by asserting state updates when items are added, incremented, or removed.

### Story 9: Out-of-Stock Indication
> *As a customer, I want to see clear out-of-stock indicators on unavailable products, so that I do not attempt to purchase invalid inventory.*
* **Independent:** Reads inventory flags without requiring full inventory management systems.
* **Negotiable:** Visual indicators (e.g., badges vs. disabled buttons) can be refined.
* **Valuable:** Prevents checkout failures and fulfillment errors.
* **Estimable:** Requires checking inventory values against display logic.
* **Small:** Focused solely on rendering inventory status states.
* **Testable:** Validated by asserting visual and functional constraints on zero-inventory items.

### Story 10: Persistent Cart Across Navigation
> *As a shopper, I want my cart contents preserved while browsing other pages, so that I can continue shopping seamlessly.*
* **Independent:** Focuses on cart state persistence across routing transitions.
* **Negotiable:** Client-side vs. server-side persistence strategy can be negotiated.
* **Valuable:** Reduces checkout friction and transaction abandonment.
* **Estimable:** Well-defined state management implementation.
* **Small:** Narrow focus on cart state lifecycle.
* **Testable:** Validated by navigating across views and asserting that cart state remains intact.

### Story 11: Dynamic Cart Total Updates
> *As a shopper, I want the cart total and discounts to recalculate dynamically when quantities change, so that I see real-time price updates.*
* **Independent:** Evaluates client-side recalculation rules.
* **Negotiable:** Calculation timing and debouncing approaches are open to discussion.
* **Valuable:** Provides instant feedback during cart adjustments.
* **Estimable:** Computation algorithms and reactive UI patterns are well-understood.
* **Small:** Bounded to dynamic recalculation and display bindings.
* **Testable:** Validated by asserting that price totals update reactively when quantity triggers occur.

---

## 6. Reference Links

* [Scrum Guide](https://scrumguides.org/)
* [What is Scrum? (Scrum.org)](https://www.scrum.org/learning-series/what-is-scrum/what-is-scrum)
* [Writing Meaningful User Stories with the INVEST Principle](https://blog.logrocket.com/product-management/writing-meaningful-user-stories-invest-principle/)
* [DEEP: Characteristics of a Good Product Backlog](https://www.easyagile.com/blog/product-backlog/)
