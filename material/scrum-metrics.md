# Scrum Metrics

## Theory, Examples, Counterexamples, and Anti-Patterns

### Learning objectives

After studying this material, you should be able to:

* Explain what Scrum metrics are and why they are used.
* Distinguish between delivery, flow, quality, outcome, and team health metrics.
* Calculate and interpret basic Scrum metrics.
* Select an appropriate metric for a specific situation.
* Identify the limitations of metrics.
* Recognize common metric anti-patterns.
* Use metrics to support inspection, adaptation, and continuous improvement.

---

# 1. What are Scrum metrics?

A Scrum metric is a measurement used to understand some aspect of a Scrum Team's work, delivery, quality, or outcomes.

Metrics help make work visible and support evidence-based decisions.

For example, a team might want to understand:

* How much work is being completed?
* Is the team likely to achieve the Sprint Goal?
* How long does it take to finish a work item?
* Are work items waiting too long?
* Are customers receiving useful product improvements?
* Is the product quality improving?
* Is the team able to work sustainably?

A metric is not a decision by itself. It is information that can support a decision.

## 1.1 Why use Scrum metrics?

Scrum is based on empirical process control. The three pillars are:

1. **Transparency** — Work and progress are visible.
2. **Inspection** — Progress and results are examined.
3. **Adaptation** — The approach is adjusted when necessary.

Metrics can support all three pillars.

### Example

A team notices that many work items remain unfinished at the end of each Sprint.

A metric showing completed work can make the problem visible. A flow metric might help identify delays. The team can then discuss how to improve the way work is selected, started, and completed.

### Counterexample

A team sees that its velocity has decreased from 30 to 20 story points.

The team immediately concludes:

> "We are performing badly. Everyone needs to work faster."

This conclusion may be wrong. The decrease could be related to reduced capacity, smaller stories, a change in estimation, technical work, or other circumstances.

### Anti-pattern: Metrics as judgment

Using a metric to judge a team without understanding the context.

**Why it is harmful:** It encourages people to optimize the number instead of improving the product or the process.

---

# 2. Main categories of Scrum metrics

Scrum metrics can be organized into five broad categories.

| Category           | Main question                                   |
| ------------------ | ----------------------------------------------- |
| Delivery           | How much work is being delivered?               |
| Flow               | How smoothly does work move through the system? |
| Quality            | How reliable and usable is the product?         |
| Outcomes and value | Are we delivering something useful?             |
| Team health        | Can the team work effectively and sustainably?  |

A single metric rarely provides a complete picture.

For example, completed story points may increase while customer satisfaction decreases. A team may deliver more work but create more bugs.

A useful set of metrics should help understand several relevant aspects of the situation.

---

# 3. Velocity

## 3.1 Definition

**Velocity** is the amount of estimated work a Scrum Team completes during a Sprint, often expressed in story points.

It is commonly calculated by adding the story points of the completed work that meets the team's Definition of Done.

### Formula

$$
\text{Velocity} =
\text{Total completed story points}
$$

If a Sprint contains three completed stories worth 5, 8, and 3 points:

$$
5+8+3=16
$$

The Sprint velocity is **16 story points**.

Velocity is team-specific. Story points are estimates created by a particular team, so velocity is not a universal unit of productivity.

## 3.2 Main use cases

### Use case A: Forecasting future work

Velocity can help estimate how much work a team might complete in upcoming Sprints.

#### Example

A team has completed the following story points:

| Sprint | Velocity |
| ------ | -------: |
| 1      |       18 |
| 2      |       20 |
| 3      |       22 |
| 4      |       20 |

Average velocity:

$$
\frac{18+20+22+20}{4}=20
$$

If 40 story points remain, a rough forecast based on this average is:

$$
\frac{40}{20}=2
$$

Approximately two Sprints may be needed.

This is a forecast, not a guarantee.

#### Counterexample

A team completed 20 points in the last Sprint. It is assumed that the team will complete exactly 20 points in every future Sprint.

This ignores:

* Changes in team capacity.
* Different types of work.
* Uncertainty.
* Technical problems.
* Dependencies.
* Changes in scope.

#### Anti-pattern

**Treating velocity as a target.**

> "The team must increase velocity from 20 to 30 next Sprint."

This may encourage inflated estimates, splitting stories artificially, or selecting easy work instead of valuable work.

