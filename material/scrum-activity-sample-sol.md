
# Sample Answers 

---

## Part 3: Initial Backlog Inspection Questions
*When students discuss the 10-item table, here are the target answers for each question:*

* **Which items immediately look suspicious?**
  * **Item #3** (*"app to be beautiful and easy to use"* — subjective, unestimated, no clear user value).
  * **Item #6** (*"Improve database performance"* — purely technical task, not written as a user story, no clear user value stated).
  * **Item #9** (*"Research whether customers prefer dark mode"* — research spike/task, not an increment of deliverable value).
* **Are any items too large?**
  * **Item #2** (*"Complete checkout"* — 13 pts) and **Item #4** (*"Manage restaurant profile..."* — 13 pts).
* **Are any items unclear?**
  * **Item #2** (What does "complete checkout" actually entail?) and **Item #3** (What does "easy to use" mean?).
* **Are all items valuable?**
  * No. Item #3 is an aesthetic preference rather than functional value; Item #6 describes internal system maintenance rather than customer value.
* **Are all items estimable?**
  * No. Item #3 is marked with `?` because its scope is undefined. Item #2 is a "guess" at 13 because the team does not know the details.
* **Are all items testable?**
  * No. Item #3 cannot be tested objectively.
* **Does the priority order make sense?**
  * No. Item #2 (Checkout), Item #5 (Pay by card), and Item #8 (Place an order) are all marked "High", but logically a user must see restaurant details (#1) -> add food -> place an order (#8) -> pay (#5) -> receive confirmation (#7). Item #7 (Confirmation) is marked "Medium", which breaks the core flow.
* **Is everything equally detailed?**
  * No. Item #4 lists 7 different sub-features, while Item #8 is just 4 words (*"Place an order"*).
* **Are there things that might change as we learn more?**
  * Yes. Items #9 (Dark mode) and #10 (Cancel order) may be deprioritized or dropped depending on user ordering habits.

---

## Part 4: DEEP or INVEST? (Warm-Up)

* **Situation A:** *Everything in the Product Backlog is marked HIGH priority.*
  * **Answer:** **DEEP**
  * **Why:** Violates the **Prioritized** principle. Priority must be an ordered sequence (1, 2, 3...), not a flat label.
* **Situation B:** *A user story says: "As a customer, I want a great experience."*
  * **Answer:** **INVEST**
  * **Why:** Violates **Testable**, **Estimable**, and **Valuable**. It has no objective acceptance criteria and is too vague to size.
* **Situation C:** *A low-priority backlog item has extremely detailed requirements, UI designs and technical specifications, even though the team may not work on it for several Sprints.*
  * **Answer:** **DEEP**
  * **Why:** Violates **Detailed Appropriately**. Specifying low-priority work early creates waste if requirements change.
* **Situation D:** *A user story is so large that the Developers are not confident they can finish it during one Sprint.*
  * **Answer:** **INVEST**
  * **Why:** Violates **Small**. Stories must fit comfortably inside a single Sprint.
* **Situation E:** *New user research shows that customers are abandoning the checkout process because delivery costs are unclear.*
  * **Answer:** **DEEP**
  * **Why:** Reflects the **Emergent** characteristic. The backlog must evolve in response to new user data.

---

## Part 8: Trouble Cards (All 8 Cards Answered)

### Trouble Card 1: The Angry Customer
* **Backlog Item:** **Item #3** (*"app to be beautiful and easy to use"*)
* **INVEST Principle:** **Valuable** (and **Testable**)
* **What to change:** Remove the cosmetic focus. Replace with functional user value: *"As a customer, I want a simple, step-by-step order placement flow so that I can order food without friction."*

### Trouble Card 2: The Giant Story
* **Backlog Item:** **Item #4** (*"manage profile, menu, prices, hours, delivery areas, promotions, photos"* — 13 pts)
* **INVEST Principle:** **Small**
* **What to change:** Split vertically into 3 smaller independent stories:
  1. *Story 4A: As a restaurant owner, I want to edit my opening hours so that customers know when I am open.* (2 pts)
  2. *Story 4B: As a restaurant owner, I want to add and edit menu items and prices so that customers see my food.* (5 pts)
  3. *Story 4C: As a restaurant owner, I want to define my delivery radius so that I do not receive unreachable orders.* (3 pts)

### Trouble Card 3: The Mystery 13
* **Backlog Item:** **Item #2** (*"Complete checkout"* — 13 pts)
* **INVEST Principle:** **Estimable** / **Small**
* **What to change:** Refine and clarify before committing. Break into: *Enter delivery address*, *Select payment type*, and *Review order summary*.

