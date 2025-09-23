# Activity 1


## Part A: Initial Setup
------

1. Clone the [starter repository](https://github.com/tx00-resources-en/week6-be-workout-v1)
   - After cloning, **delete** the `.git` directory.
2. Rename `.env.example` to `.env`.
  - Inside the `.env` file, notice that there are two MongoDB URIs: one for development and one for testing purposes.
3. Run `npm install`
4. Run `npm test` to run the tests using Jest.

## Part B: Refactoring (replace `test()` with `it()`)
------


Open the `./tests/workout_api.test.js` file and refactor the code to follow a more structured and descriptive style.  
   - Instead of using `test(...)` with short or vague names, rewrite your tests using `describe(...)` and `it(...)` so that they read like natural language specifications.  
   - Your goal is to make the tests **self-explanatory**: someone reading them should immediately understand what behavior is being tested.  

**Example:**  

Original code:  
```javascript
describe("when there is initially some notes saved", () => {
  test("all workouts are returned", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  test("a specific workout is within the returned workouts", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });
});
```

Refactored in BDD style:  
```javascript
describe("when there are initially some workouts saved", () => {
  it("should return all workouts", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("should include a specific workout in the returned list", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });
});
```

Notice how the refactored version:  
- Uses `it` instead of `test` for a **behavior-driven style**.  
- Rephrases test names to be **descriptive and behavior-focused** (e.g., *“should return all workouts”*).  
- Reads like a natural sentence: *“when there are initially some workouts saved, it should return all workouts.”*  


## Part C: run skip certain tests and run tests individually 
------

When working with Jest, you have the following options:
  - You can replace [`test()` with `it()`].
  - You can [skip certain tests] as needed.
  - You can run tests individually (More details below).



### Running Tests One by One in Jest

By default, running `npm test` will execute all of the tests in your application. However, when writing or debugging tests, it's often more efficient to run just one or a few specific tests rather than all of them. Jest offers several ways to achieve this.

**Using `test.only`**

One way to focus on specific tests is by using the `only` method. This allows you to tell Jest to run only the test(s) you mark with `test.only`:

```javascript
test.only('tours are returned as json', async () => {
  await api
    .get('/api/tours')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

test.only('there are two tours', async () => {
  const response = await api.get('/api/tours');
  assert.strictEqual(response.body.length, 2);
});
```

When Jest encounters `test.only`, **it will ignore all other tests** and only run the marked ones. However, be careful: it's easy to accidentally leave `test.only` in your code, which can cause future test runs to skip important tests.

**Running Tests from the Command Line**

Another option is to specify which tests to run directly from the command line, without modifying the code.

- Running a Specific Test File: You can run a specific test file by passing the file path to the `npm test` command:
```bash
npm test -- tests/tours.test.js
```

This will execute only the tests found in the `tests/tours.test.js` file.

- Running Tests by Name Pattern: You can also run tests by specifying a **name pattern**. This option allows you to run tests whose names (or describe block names) match a given string:
```bash
npm test -- --test-name-pattern="the first tour is about HTTP methods"
```

The argument for `--test-name-pattern` can be the full name of a test, a part of the name, or even the name of a `describe` block. For example, if you want to run all tests related to "tours," you could use:

```bash
npm run test -- --test-name-pattern="tours"
```

This will run every test that includes "tours" in its name.

**Caution with `test.only`**

While `test.only` is useful, **be careful not to leave it in your code accidentally**. Doing so can cause Jest to skip important tests, potentially leading to false confidence that all tests are passing.



---
## Links

- [Dead-Simple API Tests With SuperTest, Mocha, and Chai](https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/)
- If you use the original [code](https://github.com/dennmart/dead_simple_api_testing/blob/master/config.js), the test won't work. The reason is that the URL for the API changed so the test will receive a 301 status code (permanent redirect) instead of 200. 
- [API](https://airportgap.com/)


<!-- Links -->
[`test()` with `it()`]:https://jestjs.io/docs/api#testname-fn-timeout
[skip certain tests]:https://codewithhugo.com/run-skip-single-jest-test/


<!-- 

## (Optional) Adopting BDD Testing Style

### **A: Set Up**

1. **Clone the Starter Repository**  
   Clone the repository using the following link:  
   [Starter Repository](https://github.com/tx00-resources-en/week6-be-simple_api_testing).

2. **Delete the `.git` Directory**  
   After cloning, navigate to the project directory and **delete** the `.git` folder to remove any Git tracking.

3. **Navigate to the Project Directory**  
   Change into the `mocha-chai` directory:
   ```bash
   cd week6-be-simple_api_testing/mocha-chai
   ```

4. **Rename the `.env` File**  
   Rename the `.env.example` file to `.env`. Then, update the value for `API_TOKEN` by generating your own free key from [https://airportgap.com/](https://airportgap.com/).  
   Set the key in your `.env` file as follows:
   ```env
   API_TOKEN=your_key_here
   ```

5. **Install Dependencies**  
   Run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

6. **Run Existing Tests**  
   Ensure that all the existing tests are working correctly by running:
   ```bash
   npm test
   ```

### **B: Refactoring `airports.test.js`**

1. **Execute the Command**  
   Run the following command to execute the initial tests:
   ```bash
   npm run test1
   ```
   At this stage, the tests should pass. Now, we will refactor the code to follow the BDD (Behavior-Driven Development) style.

2. **Refactor the Code**  
   Compare the existing code in `airports.test.js` with the following BDD-style structure:

```javascript
const { request, expect } = require("./config");

describe("Airport API", function () {
  describe("GET /airports", function () {
    describe("when retrieving airports", function () {
      it("should return a list of airports limited to 30 per page", async function () {
        const response = await request.get("/airports");

        expect(response.status).to.eql(200);
        expect(response.body.data.length).to.eql(30);
      });
    });
  });

  describe("POST /airports/distance", function () {
    describe("when calculating the distance between two airports", function () {
      it("should return a 200 status and the distance information", async function () {
        const response = await request
          .post("/airports/distance")
          .send({ from: "KIX", to: "SFO" });

        expect(response.status).to.eql(200);

        const attributes = response.body.data.attributes;
        expect(attributes).to.include.keys(
          "kilometers",
          "miles",
          "nautical_miles"
        );
        expect(attributes.kilometers).to.be.closeTo(8692, 1);
        expect(attributes.miles).to.be.closeTo(5397, 1);
        expect(attributes.nautical_miles).to.be.closeTo(4690, 1);
      });
    });
  });
});
```

3. **Apply the Refactor**  
   Replace the existing code in `airports.test.js` with the refactored code provided above. This structure clearly defines the different parts of the test, making it easier to understand and maintain.


### **C: Refactoring `favorites-old.test.js`**

1. **Refactor the Code**  
   Now, take the existing code in `favorites-old.test.js` and refactor it to follow the same structured and descriptive BDD style shown in **Section B**. Ensure each test describes the behavior being tested in a clear and consistent way. -->