---

### Use case B: Inspecting changes in delivery

Velocity trends can help a team notice changes in completed estimated work.

#### Example

A team has the following results:

| Sprint | Velocity |
| ------ | -------: |
| 1      |       24 |
| 2      |       25 |
| 3      |       23 |
| 4      |       24 |

The velocity is relatively stable.

The team can use this information when discussing future planning.

#### Counterexample

A team's velocity falls from 30 to 20. Management concludes that the team has become less productive.

However, the team had one developer absent and spent time fixing critical bugs.

The velocity alone does not establish the reason for the change.

#### Anti-pattern

**Comparing the velocity of different teams.**

Team A has velocity 20. Team B has velocity 50.

It does not follow that Team B is more productive. The teams may use different story-point scales, work on different products, or estimate differently.

---

### Use case C: Understanding the effect of changes in capacity

Velocity can be interpreted alongside information about team capacity.

#### Example

A team normally completes approximately 20 points per Sprint. During one Sprint, two developers are unavailable and the team completes 12 points.

The lower result may be consistent with the reduced capacity.

#### Counterexample

A team completes 12 points in a Sprint with the same capacity as usual. It is concluded that the team is less capable.

Other explanations might include larger technical tasks, work waiting for review, or a change in estimation.

#### Anti-pattern

**Using velocity to measure individual performance.**

> "Developer A completed 10 points. Developer B completed 3 points. Developer A is better."

Story points belong to the team's estimation system and do not provide a valid measure of individual contribution.

---

## 3.3 Limitations of velocity

Velocity does not directly measure:

* Customer satisfaction.
* Business value.
* Product quality.
* Individual productivity.
* Whether the Sprint Goal was achieved.
* Whether the team worked sustainably.

### Key takeaway

Velocity can support forecasting and inspection of delivery trends. It should not be used as a universal measure of productivity or as a target to maximize.

---

# 4. Sprint burndown

## 4.1 Definition

A Sprint burndown chart shows how much work remains during a Sprint.

The horizontal axis usually represents time. The vertical axis represents remaining work, such as story points or tasks.

The chart helps visualize whether the amount of remaining work is changing during the Sprint.

## 4.2 Main use cases

### Use case A: Inspecting progress toward Sprint completion

#### Example

A team begins a Sprint with 30 story points.

| Day | Remaining points |
| --- | ---------------: |
| 1   |               30 |
| 3   |               26 |
| 5   |               20 |
| 7   |               12 |
| 9   |                4 |
| 10  |                0 |

The burndown shows that the work was completed during the Sprint.

The team can inspect the progress and discuss whether its approach is working.

#### Counterexample

The burndown shows 0 points remaining, but the Sprint Goal was not achieved.

The team completed many low-priority tasks while the important feature was not delivered.

The burndown alone does not show whether the right outcome was achieved.

#### Anti-pattern

**Using the burndown as proof of product success.**

A chart showing all work completed does not automatically mean that customers received valuable functionality.

---

### Use case B: Identifying late completion or bottlenecks

#### Example

A team has 20 points remaining for most of the Sprint. During the last two days, all points are completed.

This pattern may indicate that work is being completed late, or that work items are not updated until the end.

The team should inspect what happened.

#### Counterexample

A burndown remains flat for several days because the team works on one large item. The item is completed near the end of the Sprint.

The flat line does not automatically prove that the team was inactive.

#### Anti-pattern

**Requiring a smooth, ideal burndown line.**

Real work is not always completed at a constant rate. A perfectly smooth chart can also be misleading if tasks are updated artificially.

---

### Use case C: Inspecting scope changes

#### Example

A Sprint begins with 30 points. During the Sprint, 10 additional points are added.

The chart may show the remaining work increasing even though the team has completed some work.

The team should inspect the effect of scope changes on the Sprint Goal.

#### Counterexample

A team sees an increase in remaining work and concludes that the developers are working too slowly.

However, the increase was caused by new work being added.

#### Anti-pattern

**Ignoring scope changes when interpreting the chart.**

A burndown should be understood together with the changes in Sprint scope and the team's actual work.

---

## 4.3 Limitations of burndown

A burndown does not directly show:

* Product quality.
* Customer value.
* The cause of delays.
* Individual contributions.
* Whether work is being completed in a useful order.

