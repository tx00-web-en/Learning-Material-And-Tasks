// Global variable
let globalNumber = 10;

function demoFunction() {
  // Local variable
  let localNumber = 20;

  // Modify both variables
  globalNumber += 5; // globalNumber is now 15
  localNumber += 5;  // localNumber is now 25

  console.log("Inside function - globalNumber:", globalNumber); //15
  console.log("Inside function - localNumber:", localNumber);   // 25
}


console.log(demoFunction());
console.log(demoFunction());
console.log(demoFunction());

