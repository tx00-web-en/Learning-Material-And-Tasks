// -------------------------------------------------------------------------
// 1. VICTIM'S LEAKED DATABASE (Usernames and Hashes stolen by attacker)
// -------------------------------------------------------------------------
const leakedDatabase = [
  { username: "user1", hash: "741bfdda32c0281832bb6fb08a00c77a3f0d5fb05040abeff02313faa634e3a3" }, // p@ssword12345 (Not in attacker's table)
  { username: "user2", hash: "fdfcc1d7c5352e52b288e75b8e91865d54132bd7398b99d7ce72f2ce6d2a2a2c" }, // R#wdf78>$12
  { username: "user3", hash: "f59ce04dd8baca6d6c47b45f24a87ddc7851f3b94762fe31b7a2e444c592028a" }, // Ilovecats
  { username: "user4", hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" }, // admin
  { username: "user5", hash: "f4e98344541784f2eabcf6fcd1daf050afd9a1bfa2c59819356fe0543752f311" }, // Ab123456 (Not in attacker's table)
];

// -------------------------------------------------------------------------
// 2. ATTACKER'S PRECOMPUTED LOOKUP TABLE ("The Rainbow Table")
// Key = SHA-256 Hash, Value = Plaintext Password
// (Simulates a table pre-generated or downloaded off the internet)
// -------------------------------------------------------------------------
const rainbowTable = {
  "922e9646b9a4c330f8fe6e0339d22be60ee5a32b69d4c78d59186cebc7428ffc": "letmein",
  "fdfcc1d7c5352e52b288e75b8e91865d54132bd7398b99d7ce72f2ce6d2a2a2c": "R#wdf78>$12",
  "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad": "abc123",
  "b865615d05051a34b22c76a953e5e43a9926cc1ebef5fa757eec054df3a0b411": "welcome",
  "bef57ec7f53a6d40beb640a780a639c83bc29ac8a9816f1fc6c5c6dcd93c4721": "dragon",
  "0b471249b3fb811a0ff6dcf8e519c72e3ea86b86cf2576b92f7e02e64629d8a3": "football",
  "40bd001563085fc35165329ea1ff5c5ecbdbbeef": "sunshine",
  "f59ce04dd8baca6d6c47b45f24a87ddc7851f3b94762fe31b7a2e444c592028a": "Ilovecats",
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918": "admin",
  "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92": "123456",
  "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8": "password",
  "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4": "1234",
};

// -------------------------------------------------------------------------
// 3. THE ATTACK: Pure O(1) Key-Value Lookup
// Notice: There is NO hashing calculation here!
// -------------------------------------------------------------------------
function crackPasswords(leakedData, lookupTable) {
  const crackedUsers = [];

  leakedData.forEach((victim) => {
    // Check if the leaked hash exists as a key in the table
    const plaintext = lookupTable[victim.hash];

    if (plaintext) {
      crackedUsers.push({
        username: victim.username,
        password: plaintext,
      });
    }
  });

  return crackedUsers;
}

// -------------------------------------------------------------------------
// 4. EXECUTION AND RESULTS
// -------------------------------------------------------------------------
console.log("Starting attack on leaked database...\n");

const results = crackPasswords(leakedDatabase, rainbowTable);

results.forEach((account) => {
  console.log(`[SUCCESS] User "${account.username}" password is: "${account.password}"`);
});

console.log("\n================ LESSON FOR STUDENTS ================");
console.log("1. The attack took almost 0 milliseconds because it's just a lookup.");
console.log("2. Notice that 'user1' and 'user5' were NOT cracked because their");
console.log("   passwords were not in the attacker's precomputed table.");
console.log("3. If the database had used SALTING (e.g. bcrypt), the attacker's");
console.log("   precomputed table would be completely useless.");