### Key takeaway

A burndown is a progress visualization. It is useful for inspection, but it does not explain every reason behind the progress pattern.

---

# 5. Sprint Goal completion

## 5.1 Definition

The Sprint Goal is a single objective for the Sprint. It provides a purpose and helps the Scrum Team focus on a meaningful outcome.

Sprint Goal completion is an assessment of whether the Sprint Goal was achieved.

It is not simply a count of completed story points.

## 5.2 Main use cases

### Use case A: Evaluating whether the Sprint achieved its purpose

#### Example

Sprint Goal:

> "Allow students to search for and view their course schedules."

The team completes the work necessary to make course search and schedule viewing available.

The Sprint Goal is achieved.

#### Counterexample

The team completes 40 story points, including several low-priority improvements, but the course schedule feature is not available.

The Sprint Goal is not achieved.

#### Anti-pattern

**Celebrating completed story points without inspecting the Sprint Goal.**

The team may complete a large amount of work while missing the most important objective.

---

### Use case B: Supporting Sprint planning and adaptation

#### Example

A team repeatedly fails to achieve its Sprint Goal.

The team inspects possible reasons:

* Too much work was selected.
* Dependencies were not identified.
* Stories were too large.
* The Sprint Goal was unclear.
* Unexpected technical issues occurred.

The team adapts its planning or working practices.

#### Counterexample

A team fails to achieve the Sprint Goal once because a critical external service becomes unavailable.

It does not automatically mean that the planning process is poor.

#### Anti-pattern

**Using Sprint Goal completion as a punishment or ranking system.**

The purpose is to learn and improve, not to create fear around failure.

---

### Use case C: Connecting delivery to value

#### Example

The team achieves the Sprint Goal of improving login reliability. Customer complaints about login failures decrease.

This provides stronger evidence of a useful result than story points alone.

#### Counterexample

The team achieves a Sprint Goal but users do not benefit because the feature is difficult to use.

The team may need additional feedback or outcome measures.

#### Anti-pattern

**Assuming Sprint Goal achievement automatically proves customer value.**

The goal should be meaningful, but customer feedback and product outcomes may still need inspection.

---

# 6. Cycle time

## 6.1 Definition

**Cycle time** is the elapsed time between starting work on an item and completing it.

It is a flow metric. It helps understand how long work takes to move through the system.

### Formula

$$
\text{Cycle time} =
\text{Completion time} - \text{Start time}
$$

#### Example

A user story starts on Monday and is completed on Thursday.

$$
4 \text{ calendar days}
$$

The cycle time is 4 calendar days if the measurement includes Monday through Thursday as four elapsed calendar dates. If using exact timestamps, the duration should be calculated consistently.

The important point is to define the start and finish points clearly.

## 6.2 Main use cases

### Use case A: Identifying delays in delivery

#### Example

A team measures cycle time for several work items:

| Story | Cycle time |
| ----- | ---------: |
| A     |     2 days |
| B     |     3 days |
| C     |     8 days |
| D     |    10 days |
| E     |     3 days |

Stories C and D take much longer.

The team investigates whether they were larger, blocked, or waiting for review.

#### Counterexample

The team sees a cycle time of 10 days and immediately concludes that the developer was slow.

The item may have been waiting for approval for 7 days.

#### Anti-pattern

**Using cycle time to blame individuals.**

Cycle time measures the time an item spends in the workflow, not the time an individual spends actively coding.

---

### Use case B: Improving predictability

#### Example

A team wants most standard work items to be completed within 5 days.

The team measures cycle times and finds that most items finish within 4 days, but some take 12 days.

The team investigates the longer items and looks for ways to reduce uncertainty.

#### Counterexample

A team has an average cycle time of 5 days, but some items take 1 day and others take 20 days.

The average alone does not describe the variation.

#### Anti-pattern

**Using only the average cycle time.**

Averages can hide unusually long work items. Percentiles or a distribution can provide additional insight.

---

### Use case C: Identifying process improvement opportunities

#### Example

Cycle time increases after a new review step is introduced.

The team investigates whether work is waiting in the review stage.

#### Counterexample

Cycle time increases because the team starts working on larger, more complex items.

The increase may not indicate a process failure.

#### Anti-pattern

**Trying to reduce cycle time by reducing quality.**

