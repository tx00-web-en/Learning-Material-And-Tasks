// use case 1
localStorage.setItem("username", "Rami");
localStorage.getItem("username");
localStorage.removeItem("username");

// use case 2
const userArray = ["Rami", 25];
localStorage.setItem("user", JSON.stringify(userArray));

const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData);

localStorage.removeItem("user");
localStorage.clear();

// use case 3
sessionStorage.setItem("username", "Rami");
sessionStorage.getItem("username");
sessionStorage.removeItem("username");
