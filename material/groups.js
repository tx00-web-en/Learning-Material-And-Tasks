/**
 * Returns a new shuffled copy of the given array.
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Assigns QA groups to each presenter, avoiding back-to-back reciprocal pairs.
 */
function assignQA(groups) {
  const qaAssignments = [];
  const qaFrequency = Object.fromEntries(groups.map(g => [g, 0]));
  const shuffledGroups = shuffleArray(groups);

  for (let i = 0; i < shuffledGroups.length; i++) {
    const presentingGroup = shuffledGroups[i];
    const availableQAGroups = shuffledGroups.filter(g => g !== presentingGroup);

    let numQAGroups = 1;
    if (groups.length % 2 !== 0 && i === shuffledGroups.length - 1 && availableQAGroups.length > 1) {
      numQAGroups = 2;
    }

    const qaGroups = availableQAGroups
      .slice() // avoid mutating original
      .sort((a, b) => qaFrequency[a] - qaFrequency[b])
      .slice(0, numQAGroups);

    qaGroups.forEach(g => qaFrequency[g]++);
    qaAssignments.push({ presenting: presentingGroup, qa: qaGroups });
  }

  let safeOrder = shuffleArray(qaAssignments);
  let attempts = 0;
  const maxAttempts = 1000;

  while (!isSafeOrder(safeOrder) && attempts < maxAttempts) {
    safeOrder = shuffleArray(qaAssignments);
    attempts++;
  }

  if (attempts === maxAttempts) {
    console.warn("Warning: Could not find a perfect safe order after max attempts.");
  }

  return safeOrder;
}

/**
 * Checks if the order avoids back-to-back reciprocal pairs.
 */
function isSafeOrder(assignments) {
  for (let i = 0; i < assignments.length - 1; i++) {
    const curr = assignments[i];
    const next = assignments[i + 1];
    if (curr.qa.includes(next.presenting) && next.qa.includes(curr.presenting)) {
      return false;
    }
  }
  return true;
}

function displaySessionsWithQA(assignments) {
  assignments.forEach((assignment, index) => {
    console.log(`Presentation ${index + 1}:`);
    console.log(` - Presenting Group: ${assignment.presenting}`);
    console.log(` - QA Groups: ${assignment.qa.join(", ")}`);
    console.log("");
  });
}

//  usage
const groups = [1, 2, 3, 4, 5, 6, 7, 8];
const qaAssignments = assignQA(groups);
displaySessionsWithQA(qaAssignments);