Finishing work faster by skipping testing or review is not a useful improvement.

---

## 6.3 Limitations of cycle time

Cycle time depends on:

* The definition of when work starts.
* The definition of when work finishes.
* Work item size.
* Dependencies.
* Waiting time.
* Team workflow.
* Quality requirements.

### Key takeaway

Cycle time is useful for understanding how long work takes and where delays may occur. It should be used to improve the system, not to blame people.

---

# 7. Throughput

## 7.1 Definition

**Throughput** is the number of work items completed during a specific period.

Unlike velocity, throughput counts completed items rather than story points.

### Formula

$$
\text{Throughput} =
\text{Number of completed work items}
$$

#### Example

A team completes 8 user stories in one Sprint.

Throughput = **8 items per Sprint**.

## 7.2 Main use cases

### Use case A: Understanding delivery rate

#### Example

| Sprint | Completed work items |
| ------ | -------------------: |
| 1      |                    6 |
| 2      |                    7 |
| 3      |                    8 |
| 4      |                    7 |

The team completes approximately 7–8 items per Sprint.

This can help with forecasting if work items are reasonably similar and the workflow is stable.

#### Counterexample

A team completes 10 tiny bug fixes in one Sprint and 3 large features in another.

Comparing only the number of items can be misleading.

#### Anti-pattern

**Maximizing the number of completed items.**

This may encourage splitting work into unnecessarily small items or selecting easy tasks.

---

### Use case B: Comparing delivery patterns

#### Example

A team completes fewer items than usual.

The team investigates whether:

* Items became larger.
* Work was blocked.
* The team had reduced capacity.
* Quality work required more time.

#### Counterexample

Throughput increases from 8 to 12, but the number of customer-reported defects also increases significantly.

Higher throughput does not automatically mean better delivery.

#### Anti-pattern

**Treating throughput as a universal productivity measure.**

Throughput is useful for understanding completed work items, but it does not directly measure value or quality.

---

### Use case C: Forecasting with flow metrics

#### Example

A team completes approximately 8 items per Sprint. There are 16 similar-sized items remaining.

A rough forecast is:

$$
\frac{16}{8}=2 \text{ Sprints}
$$

This is an estimate based on historical delivery rate.

#### Counterexample

The remaining 16 items are much larger than the previous items.

The forecast may be unreliable.

#### Anti-pattern

**Forecasting without considering work item size and variability.**

Throughput is most useful when the work items and workflow are reasonably consistent.

---

# 8. Work in progress (WIP)

## 8.1 Definition

**Work in progress (WIP)** is the number of work items that have been started but not completed.

WIP includes items being developed, tested, reviewed, or otherwise in the workflow, depending on the team's definition.

### Example

A team has:

* 3 items in development.
* 2 items in testing.
* 4 items waiting for review.

Total WIP = 9 items.

## 8.2 Main use cases

### Use case A: Identifying too much parallel work

#### Example

A team has 10 developers and 20 stories in progress.

Many stories are started, but few are completed.

The team investigates whether too much work is being started at once.

#### Counterexample

A team has 8 items in progress because several items are large and require parallel work.

The number alone does not prove that WIP is too high.

#### Anti-pattern

**Setting an arbitrary WIP limit without understanding the workflow.**

A WIP limit should support flow and be adapted based on evidence.

---

### Use case B: Finding bottlenecks

#### Example

The workflow contains these stages:

| Stage       | Items |
| ----------- | ----: |
| To do       |     4 |
| Development |     3 |
| Testing     |     2 |
| Review      |     8 |
| Done        |    10 |

Many items are waiting for review.

This suggests that review may be a bottleneck worth investigating.

#### Counterexample

Eight items are in review because a large batch is being reviewed for a planned release.

The team needs more context before deciding that the review process is broken.

#### Anti-pattern

**Starting more work to keep everyone busy.**

If review is overloaded, starting more development work may increase WIP and make the bottleneck worse.

---

### Use case C: Improving focus

#### Example

A team agrees to finish existing items before starting new ones.

Over time, fewer items remain open and more work reaches Done.

#### Counterexample

A team reduces WIP by refusing to start important urgent work.

The limit may be too rigid for the situation.

#### Anti-pattern

**Treating WIP limits as permanent rules that cannot change.**