### Trouble Card 4: Everything Is Urgent
* **Backlog Part:** Overall Backlog Ordering
* **DEEP Principle:** **Prioritized**
* **What to change:** Stack-rank the top items sequentially: 
  * #1: See restaurant details (5 pts)
  * #2: Place an order (8 pts)
  * #3: Pay by card (5 pts)
  * #4: Receive order confirmation (3 pts)

### Trouble Card 5: New Information
* **Backlog Part:** Product Backlog (Emergent addition)
* **DEEP Principle:** **Emergent**
* **What to change:** Add a new high-priority story: *"As a customer, I want to see the itemized delivery fee before checkout so that I know the total cost upfront."* (Estimate: 3 pts). Place it near the top of the backlog.

### Trouble Card 6: "We'll Know When It Looks Good"
* **Backlog Item:** **Item #3** (*"app to be beautiful and easy to use"*)
* **INVEST Principle:** **Testable**
* **What to change:** Add objective Acceptance Criteria (e.g., *Form fields show validation errors in red text below the input*, *Contrast ratio meets WCAG AA 4.5:1*, *Checkout requires fewer than 4 screen taps*).

### Trouble Card 7: The Dependency
* **Backlog Item:** **Item #5** (*Pay by card* — 5 pts) blocking **Item #8** (*Place an order* — 8 pts)
* **INVEST Principle:** **Independent**
* **What to change:** Decouple the stories. Implement a basic payment method first (e.g., "Cash on Delivery" or mock payment) so the team can build and test *Place an Order* independently.

### Trouble Card 8: Too Much Too Soon
* **Backlog Item:** **Item #9** (*Research dark mode*) or **Item #10** (*Cancel an order*)
* **DEEP Principle:** **Detailed Appropriately**
* **What to change:** Remove the multi-page specifications and high-fidelity mockups. Keep only a 1-sentence user story until the item reaches the top of the backlog.

---

## Part 9: The Backlog Rescue Table (Filled Out)

