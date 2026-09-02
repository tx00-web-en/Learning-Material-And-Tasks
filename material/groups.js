/**
 * Shuffles an array using the Fisher-Yates algorithm
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates schedule where Q&A duties go to past presenters or tail groups
 */
function generateSchedule(groups) {
  if (!groups || groups.length < 3) {
    console.error("You need at least 3 groups to assign 2 distinct Q&A groups.");
    return;
  }

  // 1. Randomize presentation order
  const order = shuffle(groups);
  // console.log(order);
  
  const n = order.length;

  console.log("=== Presentation Schedule & Q&A Assignment ===\n");

  order.forEach((presenter, i) => {
    // Look backwards by 1 and 2 positions (circular)
    const qa1 = order[(i - 1 + n) % n];
    const qa2 = order[(i - 2 + n) % n];

    console.log(`Slot ${i + 1}:`);
    console.log(`  Presentation : Group ${presenter}`);
    console.log(`  Q&A Groups   : Group ${qa1}, Group ${qa2}`);
    console.log("-----------------------------------------");
  });
}

// Run with your groups
// const groups = [1, 2, 3, 4, 5, 6, 7,8];
const groups = [1, 2, 3, 4, 5, 6, 7];
generateSchedule(groups);