WIP limits are tools for improving flow and should be inspected and adapted.

---

## 8.3 Limitations of WIP

WIP depends on:

* How work is defined.
* The workflow stages.
* The size of work items.
* Team capacity.
* Dependencies.
* The type of work.

### Key takeaway

WIP helps identify how much work is open and where work may be accumulating. Lower WIP is not automatically better; the goal is healthy flow.

---

# 9. Defect rate and quality metrics

## 9.1 Definition

A defect is a problem in the product that causes it not to behave as expected.

Defect metrics help inspect product quality.

Possible measurements include:

* Number of defects reported.
* Number of critical defects.
* Defects found during a Sprint.
* Defects found after release.
* Defects reopened.
* Defect trends over time.

There is no single universal defect-rate formula. The measurement should be defined consistently.

### Example formula

$$
\text{Defect rate} =
\frac{\text{Number of defects}}{\text{Number of completed work items}}
$$

If a team completes 20 work items and 4 defects are reported:

$$
\frac{4}{20}=0.2
$$

Defect rate = **0.2 defects per completed item**, or 20% when expressed as a ratio of defects to items.

This is only an illustrative measure. Defects vary in severity and may not be directly comparable across work items.

## 9.2 Main use cases

### Use case A: Inspecting product quality

#### Example

A team releases a new feature. Several serious bugs are reported.

The team investigates the causes and considers improvements in development, testing, refinement, or design.

#### Counterexample

A team reports zero defects because it has not released the product yet.

Zero reported defects does not necessarily mean zero defects exist.

#### Anti-pattern

**Optimizing for zero reported defects by hiding or delaying defect reporting.**

This creates misleading information.

---

### Use case B: Identifying quality trends

#### Example

Critical defects decrease over several releases.

This may indicate that quality is improving, especially when the measurement method remains consistent.

#### Counterexample

Reported defects decrease because fewer users are using the product.

The decrease may not indicate better quality.

#### Anti-pattern

**Judging quality using only the number of reported defects.**

The number of users, testing effort, severity, and reporting practices may affect the metric.

---

### Use case C: Supporting improvement work

#### Example

Many defects occur in the same feature area.

The team investigates whether the feature needs better tests, simpler design, or technical improvement.

#### Counterexample

The team decides that all defects must be fixed immediately, regardless of severity or product priorities.

Some defects may be low-impact, while other work may have greater value.

#### Anti-pattern

**Measuring quality only by the number of bugs closed.**

Closing many minor bugs does not necessarily improve the product as much as fixing a critical problem.

---

# 10. Customer satisfaction

## 10.1 Definition

Customer satisfaction measures how satisfied customers or users are with the product or service.

It is an outcome-oriented metric.

Possible methods include:

* Surveys.
* Feedback forms.
* Interviews.
* Satisfaction ratings.
* User research.
* Support feedback.

A common example is a satisfaction rating from 1 to 5.

## 10.2 Main use cases

### Use case A: Understanding whether delivered work is useful

#### Example

A team releases a new course-search feature. User satisfaction improves from 3.2 to 4.1 out of 5.

This suggests that the change may have improved the user experience.

Further investigation is still useful.

#### Counterexample

The team completes many story points, but customer satisfaction decreases.

The product may be delivering more work without solving the right problems.

#### Anti-pattern

**Assuming completed work automatically creates customer value.**

Delivery and value are related, but they are not identical.

---

### Use case B: Gathering feedback for product decisions

#### Example

Users report that the application is slow.

The team investigates performance and prioritizes improvements based on product needs.

#### Counterexample

A team receives one negative comment and immediately changes the entire product direction.

One piece of feedback may not represent the wider user population.

#### Anti-pattern

**Optimizing for a single satisfaction score.**

A score without context may hide different user groups, specific problems, or changes in expectations.

---

### Use case C: Evaluating product improvements

#### Example

A team improves the login process and then measures whether users report fewer login problems.

The team compares the feedback with other evidence.

#### Counterexample

Satisfaction increases after a marketing campaign, but the product itself has not changed.

The team should not automatically attribute the improvement to its development work.

#### Anti-pattern

**Claiming causation from a single before-and-after score.**

Other factors may have affected the result.

---

# 11. Release progress

## 11.1 Definition

Release progress measures how much work or functionality has been completed toward a planned release.

