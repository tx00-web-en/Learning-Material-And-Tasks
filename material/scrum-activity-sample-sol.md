# Sample Answers — Scrum Activity: Sprint 2 Backlog Rescue

> **Facilitator note:** These are sample answers, not the only correct answers. Teams may propose different solutions if they can explain and defend their reasoning.

---

# Part 3: Initial Backlog Inspection Questions

## Which items immediately look suspicious?

### Item #3 — "As a customer, I want the app to be beautiful and easy to use."

**Why suspicious:**

* "Beautiful" is subjective.
* "Easy to use" is vague and needs clarification.
* The value is not expressed clearly enough.
* It is not estimated.
* It is difficult to test objectively in its current form.

This item potentially has problems with **Valuable, Estimable, and Testable**.

However, **usability itself can absolutely be valuable**. The problem is not that usability has no value; the problem is that this particular backlog item does not express or bound that value clearly enough.

---

### Item #4 — "As a restaurant owner, I want to manage my restaurant profile, menu, prices, opening hours, delivery areas, promotions, and photos."

**Why suspicious:**

* It contains many different capabilities.
* It is 13 points.
* It may be too large to be a single Sprint-sized backlog item.
* It may be difficult to estimate accurately because the scope is broad.

This is primarily an **INVEST — Small** problem, and potentially an **Estimable** problem.

---

### Item #6 — "Improve database performance."

**Why suspicious:**

* It is written as a technical task rather than from a user/stakeholder perspective.
* The desired outcome is unclear.
* "Improve" is not measurable without defining what improvement means.
* Its value is not obvious from the backlog item itself.

Important: **technical work is not automatically invalid in a Product Backlog.** A Product Backlog can contain technical work, research, defects, and other types of work. The problem is that this item currently lacks enough clarity about the outcome and how it will be evaluated.

Potential problems include **Valuable, Estimable, and Testable**.

---

### Item #9 — "Research whether customers prefer dark mode."

**Why suspicious:**

* It is a research item rather than a conventional feature.
* It may be useful, but its outcome is uncertain.
* Its value depends on what decision the research will inform.

It is therefore not automatically a bad Product Backlog item.

It could be improved by clarifying the question and the decision it will support.

For example:

> "Research whether customers prefer dark mode so that the Product Owner can decide whether dark mode should be added to the product."

---

## Are any items too large?

Likely yes.

### Item #2 — "Complete checkout." — 13 points

The phrase "complete checkout" may represent several different capabilities, such as:

* delivery information
* order review
* payment
* confirmation

The problem is not simply that **13 points = automatically too large**.

The real issue is that the team does not know what the 13 points contain.

### Item #4 — Restaurant management — 13 points

This item clearly bundles multiple capabilities:

* restaurant profile
* menu
* prices
* opening hours
* delivery areas
* promotions
* photos

It is a strong candidate for splitting.

---

## Are any items unclear?

Yes.

### Item #2

> "As a customer, I want to complete checkout."

What does checkout include?

The team needs to understand the boundaries of the item before confidently estimating it.

### Item #3

> "As a customer, I want the app to be beautiful and easy to use."

What does "beautiful" mean?

What does "easy to use" mean?

How would the team know when it is complete?

### Item #6

> "Improve database performance."

What performance problem exists?

What does "improve" mean?

How will improvement be measured?

---

## Are all items valuable?

**Not necessarily clear from the backlog.**

Avoid saying that Item #3 has "no value." Usability can clearly have customer value.

The better answer is:

> The value of several items is not sufficiently clear or specific.

Examples:

* Item #3 does not clearly describe the user outcome.
* Item #6 does not explain the stakeholder/customer outcome of the performance improvement.
* Item #9 does not explain what decision the research will enable.

---

## Are all items estimable?

**No / not confidently.**

Item #3 has no estimate.

Item #2 is estimated at 13 points, but the team cannot clearly explain what the 13 points include.

That makes the estimate questionable.

The lesson is:

> **Having a number beside an item does not automatically mean the item is estimable.**

---

## Are all items testable?

**No.**

Item #3 is the clearest example.

"Beautiful and easy to use" does not give the team enough information to determine whether the item has been successfully completed.

Item #6 may also be difficult to test unless "improve database performance" is given measurable boundaries.

---

## Does the priority order make sense?

**Not necessarily.**

