### 1. Conceptual Overview: Precomputed Tables and Rainbow Attacks

#### The Underlying Vulnerability
Cryptographic hash functions (such as SHA-256 or MD5) are designed to be **one-way functions**: computing a hash from an input is fast and deterministic, but computing the original input from a hash is computationally infeasible. 

When a system stores passwords as raw hashes without a cryptographic salt, the output for any given password is always identical:
$$\text{Hash}(\text{"password"}) \rightarrow \text{5e884898da28...}$$

Because the mapping is deterministic, attackers do not need to reverse the mathematics of the algorithm. Instead, they can precompute the hashes for millions of common passwords in advance.

#### The Lookup Table
Cracking unsalted hashes exists on a spectrum between computational time and storage space:

1. **Pure Brute-Force / Online Dictionary Attack (High Time, Low Storage):** 
   The attacker computes hashes dynamically during the attack for each candidate password until a match is found. This requires negligible storage but significant CPU/GPU processing power.
2. **Precomputed Lookup Table (Low Time, High Storage):**
   The attacker computes millions or billions of hashes once and stores every `Hash -> Plaintext` pair in a database. At attack time, cracking reduces to a constant-time ($O(1)$) search. The limitation is the enormous amount of disk space required.
3. **Rainbow Tables (Balanced Time and Storage):**
   A specialized implementation of a precomputed table. It uses mathematical chains formed by alternating **hash functions** and **reduction functions** (which convert a hash back into a valid password format). Instead of storing every single hash, a Rainbow Table stores only the start and end of each chain. This drastically reduces storage space requirements while keeping lookup speeds much faster than brute-force cracking.

*Note on the provided code:* The simulation implements a **precomputed lookup table**, which models the operational outcome of a rainbow table attack: looking up precalculated data to achieve instantaneous password recovery without performing runtime hashing.

#### Countermeasures
* **Cryptographic Salting:** Adding a unique, random string to each password prior to hashing ensures that two users with the same password produce completely different hashes:
  $$\text{Hash}(\text{"password"} + \text{"saltA"}) \neq \text{Hash}(\text{"password"} + \text{"saltB"})$$
  Because the salt is unique per user, a shared precomputed table is rendered useless. The attacker would have to generate an entirely new table for every distinct salt.
* **Slow Hash Functions (Key Derivation Functions):** Algorithms like bcrypt, scrypt, and Argon2 introduce deliberate computational cost (memory and time parameters), making both precomputation and brute-force attacks impractical.

---

### 2. Code Explanation

The provided JavaScript program models the mechanics of an attack against unsalted password hashes using precomputed data.

#### Step 1: Simulated Target (`leakedDatabase`)
```javascript
const leakedDatabase = [
  { username: "user1", hash: "741bfdda..." },
  { username: "user2", hash: "fdfcc1d7..." },
  ...
];
```
* Represents data an attacker might obtain through a database breach.
* Only the identifier (`username`) and the unsalted SHA-256 hash are visible.
* The original plaintext values are unknown to the attacker.

#### Step 2: Simulated Precomputed Table (`rainbowTable`)
```javascript
const rainbowTable = {
  "922e9646b...": "letmein",
  "fdfcc1d7c...": "R#wdf78>$12",
  ...
};
```
* Represents the attacker's pre-existing database.
* It is structured as a key-value dictionary where:
  * **Key:** The precomputed hash.
  * **Value:** The plaintext password that produces that hash.
* This data is loaded directly into memory, simulating an asset the attacker obtained or computed prior to the breach.

#### Step 3: The Attack Logic (`crackPasswords`)
```javascript
function crackPasswords(leakedData, lookupTable) {
  const crackedUsers = [];

  leakedData.forEach((victim) => {
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
```
* **No Cryptographic Operations:** The function imports no cryptographic libraries and performs no mathematical hashing operations.
* **Complexity:** The operation `lookupTable[victim.hash]` executes in average $O(1)$ time complexity per record. For $N$ leaked records, the entire database can be evaluated in $O(N)$ time.
* **Conditional Matching:** 
  * If the hash is an index in the dictionary, the password is recovered immediately.
  * If the hash is absent, the entry remains uncracked.

#### Step 4: Results and Takeaways
When executed:
* `user2` (`R#wdf78>$12`), `user3` (`Ilovecats`), and `user4` (`admin`) are matched instantly because their hashes exist in `rainbowTable`.
* `user1` (`p@ssword12345`) and `user5` (`Ab123456`) fail to resolve because their specific hashes were not present in the attacker's table. This highlights that lookup attacks are bounded by the completeness of the attacker's precomputed dataset.