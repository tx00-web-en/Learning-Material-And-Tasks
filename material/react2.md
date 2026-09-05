# Building Similar Apps Using the To-Do List as a Starting Point

The To-Do List app is a great example of a simple React application that uses state management, controlled components, and list rendering. But did you know you can use the same foundational concepts and structure to build other apps with slightly different functionality? In this article, we'll show you how to adapt the To-Do List code to create similar applications like a **Book Collection Manager**, **Contact List Manager**, **Recipe Manager**, and **Shopping Cart**. These apps involve managing lists with two input fields, and we'll highlight the differences in implementation for each.

### To-Do List: The Starting Point

Let's review the key parts of the To-Do List app:

```jsx
import React, { useState } from "react";

function ToDoList() {
  // State for the list of tasks and the new task input
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Handle input change and update newTask state
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Add a new task to the list
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]); // Append new task to the tasks array
      setNewTask(""); // Clear the input field
    }
  }

  // Delete a task from the list
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks); // Update the state with the new list
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
```

### How to Adapt the To-Do List for Other Apps

To transform the To-Do List into other similar apps like a **Book Collection Manager**, **Contact List Manager**, **Recipe Manager**, or **Shopping Cart**, you mainly need to:
1. **Adjust the State**: Manage two/three input fields instead of one.
2. **Modify the Input Fields**: Add the necessary input fields.
3. **Update Functions**: Change the functions to handle the new state structure.

Let's go step-by-step through each app.

### 1. Book Collection Manager

<details>
<summary>Sample Solution 1: Using separate state variables for each input field.</summary>

```js
import React, { useState } from "react";

function BookCollectionManager() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Handle input change for title
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  // Handle input change for author
  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  // Add a new book to the list
  function addBook() {
    if (title.trim() !== "" && author.trim() !== "") {
      setBooks((b) => [...b, { title, author }]);
      setTitle("");
      setAuthor(""); // Clear the input fields
    }
  }

  // Delete a book from the list
  function deleteBook(index) {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  }

  return (
    <div className="book-collection">
      <h1>Book Collection Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter book title..."
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Enter author name..."
          value={author}
          onChange={handleAuthorChange}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      <ol>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
            <button onClick={() => deleteBook(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default BookCollectionManager;
```

</details>


<details>
<summary>Sample Solution 2: Using an object to manage state</summary>

**Differences from To-Do List:**
- Two input fields: `title` and `author`.
- Each entry is an object with `title` and `author` properties instead of a single string.

**Updated Code for Book Collection Manager:**

```jsx
import React, { useState } from "react";

function BookCollectionManager() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  // Handle input change for both fields
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  }

  // Add a new book to the list
  function addBook() {
    if (newBook.title.trim() !== "" && newBook.author.trim() !== "") {
      setBooks((b) => [...b, newBook]);
      setNewBook({ title: "", author: "" }); // Clear the input fields
    }
  }

  // Delete a book from the list
  function deleteBook(index) {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  }

  return (
    <div className="book-collection">
      <h1>Book Collection Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter book title..."
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter author name..."
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      <ol>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
            <button onClick={() => deleteBook(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default BookCollectionManager;
```

- **Explanation of `handleInputChange` Function in React**  

    This function is a **universal event handler** for updating state when input fields change in a React form. It efficiently handles multiple input fields without needing separate state handlers for each field.


  **Code Breakdown**
  ```jsx
  function handleInputChange(event) {
    const { name, value } = event.target;  // Extract name and value from input field
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  }
  ```


  **How It Works**
  1. **Extracts `name` and `value` from the input field**  
    - `event.target` refers to the input element that triggered the change.  
    - `{ name, value } = event.target` destructures the `name` and `value` properties.

  2. **Updates State Using an Updater Function**
    ```jsx
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
    ```
    - `prevBook` represents the previous state of the `newBook` object.  
    - `{ ...prevBook }` spreads the existing properties of `prevBook` to keep them unchanged.  
    - `[name]: value` dynamically updates the property in `prevBook` that corresponds to the input’s `name` attribute.
   3. **How It Works in the Form**   
    - When the **title** input is updated, `setNewBook` updates **only** the `title` field. 
    - When the **author** input is updated, `setNewBook` updates **only** the `author` field.
    - Other fields remain **unchanged** due to `{ ...prevBook }`.  
   4. **Why Use This Approach?**   
    - **Handles multiple fields dynamically**  
    - **Prevents overwriting other fields** in the object  
    - **Works with controlled components** in React  



</details>


### 2. Contact List Manager

<details>

<summary>Sample Solution 1: Using separate state variables for each input field.</summary>

```js
import React, { useState } from "react";

function ContactListManager() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Handle input change for name
  function handleNameChange(event) {
    setName(event.target.value);
  }

  // Handle input change for email
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  // Add a new contact to the list
  function addContact() {
    if (name.trim() !== "" && email.trim() !== "") {
      setContacts((c) => [...c, { name, email }]);
      setName("");
      setEmail(""); // Clear the input fields
    }
  }

  // Delete a contact from the list
  function deleteContact(index) {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  }

  return (
    <div className="contact-list">
      <h1>Contact List Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
      <ol>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} ({contact.email})
            <button onClick={() => deleteContact(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ContactListManager;
```

</details> 

<details>

