# Theory: Scrum

- [Scrum Terminology](#scrum-terminology)
- [Project Management Methodologies](#project-management-methodologies)
- [Product-Backlog vs User Stories](#product-backlog-vs-user-stories)
- [QA](#qa)
  - Product Backlog vs User Stories
  - Is it true that "Agile is dead"?
  - When using scrum, who is the "team leader"?
  - What are Epics?
  - The "`Liked`, `Learned`, `Lacked`, and `Longed For`" retrospective?
- [Links](#links)

> Very good link: [What is Scrum?](https://www.scrum.org/learning-series/what-is-scrum/)

---------
## Scrum Terminology

### 1. **Scrum Roles**

**Scrum Master:**
- **Role**: The Scrum Master is a facilitator and coach for the Scrum team. Their primary responsibility is to ensure that the Scrum process is followed correctly and to help the team work effectively within this framework.
- **Responsibilities**:
  - Remove impediments that hinder the team's progress.
  - Facilitate Scrum ceremonies, such as Daily Standups, Sprint Planning, Sprint Reviews, and Sprint Retrospectives.
  - Support and coach the Development Team and Product Owner in understanding and implementing Scrum practices.
  - Ensure that Scrum practices are adhered to and that the team is focused on achieving the sprint goals.

**Product Owner:**
- **Role**: The Product Owner represents the customer or stakeholders and is responsible for defining and prioritizing the product's requirements.
- **Responsibilities**:
  - Create and maintain the Product Backlog, a prioritized list of features, enhancements, and fixes.
  - Ensure that the backlog items are well-defined and understood by the Development Team.
  - Prioritize backlog items based on business value and customer needs.
  - Make decisions about what should be included in the product and provide clarifications to the Development Team as needed.

**Development Team:**
- **Role**: The Development Team is composed of professionals who work together to create the product increment in each sprint.
- **Responsibilities**:
  - Develop the product by delivering potentially shippable increments of work during each sprint.
  - Self-organize and manage their work to meet the goals of the sprint.
  - Collaborate with the Product Owner to understand and implement the backlog items.
  - Ensure that the product increment meets the Definition of Done (DoD) and is of high quality.

> Product Owner is about the product, Scrum Master is about the process.

### 2. **Scrum Artifacts**

**Product Backlog:**
- **Definition**: The Product Backlog is a dynamic and prioritized list of all desired features, enhancements, fixes, and requirements for the product.
- **Characteristics**:
  - Maintained by the Product Owner and continuously refined based on feedback and changes.
  - Items in the backlog are often expressed as user stories or tasks.
  - The backlog is prioritized based on business value, risk, and dependencies.

**Sprint Backlog:**
- **Definition**: The Sprint Backlog is a subset of the Product Backlog that the Development Team commits to completing during a specific sprint.
- **Characteristics**:
  - Created during Sprint Planning and includes tasks that are broken down from backlog items.
  - Represents the work the team aims to complete in the current sprint.
  - The Sprint Backlog is updated daily by the Development Team to reflect progress and any new tasks or changes.

**Increment:**
- **Definition**: The Increment is the sum of all completed Product Backlog items during a sprint and all previous sprints.
- **Characteristics**:
  - Must meet the Definition of Done (DoD) to be considered complete and potentially shippable.
  - Represents the latest version of the product that includes all completed features and fixes up to the end of the sprint.
  - The Increment provides the baseline for the next sprint and is demonstrated during the Sprint Review.

### 3. **Scrum Ceremonies**

**Sprint Planning:**
- **Purpose**: To define what will be delivered in the upcoming sprint and how the work will be achieved.
- **Participants**: Scrum Master, Product Owner, and Development Team.
- **Activities**:
  - The Product Owner presents the prioritized items from the Product Backlog.
  - The Development Team selects items they can commit to completing during the sprint.
  - The team discusses and creates a plan to deliver the selected items.

**Daily Standup (Daily Scrum):**
- **Purpose**: To synchronize the team’s efforts and plan the work for the next 24 hours.
- **Participants**: Scrum Master, Product Owner (optional), and Development Team.
- **Activities**:
  - Each team member answers three questions: What did I do yesterday? What will I do today? Are there any blockers or issues?
  - The meeting is time-boxed to 15 minutes and held at the same time and place each day.

**Sprint Review:**
- **Purpose**: To inspect the Increment and adapt the Product Backlog if needed.
- **Participants**: Scrum Master, Product Owner, Development Team, and stakeholders.
- **Activities**:
  - The Development Team demonstrates the completed work and how it meets the Definition of Done.
  - The team and stakeholders discuss what was accomplished and any feedback or changes needed.
  - The Product Owner may adjust the Product Backlog based on feedback.

**Sprint Retrospective:**
- **Purpose**: To reflect on the sprint and identify improvements for the next sprint.
- **Participants**: Scrum Master, Product Owner, and Development Team.
- **Activities**:
  - Discuss what went well, what didn’t go well, and what could be improved.
  - Identify action items to address issues and enhance the team's processes and performance.
  - Develop and commit to improvement plans for the next sprint.

These Scrum roles, artifacts, and ceremonies form the core of the Scrum framework, promoting effective team collaboration, continuous improvement, and iterative development.


-------

## Project Management Methodologies

The Waterfall model, the V-Model, and Scrum - are project management methodologies, but they fall under different categories and have distinct characteristics.

1. Waterfall Model:
   - Category: Sequential or linear project management methodology.
   - Characteristics: Progresses through phases in a linear fashion, with each phase building upon the previous one. Suitable for projects with well-defined and stable requirements.

2. V-Model:
   - Category: Derivative of the Waterfall model with an emphasis on testing.
   - Characteristics: Similar to Waterfall but with a testing phase corresponding to each development phase. It ensures that testing activities are integrated into the entire development process.

3. Scrum:
   - Category: Agile project management methodology.
   - Characteristics: Iterative and incremental approach, emphasizing flexibility, collaboration, and the delivery of small, functional increments in short cycles (sprints). It is particularly well-suited for projects with evolving or dynamic requirements.

Each methodology has its own strengths and weaknesses, and the choice between them depends on factors such as project requirements, the level of uncertainty, the desired level of flexibility, and the nature of the development work. Waterfall and V-Model are more traditional, plan-driven methodologies, while Scrum is a modern, Agile methodology that is widely used in software development and other industries.


### Waterfall Model:

1. Sequential Process:
   - The Waterfall model follows a linear and sequential approach to software development, where each phase must be completed before moving on to the next.
  
2. Phases:
   - Divided into distinct phases such as Requirements, Design, Implementation, Testing, Deployment, and Maintenance.
  
3. Documentation:
   - Emphasizes extensive documentation at each stage, making it well-suited for projects with clear and stable requirements.

4. Change Management:
   - Less adaptable to changes once the project is underway. Changes in requirements may be challenging to accommodate.

5. Testing:
   - Testing is performed at the end of the development cycle, which may result in the late detection of defects.

###  V-Model:

1. Verification and Validation:
   - The V-Model extends the Waterfall model by incorporating a testing phase for each corresponding development stage, forming a V-shaped diagram.
  
2. Parallel Processes:
   - Emphasizes the relationship between development and testing activities, allowing for early testing and detection of issues.

3. Traceability:
   - Provides clear traceability between the development and testing phases, ensuring that each requirement has a corresponding test case.

4. Documentation:
   - Requires significant documentation, similar to the Waterfall model, to maintain a structured and traceable development process.

5. Change Management:
   - Similar to Waterfall, the V-Model is less adaptable to changes once the development process has started.

### Scrum:

1. Iterative and Incremental:
   - Scrum is an iterative and incremental Agile framework that focuses on delivering small, working increments of software in short cycles called sprints.

2. Roles:
   - Defines specific roles such as Product Owner, Scrum Master, and Development Team to facilitate collaboration and communication.

3. Artifacts:
   - Utilizes artifacts like the Product Backlog, Sprint Backlog, and Increment to manage and prioritize work.

4. Adaptability:
   - Highly adaptable to changing requirements, allowing for flexibility and continuous improvement throughout the development process.

5. Customer Feedback:
   - Involves regular reviews and feedback sessions with stakeholders, ensuring that the delivered product aligns with customer expectations.

6. Continuous Improvement:
   - Includes Sprint Retrospectives to reflect on the team's performance and identify areas for improvement in the next sprint.

The Waterfall model is a traditional, sequential approach, the V-Model extends Waterfall with an emphasis on testing, and Scrum is an Agile framework that prioritizes adaptability, collaboration, and incremental development. The choice between these models depends on project requirements, the level of uncertainty, and the desired development approach.

----
## Q/A


### Product Backlog vs User Stories

#### Product Backlog:

1. Definition:
   - The product backlog is a dynamic, prioritized list of all features, enhancements, and fixes that constitute the work that needs to be done on a product.
   - It is a living document maintained by the Product Owner and is subject to change based on feedback, new requirements, or evolving priorities.

2. Scope:
   - Encompasses all features, user stories, bug fixes, technical tasks, and any other work that contributes to the product's development.
   - Can include high-level epics, themes, or large chunks of functionality.

3. Hierarchy:
   - Typically organized with higher-level items (epics, themes) at the top and detailed, granular tasks at the bottom.
   - Provides a comprehensive overview of all the work needed for the product.

4. Dynamic Nature:
   - Constantly evolving as new requirements emerge, priorities change, or feedback is received.
   - Allows flexibility in adjusting the scope of work based on the product's development needs.

#### User Stories:

1. Definition:
   - User stories are individual, small, and manageable units of work that represent a piece of functionality from an end-user perspective.
   - They are written in a simple, non-technical language and follow a specific template: "As a [user type], I want [an action] so that [benefit]."

2. Scope:
   - Focuses on a specific functionality or feature that delivers value to the end-user.
   - Represents a single, independent unit of work that can be completed within a single sprint.

3. Hierarchy:
   - Typically part of a larger epic or theme within the product backlog.
   - Can be broken down into tasks or sub-tasks for more granular tracking during development.

4. Dynamic Nature:
   - While individual user stories can be refined or reprioritized, they are more stable during a sprint once committed to by the development team.
   - Changes to user stories may occur but are usually subject to the overall sprint goals and commitments.

In summary, the product backlog is a comprehensive list of all work for a product, including user stories, while user stories are specific, user-focused features or functionalities that provide value and are part of the product backlog. User stories are a way of breaking down larger product backlog items into more manageable pieces for development and delivery.



### Is it true that "Agile is dead"

The idea that "Agile is dead" or "Agile is broken" has become a popular topic of debate, often sparking strong opinions. From my perspective, this backlash stems from a few key issues:

1. **Misinterpretation and Misapplication**: Agile principles are meant to be flexible and adaptive, focusing on delivering value quickly through collaboration and iteration. However, in many cases, companies have adopted Agile in name only, without fully embracing its underlying values. They may implement rigid processes or misinterpret the framework, leading to frustration and the perception that Agile doesn't work as promised.

2. **Commercialization of Agile**: As Agile gained popularity, many consultants, tools, and training programs sprang up to capitalize on the trend. This led to the commercialization of Agile, where the focus shifted from its core principles to selling certifications, tools, and processes. This can dilute the true essence of Agile, making it seem like just another bureaucratic process rather than a flexible, value-driven approach.

3. **Scaling Challenges**: Agile works well in small, focused teams, but scaling it across large organizations can be challenging. As companies try to implement Agile at scale, they often encounter difficulties, such as coordinating across multiple teams, maintaining consistent communication, and aligning with broader business goals. These challenges can lead to a breakdown in the Agile process, causing some to argue that it doesn't work in larger environments.

4. **Resistance to Change**: Agile requires a cultural shift, and not all organizations are prepared for that. Traditional hierarchical structures, resistance from management, and fear of losing control can all hinder Agile adoption. When these issues arise, people may blame Agile itself rather than recognizing that the failure lies in the organization's inability to change.

5. **Overpromising and Under-delivering**: Agile has often been marketed as a silver bullet that will solve all development problems. When companies adopt Agile expecting immediate and dramatic improvements, they may be disappointed if the results don't meet their high expectations. This can lead to disillusionment and claims that Agile is broken.

In summary, the perception that Agile is "dead" or "broken" often comes from misunderstandings, poor implementations, and the challenges of scaling and maintaining Agile principles in complex environments. Agile itself is not inherently flawed, but its success depends on how well it is understood, implemented, and supported within an organization.


### When using scrum, who is the "team leader"

In Scrum, there isn't a traditional "team leader" as in hierarchical teams. Instead, leadership is shared among the team members based on their roles:

- **Product Owner**: Responsible for defining the vision of the product, managing the product backlog, and ensuring the team is working on the most valuable features. They represent the customer's voice and priorities.

- **Scrum Master**: Acts as a facilitator and coach for the team, ensuring that Scrum practices are followed. They help remove impediments, improve processes, and support the team in achieving their goals.

- **Development Team**: The self-organizing group responsible for delivering the product increments. They manage their own work and collaborate closely to achieve the sprint goals.

So, while neither the Product Owner nor the Scrum Master is the "team leader" in the traditional sense, the Scrum Master often plays a guiding role in ensuring the team operates effectively within the Scrum framework. The Product Owner leads in terms of product direction and priorities.

> [More on this topic](https://www.linkedin.com/posts/james-warrick_agile-is-dead-long-live-agility-activity-6881985602716360704-AEK0)

### What are Epics?

In the context of Scrum and Agile project management, **epics** are large bodies of work that can be broken down into smaller, more manageable tasks called **user stories**. An epic is essentially a high-level description of a big feature or initiative that usually spans multiple sprints (iterations) and may require several weeks or months to complete.

**Example of an Epic in Scrum:**

Imagine you are building an e-commerce platform. An epic might be:

- **Epic**: "Implement a User Registration and Login System"

  This epic could then be broken down into smaller user stories, such as:
  - As a user, I want to create a new account with an email and password.
  - As a user, I want to log in with my registered credentials.
  - As a user, I want to reset my password if I forget it.
  - As a user, I want to receive a confirmation email upon successful registration.


### The "`Liked`, `Learned`, `Lacked`, and `Longed For`" retrospective?

The "Liked, Learned, Lacked, and Longed For" retrospective is a structured method used by teams (often in Agile or Scrum frameworks) to reflect on their recent work or sprint. It helps identify what went well, what could be improved, and what the team desires for future iterations. This format promotes open communication, continuous improvement, and team cohesion.

#### Breakdown of the Four Categories:

1. **Liked**:
   - **Definition**: Highlights the positive aspects of the sprint, project, or activity. It focuses on what the team enjoyed, appreciated, or found valuable.
   - **Examples**: 
     - "We liked the clear communication within the team."
     - "The new tool integration saved us a lot of time."
     - "We liked the support we received from stakeholders."

2. **Learned**:
   - **Definition**: Captures new knowledge, skills, or insights gained during the sprint or project. This could include technical lessons, process improvements, or team dynamics.
   - **Examples**: 
     - "We learned a more efficient way to manage our backlog."
     - "We learned about a new technology that could be useful for future projects."
     - "We learned the importance of setting clearer goals for each sprint."

3. **Lacked**:
   - **Definition**: Focuses on what was missing or could have been better. This could relate to resources, skills, communication, or anything else that was inadequate or absent.
   - **Examples**: 
     - "We lacked proper documentation for the new feature."
     - "We lacked enough time to complete the user testing phase."
     - "We lacked a clear understanding of the client's requirements."

4. **Longed For**:
   - **Definition**: Describes what the team wishes they had or what they would like to see in the future. This can include tools, processes, team dynamics, or support.
   - **Examples**: 
     - "We longed for more frequent feedback from the client."
     - "We longed for a dedicated UX designer to improve our interface."
     - "We longed for more flexibility in our sprint planning."

#### How to Conduct a "Liked, Learned, Lacked, Longed For" Retrospective:

1. **Preparation**:
   - Set up a meeting space, whether in-person or online.
   - Prepare a board or digital tool (like a virtual whiteboard or a collaboration tool like Miro or MURAL) to capture each category.
   - Inform the team in advance to think about their experiences during the sprint or project.

2. **Facilitation**:
   - Divide the board or space into four sections: "Liked," "Learned," "Lacked," and "Longed For."
   - Give team members a few minutes to individually reflect and write down their thoughts on sticky notes (physical or virtual).
   - Encourage everyone to contribute to each category to ensure a comprehensive reflection.

3. **Discussion**:
   - Go through each category one by one, allowing team members to share their thoughts.
   - Discuss each point, allowing for clarifications, questions, and elaboration.
   - Identify common themes, priorities, or action items that arise from the discussion.

4. **Action Planning**:
   - Focus on the "Lacked" and "Longed For" categories to determine actionable steps to address gaps and fulfill desires for future sprints.
   - Assign responsibility for specific actions or improvements.

5. **Wrap-Up**:
   - Summarize key takeaways and action items.
   - End on a positive note, celebrating successes and looking forward to future improvements.

#### Benefits of This Retrospective Format:

- **Structured Reflection**: Provides a clear framework for discussing various aspects of the team's experience.
- **Balanced Feedback**: Encourages sharing both positive feedback and constructive criticism.
- **Inclusive Participation**: Offers all team members a voice in reflecting on their experiences.
- **Action-Oriented**: Helps identify specific areas for improvement and sets the stage for concrete action steps.

> Conclusion:

The "Liked, Learned, Lacked, and Longed For" retrospective is an effective tool for continuous improvement in teams. It helps to create a balanced view of what is working well, what could be improved, and what is desired for future work. This method fosters open communication, enhances team cohesion, and drives progress.

<!-- 
#### Key Characteristics of Epics in Scrum:

1. **High-Level Description**: Epics provide a broad view of what needs to be done without getting into the specific details. They represent a significant piece of functionality or a large user requirement.

2. **Large in Scope**: Epics are generally too large to be completed within a single sprint. They need to be broken down into smaller user stories that can be planned and executed in one or more sprints.

3. **Breakdown into User Stories**: As work progresses, the epic is decomposed into smaller, more detailed user stories. These user stories are smaller pieces of functionality that can be independently developed, tested, and delivered.

4. **Spans Multiple Sprints**: Because of their size, epics usually span across several sprints or iterations, making them a way to plan and manage large-scale work over time.

5. **Flexible and Evolving**: An epic can evolve over time as more information becomes available. It can be re-prioritized, re-scoped, or refined based on feedback from stakeholders and team members.

6. **Prioritization**: Epics are prioritized by the Product Owner based on factors such as business value, customer need, and alignment with the product vision or strategic goals. 

#### Benefits of Using Epics:

- **Manageable Planning**: By breaking down large work items into smaller pieces, epics help the team plan, prioritize, and deliver work in increments.
- **Clarity and Focus**: Epics provide a clear high-level goal, which helps the team maintain focus on the big picture while working on smaller tasks.
- **Flexibility**: As priorities change, epics allow for easy reorganization and re-prioritization of work.

#### Relationship Between Epics, User Stories, and Tasks:

- **Epics** are the highest-level work items representing a large user need or feature.
- **User Stories** break down epics into smaller, detailed descriptions of user requirements.
- **Tasks** further break down user stories into individual actions that team members will take to complete the work.
-->


----
##  Links

- [What is Scrum?](https://www.scrum.org/learning-series/what-is-scrum/)
- [Agile scrum roles and responsibilities](https://www.atlassian.com/agile/scrum/roles)
- [Scrum](https://scrumguides.org/scrum-guide.html)
- [V model](https://en.wikipedia.org/wiki/V-model)
- [waterfall](https://en.wikipedia.org/wiki/Waterfall_model)
- Other Related Links
  - [An agile guide to scrum meetings](https://www.atlassian.com/agile/scrum/ceremonies) 
  - [Product Backlog - What is it & How to create one](https://www.atlassian.com/agile/scrum/backlogs)
  - [Epics](https://www.atlassian.com/agile/project-management/epics)
  - [Retrospective Templates](https://agilebox.app/blog/4ls-retrospective/)
  - https://www.atlassian.com/agile/scrum
  - https://en.wikipedia.org/wiki/Scrum_(software_development)
  - https://en.wikipedia.org/wiki/Scrum_(software_development)