It may be represented using:

* Completed product backlog items.
* Completed release goals.
* Features delivered.
* Remaining scope.
* Release readiness.

Release progress should be connected to meaningful product outcomes, not just the number of completed tasks.

## 11.2 Main use cases

### Use case A: Understanding progress toward a release

#### Example

A product release requires 20 defined features. Ten have been completed.

A simple progress measure is:

$$
\frac{10}{20}\times100=50\%
$$

This can provide a basic view of progress.

#### Counterexample

Ten small features are complete, but the critical payment feature is not ready.

The release may not be ready despite 50% of features being completed.

#### Anti-pattern

**Assuming percentage complete equals release readiness.**

Some features are more important than others, and some are dependencies for the whole release.

---

### Use case B: Inspecting release risks

#### Example

A team has completed most features, but performance testing is incomplete.

The team investigates the remaining risk before release.

#### Counterexample

The team sees that 90% of tasks are complete and decides to release without checking quality.

#### Anti-pattern

**Measuring only the amount of work completed.**

Release readiness also depends on quality, risk, dependencies, and the product's purpose.

---

# 12. Team satisfaction and team health

## 12.1 Definition

Team health metrics help understand whether the team is able to work effectively and sustainably.

Possible measurements include:

* Team satisfaction.
* Workload perception.
* Psychological safety.
* Confidence in achieving goals.
* Perceived process problems.
* Team morale.

These measurements are often gathered through short surveys or retrospectives.

## 12.2 Main use cases

### Use case A: Identifying unsustainable workload

#### Example

A team reports increasing stress and frequent overtime.

The team inspects workload, planning, dependencies, and working practices.

#### Counterexample

A team reports high satisfaction during one Sprint, but the product quality is declining.

Team satisfaction alone does not establish that the process is effective.

#### Anti-pattern

**Using satisfaction scores to judge individual employees.**

The purpose is to identify conditions for improvement, not to punish people.

---

### Use case B: Supporting retrospectives

#### Example

Team members report that work is frequently interrupted.

The team discusses ways to improve focus and reduce unnecessary interruptions.

#### Counterexample

The team collects satisfaction scores but never discusses or acts on the results.

#### Anti-pattern

**Collecting feedback without adaptation.**

A metric is not useful if it is gathered and then ignored.

---

# 13. Combining metrics

No single metric provides a complete picture of Scrum performance.

A combination of metrics can provide a more useful understanding.

## Example: AppNest

AppNest has the following situation:

* Velocity: 20 points.
* Sprint Goal: Not achieved.
* Cycle time: Increasing.
* WIP: Many stories waiting for review.
* Defects: Increasing.
* Customer satisfaction: Decreasing.

### Interpretation

The problem is not simply that velocity is low.

The data suggests that the team should investigate:

* Flow and review bottlenecks.
* Product quality.
* Whether the Sprint Goal is being achieved.
* Whether the team is delivering what users need.

### Counterexample

The team increases velocity to 30 points, but:

* Customer satisfaction decreases.
* Defects increase.
* Work in progress increases.
* Important features remain unfinished.

The velocity improvement does not demonstrate that the product or process improved.

### Anti-pattern

**Selecting metrics because they make performance look good.**

A useful metric should help answer a real question.

---

# 14. Choosing the right metric

When selecting a metric, ask the following questions.

## Question 1: What problem are we trying to understand?

Examples:

| Problem                              | Potentially useful metrics              |
| ------------------------------------ | --------------------------------------- |
| How much work is completed?          | Velocity, throughput                    |
| Is the Sprint on track?              | Sprint burndown, Sprint Goal completion |
| Why is work taking too long?         | Cycle time, WIP                         |
| Are items waiting in review?         | WIP, cycle time                         |
| Is product quality improving?        | Defect metrics                          |
| Are users satisfied?                 | Customer satisfaction                   |
| Are we progressing toward a release? | Release progress                        |
| Is the team working sustainably?     | Team satisfaction, workload feedback    |

## Question 2: What decision will the metric support?

A metric should be connected to a decision.

### Example

Problem: Many work items are waiting for review.

Decision: Should the team reduce WIP or change its review process?

Useful metrics: WIP and cycle time.

### Counterexample

Problem: Customers complain that the app is slow.

Metric selected: Velocity.