<summary>Sample Solution 2: Using an object to manage state</summary>

**Differences from To-Do List:**
- Two input fields: `name` and `email`.
- Each contact entry is an object containing `name` and `email`.

**Updated Code for Contact List Manager:**

```jsx
import React, { useState } from "react";

function ContactListManager() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  }

  function addContact() {
    if (newContact.name.trim() !== "" && newContact.email.trim() !== "") {
      setContacts((c) => [...c, newContact]);
      setNewContact({ name: "", email: "" });
    }
  }

  function deleteContact(index) {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  }

  return (
    <div className="contact-list">
      <h1>Contact List Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter name..."
          name="name"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Enter email..."
          name="email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
      <ol>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} ({contact.email})
            <button onClick={() => deleteContact(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ContactListManager;
```
</details> 


### 3. Recipe Manager

<details>

<summary>Sample Solution 1: Using separate state variables for each input field.</summary>

```js
import React, { useState } from "react";

function RecipeManager() {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");

  // Handle input change for name
  function handleNameChange(event) {
    setName(event.target.value);
  }

  // Handle input change for ingredients
  function handleIngredientsChange(event) {
    setIngredients(event.target.value);
  }

  // Add a new recipe to the list
  function addRecipe() {
    if (name.trim() !== "" && ingredients.trim() !== "") {
      setRecipes((r) => [...r, { name, ingredients }]);
      setName("");
      setIngredients(""); // Clear the input fields
    }
  }

  // Delete a recipe from the list
  function deleteRecipe(index) {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  }

  return (
    <div className="recipe-manager">
      <h1>Recipe Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter recipe name..."
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Enter ingredients..."
          value={ingredients}
          onChange={handleIngredientsChange}
        />
        <button onClick={addRecipe}>Add Recipe</button>
      </div>
      <ol>
        {recipes.map((recipe, index) => (
          <li key={index}>
            {recipe.name}: {recipe.ingredients}
            <button onClick={() => deleteRecipe(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeManager;
```

</details> 


<details>

<summary>Sample Solution 2: Using an object to manage state</summary>

**Differences from To-Do List:**
- Two input fields: `name` and `ingredients`.
- Each recipe is an object with `name` and `ingredients`.

**Updated Code for Recipe Manager:**

```jsx
import React, { useState } from "react";

function RecipeManager() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "" });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  }

  function addRecipe() {
    if (newRecipe.name.trim() !== "" && newRecipe.ingredients.trim() !== "") {
      setRecipes((r) => [...r, newRecipe]);
      setNewRecipe({ name: "", ingredients: "" });
    }
  }

  function deleteRecipe(index) {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  }

  return (
    <div className="recipe-manager">
      <h1>Recipe Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter recipe name..."
          name="name"
          value={newRecipe.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter ingredients..."
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
        />
        <button onClick={addRecipe}>Add Recipe</button>
      </div>
      <ol>
        {recipes.map((recipe, index) => (
          <li key={index}>
            {recipe.name}: {recipe.ingredients}
            <button onClick={() => deleteRecipe(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeManager;
```
</details> 


### 4. Shopping Cart


<details>

<summary>Sample Solution 1: Using separate state variables for each input field.</summary>

```js
import React, { useState } from "react";

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  // Handle input change for item name
  function handleItemNameChange(event) {
    setItemName(event.target.value);
  }

  // Handle input change for quantity
  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  // Add a new item to the list
  function addItem() {
    if (itemName.trim() !== "" && quantity.trim() !== "") {
      setItems((i) => [...i, { itemName, quantity }]);
      setItemName("");
      setQuantity(""); // Clear the input fields
    }
  }

  // Delete an item from the list
  function deleteItem(index) {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  }

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div>
        <input
          type="text"
          placeholder="Enter item name..."
          value={itemName}
          onChange={handleItemNameChange}
        />
        <input
          type="number"
          placeholder="Enter quantity..."
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item.itemName} - {item.quantity}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ShoppingCart;
```

</details> 


<details>

<summary>Sample Solution 2: Using an object to manage state</summary>

**Differences from To-Do List:**
- Two input fields: `item name` and `quantity`.
- Each shopping cart entry is an object with `item` and `quantity`.

**Updated Code for Shopping Cart:**

```jsx
import React, { useState } from "react";

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemName: "", quantity

: "" });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  }

  function addItem() {
    if (newItem.itemName.trim() !== "" && newItem.quantity.trim() !== "") {
      setItems((i) => [...i, newItem]);
      setNewItem({ itemName: "", quantity: "" });
    }
  }

  function deleteItem(index) {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  }

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div>
        <input
          type="text"
          placeholder="Enter item name..."
          name="itemName"
          value={newItem.itemName}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Enter quantity..."
          name="quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item.itemName} - {item.quantity}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ShoppingCart;
```
</details> 

### Conclusion

As you can see, the fundamental structure of our To-Do List can be easily adapted to create other useful applications, such as managing a book collection, a contact list, recipes, or a shopping cart. By understanding the core concepts — state management with `useState`, handling input with controlled components, and dynamic list rendering — you can customize and expand these apps to suit your needs. Start experimenting and see how you can build more complex applications using these basic patterns!

---
## Links

-  [Responding to Events](https://react.dev/learn/responding-to-events)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Render and Commit](https://react.dev/learn/render-and-commit)
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)