Several items are simply marked **High**, rather than being meaningfully ordered.

For example:

* #2 Checkout — High
* #5 Pay by card — High
* #8 Place an order — High

The team needs to discuss how these items relate to the product goal and to one another.

However, there is an important complication:

**Sprint 1 already had the goal of allowing a customer to discover a restaurant and add a meal to a cart.**

Therefore, Item #1 may already be substantially addressed by Sprint 1.

The team should ask:

> Is Item #1 actually remaining work, or was this already delivered in Sprint 1?

That is an important observation missing from the original sample answer.

Also, the exact order of #1 → #8 → #5 → #7 is **not automatically the only correct order**. Teams should justify their ordering based on value, dependencies, risk, learning, and the Sprint/Product Goal.

---

## Is everything equally detailed?

**No.**

Item #4 contains seven different capabilities.

Item #8 is only:

> "As a customer, I want to place an order."

Item #3 is vague.

Item #2 is short but potentially very broad.

This demonstrates why backlog items do not all need the same amount of detail. Items closer to selection generally need more refinement than items that may be worked on much later. The Scrum Guide describes refinement as ongoing work that adds detail, order, and size as appropriate.

---

## Are there things that might change as we learn more?

**Yes.**

The Product Backlog is emergent.

Examples:

* #9 Dark mode could change depending on research.
* #10 Cancel an order could change in priority depending on customer needs.
* New information about delivery costs may create a new backlog item.
* Estimates may change as the team learns more.
* Priorities may change based on user feedback.

The key lesson is:

> **The Product Backlog is expected to evolve.**

---

# Part 4: DEEP or INVEST? — Warm-up

## Situation A

> Everything in the Product Backlog is marked **HIGH priority**.

### Answer: **DEEP**

### Why?

This primarily concerns **P — Prioritized**.

The backlog is not meaningfully ordered if everything is treated as equally urgent.

However, avoid teaching students that Scrum requires a strict numerical ranking such as 1, 2, 3, 4, 5.

A better formulation is:

> The Product Backlog should be meaningfully ordered so that the most important items are clear relative to the others.

---

# Situation B

> A user story says: "As a customer, I want a great experience."

### Answer: **INVEST**

Potential problems include:

* **V — Valuable:** The customer outcome is vague.
* **E — Estimable:** The scope is unclear.
* **T — Testable:** "Great experience" is not objectively defined.

It may also raise a **Small** concern because the scope could be enormous.

The strongest answer is therefore:

> **INVEST — especially Valuable, Estimable, and Testable.**

---

# Situation C

> A low-priority backlog item has extremely detailed requirements, UI designs and technical specifications, even though the team may not work on it for several Sprints.

### Answer: **DEEP**

### Why?

This concerns:

> **D — Detailed appropriately**

The issue is not that detail is bad.

The issue is **too much detail too early**.

The team should refine items when the additional detail is useful for upcoming decisions.

---

# Situation D

> A user story is so large that the Developers are not confident they can finish it during one Sprint.

### Answer: **INVEST**

### Why?

Primarily:

> **S — Small**

The story should probably be split or otherwise reduced in scope.

It may also become easier to estimate after splitting, so **Estimable** can also be discussed.

Important correction:

> INVEST does not mean every story must be "comfortable" or tiny. The point is that the item should be small enough to be usefully planned and worked with the team's context.

---

# Situation E

> New user research shows that customers are abandoning the checkout process because delivery costs are unclear.

### Answer: **DEEP**

### Why?

Primarily:

> **E — Emergent**

The Product Backlog should adapt to new information.

Possible responses include:

* adding a new item
* changing an existing item
* changing priority
* splitting an item
* clarifying an item

There is not necessarily one correct solution.

---

# Part 8: Trouble Cards — Facilitator Answer Key

## Important facilitator note about the Trouble Cards

The cards should **not** be treated as having only one possible answer.

A team receives credit when it:

1. identifies a reasonable problem,
2. connects it to DEEP or INVEST,
3. proposes a reasonable change,
4. explains why the change improves the backlog.

---

# Trouble Card 1: The Angry Customer

### Likely backlog item

**Item #3 — "As a customer, I want the app to be beautiful and easy to use."**

### Likely INVEST principles

Primarily:

* **V — Valuable**
* **T — Testable**

Possibly **E — Estimable** as well.

### Why?