Velocity does not directly measure performance or customer experience.

### Anti-pattern

**Using a familiar metric for every problem.**

A metric is not useful simply because it is easy to calculate.

---

# 15. Metrics and targets

## 15.1 Why targets can be dangerous

A metric can become misleading when it is used as a target that people must achieve.

This is related to Goodhart's law:

> When a measure becomes a target, it can cease to be a good measure.

The idea is that people may change their behavior to improve the number rather than improve the underlying result.

## Example: Velocity target

Management requires:

> "The team must reach 50 story points per Sprint."

Possible consequences:

* Estimates become inflated.
* Stories are split artificially.
* Easy work is selected.
* Quality may be neglected.
* Teams compete instead of collaborating.
* The number becomes more important than customer value.

## Counterexample

A team uses historical velocity only to support forecasting.

The team continues to inspect the Sprint Goal, quality, and product outcomes.

The metric remains useful because it supports a decision rather than becoming the purpose.

## Anti-pattern

**Maximizing the metric instead of improving the system.**

---

# 16. Common Scrum metric anti-patterns

## Anti-pattern 1: Comparing team velocities

Team A has 20 points. Team B has 50 points.

Conclusion:

> "Team B is better."

Why it is misleading:

* Story points are team-specific.
* Teams may estimate differently.
* Work may differ in complexity.
* Products may have different contexts.

Better approach: Inspect each team's trends and use relevant delivery and outcome information.

---

## Anti-pattern 2: Measuring individual productivity with story points

Developer A completes 12 points. Developer B completes 5 points.

Conclusion:

> "Developer A is more productive."

Why it is misleading:

* Story points are not individual productivity units.
* Work is collaborative.
* Tasks vary in complexity.
* Support, reviews, testing, and mentoring may not be visible in points.

Better approach: Inspect team outcomes and collaboration.

---

## Anti-pattern 3: Using velocity as a performance target

> "Velocity must increase every Sprint."

Why it is misleading:

* Velocity may change naturally.
* Estimates may change.
* Capacity may change.
* Higher points do not necessarily mean higher value.

Better approach: Use velocity for forecasting and inspect the causes of changes.

---

## Anti-pattern 4: Focusing only on completed work

> "We completed 30 points, so the Sprint was successful."

Why it is misleading:

* The Sprint Goal may not have been achieved.
* Important work may remain unfinished.
* Quality may be poor.
* Customers may not benefit.

Better approach: Inspect the Sprint Goal, product quality, and outcomes.

---

## Anti-pattern 5: Reducing cycle time at any cost

> "Finish every story faster."

Why it is misleading:

* Quality may decrease.
* Testing may be skipped.
* Work may be split unnaturally.
* The team may start easier work.

Better approach: Improve flow while maintaining the Definition of Done and product quality.

---

## Anti-pattern 6: Tracking too many metrics

> "We need to track 20 metrics to understand everything."

Why it is misleading:

* The team becomes overwhelmed.
* Metrics lose meaning.
* Data collection becomes a burden.
* Important insights can be missed.

Better approach: Start with a small set of metrics connected to current questions.

---

## Anti-pattern 7: Collecting metrics without acting

> "We have collected the data. The job is done."

Why it is misleading:

* Metrics are meant to support decisions.
* Data without inspection does not improve the process.
* Problems may remain unresolved.

Better approach: Use metrics in Sprint Reviews, Retrospectives, and planning discussions.

---

## Anti-pattern 8: Ignoring context

> "The metric changed, so the team must have changed."

Why it is misleading:

* Capacity may have changed.
* Scope may have changed.
* The type of work may have changed.
* External dependencies may have changed.

Better approach: Interpret metrics with context and ask why the change occurred.

---

# 17. Practical example: AppNest

## Scenario

AppNest develops a mobile application for university students.

The team works in two-week Sprints.

### Sprint data

| Sprint | Planned points | Completed points | Stories completed |
| ------ | -------------: | ---------------: | ----------------: |
| 1      |             20 |               18 |                 6 |
| 2      |             25 |               20 |                 7 |
| 3      |             30 |               24 |                 9 |
| 4      |             35 |               20 |                 8 |

Additional information:

