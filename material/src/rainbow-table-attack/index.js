const crypto = require("crypto");

// Function to hash a password using HMAC-SHA256 (no salt)
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Simulate a leaked table with username-hash pairs (no plain-text passwords)
// const leakedTable = [
//   { username: "user1", hash: hashPassword("p@ssword12345") },
//   { username: "user2", hash: hashPassword("R#wdf78>$12") },
//   { username: "user3", hash: hashPassword("Ilovecats") },
//   { username: "user4", hash: hashPassword("admin") },
//   { username: "user5", hash: hashPassword("Ab123456") },
// ];

const leakedTable = [
  {
    username: "user1",
    hash: "741bfdda32c0281832bb6fb08a00c77a3f0d5fb05040abeff02313faa634e3a3", //hashPassword("p@ssword12345")
  },
  {
    username: "user2",
    hash: "fdfcc1d7c5352e52b288e75b8e91865d54132bd7398b99d7ce72f2ce6d2a2a2c", //hashPassword("R#wdf78>$12")
  },
  {
    username: "user3",
    hash: "f59ce04dd8baca6d6c47b45f24a87ddc7851f3b94762fe31b7a2e444c592028a", //hashPassword("Ilovecats")
  },
  {
    username: "user4",
    hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", //hashPassword("admin")
  },
  {
    username: "user5",
    hash: "f4e98344541784f2eabcf6fcd1daf050afd9a1bfa2c59819356fe0543752f311", //hashPassword("Ab123456")
  },
];

// List of potential passwords an attacker might try (includes leaked passwords)
const possiblePasswords = [
  "letmein",
  "R#wdf78>$12",
  "abc123",
  "welcome",
  "dragon",
  "football",
  "sunshine",
  "whatever",
  "trustno1",
  "hello",
  "password123",
  "qwerty",
  "Ilovecats",
  "admin",
  "123456",
  "test",
  "guest",
  "password",
  "1234",
  "love",
  "qwertyuiop",
  "123123",
  "password1",
  "iloveyou",
  "123qwe",
  "1q2w3e4r",
  "welcome123",
  "letmein123",
];

// Function to simulate the attack
function recoverPasswords(leakedTable, possiblePasswords) {
  const recovered = [];

  leakedTable.forEach((entry) => {
    for (const password of possiblePasswords) {
      const hashAttempt = hashPassword(password);
      if (hashAttempt === entry.hash) {
        recovered.push({
          username: entry.username,
          matchedPassword: password, // The password guessed or matched by the attacker
        });
        break; // Stop once the correct password is found
      }
    }
  });

  return recovered;
}

// Perform the recovery simulation
const recoveredPasswords = recoverPasswords(leakedTable, possiblePasswords);

// Output Results
console.log("Leaked Table (Username-Hash Pairs):");
leakedTable.forEach((entry) =>
  console.log(`Username: ${entry.username}, Hash: ${entry.hash}`)
);

console.log("\nRecovered Passwords:");
recoveredPasswords.forEach((rec) =>
  console.log(
    `Recovered: ${rec.username}'s password is "${rec.matchedPassword}"`
  )
);
console.log(
  "\nNote: if we use bcrypt, this attack is not possible because of salting"
);
