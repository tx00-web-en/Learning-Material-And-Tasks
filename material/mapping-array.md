# Mapping Through the Array

React’s renderer knows how to "unwrap" an array of elements and treat them as children. Here's the mechanics a bit more clearly:


### 1. What `.map()` produces
When you write:
```jsx
{tours.map(tour => (
  <Tour key={tour.id} tour={tour} />
))}
```
JavaScript executes `.map()` and returns a **new array**:
```js
[
  <Tour key={1} tour={...} />,
  <Tour key={2} tour={...} />
]
```


### 2. JSX curly braces
Inside JSX, `{}` means "evaluate this JavaScript expression and insert the result here."  
- If the result is a string → React renders text.  
- If the result is a single React element → React renders that element.  
- If the result is an **array of React elements** → React renders each element in order, as if you had written them out manually.


### 3. React reconciliation
React’s reconciliation engine walks through the array and places each element into the virtual DOM tree. Thanks to the `key` prop, React can track which element corresponds to which item across re‑renders.

So React effectively transforms:
```jsx
<div>
  { [ <Tour key={1} ... />, <Tour key={2} ... /> ] }
</div>
```
into:
```jsx
<div>
  <Tour key={1} ... />
  <Tour key={2} ... />
</div>
```


### Bottom line
React doesn’t render "an array" as a literal array — it renders each element inside that array as children. That’s why your mental model of going from *array of `<Tour>`* → *expanded list of `<Tour>` inside the `<div>`* is exactly right.  