* One developer was sick during Sprint 4.
* The Product Owner added 10 points of new work.
* Three completed stories in Sprint 4 were bug fixes.
* Customers complain that the app is slow.
* Management wants velocity to increase from 20 to 50.
* Many stories are waiting for review.

## Question 1: What is the average velocity?

$$
\frac{18+20+24+20}{4}=20.5
$$

Average velocity = **20.5 story points per Sprint**.

## Question 2: Is velocity the most important metric?

Not necessarily.

Velocity provides information about completed estimated work, but it does not directly show:

* Whether the Sprint Goal was achieved.
* Whether the application is faster.
* Whether customers are satisfied.
* Whether the product quality improved.
* Why work is waiting for review.

## Question 3: Which metrics could be useful?

Possible choices:

1. Sprint Goal completion.
2. Cycle time.
3. WIP.
4. Defect rate.
5. Customer satisfaction.
6. Velocity for forecasting.

Several answers may be reasonable if supported by evidence.

## Question 4: What is an anti-pattern?

> "Increase velocity to 50 at all costs."

This is a problematic target because it may encourage gaming the estimates and does not necessarily improve the product.

## Question 5: What should AppNest do?

A possible recommendation:

> AppNest should investigate the review bottleneck, inspect Sprint Goal achievement, and improve product quality and flow. Velocity may be used for forecasting, but it should not be treated as a performance target.

---

# 18. Summary table

| Metric                 | Main purpose                             | What it does not prove                        |
| ---------------------- | ---------------------------------------- | --------------------------------------------- |
| Velocity               | Forecasting and delivery trends          | Individual productivity or value              |
| Sprint burndown        | Inspecting remaining work                | Product success or quality                    |
| Sprint Goal completion | Understanding Sprint purpose achievement | Complete customer value                       |
| Cycle time             | Understanding flow and delays            | Individual performance                        |
| Throughput             | Counting completed items                 | Quality or value                              |
| WIP                    | Inspecting open work and bottlenecks     | That lower WIP is always better               |
| Defect metrics         | Inspecting product quality               | That zero reported defects means zero defects |
| Customer satisfaction  | Understanding user experience            | That one score explains all outcomes          |
| Release progress       | Inspecting progress toward release       | That percentage complete means ready          |
| Team satisfaction      | Understanding team health                | That a happy team always delivers value       |

---

# 19. Review questions

### Understanding

1. What is a Scrum metric?
2. Why should metrics be connected to decisions?
3. What are the main categories of Scrum metrics?
4. What is the difference between velocity and throughput?
5. What does cycle time measure?
6. What does WIP measure?
7. Why is Sprint Goal completion different from completed story points?

### Application

8. A team has stable velocity but increasing customer complaints. What should it investigate?
9. A team has many items waiting for review. Which metrics could help?
10. A team completes more story points but reports more defects. What does this suggest?
11. A manager wants to compare the velocity of two teams. What is the problem?
12. A team wants to reduce cycle time. What should it consider?
13. A team reports zero defects. What additional information might be needed?
14. A team has increasing WIP and decreasing throughput. What might be happening?

### Critical thinking

15. Why can a useful metric become harmful when used as a target?
16. Can a team improve its velocity without improving customer value? Explain.
17. Can a team reduce cycle time while making the product worse? Explain.
18. Why should metrics be interpreted with context?
19. Why is it dangerous to measure individual performance using story points?
20. How can a Scrum Team use metrics to support inspection and adaptation?

---

# 20. Final takeaway

Scrum metrics are tools for learning and improvement.

A useful metric:

* Answers a meaningful question.
* Is understood by the people using it.
* Is interpreted in context.
* Supports inspection and adaptation.
* Does not encourage harmful behavior.
* Is combined with other relevant evidence.

The goal is not to maximize a number.

The goal is to improve the team's ability to deliver a valuable, usable, and high-quality product.

---

# 21. Links

1. [Atlassian — Scrum Metrics](https://www.atlassian.com/agile/scrum/scrum-metrics)
2. [ITPhobia — 11 Scrum Metrics and Their Value](https://itphobia.com/11-scrum-metrics-and-their-value-to-scrum-teams/)
3. [Dee Project Manager — Scrum Metrics](https://deeprojectmanager.com/scrum-metrics/)
4. [Agile Scrum Sprint Metrics Template](https://github.com/eric-spink-agile/agile-scrum-sprint-metrics-template)