The statement emphasizes "beautiful" and "easy to use" without clearly defining the customer outcome.

### Possible improvement

Instead of simply:

> "Make the app beautiful and easy to use."

The team could identify a concrete customer outcome, such as:

> "As a customer, I want to complete the ordering process easily so that I can place an order without unnecessary confusion."

The team should then define appropriate acceptance criteria or other evidence of usability.

**Important:** The team does not have to remove usability. The goal is to make the value clearer and the outcome testable.

---

# Trouble Card 2: The Giant Story

### Likely backlog item

**Item #4 — Restaurant management.**

### INVEST principle

**S — Small**

Possibly **E — Estimable** as well.

### Why?

The item combines multiple capabilities:

* profile
* menu
* prices
* opening hours
* delivery areas
* promotions
* photos

### Possible solution

Split the item into smaller vertical slices.

For example:

1. Manage restaurant opening hours.
2. Manage menu items and prices.
3. Manage delivery area.
4. Manage restaurant profile.
5. Manage restaurant photos.
6. Manage promotions.

The exact number of stories is not important.

The team should explain why the split creates smaller, understandable pieces of value.

**Do not require the exact 2/5/3 estimates from the original answer.**

Those numbers are invented unless the team actually estimates them.

---

# Trouble Card 3: The Mystery 13

### Likely backlog item

**Item #2 — Complete checkout.**

### INVEST principles

Primarily:

* **E — Estimable**
* **S — Small**

Potentially **T — Testable** and **N — Negotiable** depending on what the team discovers.

### Why?

The team has assigned 13 points without being able to explain the scope.

The problem is not simply:

> "13 points is too high."

The problem is:

> **The team does not understand what it is estimating.**

### What should happen?

The team should refine the item.

Possible outcomes:

* clarify the scope,
* identify acceptance criteria,
* identify dependencies,
* split the item into smaller items,
* then re-estimate the resulting items.

Possible smaller items might include:

* enter delivery information,
* review order,
* select payment method,
* confirm order.

But these are examples, not mandatory answers.

---

# Trouble Card 4: Everything Is Urgent

### DEEP principle

**P — Prioritized**

### Why?

Everything cannot meaningfully be "urgent."

The Product Owner/team needs to make trade-offs.

### Possible solution

Create a meaningful order based on factors such as:

* customer value,
* product goal,
* user research,
* dependencies,
* risk,
* learning,
* technical considerations.

One reasonable ordering might put core ordering functionality near the top.

However:

> **There is no single mandatory ordering.**

A team should receive credit if it proposes a different order and gives a convincing rationale.

---

# Trouble Card 5: New Information

### DEEP principle

**E — Emergent**

### Why?

New customer research has changed what the team knows.

The backlog should adapt.

### Possible solution

Create or modify a backlog item around delivery-cost transparency.

For example:

> "As a customer, I want to see the delivery cost before confirming my order so that I know the total cost before purchasing."

Then consider its priority and estimate.

### Important correction

Do **not** require:

> "3 points"

as the correct answer.

The team should estimate it themselves.

The important learning objective is:

> **New information can change the Product Backlog.**

---

# Trouble Card 6: "We'll Know When It Looks Good"

### Likely item

**Item #3** is a natural candidate.

However, because Trouble Card 1 also naturally targets Item #3, this creates an overlap.

### INVEST principle

**T — Testable**

### Possible solution

Rewrite the item and/or add appropriate acceptance criteria.

For example, instead of:

> "The app should look good."

the team might define observable usability or design outcomes.

Possible criteria could include:

* required fields display clear validation feedback,
* users can identify the total order cost before confirmation,
* usability testing demonstrates that target users can complete the intended flow.

### Important correction

The original answer gave specific criteria such as:

> WCAG AA 4.5:1
> fewer than 4 screen taps

Those are **possible examples**, but they should not automatically be treated as the correct criteria.

Also, "fewer than 4 taps" may be an arbitrary metric unless the team has evidence supporting it.

---

# Trouble Card 7: The Dependency

### INVEST principle

**I — Independent**

### Important issue

The original answer assumes:

> Item #5 "Pay by card" blocks Item #8 "Place an order."

But the original backlog **does not explicitly establish that dependency**.

Therefore, this should not be presented as the only correct answer.

### Better facilitator answer

Ask:

> Which stories appear to have a dependency, and is that dependency necessary?