| Problem | DEEP / INVEST | Why is it a problem? | What did we change? |
| :--- | :--- | :--- | :--- |
| **1 (Item #3)** | **INVEST (Valuable/Testable)** | Subjective aesthetic request; no measurable acceptance criteria. | Added concrete usability acceptance criteria (e.g., WCAG AA contrast, <4 taps to order). |
| **2 (Item #4)** | **INVEST (Small)** | Bundles 7 complex administrative features into one 13-point epic. | Split into 3 independent stories: Update Hours (2 pts), Manage Menu (5 pts), Set Delivery Area (3 pts). |
| **3 (Backlog)** | **DEEP (Prioritized)** | Multiple items marked "High" priority; no sequential order for developers to pull. | Stack-ranked the backlog into a single 1-to-10 order based on the user journey. |
| **4 (New Info)** | **DEEP (Emergent)** | Users abandon orders due to hidden delivery costs. | Created a new 3-point story (*Display delivery fee in cart*) and moved it to the top. |
| **5 (Item #2)** | **INVEST (Estimable/Small)** | 13-point story is a black box; developers cannot understand what checkout contains. | Decomposed checkout into clear, bounded sub-stories before Sprint commitment. |

---

## Part 10: Final Challenge (Sprint 2 Selection & Verification)

### Step 1: Select Sprint 2 Items (Capacity: 15 Points)

| Backlog Item | Story Points | Why did we choose it? |
| :--- | :---: | :--- |
| **Item #1:** See restaurant details | 5 | Core discovery feature needed so users can browse food menus. |
| **New Item (from Card 5):** View delivery fee in cart | 3 | Directly solves user checkout drop-offs identified in Sprint 1 research. |
| **Item #8 (Refined):** Place basic order (with Cash/Simple flow) | 5 | Enables the core transaction without blocking on complex card integrations. |
| **Total:** | **13 / 15 points** | Leaves a 2-point safety margin for uncertainty and testing. |

---

### Step 2: Test Your Selected Stories Against INVEST

#### Story A: *See restaurant details* (5 pts)
* **I - Independent:** **Yes** — Users can view restaurant info without completing payment.
* **N - Negotiable:** **Yes** — Specific layout and fields can be discussed during development.
* **V - Valuable:** **Yes** — Informs the customer where to order.
* **E - Estimable:** **Yes** — Standard data display scoped at 5 points.
* **S - Small:** **Yes** — 5 points fits easily in a 15-point sprint.
* **T - Testable:** **Yes** — Can verify whether menu, address, and hours render accurately.

#### Story B: *View delivery fee in cart* (3 pts)
* **I - Independent:** **Yes** — Hooks into the cart summary without depending on external card gateways.
* **N - Negotiable:** **Yes** — The UI display of the fee breakdown is open to refinement.
* **V - Valuable:** **Yes** — Directly prevents user drop-offs by providing price transparency.
* **E - Estimable:** **Yes** — Simple fee calculation and display (3 points).
* **S - Small:** **Yes** — Very small, well-bounded scope.
* **T - Testable:** **Yes** — Can verify that calculated fees match designated delivery zones.

#### Story C: *Place basic order* (5 pts)
* **I - Independent:** **Yes** — Decoupled from card gateway dependencies by using Cash on Delivery.
* **N - Negotiable:** **Yes** — The exact order summary format can be refined with the PO.
* **V - Valuable:** **Yes** — Completes the primary conversion goal of the product.
* **E - Estimable:** **Yes** — Scoped down from 8 points to 5 points by isolating payment complexity.
* **S - Small:** **Yes** — 5 points fits within our 15-point budget.
* **T - Testable:** **Yes** — Can verify order record persistence and status updates in database.

---

### Step 3: Zoom Out: Is Our Product Backlog DEEP?

* **D - Detailed appropriately:**
  * *Answer:* **Yes.** The top items (#1, New Delivery Fee Story, Refined #8) have explicit acceptance criteria and point estimates. Long-term items (e.g., #9 Dark Mode, #10 Cancel Order) remain high-level summaries without bloated specs.
* **E - Estimated:**
  * *Answer:* **Yes.** The unestimated `?` on Item #3 was resolved, the vague 13-point items were split, and all top items have relative story points (5, 3, 5).
* **E - Emergent:**
  * *Answer:* **Yes.** We adapted the backlog based on user research by inserting the new *Delivery Fee* story into the top tier.
* **P - Prioritized:**
  * *Answer:* **Yes.** The backlog is ordered sequentially:
    1. *Item #1:* See restaurant details (5 pts)
    2. *New Item:* Display delivery fees in cart (3 pts)
    3. *Item #8 (Refined):* Place basic order (5 pts)

---

## Part 12: The Final Decision (Presentation Template)

> **"We would take these items into Sprint 2 because they deliver an end-to-end purchasing experience while immediately resolving the drop-off issue discovered in user research."**

* **1. Our Sprint Goal:**
  > *"Allow customers to view restaurant details, see transparent order pricing, and successfully place a basic food order."*
* **2. Our Selected Stories:**
  > 1. *As a customer, I want to see restaurant details so that I can decide where to order (5 pts).*  
  > 2. *As a customer, I want to see delivery fees in my cart so that pricing is transparent (3 pts).*  
  > 3. *As a customer, I want to place a food order using basic checkout so that I can complete my purchase (5 pts).*
* **3. Our Strongest INVEST Decision:**
  > *"Splitting Item #8 (Place an order) away from Item #5 (Pay by card) to make it **Independent**, allowing us to ship a working ordering increment in Sprint 2 without getting blocked by third-party payment gateways."*
* **4. Our Strongest DEEP Decision:**
  > *"Demonstrating **Emergent** backlog management by creating a new 3-point delivery fee story in direct response to user research and prioritizing it immediately."*
* **5. The Biggest Change We Made to the Backlog:**
  > *"Deconstructing the two oversized 13-point epics (Items #2 and #4) into smaller, estimable, vertical slices of user value."*

---

## Final Discussion Questions

1. **What makes a Product Backlog DEEP?**
   * It is Detailed appropriately (just-in-time), Estimated (relative points on near-term items), Emergent (changes with new information), and Prioritized (stack-ranked in 1-2-3 sequence).
2. **What makes an individual backlog item INVEST?**
   * It is Independent (minimal coupling), Negotiable (not a rigid contract), Valuable (delivers user outcome), Estimable (clear scope), Small (fits in one sprint), and Testable (has objective acceptance criteria).
3. **Can a story be INVEST but still not belong in Sprint 2?**
   * **Yes.** A story may be perfectly written (INVEST), but if its priority is low, or it does not align with the current Sprint Goal, or it exceeds team capacity, it stays in the Product Backlog.
4. **What happens to a Product Backlog after every Sprint?**
   * It evolves (Emergent). Completed items are removed, new feedback and technical learnings are incorporated, estimates are adjusted, and priorities are re-ranked for the next planning session.
5. **Why shouldn't we make every item in the Product Backlog highly detailed?**
   * Over-specifying items at the bottom of the backlog is wasteful (Lean). Requirements and market conditions will change before the team ever works on those items.
6. **What is the difference between "This story is good" and "This story is ready for our Sprint"?**
   * *"This story is good"* means it meets the INVEST quality criteria. *"This story is ready for our Sprint"* means it is INVEST **plus** it is at the top of the DEEP backlog, aligns directly with the Sprint Goal, and fits within the team's available sprint capacity.