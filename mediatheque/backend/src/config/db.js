const { Database, aql } = require("arangojs");
const bcrypt = require("bcryptjs");

const db = new Database({
  url: process.env.ARANGO_URL || "http://localhost:8529",
  databaseName: process.env.ARANGO_DB || "art_db",
  auth: {
    username: process.env.ARANGO_USER || "root",
    password: process.env.ARANGO_PASSWORD || "",
  },
});

async function initializeCollections() {
  const collectionsToCreate = ["users", "works"];

  for (const name of collectionsToCreate) {
    const exists = await db.collection(name).exists();
    if (!exists) {
      await db.collection(name).create();
      console.log(`📁 Collection "${name}" créée`);
    } else {
      console.log(`📁 Collection "${name}" déjà existante`);
    }
  }
}

async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    role: "user",
  };

  const result = await db.collection("users").save(user);
  return { ...user, _key: result._key, password: undefined };
}

async function findUserByEmail(email) {
  const cursor = await db.query(aql`
    FOR user IN users
    FILTER user.email == ${email}
    RETURN user
  `);
  return cursor.next();
}

module.exports = {
  db,
  aql,
  bcrypt,
  createUser,
  findUserByEmail,
  initializeCollections,
};