The team should inspect the relevant stories and determine whether they can be changed or split to reduce the dependency.

Possible solution:

> Separate the core order placement capability from a specific payment method, if that makes sense for the product.

For example, the team might first enable an order flow with an already-supported payment method and add card payment separately.

But:

> **This is one possible solution, not a predetermined correct answer.**

---

# Trouble Card 8: Too Much Too Soon

## Important problem with the original activity

This card says:

> "You discover that a low-priority item has detailed UI designs, detailed technical specifications, many acceptance criteria, and several pages of documentation."

But **none of the original 10 backlog items says that this has happened.**

Therefore, the students cannot discover this information from the initial backlog.

### Correct facilitator approach

Treat the Trouble Card itself as introducing new information.

It is not necessary to identify Item #9 or #10.

The card is introducing a new fact:

> A low-priority item has been over-refined.

### DEEP principle

**D — Detailed appropriately**

### What should change?

The team should reduce unnecessary detail and keep enough information to preserve understanding.

The lesson is:

> **More detail is not always better.**

A backlog item that is far from implementation does not necessarily need the same level of detail as an item near the top.

---

# Part 9: Backlog Rescue — Sample Solution

There is no single correct five-row answer.

One reasonable solution is:

| Problem                       | DEEP / INVEST  | Why is it a problem?                                                     | What did we change?                                                     |
| ----------------------------- | -------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Item #3 is vague              | INVEST — V/T/E | "Beautiful and easy to use" does not clearly express value or completion | Clarified the customer outcome and added measurable/observable criteria |
| Item #4 is too large          | INVEST — S/E   | Several capabilities are bundled into one large item                     | Split into smaller backlog items                                        |
| Checkout is a mystery 13      | INVEST — E/S   | The team cannot explain what the estimate contains                       | Refined and/or split the checkout item                                  |
| Everything is high priority   | DEEP — P       | The backlog does not communicate meaningful ordering                     | Reordered items using value, risk, learning and dependencies            |
| New delivery-cost information | DEEP — E       | New evidence changes what the team knows                                 | Added or changed a backlog item and reconsidered its priority           |

Other combinations are acceptable.

---

# Part 10: Final Challenge — Sprint 2 Selection

## Important facilitator principle

There is **not one universally correct Sprint Backlog**.

The teams should select a coherent set of Product Backlog items that:

* supports a meaningful Sprint Goal,
* fits the 15-point exercise capacity,
* reflects the improved backlog,
* accounts for dependencies,
* addresses important customer value,
* can reasonably be completed.

The Scrum Guide describes the Sprint Backlog as the Sprint Goal, selected Product Backlog items, and the plan for delivering them. The Developers determine what can be done and create the plan for achieving the Sprint Goal.

---

## One possible Sprint 2 solution

For example:

| Backlog Item                  | Story Points | Why?                                     |
| ----------------------------- | -----------: | ---------------------------------------- |
| Delivery-cost transparency    |            3 | Direct response to new customer research |
| Refined order-placement story |            5 | Supports the core customer outcome       |
| Payment capability            |            5 | Could support completing the transaction |
| **Total**                     |  **13 / 15** | Leaves some capacity available           |

Another team might select a different combination.

That can still be correct if its reasoning is strong.

---

# Important Issue: Sprint 1 Continuity

The original sample answer selected:

> Item #1 — See restaurant details

But Sprint 1's stated goal was:

> "Allow a customer to discover a restaurant and add a meal to a cart."

Therefore, the facilitator should ask:

> **Was Item #1 already completed during Sprint 1?**

If yes, it should **not automatically be selected again**.

If Item #1 was only partially completed, the team should explain what remains.

This is an important consistency check that was missing from the original sample answer.

---

# Step 2: Test Selected Stories Against INVEST

The answers should be based on the **team's final version** of each story.

Do not assume that a story is automatically "Yes" simply because the team selected it.

For example:

## I — Independent

Ask:

> Can we develop this without being blocked by another backlog item?

A dependency does not automatically make a story invalid, but unnecessary dependencies should be reduced where possible.

---

## N — Negotiable

Ask:

> Is this an invitation to collaborate, rather than a fixed technical specification?

The story should leave room for discussion about the best solution.

---

## V — Valuable

Ask:

> Who benefits, and what outcome does this create?

The value should be understandable.

---

## E — Estimable

Ask:

> Does the team understand enough about the item to give it a useful estimate?

A number alone is not proof of estimability.

---

## S — Small

Ask:

> Is this item small enough for the team to plan and complete within the Sprint?

A 5-point story is not automatically "small," and a 13-point story is not automatically "too large."

The team should consider its own context and confidence.

---

## T — Testable

Ask:

> Can the team determine whether the desired outcome has been achieved?

Acceptance criteria can help, but the key issue is whether there is a clear way to determine completion.

---

# Step 3: Zoom Out — Is Our Product Backlog DEEP?

## D — Detailed appropriately

### Sample answer

Yes, if the backlog has more refinement near the top and less unnecessary detail further down.

The important phrase is:

> **Detailed appropriately**

Not:

> "Everything is highly detailed."

---

## E — Estimated

### Sample answer

The relevant items should have useful estimates.

Items that are still unclear may need refinement before a meaningful estimate can be made.

Also remember:

> **An estimate is not automatically valid simply because a number has been written beside the item.**

---

## E — Emergent

### Sample answer

Yes.

The backlog changed after new customer research showed that delivery-cost transparency was affecting customer behavior.

The team responded by reconsidering the backlog.

That demonstrates the emergent nature of the Product Backlog.

---

## P — Prioritized

### Sample answer

The backlog should have a meaningful order that communicates what matters most relative to the rest.

A numerical 1–10 ranking can be used as an exercise technique, but it is not necessary to claim that Scrum requires every backlog item to have a numerical rank.

The team should be able to explain:

> Why is this item above that item?

---

# Part 12: The Final Decision — Sample Presentation

> **"We would take these items into Sprint 2 because they support our Sprint Goal, address important customer information, and fit within our available capacity."**

## 1. Our Sprint Goal

> **"Enable customers to understand the total cost of their order and complete a basic food-ordering flow."**

## 2. Our selected stories

Possible examples:

1. Delivery-cost transparency — 3 points
2. Refined order-placement story — 5 points
3. Payment capability — 5 points

**Total: 13 / 15 points**

---

## 3. Our strongest INVEST decision

> **"We split a large or unclear story into smaller pieces that the team could understand, estimate, and test."**

---

## 4. Our strongest DEEP decision

> **"We changed the Product Backlog in response to new customer research instead of treating the original backlog as fixed."**

---

## 5. The biggest change we made to the backlog

> **"We reduced oversized and unclear items into smaller, more understandable backlog items and reconsidered their priority based on new information."**

---

# Scoring — Facilitator Interpretation

| Category                                 | Points | What Strong Performance Looks Like                                     |
| ---------------------------------------- | -----: | ---------------------------------------------------------------------- |
| Found genuine DEEP problems              |      5 | Correctly identifies backlog-level issues and explains why             |
| Found genuine INVEST problems            |      5 | Correctly identifies story-level issues and explains why               |
| Improved backlog items effectively       |      5 | Makes practical, defensible improvements                               |
| Made reasonable prioritization decisions |      5 | Makes meaningful trade-offs and explains them                          |
| Defended decisions during the challenge  |      5 | Gives evidence-based reasoning rather than simply saying "we think so" |
| Made a convincing Sprint 2 selection     |      5 | Creates a coherent Sprint Goal and selects work that supports it       |
| **Total**                                | **30** |                                                                        |

---

# Final Discussion Questions

## 1. What makes a Product Backlog DEEP?

A healthy Product Backlog is:

* **D — Detailed appropriately**
* **E — Estimated**
* **E — Emergent**
* **P — Prioritized**

The key idea is that the backlog contains the **right amount of information at the right time**.

---

## 2. What makes an individual backlog item INVEST?

A strong backlog item is:

* **I — Independent**
* **N — Negotiable**
* **V — Valuable**
* **E — Estimable**
* **S — Small**
* **T — Testable**

These are qualities used to evaluate and improve user stories. INVEST is not itself a Scrum requirement.

---

## 3. Can a story be INVEST but still not belong in Sprint 2?

### Yes.

A story can be well-written and satisfy INVEST but still not be selected because:

* another item has greater value,
* it does not support the Sprint Goal,
* the team has limited capacity,
* another item is more important,
* new information has changed the priority,
* dependencies or risk make another choice more valuable.

This is one of the most important lessons in the activity:

> **Good story ≠ automatically selected story.**

---

