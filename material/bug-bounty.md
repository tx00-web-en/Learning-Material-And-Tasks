# Bug Bounty

### [express-activity.md](./express-activity.md)  
- **Bug 1:** _Reported by  
  - 
- **Bug 2:** _Reported by 
  - 
- **Bug 3:** _Reported by 
  - 

### [js.m](./JS.md)
- **Bug 4:** _Reported by 
    **Fixed**
    > In the code examples, both the variable x and the function helloWorld are hoisted. During hoisting, the variable x is declared and initialized with undefined, but its assignment happens later in the code. The helloWorld function is fully hoisted, allowing you to call it before its declaration. However, since x is not assigned a value during hoisting, any operation involving x before its assignment will result in undefined, which could lead to unexpected behavior. Reordering the code ensures that variables like x are assigned before they are used.