## 4. What happens to a Product Backlog after every Sprint?

It evolves.

The team learns from:

* customers,
* stakeholders,
* the Increment,
* technical discoveries,
* estimates,
* market conditions,
* Sprint Reviews.

New information can result in:

* new items,
* changed items,
* removed items,
* changed estimates,
* changed ordering.

The Scrum Guide explicitly describes the Product Backlog as an **emergent, ordered list** and says refinement is ongoing.

---

## 5. Why shouldn't we make every item in the Product Backlog highly detailed?

Because detail should be added **when it is useful**.

If an item is far from implementation, spending large amounts of time specifying every detail may create waste because:

* priorities may change,
* customer needs may change,
* the product may change,
* technical understanding may change.

Therefore:

> **More detail is not automatically better.**

The goal is **appropriate detail**, not maximum detail.

---

## 6. What is the difference between:

> **"This story is good."**

and

> **"This story is ready for our Sprint."**

### "This story is good."

Means:

> The story has useful qualities such as being valuable, understandable, estimable, small enough, negotiable, independent enough, and testable.

### "This story is ready for our Sprint."

Means:

> The team understands the item well enough to consider selecting it, it is sufficiently refined for the context, and it makes sense to select it as part of the Sprint Goal and available capacity.

Important:

**Do not teach "INVEST + DEEP = Definition of Ready."**

That would be too strong.

Scrum does not prescribe a formal Definition of Ready. The Scrum Guide says Product Backlog items that can be Done within one Sprint are deemed ready for selection, and that refinement is ongoing.

---

# Key Facilitator Corrections to the Original Sample Answer

The original sample solution is **good as a starting point**, but I would make these corrections before giving it to students:

### 1. Do not say Item #3 has "no value."

Better:

> Its value is unclear or poorly expressed.

Usability can absolutely create customer value.

### 2. Do not say 13 points automatically means "too large."

The issue is whether the item is sufficiently understood and small enough for useful planning.

### 3. Do not require exact story-point estimates.

The proposed **2, 5, 3** estimates are examples, not objectively correct answers.

### 4. Do not require a single exact backlog order.

The important skill is **prioritization and justification**, not reproducing one teacher-created sequence.

### 5. Do not assume #5 blocks #8.

The original backlog does not explicitly establish that dependency.

Let students discover and reason about it.

### 6. Do not automatically select Item #1 for Sprint 2.

Sprint 1's goal may already have delivered this capability.

Ask students to inspect what was actually completed.

### 7. Fix Trouble Card 8.

The original backlog does not contain the detailed documentation described in Card 8.

Treat the card as introducing **new information**, or modify the original backlog so that one item visibly has excessive detail.

### 8. Cards 1 and 6 overlap.

Both naturally point toward Item #3.

That is acceptable only if students distinguish the problems:

* Card 1 → **Value**
* Card 6 → **Testability**

But because the game says not to solve two cards targeting the exact same issue, the facilitator should clarify that **the cards can target the same item but must represent genuinely different problems**, or change one of the cards.

### 9. Card 7 needs more information.

The card says:

> "We cannot finish Story B until Story A is completely finished."

But it does not identify A and B.

That is actually potentially useful as a reasoning exercise, but the answer should not prescribe #5 and #8 unless the card is changed to explicitly identify them.

### 10. The Sprint 2 solution should be presented as an example, not "the answer."

The strongest learning outcome is that teams can defend different reasonable Sprint decisions.

---

# Overall Assessment

**Your original sample solution: ~8/10.**

The Scrum/INVEST concepts are mostly correct.

The main weaknesses are **over-prescription and a few inconsistencies in the activity itself**, rather than misunderstanding Scrum.

The most important improvements are:

> **Don't confuse "13 points" with "too large."**

> **Don't confuse "INVEST" with "ready for Sprint."**

> **Don't assume dependencies that the scenario hasn't established.**

> **Don't require one exact backlog ordering.**

> **Don't treat technical/research backlog items as automatically invalid.**

> **Fix Trouble Card 8 because its evidence isn't present in the initial backlog.**

> **Account for the fact that Sprint 1 may already have delivered Item #1.**

With those changes, the exercise becomes much stronger because students are not simply trying to guess the teacher's predetermined answer. They are practicing the actual Scrum skill the activity is designed to teach: **inspect, adapt, make trade-offs, and defend the decision.**
